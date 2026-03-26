import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

// GET handler
export async function GET(req: Request) {
  const supabase = await createServerSupabaseClient();   // ← Await client first

  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get('business_id');

  if (!businessId) {
    return NextResponse.json({ error: 'Missing business_id' }, { status: 400 });
  }

  // Correct: One clean await + chain
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('referral_code, total_referrals, free_months_earned')
    .eq('id', businessId)
    .single();

  if (businessError) {
    console.error('Business error:', businessError);
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 });
  }

  const { data: referrals } = await supabase
    .from('referrals')
    .select('*, businesses!referred_id(business_name, owner_name, created_at)')
    .eq('referrer_id', businessId)
    .order('created_at', { ascending: false });

  const stats = {
    referral_code: business?.referral_code,
    referral_link: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${business?.referral_code || ''}`,
    total_referrals: business?.total_referrals || 0,
    free_months_earned: business?.free_months_earned || 0,
    referrals_to_next_reward: Math.max(0, 3 - ((business?.total_referrals || 0) % 3)),
    referral_list: referrals || [],
    share_message: `ভাই/দিদি! 🐯 BongoFlow AI use কর — WhatsApp voice note শুনে customer এর deal close করে দেয়!\n\nKolkata'r সব ছোট ব্যবসার জন্য বানানো। Bengali তে কথা বোঝে, UPI link পাঠায়, lead score করে!\n\n👇 এখানে signup কর (আমার referral কোড):
${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${business?.referral_code}\n\nPro plan ₹799/mo এ পাবি। Try করে দেখ!`,
  };

  return NextResponse.json(stats);
}

// POST handler
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();   // ← Same here

  const body = await req.json();
  const { referral_code, new_business_id } = body;

  if (!referral_code || !new_business_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data: referrer, error: referrerError } = await supabase
    .from('businesses')
    .select('id, owner_name, phone, total_referrals, free_months_earned')
    .eq('referral_code', referral_code.toUpperCase())
    .single();

  if (referrerError || !referrer) {
    return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
  }

  if (referrer.id === new_business_id) {
    return NextResponse.json({ error: 'Cannot refer yourself' }, { status: 400 });
  }

  const { error: insertError } = await supabase
    .from('referrals')
    .insert({
      referrer_id: referrer.id,
      referred_id: new_business_id,
      referral_code,
      status: 'signed_up',
    });

  if (insertError?.code === '23505') {
    return NextResponse.json({ error: 'Already referred' }, { status: 409 });
  }

  if (insertError) {
    return NextResponse.json({ error: 'Failed to create referral' }, { status: 500 });
  }

  const newTotal = (referrer.total_referrals || 0) + 1;
  const freeMonths = Math.floor(newTotal / 3);

  await supabase
    .from('businesses')
    .update({ total_referrals: newTotal, free_months_earned: freeMonths })
    .eq('id', referrer.id);

  await supabase
    .from('businesses')
    .update({ referred_by: referrer.id })
    .eq('id', new_business_id);

  if (newTotal % 3 === 0 && referrer.phone) {
    await supabase
      .from('businesses')
      .update({
        subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('id', referrer.id);

    await sendWhatsAppMessage(
      referrer.phone,
      `🎉 অভিনন্দন! ${referrer.owner_name} da/di!\n\n${newTotal} জন বন্ধুকে BongoFlow AI তে আনার জন্য আপনি 1 মাস FREE পেলেন! 🥳`
    );
  } else if (referrer.phone) {
    const remaining = 3 - (newTotal % 3);
    await sendWhatsAppMessage(
      referrer.phone,
      `✅ Referral কাজ করেছে! ${remaining} জন আরও invite করলে 1 মাস FREE পাবেন! Code: ${referral_code}`
    );
  }

  return NextResponse.json({
    success: true,
    referrer_name: referrer.owner_name,
    reward_applied: newTotal % 3 === 0,
  });
}
