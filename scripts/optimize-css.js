import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const config = {
  inputDir: join(__dirname, '../src'),
  outputDir: join(__dirname, '../dist/assets/css'),
  criticalCSSPath: join(__dirname, '../dist/critical.css'),
  inlineThreshold: 14 * 1024, // 14KB - inline CSS smaller than this
};

// CSS optimization function
async function optimizeCSS(cssContent, options = {}) {
  const plugins = [
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11',
      ],
    }),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true,
        mergeLonghand: true,
        mergeRules: true,
        reduceIdents: false,
        reduceInitial: true,
        reduceTransforms: true,
        uniqueSelectors: true,
        zindex: false,
      }],
    }),
  ];

  try {
    const result = await postcss(plugins).process(cssContent, {
      from: undefined,
      to: undefined,
    });
    
    return result.css;
  } catch (error) {
    console.error('❌ Error optimizing CSS:', error);
    return cssContent;
  }
}

// Extract critical CSS
async function extractCriticalCSS(htmlContent) {
  // This is a simplified critical CSS extraction
  // In production, you might want to use a more sophisticated tool
  const criticalSelectors = [
    // Critical above-the-fold styles
    'body', 'html', '#root', '.loading',
    '.animate-spin-slow', '.sr-only', '.sr-only-focusable',
    // Add more critical selectors based on your app
  ];
  
  // This would need to be implemented with a proper CSS parser
  // For now, we'll return a basic critical CSS
  return `
    /* Critical CSS - Above the fold */
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    #root { min-height: 100vh; }
    .loading { display: flex; justify-content: center; align-items: center; height: 100vh; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .sr-only-focusable:focus { position: static; width: auto; height: auto; }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
  `;
}

// Combine CSS files
async function combineCSSFiles() {
  try {
    console.log('🚀 Starting CSS optimization...');
    
    // Create output directory
    await mkdir(config.outputDir, { recursive: true });
    
    // Find all CSS files
    const cssFiles = await findCSSFiles(config.inputDir);
    console.log(`📁 Found ${cssFiles.length} CSS files to optimize`);
    
    let combinedCSS = '';
    const fileHashes = [];
    
    // Read and combine all CSS files
    for (const file of cssFiles) {
      const content = await readFile(file, 'utf-8');
      combinedCSS += `/* ${file} */\n${content}\n\n`;
      
      // Generate hash for cache busting
      const hash = createHash('md5').update(content).digest('hex').substring(0, 8);
      fileHashes.push({ file, hash });
    }
    
    // Optimize combined CSS
    const optimizedCSS = await optimizeCSS(combinedCSS);
    
    // Generate hash for the combined file
    const combinedHash = createHash('md5').update(optimizedCSS).digest('hex').substring(0, 8);
    const outputFile = join(config.outputDir, `bundle-${combinedHash}.css`);
    
    // Write optimized CSS
    await writeFile(outputFile, optimizedCSS);
    console.log(`✅ Combined CSS saved: ${outputFile}`);
    
    // Extract critical CSS
    const criticalCSS = await extractCriticalCSS('');
    const criticalHash = createHash('md5').update(criticalCSS).digest('hex').substring(0, 8);
    const criticalFile = join(config.outputDir, `critical-${criticalHash}.css`);
    
    await writeFile(criticalFile, criticalCSS);
    console.log(`✅ Critical CSS saved: ${criticalFile}`);
    
    // Generate CSS manifest
    const manifest = {
      bundle: {
        file: `bundle-${combinedHash}.css`,
        hash: combinedHash,
        size: optimizedCSS.length,
      },
      critical: {
        file: `critical-${criticalHash}.css`,
        hash: criticalHash,
        size: criticalCSS.length,
      },
      files: fileHashes,
      timestamp: new Date().toISOString(),
    };
    
    const manifestFile = join(config.outputDir, 'css-manifest.json');
    await writeFile(manifestFile, JSON.stringify(manifest, null, 2));
    console.log(`✅ CSS manifest saved: ${manifestFile}`);
    
    // Generate inline CSS for small files
    await generateInlineCSS(optimizedCSS);
    
    console.log('✅ CSS optimization completed!');
    
    return manifest;
    
  } catch (error) {
    console.error('❌ Error during CSS optimization:', error);
  }
}

// Find all CSS files recursively
async function findCSSFiles(dir) {
  const files = [];
  
  async function scanDirectory(currentDir) {
    try {
      const items = await readdir(currentDir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = join(currentDir, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          await scanDirectory(fullPath);
        } else if (item.isFile() && /\.css$/i.test(item.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }
  
  await scanDirectory(dir);
  return files;
}

// Generate inline CSS for small files
async function generateInlineCSS(cssContent) {
  if (cssContent.length <= config.inlineThreshold) {
    const inlineFile = join(config.outputDir, 'inline.css');
    await writeFile(inlineFile, cssContent);
    console.log(`✅ Inline CSS generated: ${inlineFile}`);
  }
}

// Generate CSS loading strategy
async function generateCSSLoadingStrategy() {
  const strategy = `
    /* CSS Loading Strategy */
    
    /* 1. Inline critical CSS */
    <style id="critical-css">
      /* Critical CSS will be inlined here */
    </style>
    
    /* 2. Preload main CSS bundle */
    <link rel="preload" href="/assets/css/bundle-[hash].css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/assets/css/bundle-[hash].css"></noscript>
    
    /* 3. Load non-critical CSS asynchronously */
    <link rel="preload" href="/assets/css/non-critical-[hash].css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    
    /* 4. Fallback for older browsers */
    <script>
      // CSS loading fallback
      function loadCSS(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
      
      // Load CSS if preload fails
      setTimeout(function() {
        var links = document.querySelectorAll('link[rel="preload"][as="style"]');
        links.forEach(function(link) {
          if (link.rel !== 'stylesheet') {
            link.rel = 'stylesheet';
          }
        });
      }, 3000);
    </script>
  `;
  
  const strategyFile = join(config.outputDir, 'loading-strategy.html');
  await writeFile(strategyFile, strategy);
  console.log(`✅ CSS loading strategy saved: ${strategyFile}`);
}

// Generate performance report
async function generatePerformanceReport(manifest) {
  const report = {
    timestamp: new Date().toISOString(),
    cssOptimization: {
      totalFiles: manifest.files.length,
      bundleSize: manifest.bundle.size,
      criticalSize: manifest.critical.size,
      compressionRatio: ((manifest.bundle.size / (manifest.files.reduce((acc, file) => acc + file.size, 0))) * 100).toFixed(2),
    },
    recommendations: [
      'Use critical CSS inlining for above-the-fold content',
      'Load non-critical CSS asynchronously',
      'Use CSS preloading for better performance',
      'Consider using CSS-in-JS for component-specific styles',
      'Implement CSS purging to remove unused styles',
    ],
  };
  
  const reportFile = join(config.outputDir, 'performance-report.json');
  await writeFile(reportFile, JSON.stringify(report, null, 2));
  console.log(`📊 Performance report saved: ${reportFile}`);
}

// Main function
async function optimizeCSSFiles() {
  try {
    const manifest = await combineCSSFiles();
    await generateCSSLoadingStrategy();
    await generatePerformanceReport(manifest);
    
    console.log('🎉 CSS optimization completed successfully!');
  } catch (error) {
    console.error('❌ Error during CSS optimization:', error);
  }
}

// Run optimization
optimizeCSSFiles().catch(console.error);
