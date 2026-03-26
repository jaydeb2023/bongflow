<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>BongoFlow AI — Kolkata's AI CRM</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --green: #00e599;
    --green-dim: #00c97e;
    --teal: #0ff4c6;
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

  body {
    background: var(--dark);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    line-height: 1.6;
  }

  /* ── NOISE + GRID OVERLAY ── */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image:
      radial-gradient(ellipse 80% 60% at 20% -10%, rgba(0,229,153,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 30%, rgba(159,122,234,0.08) 0%, transparent 60%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath d='M0 0h40v40' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='0.5'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* ── NAVBAR ── */
  nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 5%;
    background: rgba(8,13,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--card-border);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-logo-img {
    height: 36px; width: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #00e599 0%, #9f7aea 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 800; color: #080d14;
    font-family: var(--font-display);
    flex-shrink: 0;
  }
  .nav-logo span { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--text); }
  .nav-logo span em { color: var(--green); font-style: normal; }
  .nav-links { display: flex; align-items: center; gap: 24px; }
  .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
  .nav-links a:hover { color: var(--text); }
  .btn-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 100px;
    background: var(--green); color: #080d14;
    font-weight: 700; font-size: 13px; font-family: var(--font-display);
    text-decoration: none; border: none; cursor: pointer;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 0 20px rgba(0,229,153,0.35);
  }
  .btn-pill:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,229,153,0.5); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 100px;
    background: transparent; color: var(--text);
    font-weight: 600; font-size: 13px; font-family: var(--font-display);
    text-decoration: none; cursor: pointer;
    border: 1px solid var(--card-border);
    transition: border-color .2s, color .2s;
  }
  .btn-ghost:hover { border-color: var(--green); color: var(--green); }

  /* ── HERO ── */
  .hero {
    position: relative; z-index: 1;
    padding: 90px 5% 70px;
    text-align: center;
    max-width: 860px; margin: 0 auto;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 100px;
    background: rgba(0,229,153,0.1); border: 1px solid rgba(0,229,153,0.3);
    font-size: 12px; font-weight: 600; color: var(--green);
    margin-bottom: 28px; letter-spacing: 0.04em;
    animation: fadeUp .6s ease both;
  }
  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 22px;
    animation: fadeUp .6s .1s ease both;
  }
  .hero h1 .accent { color: var(--green); }
  .hero h1 .accent2 { color: var(--purple); }
  .hero p {
    font-size: 16px; color: var(--muted);
    max-width: 560px; margin: 0 auto 36px;
    animation: fadeUp .6s .2s ease both;
  }
  .hero-ctas {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 60px;
    animation: fadeUp .6s .3s ease both;
  }
  .btn-pill-lg {
    padding: 14px 32px; font-size: 15px; border-radius: 100px;
    background: var(--green); color: #080d14;
    font-weight: 700; font-family: var(--font-display);
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
    box-shadow: 0 0 32px rgba(0,229,153,0.4);
    transition: transform .2s, box-shadow .2s;
  }
  .btn-pill-lg:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(0,229,153,0.55); }
  .btn-ghost-lg {
    padding: 14px 32px; font-size: 15px; border-radius: 100px;
    background: transparent; color: var(--text);
    font-weight: 600; font-family: var(--font-display);
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--card-border);
    transition: border-color .2s, color .2s;
  }
  .btn-ghost-lg:hover { border-color: var(--green); color: var(--green); }

  /* ── STATS BAR ── */
  .stats-bar {
    position: relative; z-index: 1;
    display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;
    padding: 0 5% 80px;
    animation: fadeUp .6s .4s ease both;
  }
  .stat-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 100px;
    background: var(--card); border: 1px solid var(--card-border);
    font-size: 13px; color: var(--muted);
    backdrop-filter: blur(8px);
  }
  .stat-chip strong { color: var(--text); font-family: var(--font-display); }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); display: inline-block; }
  .dot-p { background: var(--purple); }
  .dot-o { background: #fbbf24; }

  /* ── DEMO SCREENSHOTS SECTION ── */
  .demo-section {
    position: relative; z-index: 1;
    padding: 0 5% 100px;
    max-width: 1100px; margin: 0 auto;
  }
  .section-label {
    text-align: center; margin-bottom: 52px;
  }
  .section-label h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 800; letter-spacing: -0.02em;
    color: var(--text); margin-bottom: 12px;
  }
  .section-label p { color: var(--muted); font-size: 15px; }

  /* Dashboard mockup card */
  .demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }
  @media(max-width:720px){
    .demo-grid { grid-template-columns: 1fr; }
    nav .nav-links a { display: none; }
  }

  .demo-card {
    border-radius: 20px;
    border: 1px solid var(--card-border);
    overflow: hidden;
    background: var(--dark3);
    transition: transform .3s, box-shadow .3s;
    position: relative;
  }
  .demo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  .demo-card-header {
    padding: 14px 16px 0;
    display: flex; align-items: center; gap: 8px;
  }
  .traffic-dots { display: flex; gap: 5px; }
  .traffic-dots span { width: 10px; height: 10px; border-radius: 50%; display: block; }
  .t-r { background: #ff5f57; }
  .t-y { background: #febc2e; }
  .t-g { background: #28c840; }
  .demo-card-title { font-size: 11px; color: var(--muted); font-family: var(--font-display); letter-spacing: 0.06em; text-transform: uppercase; }

  /* fake dashboard UI */
  .fake-dash {
    padding: 16px;
    font-size: 11px;
  }
  .fake-dash-greeting {
    font-family: var(--font-display); font-size: 15px; font-weight: 700;
    color: var(--text); margin-bottom: 4px;
  }
  .fake-dash-sub { color: var(--muted); font-size: 10px; margin-bottom: 14px; }
  .kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 14px; }
  .kpi-card {
    background: rgba(255,255,255,0.05); border-radius: 10px; padding: 10px 8px;
    border: 1px solid var(--card-border);
  }
  .kpi-label { color: var(--muted); font-size: 9px; margin-bottom: 4px; }
  .kpi-value { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--text); }
  .kpi-value.green { color: var(--green); }
  .kpi-badge { font-size: 8px; color: var(--green); margin-top: 2px; }

  .fake-leads { display: flex; flex-direction: column; gap: 6px; }
  .fake-lead {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.03); border-radius: 8px;
    padding: 8px 10px; border: 1px solid var(--card-border);
  }
  .lead-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; flex-shrink: 0;
  }
  .la-green { background: rgba(0,229,153,0.2); color: var(--green); }
  .la-purple { background: rgba(159,122,234,0.2); color: var(--purple); }
  .la-orange { background: rgba(251,191,36,0.2); color: #fbbf24; }
  .lead-info { flex: 1; }
  .lead-name { font-size: 10px; font-weight: 600; color: var(--text); }
  .lead-sub { font-size: 9px; color: var(--muted); }
  .lead-tag {
    font-size: 8px; font-weight: 700; padding: 2px 7px; border-radius: 100px;
  }
  .hot-tag { background: rgba(0,229,153,0.15); color: var(--green); }
  .warm-tag { background: rgba(251,191,36,0.15); color: #fbbf24; }
  .lead-amount { font-size: 10px; font-weight: 700; color: var(--text); font-family: var(--font-display); }

  /* bar chart fake */
  .fake-chart { display: flex; align-items: flex-end; gap: 5px; height: 60px; padding: 8px 0; }
  .bar { border-radius: 4px 4px 0 0; width: 100%; transition: height .3s; }

  /* WhatsApp inbox mockup */
  .fake-wa {
    padding: 14px;
  }
  .wa-header {
    display: flex; align-items: center; gap: 8px;
    padding-bottom: 10px; border-bottom: 1px solid var(--card-border);
    margin-bottom: 10px;
  }
  .wa-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
  .wa-title { font-size: 11px; font-weight: 700; font-family: var(--font-display); color: var(--text); }
  .wa-badge { margin-left: auto; background: var(--green); color: #080d14; font-size: 9px; font-weight: 700; border-radius: 100px; padding: 1px 7px; }

  .wa-msg-list { display: flex; flex-direction: column; gap: 8px; }
  .wa-msg {
    display: flex; gap: 8px; align-items: flex-start;
  }
  .wa-msg-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .wa-msg-body { background: rgba(255,255,255,0.05); border-radius: 0 8px 8px 8px; padding: 7px 10px; flex: 1; }
  .wa-msg-name { font-size: 9px; font-weight: 700; color: var(--green); margin-bottom: 2px; }
  .wa-msg-text { font-size: 10px; color: var(--muted); line-height: 1.4; }
  .wa-ai-reply { background: rgba(0,229,153,0.08); border: 1px solid rgba(0,229,153,0.2); border-radius: 8px 8px 0 8px; padding: 7px 10px; margin-left: 36px; }
  .wa-ai-label { font-size: 8px; color: var(--green); font-weight: 700; margin-bottom: 2px; }
  .wa-ai-text { font-size: 10px; color: var(--text); line-height: 1.4; }

  /* big demo card spanning full */
  .demo-full {
    grid-column: 1 / -1;
    border-radius: 20px;
    border: 1px solid rgba(0,229,153,0.2);
    background: linear-gradient(135deg, rgba(0,229,153,0.05) 0%, var(--dark3) 60%);
    padding: 28px;
    display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
  }
  .demo-full-text { flex: 1; min-width: 220px; }
  .demo-full-text h3 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
  .demo-full-text p { color: var(--muted); font-size: 13px; line-height: 1.6; }
  .demo-full-cta { margin-top: 18px; }
  .demo-full-visual { flex: 1; min-width: 200px; }

  /* UPI invoice mockup */
  .invoice-card {
    background: var(--dark2); border-radius: 14px;
    border: 1px solid var(--card-border);
    padding: 16px; font-size: 11px;
  }
  .inv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .inv-title { font-family: var(--font-display); font-weight: 700; font-size: 13px; color: var(--text); }
  .inv-badge { background: rgba(0,229,153,0.15); color: var(--green); font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 100px; }
  .inv-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid var(--card-border); color: var(--muted); }
  .inv-row strong { color: var(--text); }
  .inv-total { display: flex; justify-content: space-between; padding: 10px 0 0; font-family: var(--font-display); font-weight: 800; font-size: 15px; }
  .inv-total .amount { color: var(--green); }
  .upi-btn { margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--green); color: #080d14; border-radius: 8px; padding: 9px; font-weight: 700; font-size: 12px; font-family: var(--font-display); }

  /* ── FEATURES ── */
  .features-section {
    position: relative; z-index: 1;
    padding: 0 5% 100px;
    max-width: 1100px; margin: 0 auto;
  }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  .feature-card {
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 18px; padding: 24px;
    transition: border-color .25s, transform .25s, box-shadow .25s;
    backdrop-filter: blur(8px);
  }
  .feature-card:hover {
    border-color: rgba(0,229,153,0.3);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  }
  .feature-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(0,229,153,0.12); border: 1px solid rgba(0,229,153,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 16px;
  }
  .feature-title { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--text); margin-bottom: 8px; }
  .feature-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ── PRICING ── */
  .pricing-section {
    position: relative; z-index: 1;
    padding: 0 5% 100px;
    max-width: 1000px; margin: 0 auto;
  }
  .pricing-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  .plan-card {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: 20px; padding: 28px;
    transition: transform .25s, box-shadow .25s;
    position: relative;
  }
  .plan-card:hover { transform: translateY(-3px); box-shadow: 0 16px 50px rgba(0,0,0,0.35); }
  .plan-card.featured {
    background: linear-gradient(145deg, rgba(0,229,153,0.08) 0%, var(--dark3) 100%);
    border-color: rgba(0,229,153,0.4);
    box-shadow: 0 0 40px rgba(0,229,153,0.1);
  }
  .plan-popular {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--green); color: #080d14;
    font-size: 10px; font-weight: 800; padding: 4px 14px; border-radius: 100px;
    font-family: var(--font-display); letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .plan-name { font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
  .plan-price { font-family: var(--font-display); font-size: 2.4rem; font-weight: 800; color: var(--text); line-height: 1; }
  .plan-price span { font-size: 14px; color: var(--muted); font-weight: 400; }
  .plan-features { list-style: none; margin: 20px 0; display: flex; flex-direction: column; gap: 10px; }
  .plan-features li { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
  .plan-features li::before { content: '✓'; color: var(--green); font-weight: 700; font-size: 12px; flex-shrink: 0; }
  .plan-btn {
    display: block; text-align: center; padding: 12px 20px; border-radius: 12px;
    font-weight: 700; font-size: 13px; font-family: var(--font-display);
    text-decoration: none; cursor: pointer; border: none;
    transition: transform .2s, box-shadow .2s;
  }
  .plan-btn.primary { background: var(--green); color: #080d14; box-shadow: 0 0 20px rgba(0,229,153,0.3); }
  .plan-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,229,153,0.5); }
  .plan-btn.secondary { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--card-border); }
  .plan-btn.secondary:hover { border-color: var(--green); color: var(--green); }

  /* ── SOCIAL PROOF ── */
  .proof-section {
    position: relative; z-index: 1;
    padding: 0 5% 100px;
    max-width: 1000px; margin: 0 auto;
  }
  .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
  .tcard {
    background: var(--card); border: 1px solid var(--card-border);
    border-radius: 16px; padding: 22px;
  }
  .tcard-quote { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 16px; font-style: italic; }
  .tcard-author { display: flex; align-items: center; gap: 10px; }
  .tcard-av { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
  .tcard-name { font-size: 12px; font-weight: 700; color: var(--text); font-family: var(--font-display); }
  .tcard-role { font-size: 10px; color: var(--muted); }
  .stars { color: var(--green); font-size: 12px; letter-spacing: 1px; margin-bottom: 12px; }

  /* ── CTA BAND ── */
  .cta-band {
    position: relative; z-index: 1;
    margin: 0 5% 100px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(0,229,153,0.12) 0%, rgba(159,122,234,0.12) 100%);
    border: 1px solid rgba(0,229,153,0.2);
    padding: 56px 40px;
    text-align: center;
    overflow: hidden;
  }
  .cta-band::before {
    content: '';
    position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,153,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-band h2 { font-family: var(--font-display); font-size: clamp(1.6rem, 4vw, 2.5rem); font-weight: 800; color: var(--text); margin-bottom: 12px; position: relative; }
  .cta-band p { color: var(--muted); font-size: 15px; margin-bottom: 32px; position: relative; }
  .cta-band-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }

  /* ── FOOTER ── */
  footer {
    position: relative; z-index: 1;
    padding: 24px 5%;
    border-top: 1px solid var(--card-border);
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
    font-size: 12px; color: var(--muted);
  }
  footer strong { color: var(--text); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .live-dot { animation: pulse 2s infinite; display: inline-block; }

  /* mobile nav */
  @media(max-width:500px){
    .hero { padding: 60px 5% 50px; }
    .cta-band { padding: 40px 20px; margin: 0 4% 80px; }
    footer { flex-direction: column; text-align: center; }
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
</style>
</head>
<body>

<!-- NAVBAR -->
<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-img">বা</div>
    <span>BongFlow <em>AI</em></span>
  </a>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="#demo">Demo</a>
    <a href="/dashboard" class="btn-pill">শুরু করুন →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-badge">
    <span class="live-dot dot"></span>
    🚀 শুধু ৫ মিনিটেই কাজ শুরু! · Kolkata's #1 AI CRM
  </div>
  <h1>
    আপনার <span class="accent">business</span>‑কে<br />
    <span class="accent2">AI‑powered</span> করুন —<br />
    voice note থেকে UPI পর্যন্ত
  </h1>
  <p>
    Bengali voice note শুনে AI নিজে থেকে reply করে, UPI payment link পাঠায়, 
    GST invoice বানায় আর সব deal ট্র্যাক করে। WhatsApp-এ সব কিছু।
  </p>
  <div class="hero-ctas">
    <a href="/demo" class="btn-pill-lg">ডেমো দেখুন →</a>
    <a href="/dashboard" class="btn-ghost-lg">Free-তে শুরু করুন</a>
  </div>
</section>

<!-- STATS BAR -->
<div class="stats-bar">
  <div class="stat-chip"><span class="dot"></span> <strong>2,400+</strong> active businesses</div>
  <div class="stat-chip"><span class="dot dot-p"></span> <strong>4.2 hrs</strong> saved daily</div>
  <div class="stat-chip"><span class="dot dot-o"></span> <strong>₹4.2L</strong> avg pipeline / week</div>
  <div class="stat-chip"><span class="dot"></span> <strong>99.9%</strong> WhatsApp uptime</div>
</div>

<!-- DEMO SECTION -->
<section class="demo-section" id="demo">
  <div class="section-label">
    <h2>আসল product, আসল result</h2>
    <p>Kolkata-র ব্যবসায়ীরা যা দেখছেন, আপনিও দেখুন।</p>
  </div>

  <div class="demo-grid">

    <!-- Dashboard Card -->
    <div class="demo-card">
      <div class="demo-card-header">
        <div class="traffic-dots">
          <span class="t-r"></span><span class="t-y"></span><span class="t-g"></span>
        </div>
        <span class="demo-card-title">Dashboard · Live</span>
      </div>
      <div class="fake-dash">
        <div class="fake-dash-greeting">সুপ্রভাত, Raju da! 👋</div>
        <div class="fake-dash-sub">Today — 12 new leads · ₹4.2L pipeline · 23 auto-replies sent</div>
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Leads Today</div>
            <div class="kpi-value">24</div>
            <div class="kpi-badge">↑ 8 from yesterday</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Hot Leads 🔥</div>
            <div class="kpi-value green">7</div>
            <div class="kpi-badge">≥80% score</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Pipeline ₹</div>
            <div class="kpi-value">4.2L</div>
            <div class="kpi-badge">This week</div>
          </div>
        </div>
        <!-- mini bar chart -->
        <div class="fake-chart">
          <div class="bar" style="height:40%;background:rgba(0,229,153,0.5)"></div>
          <div class="bar" style="height:60%;background:rgba(0,229,153,0.5)"></div>
          <div class="bar" style="height:50%;background:rgba(0,229,153,0.5)"></div>
          <div class="bar" style="height:75%;background:rgba(0,229,153,0.7)"></div>
          <div class="bar" style="height:55%;background:rgba(0,229,153,0.5)"></div>
          <div class="bar" style="height:90%;background:var(--green)"></div>
          <div class="bar" style="height:80%;background:rgba(0,229,153,0.7)"></div>
        </div>
        <div class="fake-leads">
          <div class="fake-lead">
            <div class="lead-avatar la-green">SK</div>
            <div class="lead-info">
              <div class="lead-name">Suresh Kumar</div>
              <div class="lead-sub">Hardware, Behala · 🎤 Voice: দাম কত?</div>
            </div>
            <span class="lead-tag hot-tag">HOT</span>
            <span class="lead-amount">₹19K</span>
          </div>
          <div class="fake-lead">
            <div class="lead-avatar la-purple">AB</div>
            <div class="lead-info">
              <div class="lead-name">Ananya Banerjee</div>
              <div class="lead-sub">Real estate, Newtown</div>
            </div>
            <span class="lead-tag hot-tag">HOT</span>
            <span class="lead-amount">₹85K</span>
          </div>
          <div class="fake-lead">
            <div class="lead-avatar la-orange">RD</div>
            <div class="lead-info">
              <div class="lead-name">Rahul Das</div>
              <div class="lead-sub">Wholesale, Park Street</div>
            </div>
            <span class="lead-tag warm-tag">WARM</span>
            <span class="lead-amount">₹32K</span>
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Inbox Card -->
    <div class="demo-card">
      <div class="demo-card-header">
        <div class="traffic-dots">
          <span class="t-r"></span><span class="t-y"></span><span class="t-g"></span>
        </div>
        <span class="demo-card-title">WhatsApp Inbox · AI</span>
      </div>
      <div class="fake-wa">
        <div class="wa-header">
          <span class="wa-dot live-dot"></span>
          <span class="wa-title">WhatsApp Inbox</span>
          <span class="wa-badge">7 new</span>
        </div>
        <div class="wa-msg-list">
          <div class="wa-msg">
            <div class="wa-msg-avatar la-green lead-avatar">SK</div>
            <div class="wa-msg-body">
              <div class="wa-msg-name">Suresh Kumar</div>
              <div class="wa-msg-text">🎤 "ভাই, আপনাদের hardware-এর দাম কত? আজকেই লাগবে..."</div>
            </div>
          </div>
          <div class="wa-ai-reply">
            <div class="wa-ai-label">🤖 AI Auto-Reply · just now</div>
            <div class="wa-ai-text">নমস্কার Suresh দা! আপনার জন্য বিশেষ offer আছে। এখনই দেখুন 👇 UPI payment link পাঠাচ্ছি...</div>
          </div>
          <div class="wa-msg" style="margin-top:8px">
            <div class="wa-msg-avatar la-purple lead-avatar">AB</div>
            <div class="wa-msg-body">
              <div class="wa-msg-name">Ananya Banerjee</div>
              <div class="wa-msg-text">Flat booking-এর জন্য GST invoice দরকার, কখন পাব?</div>
            </div>
          </div>
          <div class="wa-ai-reply">
            <div class="wa-ai-label">🤖 AI Auto-Reply · 2m ago</div>
            <div class="wa-ai-text">Ananya di, আপনার GST invoice ready! 📄 ₹85,000 · GSTIN: 19ABCDE1234F1Z5 — PDF পাঠানো হচ্ছে...</div>
          </div>
          <div class="wa-msg" style="margin-top:8px">
            <div class="wa-msg-avatar la-orange lead-avatar">RD</div>
            <div class="wa-msg-body">
              <div class="wa-msg-name">Rahul Das</div>
              <div class="wa-msg-text">UPI payment link পাঠান, এখনই pay করব।</div>
            </div>
          </div>
          <div class="wa-ai-reply">
            <div class="wa-ai-label">🤖 AI Auto-Reply · 5m ago</div>
            <div class="wa-ai-text">Rahul da, payment link: pay.bongflow.ai/rd-32k ✅ ধন্যবাদ!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- UPI + Invoice Full Card -->
    <div class="demo-full">
      <div class="demo-full-text">
        <h3>এক click-এ GST Invoice + UPI Payment 💰</h3>
        <p>Customer WhatsApp-এ চাইলেই AI নিজে থেকে GST invoice তৈরি করে পাঠায়। UPI payment link সাথেই যায়। আর deal automatically "Won" হয়ে যায় CRM-এ।</p>
        <div class="demo-full-cta">
          <a href="/demo" class="btn-pill">Live demo দেখুন →</a>
        </div>
      </div>
      <div class="demo-full-visual">
        <div class="invoice-card">
          <div class="inv-header">
            <span class="inv-title">GST Invoice #1042</span>
            <span class="inv-badge">✓ Auto-generated</span>
          </div>
          <div class="inv-row"><span>Customer</span><strong>Ananya Banerjee</strong></div>
          <div class="inv-row"><span>GSTIN</span><strong>19ABCDE1234F1Z5</strong></div>
          <div class="inv-row"><span>Item</span><strong>Flat Booking Advance</strong></div>
          <div class="inv-row"><span>GST (18%)</span><strong>₹12,966</strong></div>
          <div class="inv-total"><span>Total</span><span class="amount">₹85,000</span></div>
          <div class="upi-btn">⚡ UPI Pay Now · pay.bongflow.ai/ab-85k</div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- FEATURES -->
<section class="features-section" id="features">
  <div class="section-label">
    <h2>সব কিছু এক জায়গায়</h2>
    <p>আপনার business-এর জন্য তৈরি, Kolkata-র জন্য তৈরি।</p>
  </div>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">🎤</div>
      <div class="feature-title">Bengali Voice AI</div>
      <div class="feature-desc">WhatsApp voice note থেকে নিজে থেকে Bengali-তে transcribe করে। Slang, dialect, কথার flow সব বোঝে।</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🔥</div>
      <div class="feature-title">AI Lead Scoring</div>
      <div class="feature-desc">Hot/Warm/Cold আলাদা করে, কোন customer এখনই কিনবে তা আপনাকে বলে দেয় real-time-এ।</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">💰</div>
      <div class="feature-title">UPI + GST Invoice</div>
      <div class="feature-desc">এক click-এ payment link তৈরি, আর auto-generated GST invoice WhatsApp-এ পাঠানো।</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📞</div>
      <div class="feature-title">AI Voice Calling</div>
      <div class="feature-desc">Bengali AI voice-calling agent নিজে থেকে follow-up call করে, CRM-এ record করে রাখে।</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📵</div>
      <div class="feature-title">Missed Call CRM</div>
      <div class="feature-desc">Missed call এলে আপনার business-এর নামে auto WhatsApp reply পাঠায়, deal create করে।</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">👥</div>
      <div class="feature-title">Team Collaboration</div>
      <div class="feature-desc">Staff-দের আলাদা inbox, permission control। একই data সবার কাছে, সব সময়।</div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="pricing-section" id="pricing">
  <div class="section-label">
    <h2>Simple Pricing</h2>
    <p>কোনো hidden charge নেই। যে plan চান বদলাতে পারবেন।</p>
  </div>
  <div class="pricing-grid">
    <div class="plan-card">
      <div class="plan-name">Starter</div>
      <div class="plan-price">₹299 <span>/মাস</span></div>
      <ul class="plan-features">
        <li>100 messages/day</li>
        <li>Basic lead scoring</li>
        <li>WhatsApp inbox</li>
        <li>1 user</li>
        <li>UPI links</li>
      </ul>
      <a href="/dashboard" class="plan-btn secondary">শুরু করুন</a>
    </div>
    <div class="plan-card featured">
      <div class="plan-popular">Most Popular ⭐</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">₹799 <span>/মাস</span></div>
      <ul class="plan-features">
        <li>Unlimited messages</li>
        <li>Bengali Voice AI</li>
        <li>AI auto-reply</li>
        <li>UPI + GST invoice</li>
        <li>AI calling agent</li>
        <li>3 users</li>
      </ul>
      <a href="/dashboard" class="plan-btn primary">Pro শুরু করুন →</a>
    </div>
    <div class="plan-card">
      <div class="plan-name">Team</div>
      <div class="plan-price">₹1,999 <span>/মাস</span></div>
      <ul class="plan-features">
        <li>Everything in Pro</li>
        <li>15 users</li>
        <li>Multi-branch</li>
        <li>Priority support</li>
        <li>Custom AI training</li>
      </ul>
      <a href="/contact" class="plan-btn secondary">Sales-এ কথা বলুন</a>
    </div>
  </div>
  <p style="text-align:center;color:var(--muted);font-size:12px;margin-top:20px;">
    🎁 3 বন্ধুকে invite করুন → 1 মাস free! · সব plan-এ WhatsApp + UPI + GST included
  </p>
</section>

<!-- SOCIAL PROOF -->
<section class="proof-section">
  <div class="section-label">
    <h2>Kolkata বলছে 💬</h2>
    <p>Real ব্যবসায়ী, real result।</p>
  </div>
  <div class="testimonial-grid">
    <div class="tcard">
      <div class="stars">★★★★★</div>
      <div class="tcard-quote">"এখন আমি voice note পাঠাই, BongoFlow বাকি সব করে দেয়। ৩ মাসে revenue 40% বেড়েছে।"</div>
      <div class="tcard-author">
        <div class="tcard-av la-green lead-avatar">রা</div>
        <div>
          <div class="tcard-name">Ramesh Agarwal</div>
          <div class="tcard-role">Hardware Business, Burrabazar</div>
        </div>
      </div>
    </div>
    <div class="tcard">
      <div class="stars">★★★★★</div>
      <div class="tcard-quote">"GST invoice আর UPI link একসাথে! আমার accountant-এর কাজ অনেক কমে গেছে। Awesome!"</div>
      <div class="tcard-author">
        <div class="tcard-av la-purple lead-avatar">প্র</div>
        <div>
          <div class="tcard-name">Priya Sen</div>
          <div class="tcard-role">Boutique Owner, Lake Market</div>
        </div>
      </div>
    </div>
    <div class="tcard">
      <div class="stars">★★★★★</div>
      <div class="tcard-quote">"Missed call-এ auto reply — এটাই আমার business change করে দিয়েছে। Hot lead একটাও miss হয় না।"</div>
      <div class="tcard-author">
        <div class="tcard-av la-orange lead-avatar">দে</div>
        <div>
          <div class="tcard-name">Debashis Roy</div>
          <div class="tcard-role">Real Estate Agent, Salt Lake</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<div class="cta-band">
  <h2>আজই শুরু করুন — সম্পূর্ণ free 🚀</h2>
  <p>কোনো credit card দরকার নেই। শুধু WhatsApp-এ join করুন, ৫ মিনিটে setup।</p>
  <div class="cta-band-btns">
    <a href="/demo" class="btn-pill-lg">ডেমো গ্রুপে ঢুকুন →</a>
    <a href="/dashboard" class="btn-ghost-lg">Dashboard দেখুন</a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div style="display:flex;align-items:center;gap:8px;">
    <div class="nav-logo-img" style="width:28px;height:28px;font-size:14px;border-radius:8px;">বা</div>
    <span>© 2026 <strong>BongoFlow AI</strong></span>
  </div>
  <span>Made with ❤️ in Kolkata 🐯</span>
  <div style="display:flex;gap:16px;">
    <a href="#" style="color:var(--muted);text-decoration:none;font-size:12px;">Privacy</a>
    <a href="#" style="color:var(--muted);text-decoration:none;font-size:12px;">Terms</a>
    <a href="#" style="color:var(--muted);text-decoration:none;font-size:12px;">Contact</a>
  </div>
</footer>

</body>
</html>
