import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['*'],  // Allows all hosts for preview
    port: 4173,  // Make sure it binds to a port that Render allows, typically 4173 works fine
  }
})
