/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['twilio', 'razorpay', 'nodemailer'],
  },
  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'BongoFlow AI',
    NEXT_PUBLIC_APP_TAGLINE: "Kolkata'r nijer AI CRM",
  },
}

module.exports = nextConfig
