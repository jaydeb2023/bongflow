import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient, createServerSupabaseClient } from '@/lib/supabase'
import { initiateOutboundCall, validateTwilioSignature } from '@/lib/twilio-calls'
import { generateCallScript, summarizeCall, generateMissedCallReply } from '@/lib/ai-engine'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

// POST /api/calls/initiate — Start AI outbound call
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const body = await req.json()
  const { contact_id, purpose, extra_details } = body

  const { data: contact } = await supabase
    .from('contacts')
    .select('*, businesses(*)')
    .eq('id', contact_id)
    .single()

  if (!contact) return NextResponse.json({ error: 'Contact not found' }, { status: 404 })

  // Generate Bengali script via AI
  const script = await generateCallScript({
    purpose,
    contactName: contact.name || 'Customer',
    businessName: contact.businesses?.business_name || 'Our Business',
    details: extra_details || {},
  })

  // Initiate call via Twilio
  const callSid = await initiateOutboundCall({
    toNumber: contact.whatsapp_number, // assuming same number
    purpose,
    contactName: contact.name || 'Customer',
    businessName: contact.businesses?.business_name || '',
    scriptText: script,
    recordCall: true,
  })

  // Save call record
  const { data: callRecord } = await supabase
    .from('calls')
    .insert({
      business_id: contact.business_id,
      contact_id,
      direction: 'outbound',
      call_type: 'ai_agent',
      status: 'initiated',
      from_number: process.env.TWILIO_PHONE_NUMBER,
      to_number: contact.whatsapp_number,
      twilio_call_sid: callSid,
    })
    .select()
    .single()

  // Update contact
  await supabase
    .from('contacts')
    .update({ last_called_at: new Date().toISOString() })
    .eq('id', contact_id)

  return NextResponse.json({ success: true, call_id: callRecord?.id, call_sid: callSid })
}
