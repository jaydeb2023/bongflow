'use client'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp, Clock, Users, IndianRupee } from 'lucide-react'
import AppLayout from '@/components/crm/AppLayout'

const revenueData = [
  { month: 'Oct', revenue: 85000, deals: 8 },
  { month: 'Nov', revenue: 110000, deals: 11 },
  { month: 'Dec', revenue: 145000, deals: 16 },
  { month: 'Jan', revenue: 178000, deals: 19 },
  { month: 'Feb', revenue: 210000, deals: 22 },
  { month: 'Mar', revenue: 240000, deals: 23 },
]

const leadSourceData = [
  { name: 'Voice Notes', value: 62, color: '#25d366' },
  { name: 'WA Text', value: 28, color: '#f5a623' },
  { name: 'Referrals', value: 10, color: '#9b72ff' },
]

const weeklyLeads = [
  { day: 'Mon', hot: 4, warm: 7, cold: 3 },
  { day: 'Tue', hot: 6, warm: 9, cold: 2 },
  { day: 'Wed', hot: 3, warm: 8, cold: 5 },
  { day: 'Thu', hot: 7, warm: 11, cold: 4 },
  { day: 'Fri', hot: 5, warm: 9, cold: 3 },
  { day: 'Sat', hot: 8, warm: 12, cold: 2 },
  { day: 'Sun', hot: 7, warm: 11, cold: 6 },
]

const tooltipStyle = {
  contentStyle: {
    background: 'var(--bg-tertiary)',
    border: '0.5px solid rgba(255,255,255,0.08)',
    borderRadius: 8,
    fontSize: 12,
    color: 'var(--text-primary)',
  }
}

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="p-5">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Reports & Insights</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Last 30 days · AI-powered analytics</p>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Time Saved (Today)', value: '4.2 hrs', sub: '↑ vs 1.1 hrs manual', color: 'var(--green)', icon: Clock },
            { label: 'Conversion Rate', value: '38%', sub: '↑ from 14% before BongoFlow', color: 'var(--amber)', icon: TrendingUp },
            { label: 'Revenue (Month)', value: '₹2.40L', sub: '23 deals closed', color: 'var(--purple)', icon: IndianRupee },
            { label: 'Total Leads', value: '312', sub: 'This month', color: 'var(--blue)', icon: Users },
          ].map(s => (
            <div key={s.label} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card p-4">
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Monthly Revenue (₹)</div>
            <div className="text-2xl font-bold mb-3" style={{ color: 'var(--green)' }}>₹2.40L</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d084" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...tooltipStyle} formatter={(v: any) => `₹${(v/1000).toFixed(0)}K`} />
                <Area type="monotone" dataKey="revenue" stroke="#00d084" strokeWidth={2} fill="url(#revGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-4">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Weekly Lead Distribution</div>
            <div className="flex gap-3 mb-3 text-xs">
              {[{ c: 'var(--green)', l: 'Hot' }, { c: 'var(--amber)', l: 'Warm' }, { c: 'var(--blue)', l: 'Cold' }].map(x => (
                <span key={x.l} className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-2 h-2 rounded inline-block" style={{ background: x.c }} /> {x.l}
                </span>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyLeads} barSize={10} barGap={2}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="hot" stackId="a" fill="#00d084" />
                <Bar dataKey="warm" stackId="a" fill="#f5a623" />
                <Bar dataKey="cold" stackId="a" fill="#4a90e2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Lead Sources</div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {leadSourceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {leadSourceData.map(d => (
                <div key={d.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded inline-block" style={{ background: d.color }} />
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>AI Performance</div>
            {[
              { label: 'Avg response time', value: '< 30 sec', good: true },
              { label: 'Voice transcription accuracy', value: '94%', good: true },
              { label: 'Lead scoring accuracy', value: '87%', good: true },
              { label: 'Auto-reply satisfaction', value: '82%', good: true },
              { label: 'Time saved per day', value: '4.2 hrs', good: true },
              { label: 'Missed calls auto-replied', value: '94%', good: true },
            ].map(s => (
              <div key={s.label} className="flex justify-between py-1.5" style={{ borderBottom: '0.5px solid var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--green)' }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="card p-4">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Pipeline Summary</div>
            {[
              { stage: 'New Leads', count: 8, value: 42500, color: 'var(--blue)' },
              { stage: 'Interested', count: 5, value: 53000, color: 'var(--amber)' },
              { stage: 'Site Visit', count: 3, value: 110000, color: 'var(--purple)' },
              { stage: 'Negotiation', count: 4, value: 161000, color: 'var(--amber)' },
              { stage: 'Won', count: 23, value: 240000, color: 'var(--green)' },
            ].map(s => (
              <div key={s.stage} className="flex justify-between items-center py-1.5" style={{ borderBottom: '0.5px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.stage}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{s.count} deals</div>
                  <div className="text-xs" style={{ color: s.color }}>₹{(s.value / 1000).toFixed(0)}K</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
