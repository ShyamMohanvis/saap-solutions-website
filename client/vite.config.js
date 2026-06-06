import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})






