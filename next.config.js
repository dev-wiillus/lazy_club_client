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
};

module.exports = nextConfig;
