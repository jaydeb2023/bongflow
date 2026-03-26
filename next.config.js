/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixed: Moved out of experimental
  serverExternalPackages: ['twilio', 'razorpay', 'nodemailer', '@supabase/ssr'],

  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com'],
    // You can later upgrade to remotePatterns if you want
  },

  env: {
    NEXT_PUBLIC_APP_NAME: 'BongoFlow AI',
    NEXT_PUBLIC_APP_TAGLINE: "Kolkata'r nijer AI CRM",
  },
}

module.exports = nextConfig
