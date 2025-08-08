import React from 'react';
import { Calendar, MapPin, Building, Award, Star } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

interface ExperienceTimelineProps {
  isDark: boolean;
  isLoaded: boolean;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ isDark, isLoaded }) => {
    const experiences: Experience[] = [
        {
          title: "Frontend Engineer",
          company: "FinesseCodes",
          period: "Feb 2022–Present",
          location: "Remote",
          description: "Lead frontend development for multiple products serving thousands of monthly users.",
          achievements: [
            "Led frontend for 3 products (Core Health Laboratory, Squarebox, Mavericks) serving 1K+ monthly users",
            "Mentored 2 junior developers, reducing onboarding time by 40%",
            "Optimized React rendering, cutting latency by 22%",
            "Boosted user engagement by 33.4% through optimized UI components"
          ],
          technologies: ["React", "JavaScript", "TypeScript", "Redux", "React Query", "Git"]
        },
        {
          title: "Mid-Level Frontend Engineer",
          company: "MitochronHub",
          period: "Jul 2023–Jul 2024",
          location: "Lagos, Nigeria",
          description: "Developed frontend solutions for VendStash email templates and legacy component refactoring.",
          achievements: [
            "Built email templates for VendStash, reaching 1K+ users",
            "Refactored legacy components, improving load speed by 30%"
          ],
          technologies: ["React", "JavaScript", "HTML5", "CSS3", "Git"]
        },
        {
          title: "Frontend Developer",
          company: "Freelancer",
          period: "2019–2025",
          location: "Remote",
          description: "Developed frontend solutions for multiple projects during education and freelance work.",
          achievements: [
            "Achieved #1 Google ranking for Rotary Club website via React optimization and SEO best practices",
            "Built React platform connecting 80+ students with housing for Hostel Initiative",
            "Developed e-commerce UI for Cashlet using React + MaterialUI",
            "Created UI for Recycle Axis with React + MaterialUI"
          ],
          technologies: ["React", "JavaScript", "MaterialUI", "SEO", "Git"]
        }
    ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-700`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Professional Experience</h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">
              My journey in software development
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 ${
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            }`}></div>
            
            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative transition-all duration-500 delay-${index * 200} ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 sm:left-8 w-4 h-4 rounded-full border-4 ${
                    isDark ? 'bg-gray-800 border-blue-500' : 'bg-white border-blue-500'
                  } transform -translate-x-1/2 z-10`}>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-8 sm:ml-16 p-6 sm:p-8 rounded-2xl ${
                    isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                  } hover:shadow-lg transition-all duration-300`}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <h3 className="text-lg sm:text-xl font-bold text-blue-400">{exp.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm sm:text-base text-gray-400 mb-2">
                          <span className="font-medium">{exp.company}</span>
                          {exp.location && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{exp.location}</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      
                      {/* Technologies */}
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1 mt-3 sm:mt-0">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className={`text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {exp.description}
                    </p>
                    
                    {/* Achievements */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <h4 className="font-semibold text-sm sm:text-base">Key Achievements</h4>
                      </div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start gap-2">
                            <Star className="w-3 h-3 text-blue-400 mt-1 flex-shrink-0" />
                            <span className={`text-xs sm:text-sm leading-relaxed ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Timeline End Point */}
            <div className={`absolute left-4 sm:left-8 bottom-0 w-4 h-4 rounded-full border-4 ${
              isDark ? 'bg-gray-800 border-green-500' : 'bg-white border-green-500'
            } transform -translate-x-1/2`}>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className={`text-center mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl ${
            isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
          } transition-all duration-700 delay-800 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready for the Next Chapter</h3>
            <p className={`text-sm sm:text-base mb-6 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Looking for new opportunities to create impactful solutions and grow with innovative teams.
            </p>
            <a 
              href="mailto:ogeobubu@gmail.com"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Let's Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
