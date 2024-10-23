import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "OrgConnect",
        short_name:"OrgConnect",
        description:"OrgConnect web application",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-72x72.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-128x128.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-144x144.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        display: "standalone"
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
