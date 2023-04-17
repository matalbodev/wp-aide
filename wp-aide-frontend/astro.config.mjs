import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import basicSsl from "@vitejs/plugin-basic-ssl";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), react()],
  vite: {
    plugins: [basicSsl()]
  },
  adapter: vercel()
});