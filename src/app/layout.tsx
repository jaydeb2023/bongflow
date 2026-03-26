import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Noto_Sans_Bengali } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-bengali',
})

export const metadata: Metadata = {
  title: 'BongoFlow AI — Kolkata\'r nijer CRM',
  description: 'WhatsApp voice note শুনে Bengali তে lead score করে, UPI link পাঠায়, deal close করে। Kolkata\'r ছোট ব্যবসার জন্য।',
  keywords: ['CRM', 'Bengali', 'WhatsApp', 'Kolkata', 'AI', 'Lead Scoring', 'UPI', 'GST Invoice'],
  openGraph: {
    title: 'BongoFlow AI',
    description: 'Kolkata\'r nijer AI CRM — Voice note শুনে deal close করে!',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoBengali.variable}`}>
      <body className="bg-bg-primary text-white antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c2030',
              color: '#f0f2ff',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '13px',
            },
            success: { iconTheme: { primary: '#00d084', secondary: '#0d0f14' } },
            error: { iconTheme: { primary: '#ff5c5c', secondary: '#0d0f14' } },
          }}
        />
      </body>
    </html>
  )
}
