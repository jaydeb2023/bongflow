"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: "#f8fafc",
        color: "#171717",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Navbar (mobile‑friendly) */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 bg-white border-b border-gray-200"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img
            src="/bongflowailogo.png"
            alt="BongoFlow AI Logo"
            style={{ height: 32, width: "auto" }}
          />
          <span
            className="text-lg font-bold"
            style={{ color: "#171717" }}
          >
            BongoFlow AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="#pricing"
            className="text-sm"
            style={{ color: "#737373", textDecoration: "none" }}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="btn-wa text-sm"
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              textDecoration: "none",
              display: "inline-block",
              fontWeight: 600,
              fontSize: "14px",
              background: "#10b981",
              color: "white",
            }}
          >
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero (mobile‑optimized) */}
      <section
        className="px-4 pt-16 pb-10 max-w-lg mx-auto text-center"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{
            background: "#ecfdf5",
            color: "#065f46",
            border: "0.5px solid #065f46",
          }}
        >
          🎉 Kolkata's first Bengali AI CRM
        </div>
        <h1
          className="text-3xl font-bold mb-4 leading-tight"
          style={{ color: "#171717" }}
        >
          Kolkata'r nijer AI CRM —<br />
          Voice note শুনে deal close করে!
        </h1>
        <p
          className="text-base mb-6"
          style={{
            color: "#525252",
          }}
        >
          WhatsApp voice note বুঝে Bengali তে reply করে, lead score করে, UPI
          link পাঠায়, GST invoice বানায়। দিনে ৪-৫ ঘণ্টা বাঁচে।
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Link
            href="/dashboard"
            className="btn-wa"
            style={{
              padding: "10px 24px",
              fontSize: 14,
              borderRadius: 10,
              textDecoration: "none",
              display: "inline-block",
              fontWeight: 600,
              background: "#10b981",
              color: "white",
            }}
          >
            এখনই শুরু করুন — Free Trial →
          </Link>
          <span
            className="text-xs"
            style={{ color: "#737373" }}
          >
            Setup ৫ মিনিটে · No credit card
          </span>
        </div>
      </section>

      {/* Features */}
      <section
        className="px-4 pb-12 max-w-lg mx-auto"
      >
        <h2
          className="text-xl font-bold mb-4 text-center"
          style={{ color: "#171717" }}
        >
          এই যেমন কাজ করে
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              icon: "🎤",
              title: "Bengali Voice AI",
              desc: "Voice note transcribe করে Bengali তে। Slang, dialect সব বোঝে।",
            },
            {
              icon: "🔥",
              title: "Lead Scoring",
              desc: "Hot/Warm/Cold আলাদা করে। কোন customer এখনই কিনবে জানায়।",
            },
            {
              icon: "💰",
              title: "UPI + GST Invoice",
              desc: "এক click এ payment link। Auto GST invoice WhatsApp এ।",
            },
            {
              icon: "📞",
              title: "AI Voice Calling",
              desc: "Bengali AI agent automatically follow‑up call করে।",
            },
            {
              icon: "📵",
              title: "Missed Call CRM",
              desc: "Missed call এলে auto WhatsApp reply পাঠায়।",
            },
            {
              icon: "👥",
              title: "Team Collaboration",
              desc: "Staff দের আলাদা inbox, permission control।",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-4 rounded-xl border border-gray-200"
              style={{
                background: "#ffffff",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="text-2xl"
                  style={{ color: "#10b981" }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#171717" }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "#525252", lineHeight: 1.5 }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing (mobile‑friendly grid) */}
      <section
        id="pricing"
        className="px-4 pb-16 max-w-lg mx-auto"
        style={{ marginTop: "1rem" }}
      >
        <h2
          className="text-xl font-bold text-center mb-4"
          style={{ color: "#171717" }}
        >
          Simple Pricing
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              name: "Starter",
              price: "₹299",
              period: "/mo",
              features: [
                "100 messages/day",
                "Basic lead scoring",
                "WhatsApp inbox",
                "1 user",
              ],
              cta: "Start Free",
              highlight: false,
            },
            {
              name: "Pro",
              price: "₹799",
              period: "/mo",
              features: [
                "Unlimited messages",
                "Bengali Voice AI",
                "AI auto‑reply",
                "UPI + GST invoice",
                "AI calling agent",
                "3 users",
              ],
              cta: "Start Pro",
              highlight: true,
            },
            {
              name: "Team",
              price: "₹1,999",
              period: "/mo",
              features: [
                "Everything in Pro",
                "15 users",
                "Multi‑branch",
                "Priority support",
                "Custom AI training",
              ],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className="p-4 rounded-xl border border-gray-200"
              style={{
                background: "#ffffff",
                border:
                  plan.highlight
                    ? "2px solid #10b981"
                    : "1px solid #e5e7eb",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {plan.highlight && (
                <div
                  className="text-xs font-bold px-2 py-1 rounded-full inline-block mb-2"
                  style={{
                    background: "#ecfdf5",
                    color: "#065f46",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="text-sm font-bold mb-1"
                style={{ color: "#171717" }}
              >
                {plan.name}
              </div>
              <div
                className="flex items-baseline gap-1 mb-4"
                style={{ color: plan.highlight ? "#10b981" : "inherit" }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: plan.highlight ? "#10b981" : "#171717",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "#737373" }}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="text-xs space-y-1 mb-4">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-1"
                    style={{ color: "#525252" }}
                  >
                    <span style={{ color: "#10b981" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={plan.highlight ? "btn-wa" : "btn-ghost"}
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  background: plan.highlight ? "#10b981" : "transparent",
                  color: plan.highlight ? "white" : "#171717",
                  border: plan.highlight
                    ? "none"
                    : "1px solid #e5e7eb",
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p
          className="text-xs text-center mt-4"
          style={{ color: "#737373" }}
        >
          Invite 3 friends → 1 month free! 🎁 · All plans include WhatsApp + UPI +
          GST
        </p>
      </section>

      {/* Footer */}
      <footer
        className="px-4 pb-6 text-center text-xs"
        style={{
          color: "#737373",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          background: "#ffffff",
        }}
      >
        © 2026 BongoFlow AI · Developed by Evynta 
      </footer>
    </main>
  );
}
