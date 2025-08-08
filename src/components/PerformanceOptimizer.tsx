import React, { useEffect, useRef, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Lazy loading hook
export const useLazyLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { elementRef, isVisible };
};

// Optimized image component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}> = ({ src, alt, className, width, height, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setError(true);

  // Generate WebP and AVIF sources
  const getOptimizedSources = (originalSrc: string) => {
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    return {
      avif: `${baseName}.avif`,
      webp: `${baseName}.webp`,
      original: originalSrc,
    };
  };

  const sources = getOptimizedSources(src);

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className || ''} ${isLoaded ? 'loaded' : ''}`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    );
  }

  return (
    <picture>
      <source srcSet={sources.avif} type="image/avif" />
      <source srcSet={sources.webp} type="image/webp" />
      <img
        src={sources.original}
        alt={alt}
        className={`${className || ''} ${isLoaded ? 'loaded' : ''} lazy`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </picture>
  );
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID
      new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }, []);
};

// Font loading optimization
export const useFontOptimization = () => {
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }, []);
};

// Memory optimization hook
export const useMemoryOptimization = () => {
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc();
      }
    };
  }, []);
};

// Main performance optimizer component
export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  usePerformanceMonitoring();
  useFontOptimization();
  useMemoryOptimization();

  return <>{children}</>;
};

// Lazy loading wrapper component
export const LazyLoad: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}> = ({ children, threshold = 0.1, className = '' }) => {
  const { elementRef, isVisible } = useLazyLoading();

  return (
    <div ref={elementRef} className={`lazy-load ${className}`}>
      {isVisible ? children : <div className="lazy-placeholder" />}
    </div>
  );
};

// Resource preloader
export const ResourcePreloader: React.FC<{
  resources: string[];
}> = ({ resources }) => {
  useEffect(() => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }, [resources]);

  return null;
};

// Performance metrics component
export const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    // Collect performance metrics
    const collectMetrics = () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      setMetrics({
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        total: perfData.loadEventEnd - perfData.fetchStart,
      });
    };

    window.addEventListener('load', collectMetrics);
    return () => window.removeEventListener('load', collectMetrics);
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#000', color: '#fff', padding: 10, fontSize: 12, zIndex: 9999 }}>
        <div>TTFB: {metrics.ttfb?.toFixed(0)}ms</div>
        <div>DOM Ready: {metrics.domContentLoaded?.toFixed(0)}ms</div>
        <div>Total: {metrics.total?.toFixed(0)}ms</div>
      </div>
    );
  }

  return null;
};

export default PerformanceOptimizer;
