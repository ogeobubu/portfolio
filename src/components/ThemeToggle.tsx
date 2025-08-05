import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-500 hover:scale-110 shadow-lg ${
        isDark ? 'bg-gray-800/90 hover:bg-gray-700/90 backdrop-blur-sm' : 'bg-white/90 hover:bg-gray-50/90 backdrop-blur-sm shadow-gray-200'
      }`}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};