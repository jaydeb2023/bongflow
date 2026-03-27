// src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { TrendingUp, Users, Flame, Thermometer, Snowflake, Phone, Clock, CreditCard, MessageSquare, IndianRupee } from 'lucide-react'

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from '@/lib/charts'


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
    <div className="card p-4 slide-up" style={{ background: 'var(--dark3)', border: '1px solid var(--card-border)' }}>
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
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [greeting, setGreeting] = useState('নমস্কার')

  // Use this if you have a working /api/auth/me route
  useEffect(() => {
    async function checkUser() {
      // In your app, this will call your Supabase auth endpoint
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (!res.ok) {
        router.push('/login') // or /auth/login
        return
      }
      setUser(data.user)
    }
    checkUser().finally(() => setIsLoaded(true))
  }, [])

  if (!isLoaded) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        লগিন চেক করা হচ্ছে...
      </div>
    )
  }

  if (!user) {
    // This will normally not render because of redirect above
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        আপনি লগিন করেননি।{' '}
        <a
          href="/login"
          style={{ color: 'var(--green)', textDecoration: 'underline' }}
        >
          এখনই লগিন করুন
        </a>
      </div>
    )
  }

  // Time‑based greeting
  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('সুপ্রভাত')
    else if (h < 17) setGreeting('নমস্কার')
    else setGreeting('শুভ সন্ধ্যা')
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div
        className="card-inner p-2 text-xs"
        style={{
          background: 'var(--dark3)',
          border: '1px solid var(--card-border)',
          borderRadius: 8,
          minWidth: 100,
          color: 'var(--text-primary)',
        }}
      >
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
    <>
      {/* Navbar with logo */}
      <div
        style={{
          background: 'var(--dark)',
          borderBottom: '1px solid var(--card-border)',
          padding: '12px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--text)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/bongflowailogo.png"
            alt="BongoFlow AI"
            style={{ height: 32, width: 'auto' }}
          />
          <span style={{ fontWeight: 600 }}>Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>
            স্বাগতম, {user.name || 'User'}
          </span>
          <button
            type="button"
            style={{
              background: 'transparent',
              border: '1px solid var(--card-border)',
              color: 'var(--muted)',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
            }}
            onClick={() => router.push('/login')}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
        {/* Header */}
        <div className="mb-5">
          <h1
            className="text-xl font-bold bengali"
            style={{ color: 'var(--text-primary)' }}
          >
            {greeting}, Raju da! 👋
          </h1>
          <p
            className="text-sm mt-0.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Today — 12 new leads · ₹4.2L pipeline · 23 auto‑replies sent
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          <StatCard
            label="Leads Today"
            value={24}
            sub="↑ 8 from yesterday"
            icon={Users}
            color="var(--blue)"
          />
          <StatCard
            label="🔥 Hot Leads"
            value={7}
            sub="≥80% score"
            icon={Flame}
            color="var(--green)"
          />
          <StatCard
            label="🌡 Warm Leads"
            value={11}
            sub="40–79% score"
            icon={Thermometer}
            color="var(--amber)"
          />
          <StatCard
            label="Pipeline Value"
            value={420000}
            sub="This week"
            icon={IndianRupee}
            color="var(--purple)"
            prefix="₹"
          />
          <StatCard
            label="Time Saved"
            value="4.2 hrs"
            sub="vs manual work"
            icon={Clock}
            color="var(--wa-green)"
          />
        </div>

        {/* Second row stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <StatCard
            label="Revenue MTD"
            value={240000}
            sub="↑ 14% vs last month"
            icon={TrendingUp}
            color="var(--green)"
            prefix="₹"
          />
          <StatCard
            label="Calls Today"
            value={8}
            sub="3 AI agent calls"
            icon={Phone}
            color="var(--blue)"
          />
          <StatCard
            label="Pending UPI"
            value={67500}
            sub="4 payments"
            icon={CreditCard}
            color="var(--amber)"
            prefix="₹"
          />
          <StatCard
            label="Unread Messages"
            value={7}
            sub="2 hot leads"
            icon={MessageSquare}
            color="var(--red)"
          />
        </div>

        {/* Charts + Leads grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Lead Chart */}
          <div
            className="card p-4"
            style={{ background: 'var(--dark3)', border: '1px solid var(--card-border)' }}
          >
            <div
              className="text-sm font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Weekly Lead Distribution
            </div>
            <div
              className="flex gap-3 mb-3 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span style={{ color: 'var(--green)' }}>● Hot</span>
              <span style={{ color: 'var(--amber)' }}>● Warm</span>
              <span style={{ color: 'var(--blue)' }}>● Cold</span>
            </div>
            <div
              style={{
                marginTop: 4,
                height: 160,
                width: '100%',
              }}
            >
              <BarChart data={weeklyData} barSize={8} barGap={2}>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Bar
                  dataKey="hot"
                  stackId="a"
                  fill="var(--green)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="warm"
                  stackId="a"
                  fill="var(--amber)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="cold"
                  stackId="a"
                  fill="var(--blue)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </div>
          </div>

          {/* Revenue Chart */}
          <div
            className="card p-4"
            style={{ background: 'var(--dark3)', border: '1px solid var(--card-border)' }}
          >
            <div
              className="text-sm font-semibold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Monthly Revenue (₹)
            </div>
            <div
              className="text-2xl font-bold mb-3"
              style={{ color: 'var(--green)' }}
            >
              ₹2.40L
            </div>
            <div
              style={{
                marginTop: 4,
                height: 140,
                width: '100%',
              }}
            >
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d084" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--green)"
                  strokeWidth={2}
                  fill="url(#revGrad)"
                />
              </AreaChart>
            </div>
          </div>

          {/* Recent leads */}
          <div
            className="card p-4"
            style={{ background: 'var(--dark3)', border: '1px solid var(--card-border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Recent Leads
              </div>
              <a
                href="/inbox"
                className="text-xs"
                style={{ color: 'var(--green)', textDecoration: 'none' }}
              >
                View all →
              </a>
            </div>
            <div className="space-y-2">
              {recentLeads.map((lead, i) => (
                <div
                  key={i}
                  className="card-inner p-2.5 cursor-pointer"
                  style={{
                    background: 'var(--dark2)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 6,
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="text-xs font-semibold truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {lead.name}
                        </span>
                        <LeadBadge level={lead.level} />
                      </div>
                      <div
                        className="text-xs truncate"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {lead.biz}
                      </div>
                      <div
                        className="text-xs mt-1 truncate"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {lead.msg}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {lead.time}
                      </div>
                      {lead.value > 0 && (
                        <div
                          className="text-xs font-semibold mt-1"
                          style={{ color: 'var(--green)' }}
                        >
                          ₹{lead.value.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="mt-2">
                    <div
                      className="score-bar"
                      style={{
                        height: 6,
                        background: 'var(--dark2)',
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid var(--card-border)',
                      }}
                    >
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${lead.score}%`,
                          height: '100%',
                          background:
                            lead.level === 'hot'
                              ? 'var(--green)'
                              : lead.level === 'warm'
                                ? 'var(--amber)'
                                : 'var(--blue)',
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
    </>
  )
}
