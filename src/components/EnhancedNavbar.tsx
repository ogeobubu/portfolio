import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Github, Linkedin, FileText } from 'lucide-react';
// @ts-ignore
import logo from "../components/img/ogeobubu-logo-light.png"
// @ts-ignore
import logoDark from "../components/img/ogeobubu-logo-preview.png"

interface EnhancedNavbarProps {
  isDark: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ 
  isDark, 
  activeSection, 
  scrollToSection 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { name: 'Github', href: 'https://github.com/ogeobubu' },
    { name: 'Linkedin', href: 'https://linkedin.com/in/oge-obubu' },
    { name: 'Resume', href: 'https://www.canva.com/design/DAGvHY8u3KA/5FiqKEtpeOLIxJZ9AOn2xQ/edit?utm_content=DAGvHY8u3KA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
       <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
  <div className="flex items-center justify-between h-full">
    
    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsMobileMenuOpen(true)}
      className="md:hidden p-1 sm:p-2 rounded transition-colors"
      aria-label="Open menu"
    >
      <Menu size={20} className={`sm:w-6 sm:h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
    </button>

    {/* Centered Logo and Name */}
    <div className="flex items-center justify-center flex-grow h-full">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <img src={isDark ? logoDark : logo} alt="logo" className="w-full h-full object-cover rounded-full" />
        </div>
        <h3 className="text-sm sm:text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          OGE OBUBU
        </h3>
      </div>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`px-2 py-1 text-xs sm:text-sm rounded transition-colors ${
            activeSection === item.id
              ? 'text-blue-500 font-medium'
              : isDark 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-black'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>

    {/* Desktop Social Links */}
    <div className="hidden md:flex items-center space-x-1">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1 sm:p-1.5 rounded transition-colors ${
            isDark 
              ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
              : 'text-gray-600 hover:text-black hover:bg-gray-100'
          }`}
        >
          {link.name === 'Github' ? <Github size={14} className="sm:w-4 sm:h-4" /> : 
           link.name === 'Linkedin' ? <Linkedin size={14} className="sm:w-4 sm:h-4" /> : 
           <FileText size={14} className="sm:w-4 sm:h-4" />}
        </a>
      ))}
      <a
        href="mailto:ogeobubu@gmail.com"
        className={`ml-1 px-2 py-1 text-xs sm:text-sm rounded transition-colors ${
          isDark 
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Contact
      </a>
    </div>
  </div>
</div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-64 ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } shadow-xl`}>
            <div className="p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">OO</span>
                  </div>
                  <h2 className="text-base font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    OGE OBUBU
                  </h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded"
                  aria-label="Close menu"
                >
                  <X size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 space-y-1 mb-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded transition-colors text-sm ${
                      activeSection === item.id
                        ? 'bg-blue-500/10 text-blue-500'
                        : isDark 
                          ? 'text-gray-300 hover:bg-gray-800' 
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="mt-auto">
                <div className="flex justify-center space-x-4 mb-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded ${
                        isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-black hover:bg-gray-100'
                      }`}
                    >
                      {link.name === 'Github' ? <Github size={18} /> : 
                       link.name === 'Linkedin' ? <Linkedin size={18} /> : 
                       <FileText size={18} />}
                    </a>
                  ))}
                </div>
                <a
                  href="mailto:ogeobubu@gmail.com"
                  className={`block text-center px-4 py-3 rounded transition-colors text-sm ${
                    isDark 
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};