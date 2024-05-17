/// <reference types="vitest" />
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://coderealmhub.github.io/smart-signage-player/", // when deploying on github
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
  build: {
    outDir: "./demo",
  },
});
