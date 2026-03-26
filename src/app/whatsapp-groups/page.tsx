'use client'
import { useState } from 'react'
import { MessageCircle, Users, TrendingUp, Send, Plus, BarChart2 } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const groups = [
  {
    id: 1, name: 'Behala Hardware Dealers', members: 247, lastMsg: '5m ago',
    engagement: 78, hotLeads: 3, topTopics: ['সিমেন্ট দাম', 'সরিয়া stock', 'Delivery'],
    sentiment: 72, suggestedBroadcast: '🔥 আজকের special offer: সিমেন্ট ₹360/bag (কাল পর্যন্ত)! Order করুন: 98765 43210',
    recentActivity: [
      { name: 'Suresh K', msg: 'সিমেন্ট 50 bag লাগবে, দাম কত?', time: '5m', isLead: true },
      { name: 'Ramesh D', msg: 'Delivery কি আজকে possible?', time: '12m', isLead: true },
      { name: 'Group Admin', msg: 'নতুন stock এল — সব item available', time: '1h', isLead: false },
    ],
  },
  {
    id: 2, name: 'Salt Lake Clinic Network', members: 89, lastMsg: '20m ago',
    engagement: 54, hotLeads: 1, topTopics: ['Appointment', 'Doctor availability', 'Fee'],
    sentiment: 65, suggestedBroadcast: '📅 এই সপ্তাহে special check-up camp — FREE! Appointment নিন: 87654 32109',
    recentActivity: [
      { name: 'Priya M', msg: 'Friday appointment available?', time: '20m', isLead: true },
      { name: 'Dr. Sen', msg: 'Tomorrow all slots filled', time: '45m', isLead: false },
    ],
  },
  {
    id: 3, name: 'Gariahat Fashion Hub', members: 312, lastMsg: '2h ago',
    engagement: 91, hotLeads: 5, topTopics: ['নতুন collection', 'দাম', 'Wholesale'],
    sentiment: 88, suggestedBroadcast: '👗 এসে গেছে নতুন Summer collection! Wholesale available. DM করুন বা আসুন: 76543 21098',
    recentActivity: [
      { name: 'Ananya B', msg: 'নতুন collection কবে আসবে?', time: '2h', isLead: true },
      { name: 'Wholesale buyer', msg: 'Minimum order quantity কত?', time: '2h', isLead: true },
    ],
  },
]

export default function WhatsAppGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState(groups[0])
  const [analyzing, setAnalyzing] = useState(false)
  const [broadcasting, setBroadcasting] = useState(false)

  const analyzeGroup = async () => {
    setAnalyzing(true)
    await new Promise(r => setTimeout(r, 2000))
    setAnalyzing(false)
    toast.success('AI analysis complete! 3 hot leads detected.')
  }

  const sendBroadcast = async () => {
    setBroadcasting(true)
    await new Promise(r => setTimeout(r, 1500))
    setBroadcasting(false)
    toast.success(`Broadcast sent to ${selectedGroup.members} members!`)
  }

  return (
    <AppLayout>
      <div className="p-5">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>WhatsApp Group Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            AI monitors your groups, finds hot leads, suggests broadcasts
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Group list */}
          <div>
            {groups.map(group => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className="card p-3 mb-3 cursor-pointer"
                style={{
                  border: selectedGroup.id === group.id ? '1px solid var(--wa-green)' : '0.5px solid var(--border)',
                  background: selectedGroup.id === group.id ? 'rgba(37,211,102,0.04)' : 'var(--bg-secondary)',
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0"
                    style={{ width: 36, height: 36, background: 'var(--wa-green)', color: '#fff', fontSize: 16 }}
                  >
                    💬
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{group.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {group.members} members · {group.lastMsg}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="badge-hot" style={{ fontSize: 10 }}>🔥 {group.hotLeads} leads</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Engagement: {group.engagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="w-full p-3 rounded-xl text-xs flex items-center justify-center gap-2"
              style={{ border: '0.5px dashed var(--border)', color: 'var(--text-muted)' }}
              onClick={() => toast.success('Connect a new WhatsApp group!')}
            >
              <Plus size={12} /> Connect Group
            </button>
          </div>

          {/* Group detail */}
          <div className="col-span-2">
            <div className="card p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{selectedGroup.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{selectedGroup.members} members</div>
                </div>
                <button
                  className="btn-wa flex items-center gap-1.5 text-xs"
                  onClick={analyzeGroup}
                  disabled={analyzing}
                >
                  {analyzing ? '✦ Analyzing...' : '✦ AI Analyze'}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Engagement', value: `${selectedGroup.engagement}%`, color: 'var(--green)' },
                  { label: 'Sentiment', value: `${selectedGroup.sentiment}%`, color: 'var(--amber)' },
                  { label: 'Hot Leads', value: selectedGroup.hotLeads, color: 'var(--red)' },
                ].map(s => (
                  <div key={s.label} className="card-inner p-3 text-center">
                    <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Top topics */}
              <div className="mb-4">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Top Topics
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGroup.topTopics.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-lg bengali"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="mb-4">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recent Activity
                </div>
                {selectedGroup.recentActivity.map((msg, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <div
                      className="text-xs font-bold rounded-full shrink-0 flex items-center justify-center"
                      style={{
                        width: 24, height: 24,
                        background: msg.isLead ? 'var(--green-dim)' : 'var(--bg-card)',
                        color: msg.isLead ? 'var(--green)' : 'var(--text-muted)',
                      }}
                    >
                      {msg.name[0]}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{msg.name} </span>
                      <span className="text-xs bengali" style={{ color: 'var(--text-secondary)' }}>{msg.msg}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{msg.time}</span>
                      {msg.isLead && <span className="badge-hot" style={{ fontSize: 9 }}>Lead</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested broadcast */}
            <div className="card p-4">
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✦ AI Suggested Broadcast
              </div>
              <div
                className="bengali text-sm p-3 rounded-xl mb-3"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', lineHeight: 1.7 }}
              >
                {selectedGroup.suggestedBroadcast}
              </div>
              <button
                className="btn-wa flex items-center gap-1.5 text-sm"
                onClick={sendBroadcast}
                disabled={broadcasting}
              >
                <Send size={13} />
                {broadcasting ? 'Sending...' : `Broadcast to ${selectedGroup.members} members`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
