import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ThemeToggle } from './components/ThemeToggle';
import { MobileMenu } from './components/MobileMenu';
import { SocialLinks } from './components/SocialLinks';
import { mainProjects, sideProjects } from './data/projects';
import { socialLinks } from './data/socialLinks';
import { Project } from './types';
import { Preloader } from './components/Preloader';

const Portfolio: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsLoaded(true);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const handleVideoHover = (index: number, isHovering: boolean) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.play().catch(e => console.error("Video play failed:", e));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const toggleProjectExpansion = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} isDark={isDark} />}

      {!showPreloader && (<>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <MobileMenu 
        isDark={isDark} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        socialLinks={socialLinks}
      />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className={`transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`rounded-2xl p-4 sm:p-6 mb-6 border transition-all duration-500 ${
            isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
          }`}>
            <h1 className="text-lg sm:text-xl font-light tracking-wider">OGE OBUBU</h1>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hero Section */}
          <div className={`lg:col-span-2 rounded-2xl p-6 sm:p-8 border transition-all duration-700 delay-200 ${
            isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
          } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
              
              <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 flex items-center justify-center animate-spin-slow">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Frontend
              <br />
              <span className="italic font-light bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Solutions-Focused
              </span>
              <br />
              Engineer
            </h2>
          </div>

          {/* Profile Image */}
          <div className={`rounded-2xl overflow-hidden border transition-all duration-700 delay-300 ${
            isDark ? 'border-gray-800/50' : 'border-gray-200/50'
          } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className={`h-48 sm:h-64 lg:h-full flex items-center justify-center ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
            }`}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg sm:text-2xl">
                  OO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className={`rounded-2xl p-4 sm:p-6 mb-6 border transition-all duration-700 delay-400 ${
          isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
        } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mr-4">
              <div className="w-full h-full rounded-full border-2 border-gray-400 flex items-center justify-center animate-spin-slow">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-light tracking-wider">OGE OBUBU</h3>
          </div>
          
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            A FRONTEND ENGINEER WITH 4+ YEARS OF EXPERIENCE SPECIALIZING IN SECURE, RESPONSIVE APPLICATIONS. I 
            FOCUS ON WEB AND MOBILE DEVELOPMENT, DELIVERING SEAMLESS USER EXPERIENCES IN FINANCE, 
            LEGAL PLATFORMS, AND HIGH-SECURITY INDUSTRIES.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          {/* Main Projects */}
          <div className={`rounded-2xl p-4 sm:p-6 border transition-all duration-700 delay-500 ${
            isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
          } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold">Projects</h3>
              <div className={`text-xs px-2 py-1 rounded-full ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
              }`}>
                {mainProjects.length} projects
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {mainProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  isDark={isDark}
                  expandedProject={expandedProject}
                  toggleProjectExpansion={toggleProjectExpansion}
                  handleVideoHover={handleVideoHover}
                />
              ))}
            </div>
          </div>

          {/* Side Projects */}
          <div className={`rounded-2xl p-4 sm:p-6 border transition-all duration-700 delay-600 ${
            isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
          } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold">Side Projects</h3>
              <div className={`text-xs px-2 py-1 rounded-full ${
                isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/10 text-purple-600'
              }`}>
                {sideProjects.length} projects
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {sideProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index + mainProjects.length}
                  isDark={isDark}
                  expandedProject={expandedProject}
                  toggleProjectExpansion={toggleProjectExpansion}
                  handleVideoHover={handleVideoHover}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`rounded-2xl p-4 sm:p-6 mb-6 border transition-all duration-700 delay-700 ${
          isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
        } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Have some questions?
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold flex items-center flex-wrap gap-2">
                Contact me: 
                <a 
                  href="mailto:ogeobubu@gmail.com" 
                  className="text-blue-400 text-lg sm:text-xl hover:text-blue-300 transition-colors inline-flex items-center gap-1 hover:underline "
                >
                  <Mail className="w-4 h-4" />
                  ogeobubu@gmail.com
                </a>
              </h3>
            </div>
          </div>
        </div>

        <SocialLinks isDark={isDark} socialLinks={socialLinks} />
      </div>
      </>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 2px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;