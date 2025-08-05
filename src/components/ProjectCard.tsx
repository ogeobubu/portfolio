import React from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isDark: boolean;
  expandedProject: number | null;
  toggleProjectExpansion: (index: number) => void;
  handleVideoHover: (index: number, isHovering: boolean) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isDark,
  expandedProject,
  toggleProjectExpansion,
  handleVideoHover
}) => {
  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isDark ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-gray-100/50 hover:bg-gray-100/70'
      } rounded-xl p-4 border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
      onMouseEnter={() => handleVideoHover(index, true)}
      onMouseLeave={() => handleVideoHover(index, false)}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-sm sm:text-base group-hover:text-blue-400 transition-colors line-clamp-2">
          {project.title}
        </h4>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-shrink-0 ml-2"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all hover:scale-110" />
        </a>
      </div>
      
      <div className={`relative rounded-lg h-32 sm:h-40 mb-3 overflow-hidden ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className="text-xs text-gray-400 text-center px-2">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
            <div>{project.title}</div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-3 text-white text-xs">
            Click to visit →
          </div>
        </div>
      </div>
      
      {project.tags && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className={`text-xs px-2 py-1 rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'} ${
        expandedProject === index ? '' : 'line-clamp-2'
      }`}>
        {project.description}
      </p>
      
      {project.description.length > 100 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleProjectExpansion(index);
          }}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2 flex items-center"
        >
          {expandedProject === index ? 'Show less' : 'Show more'}
          <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${
            expandedProject === index ? 'rotate-180' : ''
          }`} />
        </button>
      )}
    </div>
  );
};