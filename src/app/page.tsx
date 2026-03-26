import Link from 'next/link'

export default function LandingPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="text-xl">🐯</span> BongoFlow AI
        </div>
        <div className="flex items-center gap-4">
          <Link href="#pricing" className="text-sm" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pricing</Link>
          <Link
            href="/dashboard"
            className="btn-wa text-sm"
            style={{ padding: '7px 18px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}
          >
            Start Free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: 'var(--green-dim)', color: 'var(--green)', border: '0.5px solid var(--green)' }}
        >
          🎉 Kolkata's first Bengali AI CRM
        </div>
        <h1 className="text-4xl font-bold mb-4 bengali leading-tight" style={{ color: 'var(--text-primary)' }}>
          Kolkata'r nijer AI CRM —<br />
          Voice note শুনে deal close করে!
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 2rem' }}>
          WhatsApp voice note বুঝে Bengali তে reply করে, lead score করে, UPI link পাঠায়, GST invoice বানায়।
          দিনে ৪-৫ ঘণ্টা বাঁচে।
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/dashboard"
            className="btn-wa"
            style={{ padding: '12px 28px', fontSize: 15, borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}
          >
            এখনই শুরু করুন — Free Trial →
          </Link>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Setup ৫ মিনিটে · No credit card</span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '🎤', title: 'Bengali Voice AI', desc: 'Voice note transcribe করে Bengali তে। Slang, dialect সব বোঝে।' },
            { icon: '🔥', title: 'Lead Scoring', desc: 'Hot/Warm/Cold আলাদা করে। কোন customer এখনই কিনবে জানায়।' },
            { icon: '💰', title: 'UPI + GST Invoice', desc: 'এক click এ payment link। Auto GST invoice WhatsApp এ।' },
            { icon: '📞', title: 'AI Voice Calling', desc: 'Bengali AI agent automatically follow-up call করে।' },
            { icon: '📵', title: 'Missed Call CRM', desc: 'Missed call এলে auto WhatsApp reply পাঠায়।' },
            { icon: '👥', title: 'Team Collaboration', desc: 'Staff দের আলাদা inbox, permission control।' },
          ].map(f => (
            <div key={f.title} className="card p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{f.title}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>Simple Pricing</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              name: 'Starter', price: '₹299', period: '/mo',
              features: ['100 messages/day', 'Basic lead scoring', 'WhatsApp inbox', '1 user'],
              cta: 'Start Free', highlight: false,
            },
            {
              name: 'Pro', price: '₹799', period: '/mo',
              features: ['Unlimited messages', 'Bengali Voice AI', 'AI auto-reply', 'UPI + GST invoice', 'AI calling agent', '3 users'],
              cta: 'Start Pro', highlight: true,
            },
            {
              name: 'Team', price: '₹1,999', period: '/mo',
              features: ['Everything in Pro', '15 users', 'Multi-branch', 'Priority support', 'Custom AI training'],
              cta: 'Contact Sales', highlight: false,
            },
          ].map(plan => (
            <div
              key={plan.name}
              className="card p-5"
              style={plan.highlight ? { border: '2px solid var(--wa-green)' } : {}}
            >
              {plan.highlight && (
                <div
                  className="text-xs font-bold px-2 py-1 rounded-full inline-block mb-3"
                  style={{ background: 'var(--green-dim)', color: 'var(--green)' }}
                >
                  Most Popular
                </div>
              )}
              <div className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold" style={{ color: plan.highlight ? 'var(--green)' : 'var(--text-primary)' }}>
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>
              <ul className="space-y-1.5 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--green)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={plan.highlight ? 'btn-wa' : 'btn-ghost'}
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '8px 16px', borderRadius: 8 }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          Invite 3 friends → 1 month free! 🎁 · All plans include WhatsApp + UPI + GST
        </p>
      </section>

      <footer className="text-center pb-8 text-xs" style={{ color: 'var(--text-muted)' }}>
        © 2026 BongoFlow AI · Made with ❤️ in Kolkata 🐯
      </footer>
    </main>
  )
}
