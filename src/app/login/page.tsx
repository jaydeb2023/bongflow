// 📁 src/app/login/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [mobile, setMobile] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // ডামি চেক: লগইন করা user আছে কিনা
  useEffect(() => {
    async function checkUser() {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (data.user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

  function handleMobileSubmit(e: React.FormEvent) {
    e.preventDefault()

    // SMS OTP session ধরে রাখার জন্য ডামি লগিক ধরা হয়েছে
    // পরে Supabase দিয়ে প্রকৃত SMS OTP বা normal লগইন করবে
    if (mobile.length !== 10) {
      setError('মোবাইল নম্বর 10 সংখ্যা হতে হবে (ভারত)।')
      return
    }

    setIsSubmitting(true)
    setError('')

    // 💡 পরে: /api/otp/send বা /api/auth/me কল করবে
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: 'var(--dark)', color: 'var(--text)' }}
    >
      <div
        className="card p-6 w-full max-w-md mx-4"
        style={{
          background: 'var(--dark2)',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
        }}
      >
        {/* তোমার লোগো */}
        <div className="text-center mb-6">
          <img
            src="/bongflowailogo.png"
            alt="BongoFlow AI"
            style={{ height: 40, width: 'auto', margin: '0 auto' }}
          />
        </div>

        <h1
          className="text-xl font-bold mb-2 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          আপনার মোবাইল দিন
        </h1>

        <p
          className="text-xs text-center mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          আমরা আপনাকে OTP পাঠাব, ১০ সেকেন্ডে লগইন হয়ে যাবে।
        </p>

        {error && (
          <div
            className="text-xs mb-3 p-2 rounded text-center"
            style={{
              background: 'var(--red-900)',
              color: 'var(--text)',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleMobileSubmit} className="space-y-4">
          <div>
            <label
              className="text-xs mb-1 block"
              style={{ color: 'var(--text-muted)' }}
            >
              মোবাইল নম্বর (India: 10 অঙ্ক)
            </label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="9876543210"
              value={mobile}
              onChange={e => {
                const v = e.target.value
                if (/^\d{0,10}$/.test(v)) setMobile(v)
              }}
              disabled={isSubmitting}
              required
              className="w-full p-2 rounded bg-[var(--dark3)] border border-[var(--card-border)] text-[var(--text-primary)] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ background: 'var(--green-600)' }}
            className="w-full py-2 rounded font-semibold text-sm"
          >
            {isSubmitting ? 'যাচাই করা হচ্ছে...' : 'OTP পাঠান'}
          </button>
        </form>

        <div
          className="mt-4 text-xs text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          গেস্ট হিসেবে দেখতে চাইলে{' '}
          <span
            style={{
              color: 'var(--green-400)',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/dashboard')}
          >
            এখানে ক্লিক করুন
          </span>
        </div>
      </div>
    </div>
  )
}
