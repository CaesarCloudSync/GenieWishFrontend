/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/homepage/caesarcoinhome.html',
      },
      {
        source: '/caesarseed/:slug*',
        destination: '/caesarseed/caesarseed.html',
      },
      {
        source: '/caesartorrent/:slug*',
        destination: '/caesartorrent/caesartorrent.html',
      },
    ]
  },
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/authentication",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "/auth/quotaposter/signin" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            
              ]
        }
    ]
}
}


module.exports = nextConfig
