import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jquery', 'bootstrap', 'popper.js', 'summernote']
  },
  resolve: {
    alias: {
      jQuery: 'jquery',
      jquery: 'jquery'
    }
  },
  define: {
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }
})
