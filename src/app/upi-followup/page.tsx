'use client'
import { useState } from 'react'
import { CreditCard, Send, Clock, CheckCircle, AlertCircle, Plus, IndianRupee } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const transactions = [
  { id: 1, name: 'Suresh Kumar', biz: 'Hardware, Behala', amount: 19000, gst: 3420, status: 'sent', reminders: 1, invoice: 'INV-202503-0041', created: '23 Mar', due: 'Today', link: 'https://rzp.io/l/abc123' },
  { id: 2, name: 'Ananya Banerjee', biz: 'Real Estate', amount: 85000, gst: 15300, status: 'sent', reminders: 0, invoice: 'INV-202503-0042', created: '24 Mar', due: 'Tomorrow', link: 'https://rzp.io/l/def456' },
  { id: 3, name: 'Priya Mondal', biz: 'Clinic', amount: 500, gst: 90, status: 'paid', reminders: 1, invoice: 'INV-202503-0038', created: '20 Mar', due: 'Paid', link: '' },
  { id: 4, name: 'Debashis Sen', biz: 'Coaching', amount: 2500, gst: 450, status: 'sent', reminders: 2, invoice: 'INV-202503-0039', created: '21 Mar', due: 'Overdue', link: 'https://rzp.io/l/ghi789' },
  { id: 5, name: 'Nilufar Islam', biz: 'Salon', amount: 28000, gst: 5040, status: 'paid', reminders: 0, invoice: 'INV-202503-0035', created: '18 Mar', due: 'Paid', link: '' },
]

const StatusBadge = ({ status, due }: { status: string; due: string }) => {
  if (status === 'paid') return <span className="badge-hot" style={{ fontSize: 10 }}>✔ Paid</span>
  if (due === 'Overdue') return (
    <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'var(--red-dim)', color: 'var(--red)' }}>
      ⚠ Overdue
    </span>
  )
  return <span className="badge-warm" style={{ fontSize: 10 }}>⏳ Pending</span>
}

export default function UpiFollowupPage() {
  const [creating, setCreating] = useState(false)
  const [sendingReminder, setSendingReminder] = useState<number | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', amount: '', description: '' })

  const totalPending = transactions.filter(t => t.status === 'sent').reduce((s, t) => s + t.amount + t.gst, 0)
  const totalCollected = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount + t.gst, 0)

  const sendReminder = async (id: number, name: string) => {
    setSendingReminder(id)
    await new Promise(r => setTimeout(r, 1200))
    setSendingReminder(null)
    toast.success(`Reminder sent to ${name} via WhatsApp!`)
  }

  const createLink = async () => {
    if (!form.phone || !form.amount) return toast.error('Phone and amount required')
    setCreating(true)
    await new Promise(r => setTimeout(r, 1500))
    setCreating(false)
    setShowCreate(false)
    toast.success(`UPI link created + sent to ${form.name || form.phone}!`)
    setForm({ name: '', phone: '', amount: '', description: '' })
  }

  return (
    <AppLayout>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Auto UPI Follow-up</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Payment links + GST invoices + automatic reminders every 24h
            </p>
          </div>
          <button
            className="btn-wa flex items-center gap-1.5 text-sm"
            onClick={() => setShowCreate(!showCreate)}
          >
            <Plus size={14} /> New UPI Link
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="card p-4 mb-5 slide-up">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Create Payment Link</div>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {[
                { key: 'name', placeholder: 'Customer name', label: 'Name' },
                { key: 'phone', placeholder: '+91 98765 43210', label: 'WhatsApp number' },
                { key: 'amount', placeholder: '5000', label: 'Amount (₹)' },
                { key: 'description', placeholder: 'Hardware items', label: 'Description' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                  <input
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
            </div>
            {form.amount && (
              <div
                className="text-xs p-2 rounded-lg mb-3"
                style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}
              >
                Base: ₹{parseInt(form.amount || '0').toLocaleString('en-IN')} + GST 18% = <strong>₹{Math.round(parseInt(form.amount || '0') * 1.18).toLocaleString('en-IN')}</strong> total
              </div>
            )}
            <div className="flex gap-2">
              <button className="btn-wa flex items-center gap-1.5 text-sm" onClick={createLink} disabled={creating}>
                <CreditCard size={13} />
                {creating ? 'Creating & sending...' : 'Create + Send via WhatsApp'}
              </button>
              <button className="btn-ghost text-sm" onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="card p-4">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Pending Collection</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--amber)' }}>₹{totalPending.toLocaleString('en-IN')}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>3 payments</div>
          </div>
          <div className="card p-4">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Collected This Month</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--green)' }}>₹{totalCollected.toLocaleString('en-IN')}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>2 payments</div>
          </div>
          <div className="card p-4">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Auto-Reminders Sent</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--blue)' }}>4</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Next batch in 3h</div>
          </div>
        </div>

        {/* Transactions table */}
        <div className="card">
          <div className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Payment Links</div>
          </div>
          <div>
            {transactions.map(tx => (
              <div key={tx.id} className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 36, height: 36,
                      background: tx.status === 'paid' ? 'var(--green-dim)' : 'var(--amber-dim)',
                      color: tx.status === 'paid' ? 'var(--green)' : 'var(--amber)',
                    }}
                  >
                    {tx.status === 'paid' ? <CheckCircle size={14} /> : <CreditCard size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{tx.name}</span>
                      <StatusBadge status={tx.status} due={tx.due} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{tx.invoice}</span>
                    </div>
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                      {tx.biz} · Created {tx.created} · {tx.due === 'Paid' ? '✔ Paid' : `Due: ${tx.due}`}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>
                        ₹{(tx.amount + tx.gst).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        (₹{tx.amount.toLocaleString('en-IN')} + ₹{tx.gst.toLocaleString('en-IN')} GST)
                      </span>
                      {tx.reminders > 0 && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {tx.reminders} reminder{tx.reminders > 1 ? 's' : ''} sent
                        </span>
                      )}
                    </div>
                  </div>
                  {tx.status !== 'paid' && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'var(--amber-dim)', color: 'var(--amber)', border: '0.5px solid var(--amber)' }}
                        onClick={() => sendReminder(tx.id, tx.name)}
                        disabled={sendingReminder === tx.id}
                      >
                        <Send size={10} />
                        {sendingReminder === tx.id ? 'Sending...' : 'Remind'}
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}
                        onClick={() => { navigator.clipboard.writeText(tx.link); toast.success('Link copied!') }}
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
