import React from 'react';
import { X } from 'lucide-react';
import { SocialLink } from '../types';

interface MobileMenuProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  socialLinks: SocialLink[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isDark, 
  isOpen, 
  onClose, 
  socialLinks 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 sm:hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className={`absolute top-20 left-4 right-4 rounded-2xl p-6 ${
        isDark ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-sm border ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};