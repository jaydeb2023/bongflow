'use client'
import { useState } from 'react'
import { Plus, MoreHorizontal, IndianRupee, Phone, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const STAGES = [
  { id: 'new', label: 'New Leads', color: 'var(--blue)' },
  { id: 'interested', label: 'Interested', color: 'var(--amber)' },
  { id: 'visit', label: 'Site Visit', color: 'var(--purple)' },
  { id: 'negotiation', label: 'Negotiation', color: 'var(--amber)' },
  { id: 'won', label: 'Closed Won', color: 'var(--green)' },
]

const initialDeals: Record<string, any[]> = {
  new: [
    { id: 'd1', name: 'Rajat Das', biz: 'Electronics, Park St', value: 8000, score: 32, level: 'cold', tag: 'price_inquiry' },
    { id: 'd2', name: 'Meena Roy', biz: 'Boutique, Gariahat', value: 12500, score: 54, level: 'warm', tag: 'follow_up' },
    { id: 'd5', name: 'Biplab Kundu', biz: 'Restaurant, Howrah', value: 22000, score: 45, level: 'warm', tag: 'general_inquiry' },
  ],
  interested: [
    { id: 'd3', name: 'Priya Mondal', biz: 'Clinic, Salt Lake', value: 35000, score: 65, level: 'warm', tag: 'booking_request' },
    { id: 'd6', name: 'Debashis Sen', biz: 'Coaching, Jadavpur', value: 18000, score: 58, level: 'warm', tag: 'price_inquiry' },
  ],
  visit: [
    { id: 'd4', name: 'Ananya Banerjee', biz: 'Real Estate, Newtown', value: 85000, score: 91, level: 'hot', tag: 'booking_request' },
  ],
  negotiation: [
    { id: 'd7', name: 'Suresh Kumar', biz: 'Hardware, Behala', value: 19000, score: 88, level: 'hot', tag: 'price_inquiry' },
    { id: 'd8', name: 'Tanmoy Ghosh', biz: 'Restaurant, Tolly', value: 42000, score: 82, level: 'hot', tag: 'negotiation' },
  ],
  won: [
    { id: 'd9', name: 'Nilufar Islam', biz: 'Salon, Tollygunge', value: 28000, score: 95, level: 'hot', paid: true },
    { id: 'd10', name: 'Subroto Paul', biz: 'Tutor, Dhakuria', value: 15000, score: 90, level: 'hot', paid: true },
    { id: 'd11', name: 'Rina Chatterjee', biz: 'Catering, Garia', value: 55000, score: 88, level: 'hot', paid: true },
  ],
}

function DealCard({ deal, stage }: { deal: any; stage: string }) {
  const scoreColor = deal.level === 'hot' ? 'var(--green)' : deal.level === 'warm' ? 'var(--amber)' : 'var(--blue)'
  const badge =
    deal.level === 'hot' ? { cls: 'badge-hot', e: '🔥' } :
    deal.level === 'warm' ? { cls: 'badge-warm', e: '🌡' } :
    { cls: 'badge-cold', e: '❄' }

  return (
    <div
      className="card-inner p-3 mb-2 cursor-pointer group"
      style={{ borderLeft: stage === 'won' ? `2px solid var(--green)` : undefined }}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{deal.name}</div>
        <button className="opacity-0 group-hover:opacity-100" style={{ color: 'var(--text-muted)' }}>
          <MoreHorizontal size={12} />
        </button>
      </div>
      <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{deal.biz}</div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>
          ₹{deal.value.toLocaleString('en-IN')}
        </span>
        <span className={badge.cls} style={{ fontSize: 10 }}>{badge.e} {deal.score}%</span>
      </div>
      {deal.tag && (
        <div
          className="text-xs px-1.5 py-0.5 rounded inline-block mb-2"
          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
        >
          {deal.tag}
        </div>
      )}
      {/* Score bar */}
      <div className="score-bar">
        <div className="score-bar-fill" style={{ width: `${deal.score}%`, background: scoreColor }} />
      </div>
      {stage === 'won' && deal.paid && (
        <div className="text-xs mt-2 font-semibold" style={{ color: 'var(--green)' }}>✔ Paid via UPI</div>
      )}
      {stage !== 'won' && (
        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="flex items-center gap-1 px-2 py-1 rounded text-xs"
            style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}
            onClick={() => toast.success('Initiating AI call...')}
          >
            <Phone size={9} /> Call
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded text-xs"
            style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}
            onClick={() => toast.success(`UPI link created for ₹${deal.value.toLocaleString('en-IN')}`)}
          >
            <CreditCard size={9} /> UPI
          </button>
        </div>
      )}
    </div>
  )
}

