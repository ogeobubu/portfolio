import React, { useEffect, useState } from 'react';
import logo from "./img/ogeobubu-logo-removebg-preview.png";

interface PreloaderProps {
  onComplete: () => void;
  isDark: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, isDark }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)',
              backgroundColor: '#60a5fa' // Fallback
            }}
          ></div>
          <div className={`absolute inset-2 rounded-full ${isDark ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
            <img src={logo} alt="logo" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className={`w-48 h-1 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}>
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)',
              backgroundColor: '#60a5fa', // Fallback
              width: `${progress}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};