import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.join(process.cwd(), "client"), // بنحدد الروت جوه client
  resolve: {
    alias: {
      "@": path.join(process.cwd(), "client", "src"),
      "@shared": path.join(process.cwd(), "shared"),
    },
  },
  build: {
    outDir: path.join(process.cwd(), "dist"), // بنخرج الملفات في dist بره خالص
    emptyOutDir: true,
  },
});