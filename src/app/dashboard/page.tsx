'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, Users, Flame, Thermometer, Snowflake, Phone, Clock, CreditCard, MessageSquare, IndianRupee } from 'lucide-react'
import { DashboardStats } from '@/types'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const weeklyData = [
  { day: 'Mon', hot: 4, warm: 7, cold: 3 },
  { day: 'Tue', hot: 6, warm: 9, cold: 2 },
  { day: 'Wed', hot: 3, warm: 8, cold: 5 },
  { day: 'Thu', hot: 7, warm: 11, cold: 4 },
  { day: 'Fri', hot: 5, warm: 9, cold: 3 },
  { day: 'Sat', hot: 8, warm: 12, cold: 2 },
  { day: 'Sun', hot: 7, warm: 11, cold: 6 },
]

const revenueData = [
  { month: 'Oct', revenue: 85000 },
  { month: 'Nov', revenue: 110000 },
  { month: 'Dec', revenue: 145000 },
  { month: 'Jan', revenue: 178000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 240000 },
]

const recentLeads = [
  { name: 'Suresh Kumar', biz: 'Hardware, Behala', score: 88, level: 'hot', time: '2m ago', msg: '🎤 Voice: দাম কত? আজকেই লাগবে...', value: 19000 },
  { name: 'Ananya Banerjee', biz: 'Real estate, Newtown', score: 91, level: 'hot', time: '18m ago', msg: '🎤 Voice: 2BHK কত থেকে শুরু?', value: 85000 },
  { name: 'Priya Mondal', biz: 'Clinic, Salt Lake', score: 65, level: 'warm', time: '45m ago', msg: 'Appointment ki available Friday te?', value: 500 },
  { name: 'Debashis Sen', biz: 'Coaching, Jadavpur', score: 58, level: 'warm', time: '1h ago', msg: '🎤 Voice: batch er details din...', value: 8000 },
  { name: 'Rajat Das', biz: 'Electronics, Park St', score: 32, level: 'cold', time: '2h ago', msg: 'Ektu price list patha', value: 0 },
]

function StatCard({ label, value, sub, icon: Icon, color, prefix = '' }: any) {
  return (
    <div className="card p-4 slide-up">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <div
          className="p-1.5 rounded-lg"
          style={{ background: `${color}20`, color }}
        >
          <Icon size={14} />
        </div>
      </div>
      <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      {sub && <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

function LeadBadge({ level }: { level: string }) {
  if (level === 'hot') return <span className="badge-hot">🔥 Hot</span>
  if (level === 'warm') return <span className="badge-warm">🌡 Warm</span>
  return <span className="badge-cold">❄ Cold</span>
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('নমস্কার')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('সুপ্রভাত')
    else if (h < 17) setGreeting('নমস্কার')
    else setGreeting('শুভ সন্ধ্যা')
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="card-inner p-2 text-xs" style={{ minWidth: 100 }}>
        <div className="font-semibold mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold bengali" style={{ color: 'var(--text-primary)' }}>
          {greeting}, Raju da! 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Today — 12 new leads · ₹4.2L pipeline · 23 auto-replies sent
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        <StatCard label="Leads Today" value={24} sub="↑ 8 from yesterday" icon={Users} color="var(--blue)" />
        <StatCard label="🔥 Hot Leads" value={7} sub="≥80% score" icon={Flame} color="var(--green)" />
        <StatCard label="🌡 Warm Leads" value={11} sub="40–79% score" icon={Thermometer} color="var(--amber)" />
        <StatCard label="Pipeline Value" value={420000} sub="This week" icon={IndianRupee} color="var(--purple)" prefix="₹" />
        <StatCard label="Time Saved" value="4.2 hrs" sub="vs manual work" icon={Clock} color="var(--wa-green)" />
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Revenue MTD" value={240000} sub="↑ 14% vs last month" icon={TrendingUp} color="var(--green)" prefix="₹" />
        <StatCard label="Calls Today" value={8} sub="3 AI agent calls" icon={Phone} color="var(--blue)" />
        <StatCard label="Pending UPI" value={67500} sub="4 payments" icon={CreditCard} color="var(--amber)" prefix="₹" />
        <StatCard label="Unread Messages" value={7} sub="2 hot leads" icon={MessageSquare} color="var(--red)" />
      </div>

      {/* Charts + Leads grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Lead Chart */}
        <div className="card p-4">
          <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Weekly Lead Distribution
          </div>
          <div className="flex gap-3 mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--green)' }}>● Hot</span>
            <span style={{ color: 'var(--amber)' }}>● Warm</span>
            <span style={{ color: 'var(--blue)' }}>● Cold</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barSize={8} barGap={2}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hot" stackId="a" fill="#00d084" radius={[0,0,0,0]} />
              <Bar dataKey="warm" stackId="a" fill="#f5a623" radius={[0,0,0,0]} />
              <Bar dataKey="cold" stackId="a" fill="#4a90e2" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="card p-4">
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Monthly Revenue (₹)
          </div>
          <div className="text-2xl font-bold mb-3" style={{ color: 'var(--green)' }}>₹2.40L</div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d084" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v: any) => `₹${(v/1000).toFixed(0)}K`} contentStyle={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#00d084" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent leads */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Leads</div>
            <a href="/inbox" className="text-xs" style={{ color: 'var(--wa-green)', textDecoration: 'none' }}>View all →</a>
          </div>
          <div className="space-y-2">
            {recentLeads.map((lead, i) => (
              <div
                key={i}
                className="card-inner p-2.5 cursor-pointer"
                style={{ transition: 'border-color 0.15s' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                        {lead.name}
                      </span>
                      <LeadBadge level={lead.level} />
                    </div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{lead.biz}</div>
                    <div className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{lead.msg}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{lead.time}</div>
                    {lead.value > 0 && (
                      <div className="text-xs font-semibold mt-1" style={{ color: 'var(--green)' }}>
                        ₹{lead.value.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                </div>
                {/* Score bar */}
                <div className="mt-2">
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{
                        width: `${lead.score}%`,
                        background: lead.level === 'hot' ? 'var(--green)' : lead.level === 'warm' ? 'var(--amber)' : 'var(--blue)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
