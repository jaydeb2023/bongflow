'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, MessageSquare, GitBranch, BarChart2,
  Settings, Phone, PhoneMissed, CreditCard, Users,
  MessageCircle, Mic, Gift, ChevronLeft, ChevronRight,
  Bell, Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',       href: '/dashboard',         icon: LayoutDashboard },
  { label: 'WhatsApp Inbox',  href: '/inbox',             icon: MessageSquare, badge: true },
  { label: 'Pipeline',        href: '/pipeline',          icon: GitBranch },
  { section: 'AI Features' },
  { label: 'Voice Agent',     href: '/voice-agent',       icon: Phone },
  { label: 'Missed Calls',    href: '/missed-calls',      icon: PhoneMissed, badge: true },
  { label: 'UPI Follow-up',   href: '/upi-followup',      icon: CreditCard },
  { label: 'Voice Templates', href: '/voice-templates',   icon: Mic },
  { section: 'Analytics' },
  { label: 'WA Groups',       href: '/whatsapp-groups',   icon: MessageCircle },
  { label: 'Reports',         href: '/reports',           icon: BarChart2 },
  { section: 'Team & Growth' },
  { label: 'Team',            href: '/team',              icon: Users },
  { label: 'Referral',        href: '/referral',          icon: Gift },
  { label: 'Settings',        href: '/settings',          icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname     = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [notifications] = useState(3)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>

      {/* ── SIDEBAR ── */}
      <aside
        className="flex flex-col transition-all duration-200 shrink-0"
        style={{
          width: collapsed ? 56 : 210,
          background: 'var(--bg-secondary)',
          borderRight: '0.5px solid var(--border)',
        }}
      >
        {/* Logo area */}
        <div
          className="flex items-center gap-2 px-3 shrink-0"
          style={{ borderBottom: '0.5px solid var(--border)', height: 52, overflow: 'hidden' }}
        >
          {collapsed ? (
            /* collapsed: show small square logo icon */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/bongflowailogo.png"
              alt="BongoFlow AI"
              style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }}
            />
          ) : (
            /* expanded: full-width logo image */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/bongflowailogo.png"
              alt="BongoFlow AI"
              style={{ height: 32, width: 'auto', maxWidth: 140, objectFit: 'contain', flexShrink: 0 }}
            />
          )}

          {/* collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded"
            style={{ color: 'var(--text-muted)', flexShrink: 0 }}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item, i) => {
            if ('section' in item) {
              return collapsed ? (
                <div key={i} style={{ height: 1, background: 'var(--border)', margin: '6px 8px' }} />
              ) : (
                <div
                  key={i}
                  className="px-3 py-2 text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.7px', fontSize: 10 }}
                >
                  {item.section}
                </div>
              )
            }

            const Icon = item.icon!
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href!}
                className="flex items-center gap-2 mx-1 px-2 py-2 rounded-lg transition-all relative"
                style={{
                  color: isActive ? 'var(--wa-green)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(37,211,102,0.08)' : 'transparent',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                }}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r"
                    style={{ height: '60%', background: 'var(--wa-green)' }}
                  />
                )}
                <Icon size={15} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && (
                  <span
                    className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--red)', color: '#fff', fontSize: 9 }}
                  >
                    7
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* AI Saves pill */}
        {!collapsed && (
          <div className="p-3 shrink-0" style={{ borderTop: '0.5px solid var(--border)' }}>
            <div
              className="p-2.5 rounded-xl"
              style={{ background: 'var(--green-dim)', border: '0.5px solid var(--green)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={11} style={{ color: 'var(--green)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--green)' }}>
                  Today&apos;s AI saves
                </span>
              </div>
              <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>4.2 hrs</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>23 auto-replies sent</div>
            </div>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top bar */}
        <header
          className="flex items-center px-4 gap-3 shrink-0"
          style={{
            height: 52,
            background: 'var(--bg-secondary)',
            borderBottom: '0.5px solid var(--border)',
          }}
        >
          <div className="flex-1" />

          {/* Notifications */}
          <button className="relative p-1.5 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
            <Bell size={16} />
            {notifications > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 text-xs font-bold rounded-full flex items-center justify-center"
                style={{ background: 'var(--red)', color: '#fff', width: 14, height: 14, fontSize: 9 }}
              >
                {notifications}
              </span>
            )}
          </button>

          {/* Plan badge */}
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'var(--amber-dim)', color: 'var(--amber)', border: '0.5px solid var(--amber)' }}
          >
            Pro Plan
          </span>

          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: 30, height: 30,
              background: 'var(--purple-dim)',
              color: 'var(--purple)',
              border: '1.5px solid var(--purple)',
            }}
          >
            RS
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
