/** @type {import('next').NextConfig} */

const API_KEY = process.env.MOVIE_API_KEY;

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	env: {
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		NEXT_PUBLIC_KAKAO_ID:process.env.NEXT_PUBLIC_KAKAO_ID,
		NEXT_PUBLIC_KAKAO_SECRET:process.env.NEXT_PUBLIC_KAKAO_SECRET,
		NEXT_PUBLIC_NAVER_ID:process.env.NEXT_PUBLIC_NAVER_ID,
		NEXT_PUBLIC_NAVER_SECRET:process.env.NEXT_PUBLIC_NAVER_SECRET,
		NEXT_PUBLIC_GOOGLE_ID:process.env.NEXT_PUBLIC_GOOGLE_ID,
		NEXT_PUBLIC_GOOGLE_SECRET:process.env.NEXT_PUBLIC_GOOGLE_SECRET,
	},
	images: {
		loader: 'imgix',
		path: process.env.NEXT_PUBLIC_BACKEND_URL,
	},
	webpack5: true,
	webpack: (config) => {
		config.resolve.fallback = { fs: false };

		return config;
	},
    async rewrites() {
        return [
          {
            source: '/auth/kakao/callback',
            destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/kakao/callback`,
          },
        ]
      },
};

module.exports = nextConfig;
