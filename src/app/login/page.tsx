// src/app/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      if (data.user) {
        router.push('/dashboard')
      }
    }
    checkAuth()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: 'var(--dark)', color: 'var(--text)' }}
    >
      <div
        className="card p-6 w-full max-w-sm"
        style={{ background: 'var(--dark2)', border: '1px solid var(--card-border)' }}
      >
        <h1
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          লগইন করুন
        </h1>

        {error && (
          <div
            className="text-xs mb-3 p-2 rounded"
            style={{ background: 'var(--red-900)', color: 'var(--text)' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-xs mb-1 block"
              style={{ color: 'var(--text-muted)' }}
            >
              ইমেইল
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full p-2 rounded bg-[var(--dark3)] border border-[var(--card-border)] text-[var(--text-primary)] text-sm"
            />
          </div>

          <div>
            <label
              className="text-xs mb-1 block"
              style={{ color: 'var(--text-muted)' }}
            >
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isSubmitting ? 'লগিন করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <div
          className="mt-4 text-xs text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          গেস্ট হিসেবে টেস্ট করতে চাইলে{' '}
          <span
            style={{ color: 'var(--green-400)', cursor: 'pointer' }}
            onClick={() => router.push('/dashboard')}
          >
            এখানে ক্লিক করুন
          </span>
        </div>
      </div>
    </div>
  )
}
