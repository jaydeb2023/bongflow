import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { summarizeCall } from '@/lib/ai-engine'
import { transcribeVoiceBengali } from '@/lib/ai-engine'

// POST /api/calls/status-webhook — Twilio call status updates
export async function POST(req: NextRequest) {
  const body = await req.formData()
  const params = Object.fromEntries(body.entries()) as Record<string, string>

  const supabase = createAdminClient()
  const callSid = params.CallSid
  const callStatus = params.CallStatus
  const duration = parseInt(params.CallDuration || '0')

  const statusMap: Record<string, string> = {
    'initiated': 'initiated',
    'ringing': 'ringing',
    'in-progress': 'in_progress',
    'completed': 'completed',
    'busy': 'missed',
    'no-answer': 'missed',
    'failed': 'failed',
    'canceled': 'failed',
  }

  await supabase
    .from('calls')
    .update({
      status: statusMap[callStatus] || callStatus,
      duration_secs: duration,
      ended_at: ['completed', 'busy', 'no-answer', 'failed'].includes(callStatus)
        ? new Date().toISOString()
        : null,
    })
    .eq('twilio_call_sid', callSid)

  return NextResponse.json({ status: 'updated' })
}
