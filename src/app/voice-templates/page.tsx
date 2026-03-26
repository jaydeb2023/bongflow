'use client'
import { useState } from 'react'
import { Mic, Play, Plus, Edit2, CheckCircle, Volume2 } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const templates = [
  { id: 1, name: 'Welcome Greeting', category: 'greeting', bengali: 'নমস্কার {customer_name} da/di! আমি {business_name} থেকে বলছি। আপনার inquiry পেয়েছি। কিভাবে সাহায্য করতে পারি?', vars: ['{customer_name}', '{business_name}'], usageCount: 45, active: true },
  { id: 2, name: 'Payment Reminder', category: 'payment_reminder', bengali: '{customer_name} da/di, আপনার ₹{amount} payment এখনও বাকি আছে। Invoice {invoice_number}। সুবিধামতো pay করুন। ধন্যবাদ!', vars: ['{customer_name}', '{amount}', '{invoice_number}'], usageCount: 28, active: true },
  { id: 3, name: 'Appointment Reminder', category: 'appointment_reminder', bengali: 'নমস্কার {customer_name}! আপনার appointment {date} তে {time} এ। মনে রাখবেন। কোনো change হলে জানাবেন।', vars: ['{customer_name}', '{date}', '{time}'], usageCount: 19, active: true },
  { id: 4, name: 'Follow-up Warm Lead', category: 'follow_up', bengali: 'নমস্কার {customer_name} da/di! কিছুদিন আগে কথা হয়েছিল। আপনার decision হয়েছে? আমাদের offer এখনও available।', vars: ['{customer_name}'], usageCount: 34, active: true },
  { id: 5, name: 'New Offer Broadcast', category: 'offer', bengali: '🎉 Special offer! {offer_details}। {valid_till} পর্যন্ত। Order করতে WhatsApp করুন অথবা call করুন {phone}।', vars: ['{offer_details}', '{valid_till}', '{phone}'], usageCount: 12, active: false },
]

const categoryColors: Record<string, string> = {
  greeting: 'var(--blue)',
  payment_reminder: 'var(--amber)',
  appointment_reminder: 'var(--purple)',
  follow_up: 'var(--green)',
  offer: 'var(--red)',
}

export default function VoiceTemplatesPage() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [generating, setGenerating] = useState<number | null>(null)
  const [selected, setSelected] = useState(templates[0])

  const previewVoice = async (id: number) => {
    setPlaying(id)
    await new Promise(r => setTimeout(r, 2500))
    setPlaying(null)
  }

  const generateAudio = async (id: number) => {
    setGenerating(id)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(null)
    toast.success('Bengali voice generated via Sarvam AI!')
  }

  return (
    <AppLayout>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Smart Voice Templates</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Bengali WhatsApp templates with AI voice (Sarvam TTS)
            </p>
          </div>
          <button
            className="btn-wa flex items-center gap-1.5 text-sm"
            onClick={() => toast.success('Create template modal — coming soon!')}
          >
            <Plus size={14} /> New Template
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Template list */}
          <div className="col-span-1">
            {templates.map(t => (
              <div
                key={t.id}
                onClick={() => setSelected(t)}
                className="card p-3 mb-2 cursor-pointer"
                style={{
                  border: selected.id === t.id ? '1px solid var(--purple)' : '0.5px solid var(--border)',
                  opacity: t.active ? 1 : 0.6,
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="p-1.5 rounded-lg shrink-0"
                    style={{ background: `${categoryColors[t.category]}20`, color: categoryColors[t.category] }}
                  >
                    <Mic size={12} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                    <div
                      className="text-xs px-1.5 py-0.5 rounded inline-block mt-0.5 capitalize"
                      style={{ background: `${categoryColors[t.category]}15`, color: categoryColors[t.category] }}
                    >
                      {t.category.replace('_', ' ')}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Used {t.usageCount}x</div>
                  </div>
                  {t.active && <CheckCircle size={12} style={{ color: 'var(--green)', flexShrink: 0 }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Template detail */}
          <div className="col-span-2">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</div>
                  <div
                    className="text-xs px-2 py-0.5 rounded inline-block mt-1 capitalize"
                    style={{ background: `${categoryColors[selected.category]}15`, color: categoryColors[selected.category] }}
                  >
                    {selected.category.replace('_', ' ')}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                    onClick={() => toast.success('Edit template')}
                  >
                    <Edit2 size={11} /> Edit
                  </button>
                </div>
              </div>

              {/* Bengali text */}
              <div className="mb-4">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Bengali Text
                </div>
                <div
                  className="bengali p-4 rounded-xl text-sm leading-relaxed"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', lineHeight: 1.8 }}
                >
                  {selected.bengali}
                </div>
              </div>

              {/* Variables */}
              <div className="mb-5">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Variables (auto-filled)
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.vars.map(v => (
                    <span
                      key={v}
                      className="text-xs font-mono px-2 py-1 rounded"
                      style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '0.5px solid var(--purple)' }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Audio preview */}
              <div
                className="p-4 rounded-xl mb-4"
                style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Bengali Voice Preview (Sarvam AI)</div>
                  {playing === selected.id && (
                    <div className="voice-wave flex items-end gap-0.5 h-4">
                      {[1,2,3,4,5].map(i => <span key={i} />)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: playing === selected.id ? 'var(--red-dim)' : 'var(--green-dim)', color: playing === selected.id ? 'var(--red)' : 'var(--green)', border: `0.5px solid ${playing === selected.id ? 'var(--red)' : 'var(--green)'}` }}
                    onClick={() => previewVoice(selected.id)}
                  >
                    <Play size={11} />
                    {playing === selected.id ? 'Playing Bengali audio...' : 'Preview Voice'}
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '0.5px solid var(--purple)' }}
                    onClick={() => generateAudio(selected.id)}
                    disabled={generating === selected.id}
                  >
                    <Volume2 size={11} />
                    {generating === selected.id ? 'Generating...' : 'Re-generate Audio'}
                  </button>
                </div>
              </div>

              {/* Send */}
              <button
                className="btn-wa w-full flex items-center justify-center gap-2 text-sm"
                onClick={() => toast.success('Send this template to a contact!')}
              >
                <Mic size={13} /> Send Voice Message via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
