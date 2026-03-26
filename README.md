# 🐯 BongoFlow AI — Kolkata'r nijer AI CRM

WhatsApp voice note শুনে Bengali তে lead score করে, UPI link পাঠায়, GST invoice বানায়।

## 🚀 Quick Setup (15 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/bongoflow-ai
cd bongoflow-ai
npm install
cp .env.example .env.local
```

### 2. Supabase Setup
1. Go to [supabase.com](https://supabase.com) → New Project
2. Settings → API → copy `URL` and `anon key` → paste in `.env.local`
3. SQL Editor → paste contents of `supabase/migrations/001_initial_schema.sql` → Run

### 3. Fill .env.local
```bash
# Minimum required to start:
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
OPENAI_API_KEY=sk-xxx
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxx
WHATSAPP_API_KEY=xxx  # from AiSensy/Wati
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+91xxxxxxxxxx
```

### 4. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel --prod

# Set all env vars in Vercel dashboard:
# vercel.com → Your Project → Settings → Environment Variables
```

## 📦 Features

| Feature | Status | How it works |
|---------|--------|--------------|
| WhatsApp Inbox | ✅ | AiSensy webhook → DB |
| Bengali Voice STT | ✅ | Bhashini API → Whisper fallback |
| AI Lead Scoring | ✅ | GPT-4o → 0-100 score |
| Auto-Reply (Hot leads) | ✅ | Score ≥70 → auto send |
| UPI Payment Links | ✅ | Razorpay → WhatsApp |
| GST Invoices | ✅ | Auto-generated HTML |
| AI Voice Calling | ✅ | Twilio + GPT-4o script |
| Missed Call CRM | ✅ | Twilio webhook → WA reply |
| UPI Auto Follow-up | ✅ | Vercel Cron every hour |
| Team Collaboration | ✅ | Role-based permissions |
| WhatsApp Group Analytics | ✅ | AI group message analysis |
| Voice Templates | ✅ | Sarvam TTS Bengali |
| Referral Engine | ✅ | 3 referrals = 1 month free |
| Kanban Pipeline | ✅ | Drag-drop deals |
| Reports & Analytics | ✅ | Recharts dashboards |

## 🔗 Webhook URLs (set in your services)

```
WhatsApp webhook:  https://YOUR_DOMAIN.vercel.app/api/whatsapp/webhook
Razorpay webhook:  https://YOUR_DOMAIN.vercel.app/api/upi/webhook
Twilio status:     https://YOUR_DOMAIN.vercel.app/api/calls/status-webhook
Twilio missed:     https://YOUR_DOMAIN.vercel.app/api/calls/missed
```

## 🗄️ Database (Supabase Tables)

- `businesses` — Business accounts + subscriptions
- `team_members` — Staff with role permissions  
- `contacts` — Leads with AI scores
- `messages` — WhatsApp messages + voice transcripts
- `deals` — Sales pipeline
- `calls` — Voice call logs
- `upi_transactions` — Payment links + invoices
- `voice_templates` — Bengali message templates
- `whatsapp_groups` — Group analytics
- `referrals` — Referral tracking
- `ai_logs` — AI usage logs
- `notifications` — Real-time alerts

## 💰 Subscription Plans

| Plan | Price | Features |
|------|-------|---------|
| Starter | ₹299/mo | 100 msg/day, basic scoring, 1 user |
| Pro | ₹799/mo | Unlimited, Bengali voice AI, AI calling, 3 users |
| Team | ₹1,999/mo | Everything + 15 users, multi-branch |

## 🏗️ Tech Stack

- **Frontend/Backend**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel (Mumbai region `bom1`)
- **Bengali Voice STT**: Bhashini API → OpenAI Whisper fallback
- **Bengali TTS**: Sarvam AI → OpenAI TTS fallback
- **AI Brain**: GPT-4o (lead scoring, reply generation, call scripts)
- **WhatsApp**: AiSensy Business API
- **Payments**: Razorpay (UPI links, subscriptions, invoices)
- **Voice Calls**: Twilio (outbound AI agent + missed call handler)
- **State**: Zustand
- **Charts**: Recharts
- **Toast**: react-hot-toast

## 📁 Project Structure

```
bongoflow/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── whatsapp/webhook/     # WhatsApp message handler
│   │   │   ├── upi/create/           # Create payment link
│   │   │   ├── upi/webhook/          # Razorpay payment webhook
│   │   │   ├── upi/followup/         # Auto follow-up cron
│   │   │   ├── calls/initiate/       # Start AI call
│   │   │   ├── calls/missed/         # Missed call handler
│   │   │   ├── calls/status-webhook/ # Call status updates
│   │   │   ├── referrals/            # Referral system
│   │   │   └── ai/dashboard-stats/  # Dashboard stats
│   │   ├── dashboard/               # Main dashboard
│   │   ├── inbox/                   # WhatsApp inbox + AI panel
│   │   ├── pipeline/                # Kanban pipeline
│   │   ├── voice-agent/             # AI calling agent
│   │   ├── missed-calls/            # Missed call CRM
│   │   ├── upi-followup/            # UPI follow-up manager
│   │   ├── team/                    # Team management
│   │   ├── whatsapp-groups/         # Group analytics
│   │   ├── voice-templates/         # Bengali templates
│   │   ├── referral/                # Referral engine
│   │   ├── reports/                 # Analytics
│   │   └── settings/                # App settings
│   ├── components/
│   │   ├── crm/AppLayout.tsx        # Sidebar + layout
│   │   ├── ui/                      # Shared UI components
│   │   └── charts/                  # Chart components
│   ├── lib/
│   │   ├── supabase.ts              # DB client
│   │   ├── ai-engine.ts             # AI scoring + STT + TTS
│   │   ├── whatsapp.ts              # WhatsApp API
│   │   ├── razorpay.ts              # UPI + invoices
│   │   └── twilio-calls.ts          # Voice calling
│   └── types/index.ts               # TypeScript types
├── supabase/
│   ├── migrations/001_initial_schema.sql
│   └── config.toml
├── vercel.json                       # Deployment + cron config
├── .env.example
└── README.md
```

## 🌐 API Integrations Setup

### AiSensy (WhatsApp)
1. Sign up at aisensy.com
2. Connect your WhatsApp Business number
3. Set webhook URL: `https://yourdomain.vercel.app/api/whatsapp/webhook`
4. Copy API key → `WHATSAPP_API_KEY`

### Bhashini (Bengali STT)
1. Register at bhashini.gov.in
2. Create pipeline with Bengali ASR + translation
3. Copy API key + User ID + Pipeline ID → `.env.local`

### Razorpay (UPI + Invoices)
1. Sign up at razorpay.com
2. Dashboard → Settings → API Keys → Generate
3. Settings → Webhooks → Add `https://yourdomain.vercel.app/api/upi/webhook`

### Twilio (Voice Calls)
1. Sign up at twilio.com
2. Buy an Indian number (₹5-10/month)
3. Console → Voice → Webhooks → `https://yourdomain.vercel.app/api/calls/status-webhook`

## 📞 Support

Built for Kolkata's small businesses. 
Questions? WhatsApp: +91 XXXXXXXXXX
