import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    minify: 'esbuild', // Fast minification
    cssCodeSplit: true, // Split CSS per chunk
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React vendor bundle
          'vendor-react': ['react', 'react-dom', 'react/jsx-runtime'],
          // Separate router
          'vendor-router': ['wouter'],
          // Separate animation library (heavy)
          'vendor-motion': ['framer-motion'],
          // Separate icons (large)
          'vendor-icons': ['lucide-react'],
          // Separate UI components
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          // Separate form/query libraries
          'vendor-data': [
            '@tanstack/react-query',
          ],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      strict: true,
      deny: [".env", ".env.*", "**/.git/**"],
    },
  },
});