export default function PipelinePage() {
  const [deals, setDeals] = useState(initialDeals)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const totalValue = Object.values(deals).flat().reduce((s, d) => s + d.value, 0)
  const wonValue = deals.won.reduce((s, d) => s + d.value, 0)

  const handleDragStart = (dealId: string) => setDragging(dealId)
  const handleDragOver = (stageId: string, e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(stageId)
  }

  const handleDrop = (toStage: string) => {
    if (!dragging) return
    const fromStage = Object.keys(deals).find(s => deals[s].some((d: any) => d.id === dragging))
    if (!fromStage || fromStage === toStage) { setDragging(null); setDragOver(null); return }

    const deal = deals[fromStage].find((d: any) => d.id === dragging)
    setDeals(prev => ({
      ...prev,
      [fromStage]: prev[fromStage].filter((d: any) => d.id !== dragging),
      [toStage]: [...prev[toStage], deal],
    }))
    toast.success(`Moved to ${STAGES.find(s => s.id === toStage)?.label}!`)
    setDragging(null)
    setDragOver(null)
  }

  return (
    <AppLayout>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Deal Pipeline</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {Object.values(deals).flat().length} deals · ₹{totalValue.toLocaleString('en-IN')} total · ₹{wonValue.toLocaleString('en-IN')} won
            </p>
          </div>
          <button
            className="btn-wa flex items-center gap-1.5 text-sm"
            onClick={() => toast.success('Add deal modal — coming soon!')}
          >
            <Plus size={14} /> Add Deal
          </button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {STAGES.map(stage => {
            const stageDeals = deals[stage.id]
            const stageValue = stageDeals.reduce((s, d) => s + d.value, 0)
            return (
              <div key={stage.id} className="card p-3 text-center">
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{stage.label}</div>
                <div className="text-lg font-bold" style={{ color: stage.color }}>{stageDeals.length}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>₹{(stageValue / 1000).toFixed(0)}K</div>
              </div>
            )
          })}
        </div>

        {/* Kanban board */}
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {STAGES.map(stage => (
            <div
              key={stage.id}
              className="pipe-column"
              onDragOver={e => handleDragOver(stage.id, e)}
              onDrop={() => handleDrop(stage.id)}
              style={{
                background: dragOver === stage.id ? 'rgba(37,211,102,0.04)' : 'var(--bg-secondary)',
                border: `0.5px solid ${dragOver === stage.id ? 'var(--wa-green)' : 'var(--border)'}`,
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: stage.color }}>
                  {stage.label}
                </span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
                >
                  {deals[stage.id].length}
                </span>
              </div>

              {/* Cards */}
              {deals[stage.id].map(deal => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={() => handleDragStart(deal.id)}
                  style={{ opacity: dragging === deal.id ? 0.5 : 1 }}
                >
                  <DealCard deal={deal} stage={stage.id} />
                </div>
              ))}

              {/* Add card button */}
              <button
                className="w-full py-2 rounded-lg text-xs flex items-center justify-center gap-1 mt-1 transition-all"
                style={{ color: 'var(--text-muted)', border: '0.5px dashed var(--border)' }}
                onClick={() => toast.success('Add to this stage — coming soon!')}
              >
                <Plus size={11} /> Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
