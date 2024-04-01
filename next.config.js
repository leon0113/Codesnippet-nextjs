/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https"
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https"
            },
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },
            {
                hostname: "plus.unsplash.com",
                protocol: "https"
            },
            {
                hostname: "i.ibb.co",
                protocol: "https"
            },
        ]
    }
}

module.exports = nextConfig
