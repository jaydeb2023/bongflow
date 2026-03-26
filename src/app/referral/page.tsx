'use client'
import { useState } from 'react'
import { Gift, Copy, Share2, Users, Star, CheckCircle, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const referralList = [
  { name: 'Ramesh Saha', biz: 'Grocery, Tollygunge', status: 'subscribed', date: '12 Mar', reward: '✔ Counted' },
  { name: 'Nilufar Islam', biz: 'Salon, Gariahat', status: 'subscribed', date: '18 Mar', reward: '✔ Counted' },
  { name: 'Tapas Das', biz: 'Coaching, Behala', status: 'signed_up', date: '22 Mar', reward: '⏳ Pending subscription' },
]

const shareTemplates = [
  {
    label: 'WhatsApp message',
    text: `ভাই/দিদি! 🐯 BongoFlow AI use কর!\n\nWhatsApp voice note শুনে Bengali তে customer এর সাথে কথা বলে, lead score করে, UPI link পাঠায় — সব auto!\n\nKolkata'r ছোট ব্যবসার জন্য বানানো। আমি use করছি, দারুণ কাজ করছে!\n\n👇 এখানে signup কর (আমার referral code: RAJU2026):\nhttps://bongoflow.ai/signup?ref=RAJU2026\n\nStarter free তে try করতে পারিস!`,
    icon: '💬',
  },
  {
    label: 'Facebook post',
    text: `🐯 BongoFlow AI — Kolkata'r nijer AI CRM!\n\nWhatsApp voice note বুঝে Bengali তে reply করে। Lead score করে। UPI link পাঠায়। GST invoice বানায়।\n\nছোট ব্যবসার জন্য game changer! ₹799/mo এ সব features.\n\nhttps://bongoflow.ai/signup?ref=RAJU2026`,
    icon: '📘',
  },
]

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'RAJU2026'
  const referralLink = `https://bongoflow.ai/signup?ref=${referralCode}`
  const totalReferrals = 2
  const nextReward = 3 - (totalReferrals % 3)
  const freeMonths = Math.floor(totalReferrals / 3)

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    toast.success('Referral code copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Link copied!')
  }

  const shareTemplate = (text: string) => {
    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      toast.success('Message copied! Paste in WhatsApp.')
    }
  }

  return (
    <AppLayout>
      <div className="p-5 max-w-4xl">
        <div className="mb-5">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Viral Referral Engine</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Invite 3 friends → Get 1 month free. Repeat forever!
          </p>
        </div>

        {/* Progress card */}
        <div
          className="p-5 rounded-2xl mb-5"
          style={{ background: 'linear-gradient(135deg, rgba(0,208,132,0.1), rgba(155,114,255,0.1))', border: '0.5px solid var(--green)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                Progress to next free month
              </div>
              <div className="text-3xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
                {totalReferrals}/3 friends
              </div>
              <div className="text-sm mt-1" style={{ color: 'var(--green)' }}>
                {nextReward} more to unlock 1 free month!
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl">🎁</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{freeMonths} month{freeMonths !== 1 ? 's' : ''} earned</div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: 32, height: 32,
                    background: i <= totalReferrals ? 'var(--green)' : 'var(--bg-card)',
                    color: i <= totalReferrals ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  {i <= totalReferrals ? <CheckCircle size={14} /> : i}
                </div>
                {i < 3 && (
                  <div
                    className="flex-1 h-0.5 rounded"
                    style={{ background: i < totalReferrals ? 'var(--green)' : 'var(--bg-card)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Your code */}
          <div className="card p-4">
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Referral Code
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="text-2xl font-bold tracking-widest px-4 py-2 rounded-xl"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', letterSpacing: 4 }}
              >
                {referralCode}
              </div>
              <button
                className="p-2 rounded-lg"
                style={{ background: 'var(--bg-tertiary)', color: copied ? 'var(--green)' : 'var(--text-secondary)' }}
                onClick={copyCode}
              >
                <Copy size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg mb-3" style={{ background: 'var(--bg-tertiary)' }}>
              <span className="text-xs flex-1 truncate" style={{ color: 'var(--text-muted)' }}>{referralLink}</span>
              <button onClick={copyLink} style={{ color: 'var(--text-muted)' }}>
                <Copy size={12} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Total Invited', value: totalReferrals },
                { label: 'Subscribed', value: 2 },
                { label: 'Free Months', value: freeMonths },
              ].map(s => (
                <div key={s.label} className="p-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Who you referred */}
          <div className="card p-4">
            <div className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Who You Referred
            </div>
            <div className="space-y-2">
              {referralList.map((r, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  <div
                    className="text-xs font-bold rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 28, height: 28,
                      background: r.status === 'subscribed' ? 'var(--green-dim)' : 'var(--amber-dim)',
                      color: r.status === 'subscribed' ? 'var(--green)' : 'var(--amber)',
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{r.name}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{r.biz}</div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: r.status === 'subscribed' ? 'var(--green)' : 'var(--amber)' }}>
                    {r.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Share templates */}
        <div className="card p-4">
          <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            Ready-to-Share Messages
          </div>
          <div className="grid grid-cols-2 gap-3">
            {shareTemplates.map(t => (
              <div key={t.label} className="card-inner p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{t.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t.label}</span>
                </div>
                <div
                  className="text-xs p-2 rounded-lg mb-2 whitespace-pre-line"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.6, maxHeight: 100, overflow: 'hidden' }}
                >
                  {t.text.slice(0, 200)}...
                </div>
                <button
                  className="btn-wa w-full flex items-center justify-center gap-1.5 text-xs"
                  onClick={() => shareTemplate(t.text)}
                >
                  <Share2 size={11} /> Share Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
