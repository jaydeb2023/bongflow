import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { createServerClient } from "@supabase/ssr";
import { createUpiPaymentLink } from "@/lib/razorpay";
import { sendUpiLinkWhatsApp, sendWhatsAppMessage } from "@/lib/whatsapp";
import { createServerClient } from "@supabase/ssr";
// POST /api/upi/create — Create payment link + send via WhatsApp
export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await req.json();

    const {
      contact_id,
      deal_id,
      amount,
      description,
      gst_rate = 18,
      send_via_whatsapp = true,
      auto_followup = true,
    } = body;

    // Get contact details
    const { data: contact, error: contactError } = await supabase
      .from("contacts")
      .select("*, businesses(*)")
      .eq("id", contact_id)
      .single();

    if (contactError || !contact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    // Create Razorpay payment link
    const paymentLink = await createUpiPaymentLink({
      amount,
      contactName: contact.name || "Customer",
      contactPhone: contact.whatsapp_number,
      contactEmail: contact.email,
      description,
      invoiceNumber: `INV-${Date.now()}`,
      gstRate: gst_rate,
      notifyWhatsapp: false,
    });

    // Save to DB
    const { data: upiTx, error: txError } = await supabase
      .from("upi_transactions")
      .insert({
        business_id: contact.business_id,
        contact_id,
        deal_id,
        razorpay_payment_link_id: paymentLink.id,
        amount,
        gst_rate,
        gst_amount: paymentLink.gst_amount,
        payment_link_url: paymentLink.short_url,
        status: "pending",
        description,
        auto_followup_enabled: auto_followup,
        next_reminder_at:
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single();

    if (txError) {
      console.error("Error saving UPI transaction:", txError);
      return NextResponse.json(
        { error: "Failed to save transaction" },
        { status: 500 }
      );
    }

    // Send via WhatsApp
    if (send_via_whatsapp) {
      await sendUpiLinkWhatsApp({
        to: contact.whatsapp_number,
        contactName: contact.name || "Customer",
        amount: paymentLink.total_amount,
        description,
        paymentUrl: paymentLink.short_url,
        invoiceNumber: upiTx?.invoice_number || paymentLink.invoice_number,
      });

      const { error: updateError } = await supabase
        .from("upi_transactions")
        .update({ status: "sent" })
        .eq("id", upiTx?.id);

      if (updateError) {
        console.error("Error updating UPI transaction status:", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      payment_link_url: paymentLink.short_url,
      total_amount: paymentLink.total_amount,
      invoice_number: upiTx?.invoice_number,
      upi_transaction_id: upiTx?.id,
    });
  } catch (error) {
    console.error("Error in /api/upi/create:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
