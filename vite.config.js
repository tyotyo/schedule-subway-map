import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Schedule Subway Map — Vite + React. Plain JSX, no TS.
// base "./" → relative asset URLs so the build works at any subpath
// (GitHub Pages project site: /schedule-subway-map/). Safe here because
// routing is hash-based, so the document path never changes after load.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5180, open: true },
});
