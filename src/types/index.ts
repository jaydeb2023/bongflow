// ============================================
// BongoFlow AI — TypeScript Types
// ============================================

export type InterestLevel = 'hot' | 'warm' | 'cold'
export type PipelineStage = 'new' | 'interested' | 'visit' | 'negotiation' | 'won' | 'lost'
export type SubscriptionPlan = 'starter' | 'pro' | 'team'
export type CallStatus = 'initiated' | 'ringing' | 'in_progress' | 'completed' | 'missed' | 'failed'
export type UpiStatus = 'pending' | 'sent' | 'paid' | 'expired' | 'failed'
export type MessageDirection = 'inbound' | 'outbound'
export type MessageType = 'text' | 'voice' | 'image' | 'document' | 'template'

export interface Business {
  id: string
  owner_name: string
  business_name: string
  phone: string
  email?: string
  business_type?: string
  gstin?: string
  city: string
  language_pref: 'bengali' | 'hindi' | 'english'
  subscription_plan: SubscriptionPlan
  subscription_status: 'trial' | 'active' | 'expired'
  subscription_expires_at?: string
  referral_code: string
  whatsapp_connected: boolean
  total_referrals: number
  free_months_earned: number
  onboarded: boolean
  created_at: string
}

export interface Contact {
  id: string
  business_id: string
  assigned_to?: string
  whatsapp_number: string
  name?: string
  business_name?: string
  email?: string
  city?: string
  tags: string[]
  lead_score: number
  interest_level: InterestLevel
  pipeline_stage: PipelineStage
  potential_value: number
  actual_value: number
  source: string
  notes?: string
  last_message_at?: string
  last_called_at?: string
  follow_up_at?: string
  total_messages: number
  total_voice_notes: number
  upi_pending_amount: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  business_id: string
  contact_id: string
  direction: MessageDirection
  message_type: MessageType
  raw_text?: string
  voice_transcript_bengali?: string
  voice_transcript_english?: string
  audio_url?: string
  audio_duration_secs?: number
  media_url?: string
  intent_category?: string
  ai_lead_score?: number
  ai_confidence?: number
  ai_reply_suggested?: string
  ai_reply_sent: boolean
  ai_next_action?: string
  whatsapp_message_id?: string
  is_read: boolean
  sent_by?: string
  created_at: string
}

export interface Deal {
  id: string
  business_id: string
  contact_id: string
  assigned_to?: string
  title: string
  stage: PipelineStage
  value: number
  probability: number
  expected_close_date?: string
  actual_close_date?: string
  lost_reason?: string
  notes?: string
  next_action?: string
  next_action_date?: string
  created_at: string
  updated_at: string
  contact?: Contact
}

export interface Call {
  id: string
  business_id: string
  contact_id?: string
  direction: 'inbound' | 'outbound'
  call_type: 'ai_agent' | 'manual' | 'missed'
  status: CallStatus
  from_number: string
  to_number: string
  duration_secs: number
  recording_url?: string
  transcript?: string
  transcript_bengali?: string
  ai_summary?: string
  ai_lead_score_after?: number
  twilio_call_sid?: string
  missed_call_auto_replied: boolean
  missed_call_reply_text?: string
  created_at: string
  ended_at?: string
  contact?: Contact
}

export interface UpiTransaction {
  id: string
  business_id: string
  contact_id?: string
  deal_id?: string
  razorpay_payment_link_id?: string
  razorpay_payment_id?: string
  amount: number
  description?: string
  payment_link_url?: string
  status: UpiStatus
  gst_rate: number
  gst_amount?: number
  invoice_number?: string
  invoice_url?: string
  reminder_count: number
  last_reminder_at?: string
  next_reminder_at?: string
  auto_followup_enabled: boolean
  paid_at?: string
  created_at: string
  contact?: Contact
}

export interface VoiceTemplate {
  id: string
  business_id: string
  created_by?: string
  name: string
  category: string
  text_bengali?: string
  text_english?: string
  audio_url?: string
  variables: string[]
  is_active: boolean
  usage_count: number
  whatsapp_template_id?: string
  created_at: string
}

export interface TeamMember {
  id: string
  business_id: string
  name: string
  phone: string
  email?: string
  role: 'owner' | 'manager' | 'agent'
  is_active: boolean
  permissions: {
    inbox: boolean
    pipeline: boolean
    reports: boolean
    settings: boolean
  }
  last_active_at?: string
  created_at: string
}

export interface WhatsappGroup {
  id: string
  business_id: string
  group_name: string
  group_id?: string
  member_count: number
  description?: string
  is_broadcast: boolean
  created_at: string
}

export interface Referral {
  id: string
  referrer_id: string
  referred_id: string
  referral_code: string
  status: 'pending' | 'signed_up' | 'subscribed' | 'rewarded'
  reward_given: boolean
  created_at: string
}

// AI Response Types
export interface AILeadAnalysis {
  lead_score: number
  interest_level: InterestLevel
  intent: string
  suggested_reply_bengali: string
  suggested_reply_english: string
  next_action: string
  potential_deal_value_estimate: number
  confidence: number
  language_detected: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface AICallSummary {
  summary_bengali: string
  summary_english: string
  lead_score_change: number
  key_points: string[]
  next_action: string
  follow_up_date?: string
}

// Dashboard Stats
export interface DashboardStats {
  total_leads_today: number
  hot_leads: number
  warm_leads: number
  cold_leads: number
  pipeline_value: number
  revenue_this_month: number
  calls_today: number
  time_saved_hours: number
  conversion_rate: number
  pending_upi: number
  unread_messages: number
}
