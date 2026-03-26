'use client'
import { useState } from 'react'
import { PhoneMissed, MessageSquare, Phone, Clock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const missedCalls = [
  { id: 1, name: 'Unknown Caller', number: '+91 99000 12345', time: '9:15 AM', autoReplied: true, reply: 'নমস্কার! আপনার call পাইনি। কিভাবে সাহায্য করতে পারি? — Raju Hardware', score: null },
  { id: 2, name: 'Tapas Roy', number: '+91 88000 23456', time: '10:30 AM', autoReplied: true, reply: 'Tapas da, ব্যস্ত ছিলাম। আপনার কি দরকার বলুন, সাথে সাথে reply করব!', score: 55 },
  { id: 3, name: 'Kabita Sen', number: '+91 77000 34567', time: '11:45 AM', autoReplied: false, reply: null, score: null },
  { id: 4, name: 'Ramesh Saha', number: '+91 66000 45678', time: '1:00 PM', autoReplied: true, reply: 'নমস্কার! আপনার call পাইনি। WhatsApp এ message করুন, ৫ মিনিটে reply করব!', score: 40 },
  { id: 5, name: 'Unknown Caller', number: '+91 55000 56789', time: '2:30 PM', autoReplied: true, reply: 'নমস্কার! আপনার call পাইনি। কিভাবে সাহায্য করতে পারি?', score: null },
]

const autoReplyTemplates = [
  { id: 1, name: 'Standard Bengali', text: 'নমস্কার! আপনার call পাইনি। কিভাবে সাহায্য করতে পারি? WhatsApp এ message করুন!', active: true },
  { id: 2, name: 'With timing', text: 'নমস্কার! এই মুহূর্তে ব্যস্ত আছি। ৩০ মিনিটের মধ্যে callback করব অথবা WhatsApp এ message করুন।', active: false },
  { id: 3, name: 'Dukan style', text: 'ভাই/দিদি, দোকানে ব্যস্ত ছিলাম! কি লাগবে বলুন — দাম, stock সব জানাব। 🙏', active: false },
]

export default function MissedCallsPage() {
  const [sending, setSending] = useState<number | null>(null)
  const [activeTemplate, setActiveTemplate] = useState(1)

  const sendReply = async (callId: number, number: string) => {
    setSending(callId)
    await new Promise(r => setTimeout(r, 1200))
    setSending(null)
    toast.success(`WhatsApp reply sent to ${number}`)
  }

  const callBack = (number: string) => {
    toast.success(`Initiating AI callback to ${number}...`)
  }

  return (
    <AppLayout>
      <div className="p-5">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Missed Call CRM</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Missed calls auto-get WhatsApp replies. Never lose a lead again.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Missed Today', value: '5', color: 'var(--red)', icon: PhoneMissed },
            { label: 'Auto-Replied', value: '4', color: 'var(--green)', icon: MessageSquare },
            { label: 'Leads Recovered', value: '2', color: 'var(--amber)', icon: CheckCircle },
            { label: 'Avg Reply Time', value: '< 30s', color: 'var(--blue)', icon: Clock },
          ].map(s => (
            <div key={s.label} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Missed calls list */}
          <div className="col-span-2">
            <div className="card">
              <div className="flex items-center justify-between p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Missed Calls</div>
                <span className="badge-hot">Auto-reply ON</span>
              </div>
              {missedCalls.map(call => (
                <div key={call.id} className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <div className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{ width: 36, height: 36, background: 'var(--red-dim)', color: 'var(--red)' }}
                    >
                      <PhoneMissed size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {call.name}
                        </span>
                        {call.score && (
                          <span className="badge-warm" style={{ fontSize: 10 }}>🌡 Score: {call.score}</span>
                        )}
                      </div>
                      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                        {call.number} · {call.time}
                      </div>
                      {call.autoReplied && call.reply ? (
                        <div
                          className="text-xs p-2 rounded-lg bengali"
                          style={{ background: 'rgba(37,211,102,0.06)', border: '0.5px solid rgba(37,211,102,0.2)', color: 'var(--text-secondary)', lineHeight: 1.6 }}
                        >
                          ✅ Auto-replied: "{call.reply}"
                        </div>
                      ) : (
                        <div
                          className="text-xs p-2 rounded-lg"
                          style={{ background: 'var(--red-dim)', color: 'var(--red)' }}
                        >
                          ⚠ Not yet replied
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      {!call.autoReplied && (
                        <button
                          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold"
                          style={{ background: 'var(--wa-green)', color: '#fff' }}
                          onClick={() => sendReply(call.id, call.number)}
                          disabled={sending === call.id}
                        >
                          <MessageSquare size={10} />
                          {sending === call.id ? '...' : 'Reply'}
                        </button>
                      )}
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}
                        onClick={() => callBack(call.number)}
                      >
                        <Phone size={10} /> Callback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-reply settings */}
          <div>
            <div className="card p-4 mb-4">
              <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Auto-Reply Settings</div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Auto-reply enabled</span>
                <div
                  className="toggle on w-9 h-5 rounded-full relative cursor-pointer"
                  style={{ background: 'var(--wa-green)' }}
                  onClick={() => toast.success('Toggle auto-reply')}
                >
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Add to CRM automatically</span>
                <div
                  className="toggle on w-9 h-5 rounded-full relative cursor-pointer"
                  style={{ background: 'var(--wa-green)' }}
                >
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Reply Templates
              </div>
              <div className="space-y-2">
                {autoReplyTemplates.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setActiveTemplate(t.id)}
                    className="p-2.5 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: activeTemplate === t.id ? 'var(--green-dim)' : 'var(--bg-tertiary)',
                      border: `0.5px solid ${activeTemplate === t.id ? 'var(--green)' : 'var(--border)'}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ color: activeTemplate === t.id ? 'var(--green)' : 'var(--text-primary)' }}>
                        {t.name}
                      </span>
                      {activeTemplate === t.id && <CheckCircle size={11} style={{ color: 'var(--green)' }} />}
                    </div>
                    <div className="text-xs bengali" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {t.text.slice(0, 60)}...
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
