import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { parseWebhookMessage, sendWhatsAppMessage, sendWhatsAppVoice, sendUpiLinkWhatsApp } from '@/lib/whatsapp'
import { transcribeVoiceBengali, analyzeMessage, generateBengaliVoice } from '@/lib/ai-engine'
import { createUpiPaymentLink } from '@/lib/razorpay'

// GET — Webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// POST — Incoming message handler
export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const body = await req.json()

  const parsed = parseWebhookMessage(body)
  if (!parsed) {
    return NextResponse.json({ status: 'ignored' })
  }

  const { from, messageId, type, text, audioUrl, timestamp } = parsed

  try {
    // 1. Find business by phone (for now use first business — in prod match by WA number ID)
    const { data: business } = await supabase
      .from('businesses')
      .select('*')
      .eq('whatsapp_connected', true)
      .single()

    if (!business) return NextResponse.json({ status: 'no_business' })

    // 2. Find or create contact
    let { data: contact } = await supabase
      .from('contacts')
      .select('*')
      .eq('business_id', business.id)
      .eq('whatsapp_number', from)
      .single()

    if (!contact) {
      const { data: newContact } = await supabase
        .from('contacts')
        .insert({
          business_id: business.id,
          whatsapp_number: from,
          name: `Contact ${from.slice(-4)}`,
          source: 'whatsapp',
        })
        .select()
        .single()
      contact = newContact
    }

    // 3. Process voice note if needed
    let finalText = text || ''
    let voiceTranscriptBengali = ''
    let voiceTranscriptEnglish = ''

    if (type === 'voice' && audioUrl) {
      const transcription = await transcribeVoiceBengali(audioUrl)
      voiceTranscriptBengali = transcription.text_bengali
      voiceTranscriptEnglish = transcription.text_english
      finalText = voiceTranscriptBengali || voiceTranscriptEnglish
    }

    // 4. Get conversation history (last 10 messages)
    const { data: history } = await supabase
      .from('messages')
      .select('direction, raw_text, voice_transcript_bengali')
      .eq('contact_id', contact.id)
      .order('created_at', { ascending: false })
      .limit(10)

    const conversationHistory = (history || []).reverse().map(m => ({
      role: m.direction === 'inbound' ? 'user' as const : 'assistant' as const,
      content: m.voice_transcript_bengali || m.raw_text || '',
    }))

    // 5. AI Analysis
    const aiAnalysis = await analyzeMessage({
      message: finalText,
      messageType: type === 'voice' ? 'voice' : 'text',
      conversationHistory,
      businessType: business.business_type,
      contactName: contact.name,
    })

    // 6. Save message to DB
    await supabase.from('messages').insert({
      business_id: business.id,
      contact_id: contact.id,
      direction: 'inbound',
      message_type: type,
      raw_text: text,
      voice_transcript_bengali: voiceTranscriptBengali,
      voice_transcript_english: voiceTranscriptEnglish,
      audio_url: audioUrl,
      intent_category: aiAnalysis.intent,
      ai_lead_score: aiAnalysis.lead_score,
      ai_confidence: aiAnalysis.confidence,
      ai_reply_suggested: aiAnalysis.suggested_reply_bengali,
      ai_next_action: aiAnalysis.next_action,
      whatsapp_message_id: messageId,
      is_read: false,
    })

    // 7. Update contact score
    await supabase
      .from('contacts')
      .update({
        lead_score: aiAnalysis.lead_score,
        interest_level: aiAnalysis.interest_level,
        potential_value: aiAnalysis.potential_deal_value_estimate,
        last_message_at: timestamp,
        total_messages: (contact.total_messages || 0) + 1,
        total_voice_notes: type === 'voice' ? (contact.total_voice_notes || 0) + 1 : contact.total_voice_notes,
      })
      .eq('id', contact.id)

    // 8. Auto-actions based on AI next_action
    // Hot leads (score > 70) get immediate auto-reply
    if (aiAnalysis.lead_score >= 70 && business.subscription_plan !== 'starter') {
      // Auto-reply
      const replyText = aiAnalysis.suggested_reply_bengali
      
      if (aiAnalysis.next_action === 'send_upi_link' && aiAnalysis.potential_deal_value_estimate > 0) {
        // Create payment link and send
        const { data: upiTx } = await supabase
          .from('upi_transactions')
          .select('invoice_number')
          .eq('business_id', business.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        const paymentLink = await createUpiPaymentLink({
          amount: aiAnalysis.potential_deal_value_estimate,
          contactName: contact.name || 'Customer',
          contactPhone: from,
          description: 'Order via BongoFlow AI',
          invoiceNumber: `INV-${Date.now()}`,
          notifyWhatsapp: false,
        })

        await sendUpiLinkWhatsApp({
          to: from,
          contactName: contact.name || 'Customer',
          amount: paymentLink.total_amount,
          description: 'Your order',
          paymentUrl: paymentLink.short_url,
          invoiceNumber: paymentLink.invoice_number,
        })

        await supabase.from('upi_transactions').insert({
          business_id: business.id,
          contact_id: contact.id,
          razorpay_payment_link_id: paymentLink.id,
          amount: paymentLink.amount,
          gst_amount: paymentLink.gst_amount,
          payment_link_url: paymentLink.short_url,
          status: 'sent',
          description: 'Auto-generated from WhatsApp',
        })
      } else {
        // Regular text reply
        await sendWhatsAppMessage(from, replyText)

        // Save outbound message
        await supabase.from('messages').insert({
          business_id: business.id,
          contact_id: contact.id,
          direction: 'outbound',
          message_type: 'text',
          raw_text: replyText,
          ai_reply_sent: true,
        })
      }
    }

    // 9. Create notification for hot leads
    if (aiAnalysis.interest_level === 'hot') {
      await supabase.from('notifications').insert({
        business_id: business.id,
        type: 'hot_lead',
        title: '🔥 Hot Lead Alert!',
        body: `${contact.name || from} — Score: ${aiAnalysis.lead_score}% — ${aiAnalysis.intent}`,
        data: { contact_id: contact.id, score: aiAnalysis.lead_score },
      })
    }

    // 10. Log AI usage
    await supabase.from('ai_logs').insert({
      business_id: business.id,
      contact_id: contact.id,
      log_type: type === 'voice' ? 'voice_transcription' : 'lead_scoring',
      input_text: finalText,
      output_json: aiAnalysis as any,
      ai_model: 'gpt-4o',
    })

    return NextResponse.json({ status: 'processed', score: aiAnalysis.lead_score })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
