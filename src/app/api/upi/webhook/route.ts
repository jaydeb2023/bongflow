import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createAdminClient()

  // Verify Razorpay signature
  const isValid = verifyPaymentSignature({
    razorpay_payment_id: body.razorpay_payment_id,
    razorpay_payment_link_id: body.razorpay_payment_link_id,
    razorpay_payment_link_reference_id: body.razorpay_payment_link_reference_id,
    razorpay_payment_link_status: body.razorpay_payment_link_status,
    razorpay_signature: body.razorpay_signature,
  })

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (body.razorpay_payment_link_status !== 'paid') {
    return NextResponse.json({ status: 'not_paid' })
  }

  // Find transaction
  const { data: tx } = await supabase
    .from('upi_transactions')
    .select('*, contacts(*)')
    .eq('razorpay_payment_link_id', body.razorpay_payment_link_id)
    .single()

  if (!tx) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })

  // Mark as paid
  await supabase
    .from('upi_transactions')
    .update({
      status: 'paid',
      razorpay_payment_id: body.razorpay_payment_id,
      paid_at: new Date().toISOString(),
      auto_followup_enabled: false,
    })
    .eq('id', tx.id)

  // Update contact actual value
  if (tx.contact_id) {
    await supabase.rpc('increment_contact_value', {
      p_contact_id: tx.contact_id,
      p_amount: tx.amount,
    })
  }

  // Send payment confirmation via WhatsApp
  if (tx.contacts?.whatsapp_number) {
    const confirmMsg = `✅ Payment Received!\n\nধন্যবাদ ${tx.contacts.name || 'Customer'} da/di!\n\n💰 ₹${(tx.amount + (tx.gst_amount || 0)).toLocaleString('en-IN')} পাওয়া গেছে\n🧾 Invoice: ${tx.invoice_number}\n\nআপনার ব্যবসা সহজ করতে সাহায্য করতে পেরে আনন্দিত! 🙏\n\nPowered by BongoFlow AI`
    await sendWhatsAppMessage(tx.contacts.whatsapp_number, confirmMsg)
  }

  // Create notification
  await supabase.from('notifications').insert({
    business_id: tx.business_id,
    type: 'payment_received',
    title: '💰 Payment Received!',
    body: `₹${tx.amount.toLocaleString('en-IN')} from ${tx.contacts?.name || 'Customer'}`,
    data: { upi_transaction_id: tx.id, contact_id: tx.contact_id },
  })

  return NextResponse.json({ status: 'success' })
}

// GET — for Razorpay redirect callback
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const paymentLinkId = searchParams.get('razorpay_payment_link_id')
  const status = searchParams.get('razorpay_payment_link_status')

  if (status === 'paid') {
    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment-success?ref=${paymentLinkId}`)
  }
  return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment-pending`)
}
