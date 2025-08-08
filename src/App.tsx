import React, { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Globe, Smartphone } from 'lucide-react';
import { EnhancedProjectCard } from './components/EnhancedProjectCard';
import { EnhancedHeroSection } from './components/EnhancedHeroSection';
import { EnhancedNavbar } from './components/EnhancedNavbar';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EnhancedContactSection } from './components/EnhancedContactSection';
import { ThemeToggle } from './components/ThemeToggle';
import { SocialLinks } from './components/SocialLinks';
import { mainProjects, sideProjects } from './data/projects';
import { socialLinks } from './data/socialLinks';
import { Preloader } from './components/Preloader';

const Portfolio: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const [activeSection, setActiveSection] = useState<string>('home');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark';
      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const isDarkTheme = mediaQuery.matches;
      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const isDarkTheme = e.matches;
        setIsDark(isDarkTheme);
        if (isDarkTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsLoaded(true);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
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

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} isDark={isDark} />}

      {!showPreloader && (<>
      <EnhancedNavbar 
        isDark={isDark} 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
      />
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>

      <div className="pt-16">
        {/* Hero Section */}
        <section ref={(el) => sectionsRef.current['home'] = el}>
          <EnhancedHeroSection isDark={isDark} isLoaded={isLoaded} scrollToSection={scrollToSection} />
        </section>



        {/* About Section */}
        <section ref={(el) => sectionsRef.current['about'] = el} className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } transition-all duration-700`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  A passionate frontend engineer with 4+ years of experience specializing in secure, responsive applications. 
                  I focus on web and mobile development, delivering seamless user experiences in finance, legal platforms, 
                  and high-security industries.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                }`}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-400" />
                    Security-First Approach
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Specializing in building secure applications for financial and legal platforms, 
                    ensuring data protection and compliance with industry standards.
                  </p>
                </div>
                
                <div className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                }`}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-purple-400" />
                    Global Reach
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Creating applications that serve users worldwide with responsive design and 
                    optimized performance for various devices and networks.
                  </p>
                </div>
                
                <div className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                }`}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Smartphone className="w-6 h-6 text-pink-400" />
                    Mobile-First Design
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Prioritizing mobile experience with progressive web apps and native-like 
                    performance across all devices and screen sizes.
                  </p>
                </div>
                
                <div className={`p-8 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                }`}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Performance Optimized
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Building lightning-fast applications with optimized bundles, lazy loading, 
                    and modern caching strategies for the best user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={(el) => sectionsRef.current['skills'] = el}>
          <SkillsSection isDark={isDark} isLoaded={isLoaded} />
        </section>

        {/* Experience Section */}
        <section ref={(el) => sectionsRef.current['experience'] = el}>
          <ExperienceTimeline isDark={isDark} isLoaded={isLoaded} />
        </section>

        {/* Projects Section */}
        <section ref={(el) => sectionsRef.current['projects'] = el} className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className={`text-center mb-16 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } transition-all duration-700`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
              <p className="text-xl text-gray-400">
                Showcasing my best work and innovative solutions
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Main Projects */}
              <div className={`rounded-2xl p-8 border transition-all duration-700 ${
                isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'
              } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Main Projects</h3>
                  <div className={`text-sm px-3 py-1 rounded-full ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {mainProjects.length} projects
                  </div>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                  {mainProjects.map((project, index) => (
                    <EnhancedProjectCard
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
              <div className={`rounded-2xl p-8 border transition-all duration-700 ${
                isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'
              } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Side Projects</h3>
                  <div className={`text-sm px-3 py-1 rounded-full ${
                    isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/10 text-purple-600'
                  }`}>
                    {sideProjects.length} projects
                  </div>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                  {sideProjects.map((project, index) => (
                    <EnhancedProjectCard
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
          </div>
        </section>

        {/* Contact Section */}
        <section ref={(el) => sectionsRef.current['contact'] = el}>
          <EnhancedContactSection isDark={isDark} isLoaded={isLoaded} />
        </section>

        <SocialLinks isDark={isDark} socialLinks={socialLinks} />
      </div>
      </>
      )}

      <style>{`
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