import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // set proxy
  server: {
    proxy: {
      '/api/contactForm': {
        target: "http://localhost:4000",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/contactForms, ''),
        secure: false
      }
    },
  },
  build: {
    outDir: 'build',
  }
})
