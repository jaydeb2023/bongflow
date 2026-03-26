'use client'
import { useState } from 'react'
import { Phone, PhoneCall, PhoneOff, Mic, Play, Square, Clock, CheckCircle, XCircle, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const callHistory = [
  { id: 1, name: 'Suresh Kumar', number: '+91 98765 43210', purpose: 'Payment Reminder', status: 'completed', duration: '2:34', score_change: +12, time: '10:30 AM', summary: 'Customer agreed to pay by evening. UPI link to be sent.' },
  { id: 2, name: 'Ananya Banerjee', number: '+91 87654 32109', purpose: 'Site Visit Confirm', status: 'completed', duration: '1:12', score_change: +18, time: '11:15 AM', summary: 'Visit confirmed for tomorrow 10am. Very interested.' },
  { id: 3, name: 'Tapas Roy', number: '+91 76543 21098', purpose: 'Follow Up', status: 'no-answer', duration: '0:00', score_change: -5, time: '12:00 PM', summary: 'No answer. Auto WhatsApp sent.' },
  { id: 4, name: 'Meena Devi', number: '+91 65432 10987', purpose: 'Lead Nurture', status: 'completed', duration: '3:21', score_change: +8, time: '2:45 PM', summary: 'Interested in premium package. Demo scheduled.' },
]

const purposes = [
  { value: 'follow_up', label: 'Follow Up', desc: 'Check interest after first contact' },
  { value: 'payment_reminder', label: 'Payment Reminder', desc: 'Friendly reminder for pending UPI' },
  { value: 'appointment_confirm', label: 'Appointment Confirm', desc: 'Confirm visit/appointment time' },
  { value: 'lead_nurture', label: 'Lead Nurture', desc: 'Warm up cold/warm leads' },
]

export default function VoiceAgentPage() {
  const [calling, setCalling] = useState(false)
  const [activeCall, setActiveCall] = useState<any>(null)
  const [selectedPurpose, setSelectedPurpose] = useState('follow_up')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [contactName, setContactName] = useState('')
  const [callDuration, setCallDuration] = useState(0)

  const startCall = async () => {
    if (!phoneNumber) return toast.error('Enter phone number')
    setCalling(true)
    setActiveCall({ name: contactName || phoneNumber, number: phoneNumber, purpose: selectedPurpose, startTime: Date.now() })

    // Simulate call
    const interval = setInterval(() => {
      setCallDuration(d => d + 1)
    }, 1000)

    await new Promise(r => setTimeout(r, 8000))
    clearInterval(interval)
    setCalling(false)
    setActiveCall(null)
    setCallDuration(0)
    toast.success('Call completed! Summary saved to AI log.')
  }

  const formatDuration = (secs: number) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

  return (
    <AppLayout>
      <div className="p-5">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Voice Calling Agent</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Bengali AI agent calls your leads, follows up, reminds payments — automatically
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Call launcher */}
          <div className="col-span-1">
            <div className="card p-4 mb-4">
              <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Start AI Call
              </div>

              {/* Active call display */}
              {activeCall ? (
                <div
                  className="p-4 rounded-xl mb-3 text-center"
                  style={{ background: 'var(--green-dim)', border: '1px solid var(--green)' }}
                >
                  <div className="pulse-hot w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'var(--green)', color: '#fff' }}>
                    <Phone size={20} />
                  </div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{activeCall.name}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{activeCall.number}</div>
                  <div className="text-lg font-bold mt-2" style={{ color: 'var(--green)' }}>
                    {formatDuration(callDuration)}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Bengali AI Agent speaking...
                  </div>
                  <div className="voice-wave flex items-end justify-center gap-1 mt-2 h-5">
                    {[1,2,3,4,5].map(i => <span key={i} />)}
                  </div>
                </div>
              ) : null}

              <div className="space-y-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                  <input
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Contact Name (optional)</label>
                  <input
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="Customer name"
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Call Purpose</label>
                  <div className="space-y-1.5">
                    {purposes.map(p => (
                      <div
                        key={p.value}
                        onClick={() => setSelectedPurpose(p.value)}
                        className="p-2.5 rounded-lg cursor-pointer transition-all"
                        style={{
                          background: selectedPurpose === p.value ? 'var(--purple-dim)' : 'var(--bg-tertiary)',
                          border: `0.5px solid ${selectedPurpose === p.value ? 'var(--purple)' : 'var(--border)'}`,
                        }}
                      >
                        <div className="text-xs font-semibold" style={{ color: selectedPurpose === p.value ? 'var(--purple)' : 'var(--text-primary)' }}>
                          {p.label}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="btn-wa w-full flex items-center justify-center gap-2"
                  onClick={startCall}
                  disabled={calling}
                >
                  {calling ? <Loader size={14} className="animate-spin" /> : <PhoneCall size={14} />}
                  {calling ? 'AI Agent Calling...' : 'Start AI Call'}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="card p-4">
              <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Today's Stats
              </div>
              {[
                { label: 'Calls Made', value: '8' },
                { label: 'Answered', value: '6 (75%)' },
                { label: 'Avg Duration', value: '2:18' },
                { label: 'Score Improved', value: '+42 pts avg' },
              ].map(s => (
                <div key={s.label} className="flex justify-between py-1.5" style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call history */}
          <div className="col-span-2">
            <div className="card">
              <div className="flex items-center justify-between p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Call History</div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Today, 25 March</span>
              </div>
              <div>
                {callHistory.map(call => (
                  <div key={call.id} className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                    <div className="flex items-start gap-3">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: 36, height: 36,
                          background: call.status === 'completed' ? 'var(--green-dim)' : 'var(--red-dim)',
                          color: call.status === 'completed' ? 'var(--green)' : 'var(--red)',
                        }}
                      >
                        {call.status === 'completed' ? <PhoneCall size={14} /> : <PhoneOff size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{call.name}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              background: call.status === 'completed' ? 'var(--green-dim)' : 'var(--red-dim)',
                              color: call.status === 'completed' ? 'var(--green)' : 'var(--red)',
                            }}
                          >
                            {call.status === 'completed' ? '✔ Completed' : '✗ No Answer'}
                          </span>
                        </div>
                        <div className="text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
                          {call.number} · {call.purpose} · {call.time} · {call.duration}
                        </div>
                        <div
                          className="text-xs p-2 rounded-lg"
                          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                        >
                          AI Summary: {call.summary}
                        </div>
                      </div>
                      <div
                        className="text-xs font-bold shrink-0"
                        style={{ color: call.score_change > 0 ? 'var(--green)' : 'var(--red)' }}
                      >
                        {call.score_change > 0 ? '+' : ''}{call.score_change} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
