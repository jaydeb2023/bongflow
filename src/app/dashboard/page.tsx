// 📁 src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  TrendingUp, Users, Flame, Thermometer, Phone,
  Clock, CreditCard, MessageSquare, IndianRupee,
  ArrowUpRight, ChevronRight,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

/* ── DATA ── */
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
  { month: 'Oct', revenue: 85000  },
  { month: 'Nov', revenue: 110000 },
  { month: 'Dec', revenue: 145000 },
  { month: 'Jan', revenue: 178000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 240000 },
]

const recentLeads = [
  { name: 'Suresh Kumar',    biz: 'Hardware, Behala',     score: 88, level: 'hot',  time: '2m ago',  msg: '🎤 দাম কত? আজকেই লাগবে...', value: 19000 },
  { name: 'Ananya Banerjee', biz: 'Real estate, Newtown', score: 91, level: 'hot',  time: '18m ago', msg: '🎤 2BHK কত থেকে শুরু?',      value: 85000 },
  { name: 'Priya Mondal',    biz: 'Clinic, Salt Lake',    score: 65, level: 'warm', time: '45m ago', msg: 'Appointment Friday te?',       value: 500   },
  { name: 'Debashis Sen',    biz: 'Coaching, Jadavpur',   score: 58, level: 'warm', time: '1h ago',  msg: '🎤 batch er details din...',   value: 8000  },
  { name: 'Rajat Das',       biz: 'Electronics, Park St', score: 32, level: 'cold', time: '2h ago',  msg: 'Ektu price list pathao',       value: 0     },
]

/* ── SMALL COMPONENTS ── */
function LeadBadge({ level }: { level: string }) {
  if (level === 'hot')  return <span className="badge-hot">🔥 Hot</span>
  if (level === 'warm') return <span className="badge-warm">🌡 Warm</span>
  return <span className="badge-cold">❄ Cold</span>
}

function StatCard({ label, value, sub, icon: Icon, color, prefix = '' }: {
  label: string; value: number | string; sub: string
  icon: React.ElementType; color: string; prefix?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="slide-up"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-secondary)',
        border: `0.5px solid ${hovered ? color + '55' : 'var(--border)'}`,
        borderRadius: 14, padding: 16,
        display: 'flex', flexDirection: 'column', gap: 8,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'border-color .2s, transform .2s',
        position: 'relative', overflow: 'hidden', cursor: 'default',
      }}
    >
      {/* corner glow */}
      <div style={{
        position: 'absolute', top: -24, right: -24,
        width: 80, height: 80, borderRadius: '50%',
        background: color + '18', pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.03em' }}>{label}</span>
        <div style={{ padding: 6, borderRadius: 9, background: color + '1a', color, display: 'flex' }}>
          <Icon size={13} />
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
          {sub.startsWith('↑') && <ArrowUpRight size={10} color="#00d084" />}
          {sub}
        </div>
      )}
    </div>
  )
}

/* ── PAGE ── */
export default function DashboardPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [greeting, setGreeting] = useState('নমস্কার')

  // 🔐 auth check
  useEffect(() => {
    async function checkUser() {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (!res.ok || !data.user) {
        router.push('/login')
        return
      }

      setUser(data.user)
      setIsLoaded(true)
    }

    checkUser()
  }, [router])

  if (!isLoaded) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        লগিন চেক করা হচ্ছে...
      </div>
    )
  }

  // সময়ভিত্তিক greeting
  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12)      setGreeting('সুপ্রভাত')
    else if (h < 17) setGreeting('নমস্কার')
    else             setGreeting('শুভ সন্ধ্যা')
  }, [])

  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
      <div style={{
        background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)',
        borderRadius: 8, padding: '8px 12px', fontSize: 11,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px 24px', maxWidth: 1400, margin: '0 auto' }}>

      {/* ⬇ নাভবার (লগআউট বাটন সহ) */}
      <div
        style={{
          background: 'var(--dark)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text)',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/bongflowailogo.png" alt="BongoFlow AI" style={{ height: 32, width: 'auto' }} />
          <span style={{ fontWeight: 700 }}>Dashboard</span>
        </div>
        <button
          type="button"
          style={{
            background: 'transparent',
            border: '0.5px solid var(--border)',
            color: 'var(--muted)',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 11,
          }}
          onClick={() => router.push('/login')}
        >
          Logout
        </button>
      </div>
      {/* ⬆ নাভ শেষ */

      }

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 className="bengali" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
          {greeting}, Raju da! 👋
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Today — 12 new leads · ₹4.2L pipeline · 23 auto‑replies sent
        </p>
      </div>

      {/* KPI Row 1 — 5 cols */}
      <div className="grid grid-cols-5 gap-3 mb-3">
        <StatCard label="Leads Today"    value={24}      sub="↑ 8 from yesterday"  icon={Users}        color="#4a90e2" />
        <StatCard label="🔥 Hot Leads"   value={7}       sub="≥80% score"          icon={Flame}        color="#00d084" />
        <StatCard label="🌡 Warm Leads"  value={11}      sub="40–79% score"        icon={Thermometer}  color="#f5a623" />
        <StatCard label="Pipeline Value" value={420000}  sub="This week"           icon={IndianRupee}  color="#9b72ff" prefix="₹" />
        <StatCard label="Time Saved"     value="4.2 hrs" sub="vs manual work"      icon={Clock}        color="#25d366" />
      </div>

      {/* KPI Row 2 — 4 cols */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Revenue MTD"     value={240000} sub="↑ 14% vs last month" icon={TrendingUp}    color="#00d084" prefix="₹" />
        <StatCard label="Calls Today"     value={8}      sub="3 AI agent calls"    icon={Phone}         color="#4a90e2" />
        <StatCard label="Pending UPI"     value={67500}  sub="4 payments"          icon={CreditCard}    color="#f5a623" prefix="₹" />
        <StatCard label="Unread Messages" value={7}      sub="2 hot leads"         icon={MessageSquare} color="#ff5c5c" />
      </div>

      {/* Charts + Leads — 3 cols */}
      <div className="grid grid-cols-3 gap-4">

        {/* Bar chart */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            Weekly Lead Distribution
          </div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
            {[['#00d084','Hot'],['#f5a623','Warm'],['#4a90e2','Cold']].map(([c,l]) => (
              <span key={l} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block' }} />{l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyData} barSize={8} barGap={2}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hot"  stackId="a" fill="#00d084" />
              <Bar dataKey="warm" stackId="a" fill="#f5a623" />
              <Bar dataKey="cold" stackId="a" fill="#4a90e2" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area chart */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            Monthly Revenue (₹)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#00d084' }}>₹2.40L</span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#00d084',
              background: 'rgba(0,208,132,0.12)', padding: '2px 8px',
              borderRadius: 100, display: 'flex', alignItems: 'center', gap: 2,
            }}>
              <ArrowUpRight size={10} /> 14%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00d084" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v: any) => `₹${(v / 1000).toFixed(0)}K`}
                contentStyle={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', borderRadius: 8, fontSize: 12 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#00d084" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Leads */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Leads</span>
            <a href="/inbox" style={{ fontSize: 11, color: '#00d084', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
              View all <ChevronRight size={12} />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentLeads.map((lead, i) => (
              <div
                key={i}
                className="card-inner"
                style={{ padding: '10px 12px', cursor: 'pointer', transition: 'border-color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                onMouseLeave={e => (e.currentTarget.style
