import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // حذفنا الـ root لأن الملف أصبح بجانبنا
  build: {
    outDir: 'dist', // المجلد الافتراضي
    emptyOutDir: true,
  }
})