"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #f0fdfa 0%, #f9fafb 100%)",
        color: "#171717",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
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

      {/* Creative Hero Banner / Demo Poster */}
      <section
        className="relative px-4 py-12 max-w-lg mx-auto text-center"
        style={{
          background: "linear-gradient(135deg, #ebf8f1 0%, #f9fafb 100%)",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          margin: "1.5rem 0 1.5rem",
        }}
      >
        {/* Subtle decorative shape in background */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            transform: "rotate(45deg)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            transform: "rotate(45deg)",
            zIndex: 0,
          }}
        />

        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
          style={{
            background: "#d1fae5",
            color: "#065f46",
            border: "0.5px solid #065f46",
            position: "relative",
            zIndex: 1,
          }}
        >
          🚀 শুধু ৫ মিনিটেই কাজ শুরু!
        </div>

        <h1
          className="text-2xl font-bold leading-tight mb-4"
          style={{ color: "#171717", position: "relative", zIndex: 1 }}
        >
          আপনার business‑কে বানানোর জন্য AI‑powered CRM —<br />
          voice note থেকে UPI পর্যন্ত.
        </h1>

        <p
          className="text-sm mb-6"
          style={{ color: "#525252", position: "relative", zIndex: 1 }}
        >
          আমাদের ডেমো‑য় ঢুকুন, দেখুন কীভাবে আপনার কথা শুনে AI নিজে থেকে WhatsApp‑এ reply করে,  
          UPI payment link পাঠায়, GST invoice বানায় আর সব deal ট্র্যাক করে।
        </p>

        <div className="flex flex-col gap-3 items-center">
          <Link
            href="/demo"
            className="btn-wa"
            style={{
              padding: "11px 22px",
              fontSize: 15,
              borderRadius: 10,
              textDecoration: "none",
              display: "inline-block",
              fontWeight: 600,
              background: "#10b981",
              color: "white",
              position: "relative",
              zIndex: 1,
            }}
          >
            ডেমো গ্রুপে ঢুকুন →
          </Link>
          <span
            className="text-xs"
            style={{ color: "#737373", position: "relative", zIndex: 1 }}
          >
            কোনো credit card নয় • শুধু WhatsApp‑এ join করুন
          </span>
        </div>
      </section>

      {/* Tiny feature‑teaser (just 3) */}
      <section
        className="px-4 max-w-lg mx-auto text-center"
      >
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: "📣", text: "Bengali voice notes" },
            { icon: "💳", text: "UPI + GST invoices" },
            { icon: "🤖", text: "AI auto‑replies" },
          ].map((item) => (
            <div
              key={item.text}
              className="text-xs flex flex-col items-center gap-1"
              style={{ color: "#525252" }}
            >
              <span
                style={{
                  color: "#10b981",
                  fontSize: 20,
                }}
              >
                {item.icon}
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        className="px-4 pb-10 max-w-lg mx-auto"
      >
        <h2
          className="text-xl font-bold text-center mb-4"
          style={{ color: "#171717" }}
        >
          আপনার business‑এর জন্য তৈরি হয়েছে
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              icon: "🎤",
              title: "Bengali Voice AI",
              desc: "WhatsApp voice note থেকে নিজে থেকে Bengali তে transcribe করে। Slang, dialect, কথার flow সব বোঝে।",
            },
            {
              icon: "🔥",
              title: "Lead Scoring",
              desc: "Hot/Warm/Cold আলাদা করে, কোন customer এখনই কিনবে তা আপনাকে বলে দেয়।",
            },
            {
              icon: "💰",
              title: "UPI + GST Invoice",
              desc: "এক click‑এ payment link তৈরি, আর auto‑generated GST invoice WhatsApp‑এ পাঠানো।",
            },
            {
              icon: "📞",
              title: "AI Voice Calling",
              desc: "Bengali AI voice‑calling agent নিজে থেকে follow‑up call করে, description‑এ রেকর্ড করে।",
            },
            {
              icon: "📵",
              title: "Missed Call CRM",
              desc: "Missed call এলে আপনার business‑এর নামে আটো WhatsApp reply পাঠায়, আর deal create করে।",
            },
            {
              icon: "👥",
              title: "Team Collaboration",
              desc: "Staff দের আলাদা inbox, permission control, একই ডাটা সবার কাছে।",
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

      {/* Pricing */}
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
                    background: "#d1fae5",
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
                  className="text-xl font-bold"
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

      {/* Creative Footer */}
      <footer
        className="px-4 pb-6 text-center text-xs"
        style={{
          color: "#737373",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "1rem",
          background: "#ffffff",
        }}
      >
        © 2026 BongoFlow AI · Made with ❤️ in Kolkata 🐯
      </footer>
    </main>
  );
}
