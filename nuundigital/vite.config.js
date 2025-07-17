import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: false,
    cors: true,
    strictPort: false,
    open: true,
    proxy: {
      '/api': {
        target: 'https://nuundigital.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    https: false,
  },
  define: {
    global: 'globalThis',
  }
})
