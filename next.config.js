/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for Vercel deployment
  // output: 'export', // Only use this for static hosting
  
  images: {
    unoptimized: true,
    domains: [
      'api.dicebear.com',
      'a.espncdn.com',
      'static.www.nfl.com',
      'upload.wikimedia.org',
      'thewebfactory.us',
      'logos-world.net',
      'cdn-icons-png.flaticon.com',
      'media.istockphoto.com',
      'www.citypng.com',
      'seeklogo.com',
      'smsumustangs.com',
      'drroto.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add experimental features for better compatibility
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig