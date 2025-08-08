import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    // Gzip compression for all assets
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    // Brotli compression for better compression ratios
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    // Bundle analyzer for optimization insights
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.pdf', '**/*.webp', '**/*.svg'],
  
  // Build optimization
  build: {
    // Enable source maps for debugging
    sourcemap: false,
    
    // Optimize chunk size
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@headlessui/react', 'framer-motion'],
          'icons-vendor': ['lucide-react'],
          'utils-vendor': ['aos', 'react-scroll'],
          
          // Separate chunks for different sections
          'hero': ['./src/components/EnhancedHeroSection.tsx'],
          'portfolio': ['./src/components/EnhancedPortfolio.tsx'],
          'projects': ['./src/components/ProjectCard.tsx', './src/components/EnhancedProjectCard.tsx'],
          'contact': ['./src/components/EnhancedContactSection.tsx'],
          'skills': ['./src/components/SkillsSection.tsx'],
          'experience': ['./src/components/ExperienceTimeline.tsx'],
        },
        
        // Optimize asset file names for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
    },
    
    // Optimize CSS
    cssCodeSplit: true,
    
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  
  // Development server optimization
  server: {
    strictPort: true,
    host: true,
    // Enable compression in development
    compress: true,
    // Optimize HMR
    hmr: {
      overlay: false,
    },
  },
  
  // Preview server optimization
  preview: {
    compress: true,
    host: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@headlessui/react',
      'framer-motion',
      'lucide-react',
      'aos',
      'react-scroll',
    ],
    exclude: ['@tailwindcss/vite'],
  },
  
  // CSS optimization
  css: {
    devSourcemap: false,
  },
});