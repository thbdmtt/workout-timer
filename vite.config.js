import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifest = {
  name: 'Bodyweight Workout App',
  short_name: 'Bodyweight',
  description: 'Workout timer application',
  icons: [
    {
      src: '/icons/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  theme_color: '#0a0a0a',
  background_color: '#0a0a0a',
  display: 'standalone',
  start_url: '/',
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,webmanifest}'],
      },
    }),
  ],
})
