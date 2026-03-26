'use client'
import { useState } from 'react'
import { Mic, Send, CreditCard, Volume2, Phone, ChevronRight, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const contacts = [
  {
    id: '1', name: 'Suresh Kumar', biz: 'Hardware, Behala', number: '+91 98765 43210',
    score: 88, level: 'hot', time: '2m ago',
    preview: '🎤 Voice · 0:42 — দাম কত? আজকেই লাগবে...',
    unread: 1, hasVoice: true,
    transcript: '"ভাই, আপনার কাছে কি 50kg সিমেন্ট আছে? দাম কত? আজকেই লাগবে, কাল থেকে কাজ শুরু হবে।"',
    intents: ['price_inquiry', 'booking_request', 'urgent'],
    reply: 'হ্যাঁ ভাই! 50kg সিমেন্ট আছে। আজকের দাম ₹380/bag। এখনই অর্ডার করলে বিকেলের মধ্যে পৌঁছে দেব। পেমেন্ট করবেন? 👇',
    nextAction: 'Send UPI link · Est. deal ₹19,000',
    dealValue: 19000,
    confidence: 92,
  },
  {
    id: '2', name: 'Ananya Banerjee', biz: 'Real Estate, Newtown', number: '+91 87654 32109',
    score: 91, level: 'hot', time: '18m ago',
    preview: '🎤 Voice · 0:28 — 2BHK কত থেকে শুরু?',
    unread: 3, hasVoice: true,
    transcript: '"Ki dam theke shuru 2BHK? Ready possession ache? Kal site visit possible?"',
    intents: ['booking_request', 'price_inquiry', 'urgent'],
    reply: 'Ananya di! 2BHK ₹45L থেকে শুরু, ready possession আছে। কাল সকাল 10টায় site visit করুন! গাড়ি পাঠাব।',
    nextAction: 'Call now · Site visit tomorrow · Est. ₹85,000',
    dealValue: 85000,
    confidence: 95,
  },
  {
    id: '3', name: 'Priya Mondal', biz: 'Clinic, Salt Lake', number: '+91 76543 21098',
    score: 65, level: 'warm', time: '45m ago',
    preview: 'Appointment ki available Friday te?',
    unread: 0, hasVoice: false,
    transcript: null,
    intents: ['booking_request', 'general_inquiry'],
    reply: 'Priya di, Friday te 11am-1pm slot আছে। Appointment fee ₹500। Confirm করতে নিচের link এ click করুন।',
    nextAction: 'Ask for visit time · Est. deal ₹500',
    dealValue: 500,
    confidence: 78,
  },
  {
    id: '4', name: 'Debashis Sen', biz: 'Coaching, Jadavpur', number: '+91 65432 10987',
    score: 58, level: 'warm', time: '1h ago',
    preview: '🎤 Voice · 1:12 — batch er details din...',
    unread: 0, hasVoice: true,
    transcript: '"Batch kokhon shuru? Fee koto? Online naki offline? Details janai..."',
    intents: ['price_inquiry', 'general_inquiry'],
    reply: 'Debashis da! নতুন batch শুরু হচ্ছে 1st April। Fee ₹2,500/month। Online + offline দুটোই available। Brochure পাঠাচ্ছি!',
    nextAction: 'Send catalogue · Schedule demo call',
    dealValue: 8000,
    confidence: 72,
  },
  {
    id: '5', name: 'Rajat Das', biz: 'Electronics, Park St', number: '+91 54321 09876',
    score: 32, level: 'cold', time: '2h ago',
    preview: 'Ektu price list patha...',
    unread: 0, hasVoice: false,
    transcript: null,
    intents: ['follow_up', 'cold_inquiry'],
    reply: 'Rajat da, আমাদের পুরো price list পাঠাচ্ছি। কোনো প্রশ্ন থাকলে জানাবেন! 😊',
    nextAction: 'Send catalogue · Low priority',
    dealValue: 0,
    confidence: 45,
  },
]

function ScorePill({ level, score }: { level: string; score: number }) {
  const map: Record<string, { cls: string; emoji: string }> = {
    hot: { cls: 'badge-hot', emoji: '🔥' },
    warm: { cls: 'badge-warm', emoji: '🌡' },
    cold: { cls: 'badge-cold', emoji: '❄' },
  }
  const { cls, emoji } = map[level] || map.cold
  return <span className={cls}>{emoji} {score}%</span>
}

export default function InboxPage() {
  const [selected, setSelected] = useState(contacts[0])
  const [sendingReply, setSendingReply] = useState(false)
  const [sendingUpi, setSendingUpi] = useState(false)
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.level === filter)

  const handleSendReply = async () => {
    setSendingReply(true)
    await new Promise(r => setTimeout(r, 1200))
    setSendingReply(false)
    toast.success('Reply sent via WhatsApp!')
  }

  const handleSendUpi = async () => {
    setSendingUpi(true)
    await new Promise(r => setTimeout(r, 1500))
    setSendingUpi(false)
    toast.success(`UPI link sent! ₹${selected.dealValue.toLocaleString('en-IN')}`)
  }

  const scoreColor = (level: string) =>
    level === 'hot' ? 'var(--green)' : level === 'warm' ? 'var(--amber)' : 'var(--blue)'

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 52px)' }}>
      {/* Contact list */}
      <div
        className="flex flex-col shrink-0"
        style={{ width: 280, borderRight: '0.5px solid var(--border)' }}
      >
        {/* Search + filter */}
        <div className="p-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input
              placeholder="Search contacts..."
              className="bg-transparent flex-1 text-xs outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
          <div className="flex gap-1">
            {(['all', 'hot', 'warm', 'cold'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-2 py-1 rounded text-xs capitalize transition-all"
                style={{
                  background: filter === f ? 'var(--bg-card)' : 'transparent',
                  color: filter === f ? 'var(--text-primary)' : 'var(--text-muted)',
                  border: filter === f ? '0.5px solid var(--border-hover)' : '0.5px solid transparent',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(contact => (
            <div
              key={contact.id}
              onClick={() => setSelected(contact)}
              className="p-3 cursor-pointer transition-all"
              style={{
                borderBottom: '0.5px solid var(--border)',
                background: selected.id === contact.id ? 'rgba(37,211,102,0.06)' : 'transparent',
                borderLeft: selected.id === contact.id ? '2px solid var(--wa-green)' : '2px solid transparent',
              }}
            >
              <div className="flex items-start gap-2">
                {/* Avatar */}
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                  style={{
                    width: 34, height: 34,
                    background: `${scoreColor(contact.level)}20`,
                    color: scoreColor(contact.level),
                  }}
                >
                  {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      {contact.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{contact.time}</span>
                      {contact.unread > 0 && (
                        <span
                          className="text-xs font-bold rounded-full flex items-center justify-center"
                          style={{ background: 'var(--red)', color: '#fff', width: 16, height: 16, fontSize: 9 }}
                        >
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{contact.biz}</div>
                  <div className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{contact.preview}</div>
                  <div className="mt-1.5">
                    <ScorePill level={contact.level} score={contact.score} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Contact header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{selected.number} · {selected.biz}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ScorePill level={selected.level} score={selected.score} />
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(74,144,226,0.15)', color: 'var(--blue)' }}
              onClick={() => toast.success('Initiating AI voice call...')}
            >
              <Phone size={12} /> Call
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat view */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {/* Incoming message */}
            <div className="max-w-sm">
              <div
                className="p-3 rounded-xl rounded-tl-sm text-sm"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                {selected.hasVoice && (
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold"
                      style={{ background: 'var(--wa-green)', color: '#fff' }}
                    >
                      <Mic size={10} /> Voice Note
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>0:42</span>
                    <div className="voice-wave flex items-end gap-0.5 h-4">
                      {[1,2,3,4,5].map(i => <span key={i} />)}
                    </div>
                  </div>
                )}
                {selected.transcript ? (
                  <div className="bengali text-sm">{selected.transcript}</div>
                ) : (
                  <div>{selected.preview.replace('🎤 Voice · 0:42 — ', '').replace('🎤 Voice · 1:12 — ', '')}</div>
                )}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{selected.time}</div>
            </div>
          </div>

          {/* AI Analysis sidebar */}
          <div
            className="flex flex-col shrink-0 overflow-y-auto"
            style={{ width: 300, borderLeft: '0.5px solid var(--border)' }}
          >
            {/* AI badge */}
            <div className="p-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-semibold" style={{ color: 'var(--purple)' }}>✦ BongoAI Analysis</span>
              </div>
              {/* Score */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Lead Score</span>
                <span className="text-sm font-bold" style={{ color: scoreColor(selected.level) }}>
                  {selected.score}%
                </span>
              </div>
              <div className="score-bar mb-2">
                <div className="score-bar-fill" style={{ width: `${selected.score}%`, background: scoreColor(selected.level) }} />
              </div>
              <div className="flex items-center gap-2">
                <ScorePill level={selected.level} score={selected.score} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Confidence: {selected.confidence}%</span>
              </div>
            </div>

            {/* Intents */}
            <div className="p-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Intent</div>
              <div className="flex flex-wrap gap-1.5">
                {selected.intents.map((intent, i) => (
                  <span
                    key={intent}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: i === 0 ? 'var(--purple-dim)' : 'var(--bg-card)',
                      color: i === 0 ? 'var(--purple)' : 'var(--text-secondary)',
                      border: i === 0 ? '0.5px solid var(--purple)' : '0.5px solid var(--border)',
                    }}
                  >
                    {intent}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested reply */}
            <div className="p-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✦ Suggested Reply
              </div>
              <div
                className="bengali text-sm p-2.5 rounded-xl mb-2"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', lineHeight: 1.7 }}
              >
                {selected.reply}
              </div>
              <div className="flex gap-1.5">
                <button
                  className="btn-wa flex-1 flex items-center justify-center gap-1.5 text-xs"
                  onClick={handleSendReply}
                  disabled={sendingReply}
                >
                  <Send size={11} />
                  {sendingReply ? 'Sending...' : 'Send Reply'}
                </button>
                <button
                  className="p-2 rounded-lg text-xs"
                  style={{ background: 'var(--purple-dim)', color: 'var(--purple)' }}
                  onClick={() => toast.success('Generating Bengali voice reply...')}
                  title="Send as voice"
                >
                  <Volume2 size={13} />
                </button>
              </div>
            </div>

            {/* Next action */}
            <div className="p-3">
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Next Action
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--amber)' }}>
                → {selected.nextAction}
              </div>
              {selected.dealValue > 0 && (
                <button
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{ background: 'var(--amber-dim)', color: 'var(--amber)', border: '0.5px solid var(--amber)' }}
                  onClick={handleSendUpi}
                  disabled={sendingUpi}
                >
                  <CreditCard size={12} />
                  {sendingUpi ? 'Creating...' : `Send UPI Link · ₹${selected.dealValue.toLocaleString('en-IN')}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
