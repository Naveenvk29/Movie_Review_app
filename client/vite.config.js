import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://movie-review-app-a5e5.onrender.com",
      "/uploads/": "https://movie-review-app-a5e5.onrender.com",
    },
  },
});
