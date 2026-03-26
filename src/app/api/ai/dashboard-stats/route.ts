import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { DashboardStats } from '@/types'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)
  const businessId = searchParams.get('business_id')

  if (!businessId) return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

  // Run all queries in parallel
  const [
    { count: totalLeadsToday },
    { count: hotLeads },
    { count: warmLeads },
    { count: coldLeads },
    { data: pipelineData },
    { data: revenueData },
    { count: callsToday },
    { count: unreadMessages },
    { data: pendingUpi },
  ] = await Promise.all([
    supabase.from('contacts').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId)
      .gte('created_at', today.toISOString()),
    supabase.from('contacts').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId).eq('interest_level', 'hot'),
    supabase.from('contacts').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId).eq('interest_level', 'warm'),
    supabase.from('contacts').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId).eq('interest_level', 'cold'),
    supabase.from('deals').select('value')
      .eq('business_id', businessId).not('stage', 'in', '("won","lost")'),
    supabase.from('upi_transactions').select('amount')
      .eq('business_id', businessId).eq('status', 'paid')
      .gte('paid_at', monthStart.toISOString()),
    supabase.from('calls').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId).gte('created_at', today.toISOString()),
    supabase.from('messages').select('*', { count: 'exact', head: true })
      .eq('business_id', businessId).eq('is_read', false).eq('direction', 'inbound'),
    supabase.from('upi_transactions').select('amount')
      .eq('business_id', businessId).eq('status', 'sent'),
  ])

  const pipelineValue = (pipelineData || []).reduce((sum, d) => sum + (d.value || 0), 0)
  const revenueMTD = (revenueData || []).reduce((sum, d) => sum + (d.amount || 0), 0)
  const pendingAmount = (pendingUpi || []).reduce((sum, d) => sum + (d.amount || 0), 0)

  // Time saved: assume 5 min saved per auto-reply, 10 min per voice transcription
  const { count: autoReplies } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('ai_reply_sent', true)
    .gte('created_at', today.toISOString())

  const { count: voiceNotes } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('message_type', 'voice')
    .gte('created_at', today.toISOString())

  const timeSavedHours = (((autoReplies || 0) * 5) + ((voiceNotes || 0) * 10)) / 60

  // Conversion rate (won deals / total leads this month)
  const { count: totalLeadsMonth } = await supabase
    .from('contacts')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .gte('created_at', monthStart.toISOString())

  const { count: wonDeals } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', businessId)
    .eq('stage', 'won')
    .gte('created_at', monthStart.toISOString())

  const conversionRate = totalLeadsMonth
    ? Math.round(((wonDeals || 0) / totalLeadsMonth) * 100)
    : 0

  const stats: DashboardStats = {
    total_leads_today: totalLeadsToday || 0,
    hot_leads: hotLeads || 0,
    warm_leads: warmLeads || 0,
    cold_leads: coldLeads || 0,
    pipeline_value: pipelineValue,
    revenue_this_month: revenueMTD,
    calls_today: callsToday || 0,
    time_saved_hours: Math.round(timeSavedHours * 10) / 10,
    conversion_rate: conversionRate,
    pending_upi: pendingAmount,
    unread_messages: unreadMessages || 0,
  }

  return NextResponse.json(stats)
}
