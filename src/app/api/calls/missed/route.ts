import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { generateMissedCallReply } from '@/lib/ai-engine'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { validateTwilioSignature } from '@/lib/twilio-calls'

// POST /api/calls/missed — Twilio status webhook for missed/no-answer calls
export async function POST(req: NextRequest) {
  const body = await req.formData()
  const params = Object.fromEntries(body.entries()) as Record<string, string>

  const callStatus = params.CallStatus
  const fromNumber = params.From || params.Called
  const toNumber = params.To || params.Caller
  const callSid = params.CallSid

  // Only process missed/no-answer calls
  if (!['no-answer', 'busy', 'failed'].includes(callStatus)) {
    return NextResponse.json({ status: 'not_missed' })
  }

  const supabase = createAdminClient()

  // Find business by Twilio number
  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('whatsapp_connected', true)
    .single()

  if (!business) return NextResponse.json({ error: 'Business not found' })

  // Find or create contact
  let { data: contact } = await supabase
    .from('contacts')
    .select('*')
    .eq('business_id', business.id)
    .eq('whatsapp_number', fromNumber)
    .single()

  if (!contact) {
    const { data: newContact } = await supabase
      .from('contacts')
      .insert({
        business_id: business.id,
        whatsapp_number: fromNumber,
        name: `Caller ${fromNumber.slice(-4)}`,
        source: 'call',
      })
      .select()
      .single()
    contact = newContact
  }

  // Generate AI missed call reply
  const reply = await generateMissedCallReply({
    contactName: contact?.name,
    businessName: business.business_name,
    businessType: business.business_type || 'business',
  })

  // Send WhatsApp auto-reply
  const sent = await sendWhatsAppMessage(fromNumber, reply.text_bengali)

  // Save call record
  await supabase.from('calls').insert({
    business_id: business.id,
    contact_id: contact?.id,
    direction: 'inbound',
    call_type: 'missed',
    status: 'missed',
    from_number: fromNumber,
    to_number: toNumber,
    twilio_call_sid: callSid,
    missed_call_auto_replied: sent,
    missed_call_reply_text: reply.text_bengali,
  })

  // Notification
  await supabase.from('notifications').insert({
    business_id: business.id,
    type: 'missed_call',
    title: '📞 Missed Call',
    body: `From ${contact?.name || fromNumber} — Auto-replied on WhatsApp`,
    data: { contact_id: contact?.id, phone: fromNumber },
  })

  return NextResponse.json({ status: 'handled', auto_replied: sent })
}
