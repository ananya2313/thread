import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    allowedHosts: ['thread-frontend-sfvy.onrender.com'] // ✅ Add this line
  }
})
