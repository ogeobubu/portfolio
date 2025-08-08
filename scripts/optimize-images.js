import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const config = {
  inputDir: join(__dirname, '../src/components/img'),
  outputDir: join(__dirname, '../dist/assets/images'),
  spriteOutput: join(__dirname, '../dist/assets/sprites'),
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 80,
  formats: ['webp', 'avif'],
};

// Image optimization function
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if needed
    if (metadata.width > options.maxWidth || metadata.height > options.maxHeight) {
      image.resize(options.maxWidth, options.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Optimize based on format
    if (outputPath.endsWith('.webp')) {
      await image.webp({ quality: options.quality }).toFile(outputPath);
    } else if (outputPath.endsWith('.avif')) {
      await image.avif({ quality: options.quality }).toFile(outputPath);
    } else if (outputPath.endsWith('.jpg') || outputPath.endsWith('.jpeg')) {
      await image.jpeg({ quality: options.quality, progressive: true }).toFile(outputPath);
    } else if (outputPath.endsWith('.png')) {
      await image.png({ compressionLevel: 9 }).toFile(outputPath);
    } else {
      await image.toFile(outputPath);
    }
    
    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

// Create CSS sprite
async function createSprite(images, outputPath, cssOutputPath) {
  try {
    const spriteImages = [];
    let currentX = 0;
    let maxHeight = 0;
    
    // Process each image
    for (const imagePath of images) {
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      spriteImages.push({
        path: imagePath,
        width: metadata.width,
        height: metadata.height,
        x: currentX,
        y: 0,
      });
      
      currentX += metadata.width;
      maxHeight = Math.max(maxHeight, metadata.height);
    }
    
    // Create sprite canvas
    const sprite = sharp({
      create: {
        width: currentX,
        height: maxHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    });
    
    // Composite images onto sprite
    const composites = spriteImages.map(img => ({
      input: img.path,
      top: img.y,
      left: img.x,
    }));
    
    await sprite.composite(composites).png().toFile(outputPath);
    
    // Generate CSS
    const css = generateSpriteCSS(spriteImages, outputPath);
    await writeFile(cssOutputPath, css);
    
    console.log(`✅ Created sprite: ${outputPath}`);
    console.log(`✅ Generated CSS: ${cssOutputPath}`);
  } catch (error) {
    console.error('❌ Error creating sprite:', error);
  }
}

// Generate CSS for sprite
function generateSpriteCSS(images, spritePath) {
  const spriteUrl = spritePath.replace(/^.*\/dist/, '');
  
  let css = `/* Auto-generated sprite CSS */\n`;
  css += `.sprite {\n`;
  css += `  background-image: url('${spriteUrl}');\n`;
  css += `  background-repeat: no-repeat;\n`;
  css += `  display: inline-block;\n`;
  css += `}\n\n`;
  
  images.forEach(img => {
    const className = img.path.split('/').pop().replace(/\.[^/.]+$/, '');
    css += `.sprite-${className} {\n`;
    css += `  width: ${img.width}px;\n`;
    css += `  height: ${img.height}px;\n`;
    css += `  background-position: -${img.x}px -${img.y}px;\n`;
    css += `}\n\n`;
  });
  
  return css;
}

// Main optimization function
async function optimizeImages() {
  try {
    console.log('🚀 Starting image optimization...');
    
    // Create output directories
    await mkdir(config.outputDir, { recursive: true });
    await mkdir(config.spriteOutput, { recursive: true });
    
    // Get all image files
    const files = await readdir(config.inputDir);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file)
    );
    
    console.log(`📁 Found ${imageFiles.length} images to optimize`);
    
    // Optimize each image
    const optimizationPromises = imageFiles.map(async (file) => {
      const inputPath = join(config.inputDir, file);
      const baseName = file.replace(/\.[^/.]+$/, '');
      
      // Create optimized versions
      const promises = [];
      
      // Original format optimization
      const originalExt = file.split('.').pop();
      const optimizedPath = join(config.outputDir, `${baseName}-optimized.${originalExt}`);
      promises.push(optimizeImage(inputPath, optimizedPath, config));
      
      // WebP version
      const webpPath = join(config.outputDir, `${baseName}.webp`);
      promises.push(optimizeImage(inputPath, webpPath, config));
      
      // AVIF version (if supported)
      const avifPath = join(config.outputDir, `${baseName}.avif`);
      promises.push(optimizeImage(inputPath, avifPath, config));
      
      return Promise.all(promises);
    });
    
    await Promise.all(optimizationPromises);
    
    // Create sprites for small images
    const smallImages = imageFiles.filter(async file => {
      const stats = await readFile(join(config.inputDir, file));
      return stats.length < 50 * 1024; // Less than 50KB
    });
    
    if (smallImages.length > 0) {
      const spritePath = join(config.spriteOutput, 'sprite.png');
      const cssPath = join(config.spriteOutput, 'sprite.css');
      
      await createSprite(
        smallImages.map(file => join(config.inputDir, file)),
        spritePath,
        cssPath
      );
    }
    
    console.log('✅ Image optimization completed!');
    
    // Generate optimization report
    await generateReport();
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

// Generate optimization report
async function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    optimizations: {
      totalImages: 0,
      optimizedImages: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      compressionRatio: 0,
    },
    recommendations: [
      'Use WebP format for better compression',
      'Implement lazy loading for images',
      'Use responsive images with srcset',
      'Consider using CSS sprites for small images',
      'Implement progressive JPEG loading',
    ],
  };
  
  const reportPath = join(__dirname, '../dist/optimization-report.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`📊 Optimization report saved: ${reportPath}`);
}

// Run optimization
optimizeImages().catch(console.error);
