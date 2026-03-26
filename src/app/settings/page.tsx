'use client'
import { useState } from 'react'
import { CheckCircle, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className="relative cursor-pointer rounded-full transition-all"
      style={{ width: 36, height: 20, background: on ? 'var(--wa-green)' : 'var(--bg-card)', flexShrink: 0 }}
    >
      <div
        className="absolute top-1 w-3 h-3 bg-white rounded-full transition-all"
        style={{ left: on ? 19 : 3 }}
      />
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    bengali_stt: true,
    auto_scoring: true,
    auto_reply_hot: true,
    voice_tts: false,
    missed_call_reply: true,
    upi_auto_followup: true,
    gst_on_invoice: true,
    notify_hot_leads: true,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Setting updated!')
  }

  const integrations = [
    { name: 'AiSensy (WhatsApp)', status: 'connected', color: 'var(--green)', action: 'Manage' },
    { name: 'Bhashini (Bengali STT)', status: 'connected', color: 'var(--green)', action: 'Manage' },
    { name: 'Sarvam AI (Bengali TTS)', status: 'disconnected', color: 'var(--red)', action: 'Connect' },
    { name: 'Razorpay (Payments)', status: 'connected', color: 'var(--green)', action: 'Manage' },
    { name: 'Twilio (Voice Calls)', status: 'connected', color: 'var(--green)', action: 'Manage' },
    { name: 'OpenAI GPT-4o (AI Brain)', status: 'connected', color: 'var(--green)', action: 'Manage' },
  ]

  return (
    <AppLayout>
      <div className="p-5 max-w-3xl">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Configure BongoFlow AI for your business</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            {/* AI Settings */}
            <div className="card p-4 mb-4">
              <div className="text-sm font-semibold mb-3 pb-2" style={{ color: 'var(--text-primary)', borderBottom: '0.5px solid var(--border)' }}>
                AI & Voice Settings
              </div>
              {[
                { key: 'bengali_stt', label: 'Bengali Voice Notes (Bhashini)', desc: 'Transcribe voice notes to Bengali text' },
                { key: 'auto_scoring', label: 'Auto Lead Scoring', desc: 'Score leads on every message (0-100)' },
                { key: 'auto_reply_hot', label: 'AI Auto-reply (Hot leads ≥70%)', desc: 'Send AI reply automatically for hot leads' },
                { key: 'voice_tts', label: 'Voice TTS Reply (Sarvam AI)', desc: 'Send replies as Bengali voice notes' },
                { key: 'missed_call_reply', label: 'Missed Call Auto-reply', desc: 'WhatsApp reply on missed calls' },
              ].map(s => (
                <div key={s.key} className="flex items-center justify-between py-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
                  </div>
                  <Toggle on={settings[s.key as keyof typeof settings]} onChange={() => toggle(s.key as keyof typeof settings)} />
                </div>
              ))}
            </div>

            {/* Payment Settings */}
            <div className="card p-4">
              <div className="text-sm font-semibold mb-3 pb-2" style={{ color: 'var(--text-primary)', borderBottom: '0.5px solid var(--border)' }}>
                Payment & Invoice
              </div>
              {[
                { key: 'upi_auto_followup', label: 'UPI Auto Follow-up', desc: 'Remind unpaid invoices every 24h (max 3)' },
                { key: 'gst_on_invoice', label: 'Add GST to Invoices', desc: 'Auto-add 18% GST on all invoices' },
              ].map(s => (
                <div key={s.key} className="flex items-center justify-between py-3" style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
                  </div>
                  <Toggle on={settings[s.key as keyof typeof settings]} onChange={() => toggle(s.key as keyof typeof settings)} />
                </div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { label: 'GST Number', placeholder: 'GSTIN', value: '19AABCU9603R1ZX' },
                  { label: 'Business Name', placeholder: 'Name on invoice', value: "Raju Hardware" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                    <input
                      defaultValue={f.value}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Subscription */}
            <div className="card p-4 mb-4">
              <div className="text-sm font-semibold mb-3 pb-2" style={{ color: 'var(--text-primary)', borderBottom: '0.5px solid var(--border)' }}>
                Subscription — Pro Plan
              </div>
              <div
                className="p-3 rounded-xl mb-3"
                style={{ background: 'var(--green-dim)', border: '0.5px solid var(--green)' }}
              >
                <div className="text-sm font-semibold" style={{ color: 'var(--green)' }}>Active · Renews Apr 25, 2026</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>₹799/month · Unlimited voice AI · 3 users</div>
              </div>
              <div className="space-y-1.5">
                {['Unlimited messages', 'Bengali Voice AI (Bhashini)', 'AI Auto-reply', 'UPI + GST Invoice', 'AI Voice Calling', '3 team members'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle size={11} style={{ color: 'var(--green)' }} /> {f}
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-3 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '0.5px solid var(--purple)' }}
                onClick={() => toast.success('Upgrade to Team ₹1,999/mo — 15 users, multi-branch')}
              >
                Upgrade to Team Plan ₹1,999/mo →
              </button>
            </div>

            {/* Integrations */}
            <div className="card p-4">
              <div className="text-sm font-semibold mb-3 pb-2" style={{ color: 'var(--text-primary)', borderBottom: '0.5px solid var(--border)' }}>
                Integrations
              </div>
              {integrations.map(i => (
                <div key={i.name} className="flex items-center justify-between py-2.5" style={{ borderBottom: '0.5px solid var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: i.color }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{i.name}</span>
                  </div>
                  <button
                    className="text-xs px-2.5 py-1 rounded-lg flex items-center gap-1"
                    style={{
                      background: i.status === 'connected' ? 'var(--bg-card)' : 'var(--green-dim)',
                      color: i.status === 'connected' ? 'var(--text-muted)' : 'var(--green)',
                      border: `0.5px solid ${i.status === 'connected' ? 'var(--border)' : 'var(--green)'}`,
                    }}
                    onClick={() => toast.success(`${i.name} settings`)}
                  >
                    {i.action} <ExternalLink size={9} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="btn-wa text-sm px-6" onClick={() => toast.success('Settings saved!')}>
            Save Settings
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
