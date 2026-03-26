// ============================================
// Razorpay — UPI Links + GST Invoices
// ============================================

const Razorpay = require('razorpay')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export interface CreatePaymentLinkParams {
  amount: number  // in INR
  contactName: string
  contactPhone: string
  contactEmail?: string
  description: string
  invoiceNumber: string
  gstRate?: number  // default 18
  expiryMinutes?: number  // default 2880 = 48hrs
  notifyWhatsapp?: boolean
}

export interface PaymentLinkResult {
  id: string
  short_url: string
  amount: number
  gst_amount: number
  total_amount: number
  invoice_number: string
  expires_at: number
}

// Create Razorpay Payment Link with GST
export async function createUpiPaymentLink(params: CreatePaymentLinkParams): Promise<PaymentLinkResult> {
  const gstRate = params.gstRate ?? 18
  const baseAmount = params.amount
  const gstAmount = Math.round(baseAmount * gstRate / 100)
  const totalAmount = baseAmount + gstAmount
  const expirySeconds = (params.expiryMinutes ?? 2880) * 60
  const expiresAt = Math.floor(Date.now() / 1000) + expirySeconds

  const link = await razorpay.paymentLink.create({
    amount: totalAmount * 100,  // Razorpay expects paise
    currency: 'INR',
    accept_partial: false,
    description: `${params.description} | Invoice: ${params.invoiceNumber} | GST ${gstRate}%`,
    customer: {
      name: params.contactName,
      contact: params.contactPhone,
      ...(params.contactEmail && { email: params.contactEmail }),
    },
    notify: {
      sms: true,
      email: !!params.contactEmail,
      whatsapp: params.notifyWhatsapp ?? true,
    },
    reminder_enable: true,
    notes: {
      invoice_number: params.invoiceNumber,
      gst_rate: gstRate.toString(),
      gst_amount: gstAmount.toString(),
      base_amount: baseAmount.toString(),
      platform: 'BongoFlow AI',
    },
    expire_by: expiresAt,
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/upi/webhook`,
    callback_method: 'get',
  })

  return {
    id: link.id,
    short_url: link.short_url,
    amount: baseAmount,
    gst_amount: gstAmount,
    total_amount: totalAmount,
    invoice_number: params.invoiceNumber,
    expires_at: expiresAt,
  }
}

// Verify Razorpay payment webhook signature
export function verifyPaymentSignature(params: {
  razorpay_payment_id: string
  razorpay_payment_link_id: string
  razorpay_payment_link_reference_id: string
  razorpay_payment_link_status: string
  razorpay_signature: string
}): boolean {
  const crypto = require('crypto')
  const body = `${params.razorpay_payment_link_id}|${params.razorpay_payment_link_reference_id}|${params.razorpay_payment_link_status}|${params.razorpay_payment_id}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')
  return expectedSignature === params.razorpay_signature
}

// Generate GST Invoice HTML
export function generateInvoiceHTML(params: {
  invoiceNumber: string
  date: string
  businessName: string
  gstin?: string
  businessAddress?: string
  contactName: string
  contactPhone: string
  contactEmail?: string
  items: Array<{ description: string; quantity: number; rate: number; gstRate: number }>
  notes?: string
}): string {
  const subtotal = params.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const totalGst = params.items.reduce((sum, item) => sum + item.quantity * item.rate * item.gstRate / 100, 0)
  const total = subtotal + totalGst

  const itemRows = params.items.map(item => {
    const amount = item.quantity * item.rate
    const gst = amount * item.gstRate / 100
    return `
      <tr>
        <td>${item.description}</td>
        <td style="text-align:center">${item.quantity}</td>
        <td style="text-align:right">₹${item.rate.toLocaleString('en-IN')}</td>
        <td style="text-align:center">${item.gstRate}%</td>
        <td style="text-align:right">₹${gst.toLocaleString('en-IN')}</td>
        <td style="text-align:right">₹${(amount + gst).toLocaleString('en-IN')}</td>
      </tr>`
  }).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #1a1a1a; }
  .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #25d366; }
  .logo { font-size: 24px; font-weight: 700; color: #25d366; }
  .invoice-title { font-size: 28px; font-weight: 700; color: #0d0f14; }
  .invoice-meta { color: #666; font-size: 14px; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 20px 0; }
  .party h3 { font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th { background: #0d0f14; color: #fff; padding: 10px 12px; text-align: left; font-size: 13px; }
  td { padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
  .totals { margin-left: auto; width: 300px; }
  .total-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee; }
  .grand-total { font-size: 18px; font-weight: 700; color: #25d366; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center; }
  .gst-badge { background: #e8f5e9; color: #2e7d32; border-radius: 4px; padding: 2px 8px; font-size: 12px; font-weight: 600; }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="logo">🐯 BongoFlow AI</div>
    <div style="font-size:14px;color:#666;margin-top:4px;">${params.businessName}</div>
    ${params.gstin ? `<div class="gst-badge">GSTIN: ${params.gstin}</div>` : ''}
    ${params.businessAddress ? `<div style="font-size:13px;color:#666;margin-top:6px;">${params.businessAddress}</div>` : ''}
  </div>
  <div style="text-align:right">
    <div class="invoice-title">GST INVOICE</div>
    <div class="invoice-meta">#${params.invoiceNumber}</div>
    <div class="invoice-meta">Date: ${params.date}</div>
  </div>
</div>

<div class="parties">
  <div class="party">
    <h3>Bill To</h3>
    <div style="font-size:15px;font-weight:600;">${params.contactName}</div>
    <div style="color:#666;">${params.contactPhone}</div>
    ${params.contactEmail ? `<div style="color:#666;">${params.contactEmail}</div>` : ''}
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th style="text-align:center">Qty</th>
      <th style="text-align:right">Rate</th>
      <th style="text-align:center">GST%</th>
      <th style="text-align:right">GST Amt</th>
      <th style="text-align:right">Total</th>
    </tr>
  </thead>
  <tbody>${itemRows}</tbody>
</table>

<div class="totals">
  <div class="total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
  <div class="total-row"><span>GST</span><span>₹${totalGst.toLocaleString('en-IN')}</span></div>
  <div class="total-row grand-total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
</div>

${params.notes ? `<div style="margin-top:20px;padding:12px;background:#f9f9f9;border-radius:8px;font-size:13px;color:#666;"><strong>Notes:</strong> ${params.notes}</div>` : ''}

<div class="footer">
  Generated by BongoFlow AI · Kolkata'r nijer AI CRM · bongoflow.ai<br>
  This is a computer-generated invoice and does not require a physical signature.
</div>
</body>
</html>`
}
