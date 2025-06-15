/** @type {import('next').NextConfig} */
const nextConfig = {
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
      'drroto.com',
      'images.unsplash.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig