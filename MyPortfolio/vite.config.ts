import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // الحل الأبسط والأضمن: مسار نسبي مباشر
  root: 'client',
  build: {
    // نخرج من مجلد كلاينت خطوة للوراء ثم ندخل ديست
    outDir: '../dist',
    emptyOutDir: true,
  }
})