/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        port: '',
        protocol: 'https',
        pathname: '/t/p/**',
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default config
