/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const {ADMIN_URL} = process.env
const path = require('path')
const withImages = require('next-images')
const withVideos = require('next-videos')


module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i0.wp.com'],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    styledComponents: true,
    async rewrites() {
      console.log("rewrite-----------------------", ADMIN_URL);
      return [
        { source: '/admin', destination: `${ADMIN_URL}/admin` }
        ];
     }
  }
  
}


module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  },
})



module.exports = withVideos({
  webpack(config, options) {
  return config
}
})

module.exports = nextConfig
