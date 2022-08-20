/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: false,
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./services/**/*.{js,ts,jsx,tsx}',
		'./utils/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors,
		},
	},
	plugins: [require('daisyui'), require('@tailwindcss/forms')],
};
