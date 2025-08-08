import React, { useState, useEffect, useRef } from 'react';
import { Mail, Download, ArrowRight, Star, Code, Briefcase, Award, Users, Zap, Shield, Globe, Smartphone } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { SocialLinks } from './SocialLinks';
import { mainProjects, sideProjects } from '../data/projects';
import { socialLinks } from '../data/socialLinks';
import { Project } from '../types';
import { Preloader } from './Preloader';

const EnhancedPortfolio: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const skills = [
    { name: "React", level: 95, icon: "⚛️" },
    { name: "TypeScript", level: 90, icon: "📘" },
    { name: "Next.js", level: 88, icon: "⚡" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Tailwind CSS", level: 92, icon: "🎨" },
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "AWS", level: 70, icon: "☁️" }
  ];

  const experiences = [
    {
      title: "Senior Frontend Engineer",
      company: "TechCorp Solutions",
      period: "2023 - Present",
      description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing best practices.",
      achievements: ["Reduced bundle size by 40%", "Improved performance by 60%", "Led team of 5 developers"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Innovations",
      period: "2021 - 2023",
      description: "Developed responsive web applications and mobile-first solutions for various clients.",
      achievements: ["Built 10+ client projects", "Implemented CI/CD pipelines", "Optimized loading times"]
    },
    {
      title: "Junior Developer",
      company: "StartUp Inc",
      period: "2020 - 2021",
      description: "Started career with focus on React and modern web technologies.",
      achievements: ["Learned React ecosystem", "Contributed to open source", "Built first commercial app"]
    }
  ];

  const stats = [
    { label: "Years Experience", value: "4+", icon: Briefcase },
    { label: "Projects Completed", value: "50+", icon: Code },
    { label: "Happy Clients", value: "25+", icon: Users },
    { label: "Awards Won", value: "3", icon: Award }
  ];

  // Gradient styles with fallbacks
  const gradientBackground = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    backgroundColor: '#3b82f6' // Fallback
  };

  const gradientText = {
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    color: isDark ? '#60a5fa' : '#3b82f6' // Fallback
  };

  const buttonGradient = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    backgroundColor: '#3b82f6' // Fallback
  };

  const progressGradient = {
    background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)',
    backgroundColor: '#60a5fa' // Fallback
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} isDark={isDark} />}

      {!showPreloader && (<>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <MobileMenu 
        isDark={isDark} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        socialLinks={socialLinks}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDark ? 'bg-black/80 backdrop-blur-md border-b border-gray-800/50' : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 
                className="text-xl font-bold"
                style={gradientText}
              >
                OGE OBUBU
              </h1>
              <div className="hidden md:flex space-x-6">
                {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 hover:text-blue-400 ${
                      activeSection === section ? 'text-blue-400' : ''
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-900'}`}></div>
                <div className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-900'}`}></div>
                <div className={`w-6 h-0.5 transition-all ${isDark ? 'bg-white' : 'bg-gray-900'}`}></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Hero Section */}
        <section
          ref={(el) => {
            // Only assign if el is a HTMLDivElement
            if (el && el instanceof HTMLDivElement) {
              sectionsRef.current['home'] = el;
            }
          }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className={`transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="mb-8">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full p-1"
                    style={gradientBackground}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-2xl">
                      OO
                    </div>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Frontend
                    <br />
                    <span style={gradientText}>
                      Solutions-Focused
                    </span>
                    <br />
                    Engineer
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Crafting exceptional digital experiences with modern technologies and innovative solutions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => scrollToSection('projects')}
                      className="px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-white"
                      style={buttonGradient}
                    >
                      View My Work
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <a 
                      href="mailto:ogeobubu@gmail.com"
                      className="px-8 py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Get In Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl transition-all duration-500 delay-${index * 100} ${
                    isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                  } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={gradientBackground}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={(el) => sectionsRef.current['about'] = el as HTMLDivElement | null} className="py-20">
          <div className="container mx-auto px-4">
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
        <section ref={(el) => sectionsRef.current['skills'] = el as HTMLDivElement | null} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } transition-all duration-700`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
                <p className="text-xl text-gray-400">
                  Mastered technologies that power modern web applications
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl ${
                      isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                    } transition-all duration-500 delay-${index * 100} ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          ...progressGradient,
                          width: `${skill.level}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section ref={(el) => sectionsRef.current['experience'] = el as HTMLDivElement | null} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } transition-all duration-700`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Experience</h2>
                <p className="text-xl text-gray-400">
                  My journey in software development
                </p>
              </div>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    className={`p-8 rounded-2xl ${
                      isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                    } transition-all duration-500 delay-${index * 200} ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-blue-400">{exp.title}</h3>
                        <p className="text-lg text-gray-300">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                    </div>
                    <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <span 
                          key={achievementIndex}
                          className={`text-xs px-3 py-1 rounded-full ${
                            isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                          }`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={(el) => sectionsRef.current['projects'] = el as HTMLDivElement | null} className="py-20">
          <div className="container mx-auto px-4">
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
          </div>
        </section>

        {/* Contact Section */}
        <section ref={(el) => sectionsRef.current['contact'] = el as HTMLDivElement | null} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-16 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } transition-all duration-700`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
                <p className="text-xl text-gray-400">
                  Ready to bring your ideas to life? Let's discuss your next project
                </p>
              </div>
              
              <div className={`rounded-2xl p-8 border ${
                isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'
              }`}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      I'm always interested in new opportunities and exciting projects. 
                      Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div className="space-y-4">
                      <a 
                        href="mailto:ogeobubu@gmail.com"
                        className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        ogeobubu@gmail.com
                      </a>
                      <div className="flex items-center gap-3 text-gray-400">
                        <Globe className="w-5 h-5" />
                        Available for remote work worldwide
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What I Offer</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>Custom Web Applications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>Mobile-First Design</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>Performance Optimization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span>Security Implementation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default EnhancedPortfolio;
