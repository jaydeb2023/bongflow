"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');

        :root {
          --green: #00e599;
          --purple: #9f7aea;
          --dark: #080d14;
          --dark2: #0d1520;
          --dark3: #111c2b;
          --card: rgba(255,255,255,0.04);
          --card-border: rgba(255,255,255,0.08);
          --text: #f0f6ff;
          --muted: #7a8fa6;
          --font-display: 'Syne', sans-serif;
          --font-body: 'Hind Siliguri', sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .bf-root {
          background: var(--dark); color: var(--text);
          font-family: var(--font-body); overflow-x: hidden;
          line-height: 1.6; min-height: 100vh; position: relative;
        }
        .bf-root::before {
          content: ''; position: fixed; inset: 0; z-index: 0;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% -10%, rgba(0,229,153,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 30%, rgba(159,122,234,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        /* NAV */
        .bf-nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 5%;
          background: rgba(8,13,20,0.92); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--card-border);
        }
        .bf-nav-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
        .bf-nav-logo img { height: 42px; width: auto; display: block; object-fit: contain; }
        .bf-nav-links { display: flex; align-items: center; gap: 20px; }
        .bf-nav-link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; white-space: nowrap; }
        .bf-nav-link:hover { color: var(--text); }
        .bf-btn-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 100px;
          background: var(--green); color: #080d14;
          font-weight: 700; font-size: 13px; font-family: var(--font-display);
          text-decoration: none; border: none; cursor: pointer;
          transition: transform .2s, box-shadow .2s;
          box-shadow: 0 0 20px rgba(0,229,153,0.35); white-space: nowrap;
        }
        .bf-btn-pill:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,229,153,0.5); }

        /* Mobile hamburger */
        .bf-hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 4px; background: none; border: none;
        }
        .bf-hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }
        .bf-mobile-menu {
          display: none; flex-direction: column; gap: 0;
          position: fixed; top: 63px; left: 0; right: 0;
          background: rgba(8,13,20,0.98); border-bottom: 1px solid var(--card-border);
          backdrop-filter: blur(20px); z-index: 99;
        }
        .bf-mobile-menu.open { display: flex; }
        .bf-mobile-menu a {
          padding: 15px 5%; color: var(--muted); text-decoration: none;
          font-size: 15px; border-bottom: 1px solid var(--card-border); transition: color .2s;
        }
        .bf-mobile-menu a:hover { color: var(--text); }
        .bf-mobile-menu .bf-btn-pill { margin: 14px 5%; border-radius: 10px; justify-content: center; }

        /* HERO */
        .bf-hero {
          position: relative; z-index: 1;
          padding: 80px 5% 60px; text-align: center;
          max-width: 860px; margin: 0 auto;
        }
        .bf-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 16px; border-radius: 100px;
          background: rgba(0,229,153,0.1); border: 1px solid rgba(0,229,153,0.3);
          font-size: 12px; font-weight: 600; color: var(--green);
          margin-bottom: 28px; letter-spacing: 0.04em;
        }
        .bf-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 3.8rem);
          font-weight: 800; line-height: 1.12; letter-spacing: -0.02em;
          color: var(--text); margin-bottom: 20px;
        }
        .bf-hero h1 .accent { color: var(--green); }
        .bf-hero h1 .accent2 { color: var(--purple); }
        .bf-hero p { font-size: 15px; color: var(--muted); max-width: 540px; margin: 0 auto 32px; line-height: 1.7; }
        .bf-hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
        .bf-btn-pill-lg {
          padding: 13px 28px; font-size: 15px; border-radius: 100px;
          background: var(--green); color: #080d14; font-weight: 700; font-family: var(--font-display);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 0 32px rgba(0,229,153,0.4); transition: transform .2s, box-shadow .2s;
        }
        .bf-btn-pill-lg:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(0,229,153,0.55); }
        .bf-btn-ghost-lg {
          padding: 13px 28px; font-size: 15px; border-radius: 100px;
          background: transparent; color: var(--text); font-weight: 600; font-family: var(--font-display);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--card-border); transition: border-color .2s, color .2s;
        }
        .bf-btn-ghost-lg:hover { border-color: var(--green); color: var(--green); }

        /* STATS */
        .bf-stats-bar {
          position: relative; z-index: 1;
          display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;
          padding: 0 5% 70px;
        }
        .bf-stat-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 100px;
          background: var(--card); border: 1px solid var(--card-border);
          font-size: 13px; color: var(--muted); backdrop-filter: blur(8px);
        }
        .bf-stat-chip strong { color: var(--text); font-family: var(--font-display); }
        .bf-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); display: inline-block; flex-shrink: 0; }
        .bf-dot-p { background: var(--purple); }
        .bf-dot-o { background: #fbbf24; }

        /* SECTION LABEL */
        .bf-section-label { text-align: center; margin-bottom: 48px; }
        .bf-section-label h2 {
          font-family: var(--font-display); font-size: clamp(1.5rem, 4vw, 2.3rem);
          font-weight: 800; letter-spacing: -0.02em; color: var(--text); margin-bottom: 10px;
        }
        .bf-section-label p { color: var(--muted); font-size: 14px; }

        /* DEMO */
        .bf-demo-section { position: relative; z-index: 1; padding: 0 5% 90px; max-width: 1100px; margin: 0 auto; }
        .bf-demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        .bf-demo-card {
          border-radius: 18px; border: 1px solid var(--card-border);
          overflow: hidden; background: var(--dark3);
          transition: transform .3s, box-shadow .3s;
        }
        .bf-demo-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .bf-demo-card-header { padding: 12px 14px 0; display: flex; align-items: center; gap: 8px; }
        .bf-traffic { display: flex; gap: 5px; }
        .bf-traffic span { width: 9px; height: 9px; border-radius: 50%; display: block; }
        .bf-t-r{background:#ff5f57;} .bf-t-y{background:#febc2e;} .bf-t-g{background:#28c840;}
        .bf-card-title { font-size: 10px; color: var(--muted); font-family: var(--font-display); letter-spacing: 0.06em; text-transform: uppercase; }

        .bf-fake-dash { padding: 14px; font-size: 11px; }
        .bf-dash-greeting { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
        .bf-dash-sub { color: var(--muted); font-size: 9px; margin-bottom: 12px; }
        .bf-kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; margin-bottom: 12px; }
        .bf-kpi-card { background: rgba(255,255,255,0.05); border-radius: 9px; padding: 9px 7px; border: 1px solid var(--card-border); }
        .bf-kpi-label { color: var(--muted); font-size: 8px; margin-bottom: 3px; }
        .bf-kpi-value { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--text); }
        .bf-kpi-value.green { color: var(--green); }
        .bf-kpi-badge { font-size: 7px; color: var(--green); margin-top: 2px; }
        .bf-fake-chart { display: flex; align-items: flex-end; gap: 4px; height: 55px; padding: 6px 0; }
        .bf-bar { border-radius: 3px 3px 0 0; width: 100%; }
        .bf-fake-leads { display: flex; flex-direction: column; gap: 5px; }
        .bf-fake-lead { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.03); border-radius: 7px; padding: 7px 9px; border: 1px solid var(--card-border); }
        .bf-lead-av { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; }
        .bf-la-g{background:rgba(0,229,153,0.2);color:var(--green);}
        .bf-la-p{background:rgba(159,122,234,0.2);color:var(--purple);}
        .bf-la-o{background:rgba(251,191,36,0.2);color:#fbbf24;}
        .bf-lead-info { flex: 1; min-width: 0; }
        .bf-lead-name { font-size: 9px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bf-lead-sub { font-size: 8px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bf-lead-tag { font-size: 7px; font-weight: 700; padding: 2px 6px; border-radius: 100px; flex-shrink: 0; }
        .bf-hot{background:rgba(0,229,153,0.15);color:var(--green);}
        .bf-warm{background:rgba(251,191,36,0.15);color:#fbbf24;}
        .bf-lead-amt { font-size: 9px; font-weight: 700; color: var(--text); font-family: var(--font-display); flex-shrink: 0; }

        .bf-fake-wa { padding: 12px; }
        .bf-wa-header { display: flex; align-items: center; gap: 7px; padding-bottom: 9px; border-bottom: 1px solid var(--card-border); margin-bottom: 9px; }
        .bf-wa-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .bf-wa-title { font-size: 10px; font-weight: 700; font-family: var(--font-display); color: var(--text); }
        .bf-wa-badge { margin-left: auto; background: var(--green); color: #080d14; font-size: 8px; font-weight: 700; border-radius: 100px; padding: 1px 6px; }
        .bf-wa-msgs { display: flex; flex-direction: column; gap: 7px; }
        .bf-wa-msg { display: flex; gap: 7px; align-items: flex-start; }
        .bf-wa-msg-av { width: 24px; height: 24px; border-radius: 50%; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bf-wa-body { background: rgba(255,255,255,0.05); border-radius: 0 7px 7px 7px; padding: 6px 9px; flex: 1; }
        .bf-wa-name { font-size: 8px; font-weight: 700; color: var(--green); margin-bottom: 2px; }
        .bf-wa-text { font-size: 9px; color: var(--muted); line-height: 1.4; }
        .bf-wa-ai { background: rgba(0,229,153,0.08); border: 1px solid rgba(0,229,153,0.2); border-radius: 7px 7px 0 7px; padding: 6px 9px; margin-left: 31px; }
        .bf-wa-ai-label { font-size: 7px; color: var(--green); font-weight: 700; margin-bottom: 2px; }
        .bf-wa-ai-text { font-size: 9px; color: var(--text); line-height: 1.4; }

        .bf-demo-full {
          grid-column: 1 / -1; border-radius: 18px;
          border: 1px solid rgba(0,229,153,0.2);
          background: linear-gradient(135deg, rgba(0,229,153,0.05) 0%, var(--dark3) 60%);
          padding: 26px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
        }
        .bf-demo-full-text { flex: 1; min-width: 200px; }
        .bf-demo-full-text h3 { font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
        .bf-demo-full-text p { color: var(--muted); font-size: 13px; line-height: 1.6; }
        .bf-demo-full-cta { margin-top: 16px; }
        .bf-demo-full-vis { flex: 1; min-width: 200px; }

        .bf-inv { background: var(--dark2); border-radius: 12px; border: 1px solid var(--card-border); padding: 14px; font-size: 11px; }
        .bf-inv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px; }
        .bf-inv-title { font-family: var(--font-display); font-weight: 700; font-size: 12px; color: var(--text); }
        .bf-inv-badge { background: rgba(0,229,153,0.15); color: var(--green); font-size: 8px; font-weight: 700; padding: 3px 8px; border-radius: 100px; }
        .bf-inv-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid var(--card-border); color: var(--muted); gap: 8px; }
        .bf-inv-row strong { color: var(--text); text-align: right; }
        .bf-inv-total { display: flex; justify-content: space-between; padding: 9px 0 0; font-family: var(--font-display); font-weight: 800; font-size: 14px; }
        .bf-inv-total .amount { color: var(--green); }
        .bf-upi-btn { margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 5px; background: var(--green); color: #080d14; border-radius: 7px; padding: 8px; font-weight: 700; font-size: 11px; font-family: var(--font-display); }

        /* FEATURES */
        .bf-features-section { position: relative; z-index: 1; padding: 0 5% 90px; max-width: 1100px; margin: 0 auto; }
        .bf-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
        .bf-feature-card { background: var(--card); border: 1px solid var(--card-border); border-radius: 16px; padding: 22px; transition: border-color .25s, transform .25s, box-shadow .25s; backdrop-filter: blur(8px); }
        .bf-feature-card:hover { border-color: rgba(0,229,153,0.3); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .bf-feature-icon { width: 42px; height: 42px; border-radius: 11px; background: rgba(0,229,153,0.12); border: 1px solid rgba(0,229,153,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px; }
        .bf-feature-title { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 7px; }
        .bf-feature-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

        /* PRICING */
        .bf-pricing-section { position: relative; z-index: 1; padding: 0 5% 90px; max-width: 1000px; margin: 0 auto; }
        .bf-pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
        .bf-plan-card { background: var(--card); border: 1px solid var(--card-border); border-radius: 18px; padding: 26px; transition: transform .25s, box-shadow .25s; position: relative; }
        .bf-plan-card:hover { transform: translateY(-3px); box-shadow: 0 16px 50px rgba(0,0,0,0.35); }
        .bf-plan-card.featured { background: linear-gradient(145deg, rgba(0,229,153,0.08) 0%, var(--dark3) 100%); border-color: rgba(0,229,153,0.4); box-shadow: 0 0 40px rgba(0,229,153,0.1); }
        .bf-plan-popular { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--green); color: #080d14; font-size: 10px; font-weight: 800; padding: 4px 14px; border-radius: 100px; font-family: var(--font-display); letter-spacing: 0.04em; white-space: nowrap; }
        .bf-plan-name { font-family: var(--font-display); font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
        .bf-plan-price { font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text); line-height: 1; }
        .bf-plan-price span { font-size: 13px; color: var(--muted); font-weight: 400; }
        .bf-plan-features { list-style: none; margin: 18px 0; display: flex; flex-direction: column; gap: 9px; }
        .bf-plan-features li { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
        .bf-plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 11px; flex-shrink: 0; }
        .bf-plan-btn { display: block; text-align: center; padding: 11px 18px; border-radius: 10px; font-weight: 700; font-size: 13px; font-family: var(--font-display); text-decoration: none; cursor: pointer; border: none; transition: transform .2s, box-shadow .2s; }
        .bf-plan-btn.primary { background: var(--green); color: #080d14; box-shadow: 0 0 20px rgba(0,229,153,0.3); }
        .bf-plan-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,229,153,0.5); }
        .bf-plan-btn.secondary { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--card-border); }
        .bf-plan-btn.secondary:hover { border-color: var(--green); color: var(--green); }

        /* TESTIMONIALS */
        .bf-proof-section { position: relative; z-index: 1; padding: 0 5% 90px; max-width: 1000px; margin: 0 auto; }
        .bf-test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 14px; }
        .bf-tcard { background: var(--card); border: 1px solid var(--card-border); border-radius: 14px; padding: 20px; }
        .bf-tcard-quote { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 14px; font-style: italic; }
        .bf-tcard-author { display: flex; align-items: center; gap: 10px; }
        .bf-tcard-av { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
        .bf-tcard-name { font-size: 12px; font-weight: 700; color: var(--text); font-family: var(--font-display); }
        .bf-tcard-role { font-size: 10px; color: var(--muted); }
        .bf-stars { color: var(--green); font-size: 11px; letter-spacing: 1px; margin-bottom: 10px; }

        /* CTA BAND */
        .bf-cta-band {
          position: relative; z-index: 1; margin: 0 5% 90px; border-radius: 22px;
          background: linear-gradient(135deg, rgba(0,229,153,0.12) 0%, rgba(159,122,234,0.12) 100%);
          border: 1px solid rgba(0,229,153,0.2); padding: 50px 36px; text-align: center; overflow: hidden;
        }
        .bf-cta-band h2 { font-family: var(--font-display); font-size: clamp(1.5rem, 4vw, 2.4rem); font-weight: 800; color: var(--text); margin-bottom: 10px; }
        .bf-cta-band p { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
        .bf-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        /* FOOTER */
        .bf-footer {
          position: relative; z-index: 1; padding: 22px 5%;
          border-top: 1px solid var(--card-border);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
          font-size: 12px; color: var(--muted);
        }
        .bf-footer strong { color: var(--text); }
        .bf-footer a { color: var(--muted); text-decoration: none; }
        .bf-footer a:hover { color: var(--green); }
        .bf-footer-logo { display: flex; align-items: center; gap: 8px; }
        .bf-footer-logo img { height: 28px; width: auto; }

        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .bf-live { animation: livePulse 2s infinite; }

        /* RESPONSIVE */
        @media(max-width:768px){
          .bf-demo-grid { grid-template-columns: 1fr; }
          .bf-demo-full { grid-column: 1; }
          .bf-nav-link { display: none; }
          .bf-btn-pill.desktop-only { display: none; }
          .bf-hamburger { display: flex; }
          .bf-hero { padding: 60px 5% 48px; }
          .bf-stats-bar { padding-bottom: 56px; }
          .bf-stat-chip { font-size: 12px; padding: 8px 14px; }
          .bf-cta-band { padding: 36px 20px; margin: 0 4% 70px; }
        }
        @media(max-width:480px){
          .bf-hero h1 { font-size: 1.9rem; }
          .bf-btn-pill-lg, .bf-btn-ghost-lg { padding: 12px 22px; font-size: 14px; width: 100%; justify-content: center; }
          .bf-hero-ctas { flex-direction: column; align-items: center; }
          .bf-demo-full { flex-direction: column; }
          .bf-features-grid { grid-template-columns: 1fr; }
          .bf-pricing-grid { grid-template-columns: 1fr; }
          .bf-test-grid { grid-template-columns: 1fr; }
          .bf-nav { padding: 10px 4%; }
          .bf-nav-logo img { height: 36px; }
          .bf-footer { flex-direction: column; align-items: flex-start; gap: 14px; }
          .bf-cta-btns { flex-direction: column; align-items: center; }
          .bf-cta-btns a { width: 100%; justify-content: center; }
        }
      `}</style>

      <main className="bf-root">
        {/* NAVBAR */}
        <nav className="bf-nav">
          <Link href="/" className="bf-nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bongflowailogo.png" alt="BongoFlow AI" />
          </Link>
          <div className="bf-nav-links">
            <Link href="#features" className="bf-nav-link">Features</Link>
            <Link href="#pricing" className="bf-nav-link">Pricing</Link>
            <Link href="#demo" className="bf-nav-link">Demo</Link>
            <Link href="/dashboard" className="bf-btn-pill desktop-only">শুরু করুন →</Link>
          </div>
          <button
            className="bf-hamburger"
            aria-label="Menu"
            onClick={() => {
              const m = document.getElementById('bf-mob-menu');
              if (m) m.classList.toggle('open');
            }}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className="bf-mobile-menu" id="bf-mob-menu">
          <Link href="#features" onClick={() => document.getElementById('bf-mob-menu')?.classList.remove('open')}>Features</Link>
          <Link href="#pricing" onClick={() => document.getElementById('bf-mob-menu')?.classList.remove('open')}>Pricing</Link>
          <Link href="#demo" onClick={() => document.getElementById('bf-mob-menu')?.classList.remove('open')}>Demo</Link>
          <Link href="/dashboard" className="bf-btn-pill" onClick={() => document.getElementById('bf-mob-menu')?.classList.remove('open')}>শুরু করুন →</Link>
        </div>

        {/* HERO */}
        <section className="bf-hero">
          <div className="bf-hero-badge">
            <span className="bf-dot bf-live" style={{marginRight:4}}></span>
            🚀 শুধু ৫ মিনিটেই কাজ শুরু! · Kolkata&apos;s #1 AI CRM
          </div>
          <h1>
            আপনার <span className="accent">business</span>‑কে<br />
            <span className="accent2">AI‑powered</span> করুন —<br />
            voice note থেকে UPI পর্যন্ত
          </h1>
          <p>
            Bengali voice note শুনে AI নিজে থেকে reply করে, UPI payment link পাঠায়,
            GST invoice বানায় আর সব deal ট্র্যাক করে। WhatsApp-এ সব কিছু।
          </p>
          <div className="bf-hero-ctas">
            <Link href="/demo" className="bf-btn-pill-lg">ডেমো দেখুন →</Link>
            <Link href="/dashboard" className="bf-btn-ghost-lg">Free-তে শুরু করুন</Link>
          </div>
        </section>

        {/* STATS */}
        <div className="bf-stats-bar">
          {[
            { dot:'bf-dot', label:<><strong>2,400+</strong> active businesses</> },
            { dot:'bf-dot bf-dot-p', label:<><strong>4.2 hrs</strong> saved daily</> },
            { dot:'bf-dot bf-dot-o', label:<><strong>₹4.2L</strong> avg pipeline / week</> },
            { dot:'bf-dot', label:<><strong>99.9%</strong> WhatsApp uptime</> },
          ].map((s,i) => (
            <div key={i} className="bf-stat-chip">
              <span className={s.dot}></span> {s.label}
            </div>
          ))}
        </div>

        {/* DEMO */}
        <section className="bf-demo-section" id="demo">
          <div className="bf-section-label">
            <h2>আসল product, আসল result</h2>
            <p>Kolkata-র ব্যবসায়ীরা যা দেখছেন, আপনিও দেখুন।</p>
          </div>
          <div className="bf-demo-grid">
            <div className="bf-demo-card">
              <div className="bf-demo-card-header">
                <div className="bf-traffic"><span className="bf-t-r"></span><span className="bf-t-y"></span><span className="bf-t-g"></span></div>
                <span className="bf-card-title">Dashboard · Live</span>
              </div>
              <div className="bf-fake-dash">
                <div className="bf-dash-greeting">সুপ্রভাত, Raju da! 👋</div>
                <div className="bf-dash-sub">Today — 12 new leads · ₹4.2L pipeline · 23 auto-replies sent</div>
                <div className="bf-kpi-grid">
                  {[{l:'Leads Today',v:'24',b:'↑ 8 from yesterday',g:false},{l:'Hot Leads 🔥',v:'7',b:'≥80% score',g:true},{l:'Pipeline ₹',v:'4.2L',b:'This week',g:false}].map(k=>(
                    <div key={k.l} className="bf-kpi-card">
                      <div className="bf-kpi-label">{k.l}</div>
                      <div className={`bf-kpi-value${k.g?' green':''}`}>{k.v}</div>
                      <div className="bf-kpi-badge">{k.b}</div>
                    </div>
                  ))}
                </div>
                <div className="bf-fake-chart">
                  {[40,60,50,75,55,90,80].map((h,i)=>(
                    <div key={i} className="bf-bar" style={{height:`${h}%`,background:h===90?'var(--green)':`rgba(0,229,153,${h>70?0.7:0.5})`}}></div>
                  ))}
                </div>
                <div className="bf-fake-leads">
                  {[
                    {av:'SK',cls:'bf-la-g',name:'Suresh Kumar',sub:'Hardware, Behala · 🎤 দাম কত?',tag:'HOT',tc:'bf-hot',amt:'₹19K'},
                    {av:'AB',cls:'bf-la-p',name:'Ananya Banerjee',sub:'Real estate, Newtown',tag:'HOT',tc:'bf-hot',amt:'₹85K'},
                    {av:'RD',cls:'bf-la-o',name:'Rahul Das',sub:'Wholesale, Park Street',tag:'WARM',tc:'bf-warm',amt:'₹32K'},
                  ].map(l=>(
                    <div key={l.av} className="bf-fake-lead">
                      <div className={`bf-lead-av ${l.cls}`}>{l.av}</div>
                      <div className="bf-lead-info">
                        <div className="bf-lead-name">{l.name}</div>
                        <div className="bf-lead-sub">{l.sub}</div>
                      </div>
                      <span className={`bf-lead-tag ${l.tc}`}>{l.tag}</span>
                      <span className="bf-lead-amt">{l.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bf-demo-card">
              <div className="bf-demo-card-header">
                <div className="bf-traffic"><span className="bf-t-r"></span><span className="bf-t-y"></span><span className="bf-t-g"></span></div>
                <span className="bf-card-title">WhatsApp Inbox · AI</span>
              </div>
              <div className="bf-fake-wa">
                <div className="bf-wa-header">
                  <span className="bf-wa-dot bf-live"></span>
                  <span className="bf-wa-title">WhatsApp Inbox</span>
                  <span className="bf-wa-badge">7 new</span>
                </div>
                <div className="bf-wa-msgs">
                  <div className="bf-wa-msg">
                    <div className="bf-wa-msg-av bf-lead-av bf-la-g">SK</div>
                    <div className="bf-wa-body"><div className="bf-wa-name">Suresh Kumar</div><div className="bf-wa-text">🎤 &quot;ভাই, hardware-এর দাম কত? আজকেই লাগবে...&quot;</div></div>
                  </div>
                  <div className="bf-wa-ai"><div className="bf-wa-ai-label">🤖 AI · just now</div><div className="bf-wa-ai-text">নমস্কার Suresh দা! বিশেষ offer আছে। UPI link পাঠাচ্ছি...</div></div>
                  <div className="bf-wa-msg" style={{marginTop:7}}>
                    <div className="bf-wa-msg-av bf-lead-av bf-la-p">AB</div>
                    <div className="bf-wa-body"><div className="bf-wa-name">Ananya Banerjee</div><div className="bf-wa-text">GST invoice কখন পাব?</div></div>
                  </div>
                  <div className="bf-wa-ai"><div className="bf-wa-ai-label">🤖 AI · 2m ago</div><div className="bf-wa-ai-text">Ananya di, invoice ready! 📄 ₹85,000 — PDF পাঠাচ্ছি...</div></div>
                  <div className="bf-wa-msg" style={{marginTop:7}}>
                    <div className="bf-wa-msg-av bf-lead-av bf-la-o">RD</div>
                    <div className="bf-wa-body"><div className="bf-wa-name">Rahul Das</div><div className="bf-wa-text">UPI payment link পাঠান।</div></div>
                  </div>
                  <div className="bf-wa-ai"><div className="bf-wa-ai-label">🤖 AI · 5m ago</div><div className="bf-wa-ai-text">Rahul da: pay.bongflow.ai/rd-32k ✅ ধন্যবাদ!</div></div>
                </div>
              </div>
            </div>

            <div className="bf-demo-full">
              <div className="bf-demo-full-text">
                <h3>এক click-এ GST Invoice + UPI Payment 💰</h3>
                <p>Customer WhatsApp-এ চাইলেই AI নিজে থেকে GST invoice তৈরি করে পাঠায়। UPI payment link সাথেই যায়। Deal automatically &quot;Won&quot; হয়ে যায় CRM-এ।</p>
                <div className="bf-demo-full-cta"><Link href="/demo" className="bf-btn-pill">Live demo দেখুন →</Link></div>
              </div>
              <div className="bf-demo-full-vis">
                <div className="bf-inv">
                  <div className="bf-inv-header"><span className="bf-inv-title">GST Invoice #1042</span><span className="bf-inv-badge">✓ Auto-generated</span></div>
                  {[['Customer','Ananya Banerjee'],['GSTIN','19ABCDE1234F1Z5'],['Item','Flat Booking Advance'],['GST (18%)','₹12,966']].map(([k,v])=>(
                    <div key={k} className="bf-inv-row"><span>{k}</span><strong>{v}</strong></div>
                  ))}
                  <div className="bf-inv-total"><span>Total</span><span className="amount">₹85,000</span></div>
                  <div className="bf-upi-btn">⚡ UPI Pay Now · pay.bongflow.ai/ab-85k</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bf-features-section" id="features">
          <div className="bf-section-label"><h2>সব কিছু এক জায়গায়</h2><p>আপনার business-এর জন্য তৈরি, Kolkata-র জন্য তৈরি।</p></div>
          <div className="bf-features-grid">
            {[
              {icon:'🎤',title:'Bengali Voice AI',desc:'WhatsApp voice note থেকে নিজে থেকে Bengali-তে transcribe করে। Slang, dialect, কথার flow সব বোঝে।'},
              {icon:'🔥',title:'AI Lead Scoring',desc:'Hot/Warm/Cold আলাদা করে, কোন customer এখনই কিনবে তা আপনাকে real-time-এ বলে দেয়।'},
              {icon:'💰',title:'UPI + GST Invoice',desc:'এক click-এ payment link তৈরি, আর auto-generated GST invoice WhatsApp-এ পাঠানো।'},
              {icon:'📞',title:'AI Voice Calling',desc:'Bengali AI voice-calling agent নিজে থেকে follow-up call করে, CRM-এ record করে রাখে।'},
              {icon:'📵',title:'Missed Call CRM',desc:'Missed call এলে আপনার business-এর নামে auto WhatsApp reply পাঠায়, deal create করে।'},
              {icon:'👥',title:'Team Collaboration',desc:'Staff-দের আলাদা inbox, permission control। একই data সবার কাছে, সব সময়।'},
            ].map(f=>(
              <div key={f.title} className="bf-feature-card">
                <div className="bf-feature-icon">{f.icon}</div>
                <div className="bf-feature-title">{f.title}</div>
                <div className="bf-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="bf-pricing-section" id="pricing">
          <div className="bf-section-label"><h2>Simple Pricing</h2><p>কোনো hidden charge নেই। যে plan চান বদলাতে পারবেন।</p></div>
          <div className="bf-pricing-grid">
            {[
              {name:'Starter',price:'₹299',features:['100 messages/day','Basic lead scoring','WhatsApp inbox','1 user','UPI links'],cta:'শুরু করুন',href:'/dashboard',featured:false},
              {name:'Pro',price:'₹799',features:['Unlimited messages','Bengali Voice AI','AI auto-reply','UPI + GST invoice','AI calling agent','3 users'],cta:'Pro শুরু করুন →',href:'/dashboard',featured:true},
              {name:'Team',price:'₹1,999',features:['Everything in Pro','15 users','Multi-branch','Priority support','Custom AI training'],cta:'Sales-এ কথা বলুন',href:'/contact',featured:false},
            ].map(plan=>(
              <div key={plan.name} className={`bf-plan-card${plan.featured?' featured':''}`}>
                {plan.featured&&<div className="bf-plan-popular">Most Popular ⭐</div>}
                <div className="bf-plan-name">{plan.name}</div>
                <div className="bf-plan-price">{plan.price} <span>/মাস</span></div>
                <ul className="bf-plan-features">{plan.features.map(f=><li key={f}>{f}</li>)}</ul>
                <Link href={plan.href} className={`bf-plan-btn ${plan.featured?'primary':'secondary'}`}>{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p style={{textAlign:'center',color:'var(--muted)',fontSize:12,marginTop:18}}>
            🎁 3 বন্ধুকে invite করুন → 1 মাস free! · সব plan-এ WhatsApp + UPI + GST included
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section className="bf-proof-section">
          <div className="bf-section-label"><h2>Kolkata বলছে 💬</h2><p>Real ব্যবসায়ী, real result।</p></div>
          <div className="bf-test-grid">
            {[
              {av:'রা',cls:'bf-la-g',quote:'"এখন আমি voice note পাঠাই, BongoFlow বাকি সব করে দেয়। ৩ মাসে revenue 40% বেড়েছে।"',name:'Ramesh Agarwal',role:'Hardware Business, Burrabazar'},
              {av:'প্র',cls:'bf-la-p',quote:'"GST invoice আর UPI link একসাথে! আমার accountant-এর কাজ অনেক কমে গেছে।"',name:'Priya Sen',role:'Boutique Owner, Lake Market'},
              {av:'দে',cls:'bf-la-o',quote:'"Missed call-এ auto reply — এটাই আমার business change করে দিয়েছে।"',name:'Debashis Roy',role:'Real Estate Agent, Salt Lake'},
            ].map(t=>(
              <div key={t.name} className="bf-tcard">
                <div className="bf-stars">★★★★★</div>
                <div className="bf-tcard-quote">{t.quote}</div>
                <div className="bf-tcard-author">
                  <div className={`bf-tcard-av bf-lead-av ${t.cls}`}>{t.av}</div>
                  <div><div className="bf-tcard-name">{t.name}</div><div className="bf-tcard-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BAND */}
        <div className="bf-cta-band">
          <h2>আজই শুরু করুন — সম্পূর্ণ free 🚀</h2>
          <p>কোনো credit card দরকার নেই। শুধু WhatsApp-এ join করুন, ৫ মিনিটে setup।</p>
          <div className="bf-cta-btns">
            <Link href="/demo" className="bf-btn-pill-lg">ডেমো গ্রুপে ঢুকুন →</Link>
            <Link href="/dashboard" className="bf-btn-ghost-lg">Dashboard দেখুন</Link>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bf-footer">
          <div className="bf-footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bongflowailogo.png" alt="BongoFlow AI" />
            <span>© 2026 <strong>BongoFlow AI</strong></span>
          </div>
          <span>Made with ❤️ in Kolkata 🐯</span>
          <div style={{display:'flex',gap:16}}>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
