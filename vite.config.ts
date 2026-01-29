import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  // 核心修正 1：加上 base 路徑，這樣 GitHub 才能正確找到你的圖片和腳本
  base: process.env.NODE_ENV === "production" ? "/ntu-econsa-replit/" : "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // ... 前面的 plugins 和 resolve 保持不變
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // 建議改為相對路徑，確保它會產出在專案根目錄的 dist 資料夾
    outDir: "../dist", 
    emptyOutDir: true,
  },
});