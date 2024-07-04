import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/joke': 'https://v2.jokeapi.dev',
      '/quotes': 'https://zenquotes.io/api'
    }
  },
  plugins: [react()],
})
