import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression({
  level: 6, // Optimal compression level
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression for all other requests
    return compression.filter(req, res);
  },
}));

// Security headers
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Performance headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  next();
});

// Cache control middleware
const setCacheHeaders = (req, res, next) => {
  const path = req.path;
  
  // HTML files - short cache
  if (path.endsWith('.html') || path === '/') {
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600'); // 5 min browser, 10 min CDN
    res.setHeader('Expires', new Date(Date.now() + 300000).toUTCString());
  }
  // JavaScript files - long cache
  else if (path.endsWith('.js')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }
  // CSS files - long cache
  else if (path.endsWith('.css')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }
  // Images - very long cache
  else if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(path)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }
  // Fonts - very long cache
  else if (/\.(woff|woff2|eot|ttf|otf)$/i.test(path)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }
  // JSON files - medium cache
  else if (path.endsWith('.json')) {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
  }
  // XML files - medium cache
  else if (path.endsWith('.xml')) {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
  }
  // Default - no cache
  else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
};

app.use(setCacheHeaders);

// Serve static files with optimized settings
app.use(express.static('dist', {
  maxAge: '1y',
  immutable: true,
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Add Vary header for compressed content
    if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.html')) {
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }
}));

// Handle SPA routing
app.get('*', (req, res) => {
  // Serve index.html for all routes (SPA)
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Create HTTP server
const server = createServer(app);

// Optimize server settings
server.maxConnections = 1000;
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Performance optimizations enabled:`);
  console.log(`   ✅ Gzip compression`);
  console.log(`   ✅ Cache headers`);
  console.log(`   ✅ Security headers`);
  console.log(`   ✅ Static file optimization`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
