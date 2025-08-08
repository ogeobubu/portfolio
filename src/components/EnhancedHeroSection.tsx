import React from 'react';
import { Mail, ArrowRight, Star, Code, Users, Zap } from 'lucide-react';
// @ts-ignore
import ogeobubu from "../components/img/main.jpg";

interface EnhancedHeroSectionProps {
  isDark: boolean;
  isLoaded: boolean;
  scrollToSection: (sectionId: string) => void;
}

export const EnhancedHeroSection: React.FC<EnhancedHeroSectionProps> = ({ 
  isDark, 
  isLoaded, 
  scrollToSection 
}) => {
  const stats = [
    { label: "Years Experience", value: "4+", icon: Code },
    { label: "Projects Completed", value: "50+", icon: Star },
    { label: "Happy Clients", value: "25+", icon: Users },
    { label: "Technologies", value: "15+", icon: Zap }
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

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Profile Avatar */}
            <div className="mb-6 sm:mb-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                <div 
                  className="w-full h-full rounded-full p-1 sm:p-2 animate-spin-slow"
                  style={gradientBackground}
                >
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white font-bold text-lg sm:text-3xl">
                    <img src={ogeobubu} alt="ogeobubu" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Frontend
              <br />
              <span 
                className="animate-pulse"
                style={gradientText}
              >
                Solutions-Focused
              </span>
              <br />
              Engineer
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Crafting exceptional digital experiences with modern technologies and innovative solutions. 
              Specializing in secure, responsive applications for finance, legal platforms, and high-security industries.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base text-white"
                style={buttonGradient}
              >
                <span className="text-white">View My Work</span>
                <ArrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="mailto:ogeobubu@gmail.com"
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-2 sm:p-3 rounded-lg transition-all duration-500 delay-${index * 100} ${
                    isDark ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/30 border border-gray-200/50'
                  } ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-105`}
                >
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center"
                    style={gradientBackground}
                  >
                    <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="mt-8 sm:mt-12 animate-bounce">
              <div className="w-6 h-10 mx-auto border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
