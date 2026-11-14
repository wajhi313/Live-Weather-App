
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    babel({ presets: [reactCompilerPreset()] }),

    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WeatherBoard',
        short_name: 'WeatherBoard',
        description: 'Your personal weather dashboard',
        theme_color: '#080F1E',
        background_color: '#080F1E',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],

  server: {
    host: true,
    port: 5173
  }
})
