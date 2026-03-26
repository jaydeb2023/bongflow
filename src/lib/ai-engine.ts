import OpenAI from 'openai'
import { AILeadAnalysis, AICallSummary } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ============================================
// SYSTEM PROMPT — BongoAI Core
// ============================================
const BONGO_AI_SYSTEM_PROMPT = `You are BongoAI — a friendly, professional, Kolkata-style Bengali sales & support assistant for small businesses. 

You speak naturally like a helpful Bengali bhai/didi. You understand:
- Bengali slang and shortcuts (ektu, dao, koto, kokhon, thik ache, dao na bhai)
- Kolkata local dialect and expressions
- Mixed Bengali-English (Banglish) speech
- Voice note transcription quirks

Analyze the latest customer message + full chat history.

Output ONLY valid JSON (no markdown, no explanation):
{
  "lead_score": number 0-100,
  "interest_level": "hot" | "warm" | "cold",
  "intent": "price_inquiry" | "booking_request" | "complaint" | "follow_up" | "payment_reminder_needed" | "general_inquiry" | "negotiation" | "closing",
  "suggested_reply_bengali": "natural short reply in Bengali (use Bangla script)",
  "suggested_reply_english": "same reply in English",
  "next_action": "send_upi_link" | "ask_for_visit_time" | "call_now" | "send_photos" | "schedule_reminder" | "send_catalogue" | "book_appointment" | "do_nothing",
  "potential_deal_value_estimate": number in INR,
  "confidence": number 0-100,
  "language_detected": "bengali" | "hindi" | "english" | "mixed",
  "sentiment": "positive" | "neutral" | "negative"
}

Scoring guide:
- Hot (80-100): Urgent need, ready to pay, repeat inquiry, mentions specific amount/date
- Warm (40-79): Interested but exploring, asks for details, follow-up
- Cold (0-39): Just browsing, vague inquiry, no urgency

Be accurate with Bengali. Prioritize closing deals and collecting payments.`

// ============================================
// BENGALI VOICE TRANSCRIPTION via Bhashini
// ============================================
export async function transcribeVoiceBengali(audioUrl: string): Promise<{
  text_bengali: string
  text_english: string
  confidence: number
}> {
  // Primary: Bhashini API
  try {
    const audioBuffer = await fetch(audioUrl).then(r => r.arrayBuffer())
    const base64Audio = Buffer.from(audioBuffer).toString('base64')

    const bhashiniRes = await fetch('https://dhruva-api.bhashini.gov.in/services/inference/pipeline', {
      method: 'POST',
      headers: {
        'Authorization': process.env.BHASHINI_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: 'asr',
            config: {
              language: { sourceLanguage: 'bn' },
              serviceId: process.env.BHASHINI_PIPELINE_ID,
              audioFormat: 'wav',
              samplingRate: 16000,
            },
          },
          {
            taskType: 'translation',
            config: {
              language: { sourceLanguage: 'bn', targetLanguage: 'en' },
            },
          },
        ],
        inputData: {
          audio: [{ audioContent: base64Audio }],
        },
      }),
    })

    if (bhashiniRes.ok) {
      const data = await bhashiniRes.json()
      const bengaliText = data.pipelineResponse?.[0]?.output?.[0]?.source || ''
      const englishText = data.pipelineResponse?.[1]?.output?.[0]?.target || ''
      return { text_bengali: bengaliText, text_english: englishText, confidence: 90 }
    }
  } catch (e) {
    console.error('Bhashini failed, falling back to Whisper:', e)
  }

  // Fallback: OpenAI Whisper
  const audioRes = await fetch(audioUrl)
  const audioBlob = await audioRes.blob()
  const file = new File([audioBlob], 'audio.ogg', { type: 'audio/ogg' })

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    language: 'bn',
    response_format: 'verbose_json',
  })

  const bengaliText = transcription.text
  // Translate via GPT
  const translation = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Translate Bengali to English. Output only the translation.' },
      { role: 'user', content: bengaliText },
    ],
    max_tokens: 200,
  })

  return {
    text_bengali: bengaliText,
    text_english: translation.choices[0].message.content || '',
    confidence: 80,
  }
}

