import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';
// import checker from 'vite-plugin-checker';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Bible Verse Scramble',
        short_name: 'BibleVS',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }), ],

  // plugins: [react()],
})
