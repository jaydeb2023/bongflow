// ============================================
// Twilio — AI Voice Calling Agent + Missed Calls
// ============================================

import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const VoiceResponse = twilio.twiml.VoiceResponse

export interface OutboundCallParams {
  toNumber: string
  purpose: 'follow_up' | 'payment_reminder' | 'appointment_confirm' | 'lead_nurture'
  contactName: string
  businessName: string
  scriptText: string  // Bengali text to speak
  recordCall?: boolean
}

// Initiate AI outbound call
export async function initiateOutboundCall(params: OutboundCallParams): Promise<string> {
  const call = await client.calls.create({
    to: params.toNumber,
    from: process.env.TWILIO_PHONE_NUMBER!,
    twiml: generateTwiML(params.scriptText, params.businessName),
    record: params.recordCall ?? true,
    recordingStatusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/calls/recording-webhook`,
    statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/calls/status-webhook`,
    statusCallbackMethod: 'POST',
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
  })

  return call.sid
}

// Generate TwiML for AI voice agent
export function generateTwiML(scriptText: string, businessName: string): string {
  const twiml = new VoiceResponse()

  // Pause for answer
  twiml.pause({ length: 1 })

  // Speak the script (using Polly Bengali voice)
  const gather = twiml.gather({
    input: ['speech'],
    language: 'bn-IN',
    speechTimeout: '3',
    action: `${process.env.NEXT_PUBLIC_APP_URL}/api/calls/gather-response`,
    method: 'POST',
    timeout: 5,
  })

  gather.say({
    voice: 'Polly.Aditi',
    language: 'hi-IN',
  }, scriptText)

  // Fallback if no response
  twiml.say({
    voice: 'Polly.Aditi',
    language: 'hi-IN',
  }, `ধন্যবাদ। ${businessName} এর পক্ষ থেকে আমরা পরে contact করব। আপনার দিনটি শুভ হোক!`)

  return twiml.toString()
}

// Handle missed call — return TwiML that disconnects + triggers webhook
export function generateMissedCallTwiML(): string {
  const twiml = new VoiceResponse()
  twiml.reject({ reason: 'busy' })
  return twiml.toString()
}

// Get call recording
export async function getCallRecording(callSid: string): Promise<string | null> {
  try {
    const recordings = await client.recordings.list({ callSid })
    if (recordings.length > 0) {
      return `https://api.twilio.com${recordings[0].uri.replace('.json', '.mp3')}`
    }
    return null
  } catch {
    return null
  }
}

// Validate Twilio webhook signature
export function validateTwilioSignature(
  signature: string,
  url: string,
  params: Record<string, string>
): boolean {
  return twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    signature,
    url,
    params
  )
}