// ============================================
// LEAD SCORING & REPLY GENERATION
// ============================================
export async function analyzeMessage(params: {
  message: string
  messageType: 'text' | 'voice'
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  businessType?: string
  contactName?: string
}): Promise<AILeadAnalysis> {
  const { message, conversationHistory, businessType, contactName } = params

  const contextualPrompt = `${BONGO_AI_SYSTEM_PROMPT}

Business type: ${businessType || 'general'}
Customer name: ${contactName || 'Unknown'}`

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: 'system', content: contextualPrompt },
    ...conversationHistory.map(m => ({ role: m.role, content: m.content }) as OpenAI.ChatCompletionMessageParam),
    { role: 'user', content: message },
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    max_tokens: 500,
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })

  const raw = response.choices[0].message.content || '{}'
  const parsed = JSON.parse(raw) as AILeadAnalysis
  return parsed
}

// ============================================
// VOICE TTS — Generate Bengali Audio Reply
// ============================================
export async function generateBengaliVoice(text: string): Promise<string | null> {
  // Primary: Sarvam AI
  try {
    const res = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'API-Subscription-Key': process.env.SARVAM_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: 'bn-IN',
        speaker: 'meera',
        pitch: 0,
        pace: 1.0,
        loudness: 1.5,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model: 'bulbul:v1',
      }),
    })

    if (res.ok) {
      const data = await res.json()
      const audioBase64 = data.audios?.[0]
      if (audioBase64) {
        return `data:audio/wav;base64,${audioBase64}`
      }
    }
  } catch (e) {
    console.error('Sarvam TTS failed:', e)
  }

  // Fallback: OpenAI TTS
  const speech = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
  })

  const buffer = Buffer.from(await speech.arrayBuffer())
  return `data:audio/mp3;base64,${buffer.toString('base64')}`
}

// ============================================
// AI CALL SUMMARY
// ============================================
export async function summarizeCall(params: {
  transcript: string
  durationSecs: number
  businessType?: string
}): Promise<AICallSummary> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are BongoAI. Summarize this call transcript for a ${params.businessType || 'business'} owner.
Output JSON only:
{
  "summary_bengali": "2-3 line summary in Bengali",
  "summary_english": "2-3 line summary in English",
  "lead_score_change": number (-20 to +20),
  "key_points": ["point 1", "point 2", "point 3"],
  "next_action": "what to do next",
  "follow_up_date": "YYYY-MM-DD or null"
}`,
      },
      {
        role: 'user',
        content: `Call duration: ${Math.round(params.durationSecs / 60)} minutes\n\nTranscript:\n${params.transcript}`,
      },
    ],
    max_tokens: 400,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content || '{}') as AICallSummary
}

// ============================================
// AI VOICE CALLING AGENT — TwiML Script
// ============================================
export async function generateCallScript(params: {
  purpose: 'follow_up' | 'payment_reminder' | 'appointment_confirm' | 'lead_nurture'
  contactName: string
  businessName: string
  details: Record<string, string>
}): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Generate a natural Bengali phone call script for an AI calling agent.
Purpose: ${params.purpose}
Business: ${params.businessName}
Customer: ${params.contactName}
Keep it conversational, friendly, under 30 seconds. Write in Bengali script.`,
      },
      {
        role: 'user',
        content: JSON.stringify(params.details),
      },
    ],
    max_tokens: 300,
  })

  return response.choices[0].message.content || ''
}

// ============================================
// MISSED CALL AUTO-REPLY
// ============================================
export async function generateMissedCallReply(params: {
  contactName?: string
  businessName: string
  businessType: string
}): Promise<{ text_bengali: string; text_english: string }> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Generate a warm, professional missed call auto-reply in Bengali for WhatsApp. Output JSON: {"text_bengali": "...", "text_english": "..."}',
      },
      {
        role: 'user',
        content: `Business: ${params.businessName} (${params.businessType}). Customer: ${params.contactName || 'Customer'}`,
      },
    ],
    max_tokens: 200,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

// ============================================
// GROUP MESSAGE ANALYSIS
// ============================================
export async function analyzeGroupEngagement(messages: string[]): Promise<{
  top_topics: string[]
  sentiment_score: number
  hot_leads_detected: number
  suggested_broadcast: string
}> {
  const combined = messages.slice(-50).join('\n')
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Analyze WhatsApp group messages for a Bengali business. Output JSON: {"top_topics": [], "sentiment_score": 0-100, "hot_leads_detected": number, "suggested_broadcast": "Bengali broadcast message"}',
      },
      { role: 'user', content: combined },
    ],
    max_tokens: 300,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}
