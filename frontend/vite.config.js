import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jquery', 'popper.js', 'bootstrap', 'summernote']
  },
  resolve: {
    alias: {
      jquery: 'jquery',
      jQuery: 'jquery'
    }
  },
  define: {
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }
})
