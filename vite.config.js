import * as path from "path"; // For import alias
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const manifest = {
  name: "Skejs",
  short_name: "Skejs",
  theme_color: "#ffffff",
  start_url: ".",
  display: "standalone",
  background_color: "#ffffff",
  orientation: "portrait",
  icons: [
    {
      src: "logo_192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "logo_512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

export default defineConfig({
  plugins: [react(), VitePWA({ manifest })],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }], // Allows import alias like @/components/...
  },
});
