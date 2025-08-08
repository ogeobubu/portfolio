import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Performance monitoring configuration
const config = {
  outputDir: join(__dirname, '../dist/performance'),
  metrics: {
    // Core Web Vitals thresholds
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100,  // First Input Delay (ms)
    cls: 0.1,  // Cumulative Layout Shift
    ttfb: 600, // Time to First Byte (ms)
    fcp: 1800, // First Contentful Paint (ms)
  },
};

// Performance metrics tracking
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: {},
      resourceTiming: {},
      userInteractions: {},
      errors: [],
    };
  }

  // Track page load performance
  trackPageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Core Web Vitals
        this.trackLCP();
        this.trackFID();
        this.trackCLS();
        this.trackFCP();
        this.trackTTFB();
        
        // Additional metrics
        this.trackResourceTiming();
        this.trackMemoryUsage();
        this.trackNetworkInfo();
      });
    }
  }

  // Track Largest Contentful Paint
  trackLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.pageLoad.lcp = lastEntry.startTime;
        this.logMetric('LCP', lastEntry.startTime, config.metrics.lcp);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Track First Input Delay
  trackFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.pageLoad.fid = entry.processingStart - entry.startTime;
          this.logMetric('FID', this.metrics.pageLoad.fid, config.metrics.fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  // Track Cumulative Layout Shift
  trackCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.pageLoad.cls = clsValue;
        this.logMetric('CLS', clsValue, config.metrics.cls);
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // Track First Contentful Paint
  trackFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        
        this.metrics.pageLoad.fcp = firstEntry.startTime;
        this.logMetric('FCP', firstEntry.startTime, config.metrics.fcp);
      });
      
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  // Track Time to First Byte
  trackTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navigationEntry = entries.find(entry => entry.entryType === 'navigation');
        
        if (navigationEntry) {
          this.metrics.pageLoad.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          this.logMetric('TTFB', this.metrics.pageLoad.ttfb, config.metrics.ttfb);
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Track resource loading performance
  trackResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const resource = {
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize,
            type: entry.initiatorType,
          };
          
          this.metrics.resourceTiming[entry.name] = resource;
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // Track memory usage
  trackMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      this.metrics.memory = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
  }

  // Track network information
  trackNetworkInfo() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.metrics.network = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };
    }
  }

  // Track user interactions
  trackUserInteractions() {
    if (typeof window !== 'undefined') {
      let interactionCount = 0;
      let lastInteractionTime = Date.now();
      
      const trackInteraction = () => {
        interactionCount++;
        lastInteractionTime = Date.now();
        
        this.metrics.userInteractions = {
          count: interactionCount,
          lastInteraction: lastInteractionTime,
          timeOnPage: Date.now() - performance.timing.navigationStart,
        };
      };
      
      // Track various user interactions
      ['click', 'scroll', 'keydown', 'mousemove'].forEach(event => {
        window.addEventListener(event, trackInteraction, { passive: true });
      });
    }
  }

  // Track errors
  trackErrors() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.metrics.errors.push({
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          timestamp: Date.now(),
        });
      });
      
      window.addEventListener('unhandledrejection', (event) => {
        this.metrics.errors.push({
          type: 'unhandledrejection',
          reason: event.reason,
          timestamp: Date.now(),
        });
      });
    }
  }

  // Log metric with threshold comparison
  logMetric(name, value, threshold) {
    const status = value <= threshold ? '✅' : '❌';
    console.log(`${status} ${name}: ${value}ms (threshold: ${threshold}ms)`);
  }

  // Generate performance report
  async generateReport() {
    try {
      await mkdir(config.outputDir, { recursive: true });
      
      const report = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        metrics: this.metrics,
        thresholds: config.metrics,
        recommendations: this.generateRecommendations(),
      };
      
      const reportFile = join(config.outputDir, 'performance-report.json');
      await writeFile(reportFile, JSON.stringify(report, null, 2));
      
      console.log('📊 Performance report generated:', reportFile);
      return report;
    } catch (error) {
      console.error('❌ Error generating performance report:', error);
    }
  }

  // Generate performance recommendations
  generateRecommendations() {
    const recommendations = [];
    
    // Check Core Web Vitals
    if (this.metrics.pageLoad.lcp > config.metrics.lcp) {
      recommendations.push('Optimize Largest Contentful Paint: Consider lazy loading images, optimizing critical rendering path');
    }
    
    if (this.metrics.pageLoad.fid > config.metrics.fid) {
      recommendations.push('Reduce First Input Delay: Minimize JavaScript execution time, split long tasks');
    }
    
    if (this.metrics.pageLoad.cls > config.metrics.cls) {
      recommendations.push('Improve Cumulative Layout Shift: Set explicit dimensions for images and videos');
    }
    
    if (this.metrics.pageLoad.fcp > config.metrics.fcp) {
      recommendations.push('Optimize First Contentful Paint: Reduce critical resources, optimize server response time');
    }
    
    if (this.metrics.pageLoad.ttfb > config.metrics.ttfb) {
      recommendations.push('Improve Time to First Byte: Optimize server response time, use CDN, enable compression');
    }
    
    // Check resource loading
    const slowResources = Object.values(this.metrics.resourceTiming)
      .filter(resource => resource.duration > 1000);
    
    if (slowResources.length > 0) {
      recommendations.push(`Optimize slow resources: ${slowResources.length} resources taking >1s to load`);
    }
    
    // Check memory usage
    if (this.metrics.memory && this.metrics.memory.usedJSHeapSize > 50 * 1024 * 1024) {
      recommendations.push('High memory usage detected: Consider optimizing JavaScript memory usage');
    }
    
    // Check network conditions
    if (this.metrics.network && this.metrics.network.effectiveType === 'slow-2g') {
      recommendations.push('Slow network detected: Consider implementing offline functionality and progressive enhancement');
    }
    
    return recommendations;
  }

  // Start monitoring
  start() {
    console.log('🚀 Starting performance monitoring...');
    
    this.trackPageLoad();
    this.trackUserInteractions();
    this.trackErrors();
    
    // Generate report after 5 seconds
    setTimeout(() => {
      this.generateReport();
    }, 5000);
  }
}

// Initialize performance monitor
if (typeof window !== 'undefined') {
  const monitor = new PerformanceMonitor();
  monitor.start();
  
  // Make monitor available globally for debugging
  window.performanceMonitor = monitor;
}

export default PerformanceMonitor;
