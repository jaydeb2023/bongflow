import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { summarizeCall } from "@/lib/ai-engine";
import { transcribeVoiceBengali } from "@/lib/ai-engine";

// POST /api/calls/status-webhook — Twilio call status updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const params = Object.fromEntries(body.entries()) as Record<string, string>;

    const supabase = createAdminClient();
    const callSid = params.CallSid;
    const callStatus = params.CallStatus;
    const duration = parseInt(params.CallDuration || "0", 10);

    const statusMap: Record<string, string> = {
      initiated: "initiated",
      ringing: "ringing",
      "in-progress": "in_progress",
      completed: "completed",
      busy: "missed",
      "no-answer": "missed",
      failed: "failed",
      canceled: "failed",
    };

    const { error } = await supabase
      .from("calls")
      .update({
        status: statusMap[callStatus] || callStatus,
        duration_secs: duration,
        ended_at: ["completed", "busy", "no-answer", "failed"].includes(callStatus)
          ? new Date().toISOString()
          : null,
      })
      .eq("twilio_call_sid", callSid);

    if (error) {
      console.error("Error updating call status:", error);
      return NextResponse.json(
        { error: "Failed to update call status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "updated" });
  } catch (error) {
    console.error("Failed to handle call status webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
