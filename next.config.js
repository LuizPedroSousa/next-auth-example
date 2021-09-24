const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const imagePlugin = withImages({
    esModule: true,
})

const nextConfig = {
    env: {
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
        VERCEL_URL: process.env.VERCEL_URL,
    }
}

module.exports = withPlugins([imagePlugin, nextConfig])