import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
  ],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.pdf'],
  server: {
    strictPort: true,
    host: true,
  },
});