import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const { site } = JSON.parse(readFileSync('./src/data/content.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  // Set site.baseUrl in src/data/content.json to deploy at any subpath —
  // '.' keeps the build portable across GitHub Pages, Vercel, Netlify, etc.
  base: site.baseUrl,
  plugins: [react(), tailwindcss()],
})
