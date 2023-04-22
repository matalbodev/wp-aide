import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [react(), image()],
	server: {
		https: true,
		port: 3000,
	},
	vite: {
		plugins: [basicSsl()],
	},
	adapter: vercel(),
});
