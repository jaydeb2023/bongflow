import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

// POST /api/upi/followup — Called by Vercel Cron every hour
export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()

  // Find all pending UPI transactions due for reminder
  const { data: pendingTxs } = await supabase
    .from('upi_transactions')
    .select('*, contacts(*), businesses(*)')
    .eq('status', 'sent')
    .eq('auto_followup_enabled', true)
    .lte('next_reminder_at', now.toISOString())
    .lt('reminder_count', 3) // Max 3 reminders

  if (!pendingTxs || pendingTxs.length === 0) {
    return NextResponse.json({ processed: 0 })
  }

  let processed = 0

  for (const tx of pendingTxs) {
    if (!tx.contacts?.whatsapp_number) continue

    const contactName = tx.contacts.name || 'Customer'
    const reminderCount = tx.reminder_count + 1

    // Different messages per reminder
    const messages = [
      // Reminder 1 — Friendly (24h later)
      `নমস্কার ${contactName} da/di! 🙏\n\nআপনার payment এখনও pending আছে।\n💰 Amount: ₹${tx.amount.toLocaleString('en-IN')}\n\nPayment করতে click করুন: ${tx.payment_link_url}\n\nকোনো সমস্যা হলে জানান! 😊`,
      // Reminder 2 — Gentle urgency (48h later)
      `${contactName} da/di, শুধু একটু মনে করিয়ে দিচ্ছি 😊\n\n₹${tx.amount.toLocaleString('en-IN')} payment এখনও বাকি আছে।\n\nLink: ${tx.payment_link_url}\n\nLink এর মেয়াদ শেষ হওয়ার আগেই complete করুন!`,
      // Reminder 3 — Final (72h later)
      `${contactName} da/di, এটি আপনার শেষ payment reminder।\n\n⚠️ Amount: ₹${tx.amount.toLocaleString('en-IN')}\nInvoice: ${tx.invoice_number}\n\nএখনই pay করুন: ${tx.payment_link_url}\n\nসমস্যা হলে আমাদের সাথে যোগাযোগ করুন। ধন্যবাদ!`,
    ]

    const message = messages[Math.min(reminderCount - 1, 2)]
    await sendWhatsAppMessage(tx.contacts.whatsapp_number, message)

    // Calculate next reminder time (24h intervals)
    const nextReminder = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    await supabase
      .from('upi_transactions')
      .update({
        reminder_count: reminderCount,
        last_reminder_at: now.toISOString(),
        next_reminder_at: reminderCount >= 3 ? null : nextReminder.toISOString(),
        auto_followup_enabled: reminderCount < 3,
      })
      .eq('id', tx.id)

    processed++
  }

  return NextResponse.json({ processed, timestamp: now.toISOString() })
}
