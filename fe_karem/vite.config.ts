import { defineConfig } from "vite";
import path from "path"
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
 base: "/",
 plugins: [react(), TanStackRouterVite()],
 resolve: {
   alias: {
     "@": path.resolve(__dirname, "./src"),
   },
 },
 preview: {
  port: 5173,
  strictPort: true,
 },
 server: {
  port: 5173,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:5173",
 },
});