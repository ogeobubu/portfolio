import React from 'react';
import { SocialLink } from '../types';

interface SocialLinksProps {
  isDark: boolean;
  socialLinks: SocialLink[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ isDark, socialLinks }) => {
  return (
    <div className={`rounded-2xl p-4 border transition-all duration-700 delay-800 ${
      isDark ? 'bg-gray-900/50 border-gray-800/50 backdrop-blur-sm' : 'bg-gray-50/50 border-gray-200/50 backdrop-blur-sm'
    }`}>
      <div className="grid grid-cols-2 sm:flex sm:justify-between gap-2">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDark ? 'hover:bg-gray-800/70' : 'hover:bg-gray-200/70'
              }`}
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-medium">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};