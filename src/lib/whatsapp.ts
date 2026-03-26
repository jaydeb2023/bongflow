// ============================================
// WhatsApp Business API Integration (AiSensy/Wati)
// ============================================

const WA_API_URL = process.env.WHATSAPP_API_URL || 'https://backend.aisensy.com/campaign/t1/api'
const WA_API_KEY = process.env.WHATSAPP_API_KEY!

export interface WhatsAppMessage {
  to: string
  type: 'text' | 'template' | 'audio' | 'image' | 'document'
  text?: string
  templateName?: string
  templateParams?: string[]
  mediaUrl?: string
  caption?: string
}

// Send text message
export async function sendWhatsAppMessage(to: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`${WA_API_URL}/v2/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: WA_API_KEY,
        campaignName: 'bongoflow_direct',
        destination: to.replace('+', '').replace(/\s/g, ''),
        userName: 'BongoFlow AI',
        source: 'CRM',
        media: {},
        buttons: [],
        carouselCards: [],
        location: {},
        paramsFallbackValue: { FirstName: 'Customer' },
        templateParams: [text],
      }),
    })
    return res.ok
  } catch (e) {
    console.error('WhatsApp send failed:', e)
    return false
  }
}

// Send template message (approved WA templates)
export async function sendWhatsAppTemplate(params: {
  to: string
  templateName: string
  templateParams: string[]
  language?: string
}): Promise<boolean> {
  try {
    const res = await fetch(`${WA_API_URL}/v2/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: WA_API_KEY,
        campaignName: params.templateName,
        destination: params.to.replace('+', '').replace(/\s/g, ''),
        userName: 'BongoFlow AI',
        templateParams: params.templateParams,
        source: 'CRM',
      }),
    })
    return res.ok
  } catch (e) {
    console.error('WhatsApp template failed:', e)
    return false
  }
}

// Send audio/voice message
export async function sendWhatsAppVoice(to: string, audioUrl: string): Promise<boolean> {
  try {
    const res = await fetch(`${WA_API_URL}/v2/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: WA_API_KEY,
        campaignName: 'voice_reply',
        destination: to.replace('+', '').replace(/\s/g, ''),
        userName: 'BongoFlow AI',
        source: 'CRM',
        media: { url: audioUrl, filename: 'voice_reply.ogg' },
        type: 'audio',
      }),
    })
    return res.ok
  } catch (e) {
    console.error('WhatsApp voice send failed:', e)
    return false
  }
}

// Send UPI payment link via WhatsApp
export async function sendUpiLinkWhatsApp(params: {
  to: string
  contactName: string
  amount: number
  description: string
  paymentUrl: string
  invoiceNumber: string
}): Promise<boolean> {
  const message = `নমস্কার ${params.contactName} da/di! 🙏

আপনার payment link ready:
💰 Amount: ₹${params.amount.toLocaleString('en-IN')}
📋 For: ${params.description}
🧾 Invoice: ${params.invoiceNumber}

নিচের link এ click করুন:
${params.paymentUrl}

UPI/Card/NetBanking সব accept হয়।
Powered by BongoFlow AI 🤖`

  return sendWhatsAppMessage(params.to, message)
}

// Parse incoming WhatsApp webhook
export function parseWebhookMessage(body: any): {
  from: string
  messageId: string
  type: 'text' | 'voice' | 'image' | 'document' | 'other'
  text?: string
  audioUrl?: string
  mediaUrl?: string
  timestamp: string
} | null {
  try {
    // AiSensy webhook format
    if (body.type === 'message') {
      const msg = body.data
      return {
        from: msg.from || msg.phone,
        messageId: msg.id || msg.messageId,
        type: msg.type === 'audio' ? 'voice' : (msg.type || 'text'),
        text: msg.text?.body || msg.message,
        audioUrl: msg.audio?.url || msg.media?.url,
        mediaUrl: msg.media?.url,
        timestamp: msg.timestamp || new Date().toISOString(),
      }
    }

    // Meta Cloud API format
    const entry = body?.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const message = value?.messages?.[0]

    if (!message) return null

    return {
      from: message.from,
      messageId: message.id,
      type: message.type === 'audio' ? 'voice' : message.type,
      text: message.text?.body,
      audioUrl: message.audio?.id ? `https://graph.facebook.com/v18.0/${message.audio.id}` : undefined,
      mediaUrl: message.image?.id ? `https://graph.facebook.com/v18.0/${message.image.id}` : undefined,
      timestamp: new Date(parseInt(message.timestamp) * 1000).toISOString(),
    }
  } catch {
    return null
  }
}
