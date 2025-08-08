import React from 'react';
import { Code, Database, Cloud, Shield, Smartphone, Globe, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

interface SkillsSectionProps {
  isDark: boolean;
  isLoaded: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark, isLoaded }) => {
  const skills: Skill[] = [
    { name: "React", level: 95, icon: "⚛️", category: "Frontend" },
    { name: "TypeScript", level: 90, icon: "📘", category: "Frontend" },
    { name: "Next.js", level: 88, icon: "⚡", category: "Frontend" },
    { name: "Tailwind CSS", level: 92, icon: "🎨", category: "Frontend" },
    { name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
    { name: "MongoDB", level: 80, icon: "🍃", category: "Backend" },
    { name: "Express", level: 82, icon: "🖥️", category: "Backend" },
    { name: "AWS", level: 52, icon: "☁️", category: "DevOps" },
    { name: "Vercel", level: 93, icon: "🚀", category: "DevOps" },
    { name: "Netlify", level: 90, icon: "🌐", category: "DevOps" },
    { name: "GitHub Pages", level: 65, icon: "📄", category: "DevOps" }
];

  const categories = [
    { name: "Frontend", icon: Code, color: "from-blue-500 to-purple-500" },
    { name: "Backend", icon: Database, color: "from-green-500 to-blue-500" },
    { name: "DevOps", icon: Cloud, color: "from-orange-500 to-red-500" }
  ];

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-700`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Skills & Technologies</h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">
              Mastered technologies that power modern web applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className={`p-4 sm:p-6 rounded-2xl ${
                  isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
                } transition-all duration-500 delay-${categoryIndex * 200} ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{category.name}</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {getSkillsByCategory(category.name).map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">{skill.icon}</span>
                          <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 font-semibold text-sm sm:text-base">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className={`mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl ${
            isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
          } transition-all duration-700 delay-600 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Specializations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Security</h4>
                <p className="text-xs sm:text-sm text-gray-400">Secure applications for finance & legal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Mobile-First</h4>
                <p className="text-xs sm:text-sm text-gray-400">Responsive & progressive web apps</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Performance</h4>
                <p className="text-xs sm:text-sm text-gray-400">Optimized for speed & efficiency</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Global Scale</h4>
                <p className="text-xs sm:text-sm text-gray-400">Worldwide accessible applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
