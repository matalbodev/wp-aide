/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			display: ["Inter"],
			body: ["Inter"],
			sans: ["InterVariable", "Inter"],
		},
		extend: {
			fontFamily: {
				sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"yellow-theme": "#fcd034",
				"blue-theme": "#17213c",
			},
		},
	},
	plugins: [],
};
