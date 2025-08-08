import React from 'react';
import { ExternalLink, ChevronDown, Star, Code, Users, Zap } from 'lucide-react';
import { Project } from '../types';

interface EnhancedProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
  expandedProject: number | null;
  toggleProjectExpansion: (index: number) => void;
  handleVideoHover: (index: number, isHovering: boolean) => void;
}

export const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({
  project,
  index,
  isDark,
  expandedProject,
  toggleProjectExpansion,
  handleVideoHover
}) => {
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('vend')) return <Users className="w-6 h-6" />;
    if (title.toLowerCase().includes('square')) return <Code className="w-6 h-6" />;
    if (title.toLowerCase().includes('mavericks')) return <Zap className="w-6 h-6" />;
    return <Star className="w-6 h-6" />;
  };

  const getProjectColor = (title: string) => {
    if (title.toLowerCase().includes('vend')) return 'from-blue-500 to-purple-500';
    if (title.toLowerCase().includes('square')) return 'from-green-500 to-blue-500';
    if (title.toLowerCase().includes('mavericks')) return 'from-orange-500 to-red-500';
    return 'from-purple-500 to-pink-500';
  };

  // Gradient styles with fallbacks
  const getGradientStyle = (colorClass: string) => {
    const colorMap: { [key: string]: { from: string; to: string; fallback: string } } = {
      "from-blue-500 to-purple-500": { from: "#3b82f6", to: "#8b5cf6", fallback: "#3b82f6" },
      "from-green-500 to-blue-500": { from: "#10b981", to: "#3b82f6", fallback: "#10b981" },
      "from-orange-500 to-red-500": { from: "#f97316", to: "#ef4444", fallback: "#f97316" },
      "from-purple-500 to-pink-500": { from: "#8b5cf6", to: "#ec4899", fallback: "#8b5cf6" }
    };

    const colors = colorMap[colorClass] || { from: "#3b82f6", to: "#8b5cf6", fallback: "#3b82f6" };

    return {
      background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
      backgroundColor: colors.fallback // Fallback
    };
  };

  return (
    <div 
      className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
        isDark ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-gray-100/50 hover:bg-gray-100/70'
      } rounded-xl p-6 border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} hover:shadow-xl`}
      onMouseEnter={() => handleVideoHover(index, true)}
      onMouseLeave={() => handleVideoHover(index, false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={getGradientStyle(getProjectColor(project.title))}
          >
            {getProjectIcon(project.title)}
          </div>
          <h4 className="font-bold text-lg group-hover:text-blue-400 transition-colors line-clamp-2">
            {project.title}
          </h4>
        </div>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-shrink-0 ml-2 p-2 rounded-lg hover:bg-gray-700/50 transition-all hover:scale-110"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
        </a>
      </div>
      
      <div className={`relative rounded-xl h-48 mb-4 overflow-hidden ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className="w-full h-full rounded-xl flex items-center justify-center"
          style={{
            ...getGradientStyle(getProjectColor(project.title)),
            opacity: 0.2
          }}
        >
          <div className="text-center px-4">
            <div 
              className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
              style={getGradientStyle(getProjectColor(project.title))}
            >
              {getProjectIcon(project.title)}
            </div>
            <div className="text-sm font-semibold text-gray-300">{project.title}</div>
            <div className="text-xs text-gray-400 mt-1">Click to visit</div>
          </div>
        </div>
        
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)' // Fallback
          }}
        >
          <div className="p-4 text-white">
            <div className="text-sm font-semibold">View Project</div>
            <div className="text-xs opacity-80">Click to explore →</div>
          </div>
        </div>
      </div>
      
      {project.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isDark ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-200 text-gray-700 border border-gray-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} ${
        expandedProject === index ? '' : 'line-clamp-3'
      }`}>
        {project.description}
      </p>
      
      {project.description.length > 120 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleProjectExpansion(index);
          }}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-3 flex items-center font-medium"
        >
          {expandedProject === index ? 'Show less' : 'Read more'}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
            expandedProject === index ? 'rotate-180' : ''
          }`} />
        </button>
      )}
    </div>
  );
};
