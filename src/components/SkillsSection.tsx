import React from 'react';
import { motion } from 'motion/react';
import { Code, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILLS_CATEGORIZED } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const categories = [
    {
      id: 'basic',
      title: 'Basic Knowledge',
      subtitle: 'Languages studied in coursework',
      badge: 'Foundations',
      cardStyle: 'bg-sky-50/70 border-sky-200 hover:border-blue-400',
      badgeStyle: 'bg-sky-100 text-blue-900 border-sky-300',
      dotColor: 'bg-blue-600',
      description: 'Understood syntax, conditional statements, basic data structures, and procedural flow.',
      items: SKILLS_CATEGORIZED.basic,
    },
    {
      id: 'learning',
      title: 'Currently Learning',
      subtitle: 'Active daily study & practice',
      badge: 'Active Study',
      cardStyle: 'bg-amber-50/70 border-2 border-amber-300 hover:border-amber-400 shadow-sm',
      badgeStyle: 'bg-amber-100 text-amber-950 border-amber-300 font-extrabold',
      dotColor: 'bg-amber-500',
      description: 'Writing code every day, following tutorials, and building responsive web layouts.',
      items: SKILLS_CATEGORIZED.learning,
    },
    {
      id: 'creative',
      title: 'Creative Skills',
      subtitle: 'Self-taught practical skills',
      badge: 'Hands-On',
      cardStyle: 'bg-blue-50/70 border-blue-200 hover:border-blue-400',
      badgeStyle: 'bg-blue-100 text-blue-950 border-blue-300',
      dotColor: 'bg-blue-800',
      description: 'Designing website interfaces and video editing with motion pacing and visual transitions.',
      items: SKILLS_CATEGORIZED.creative,
    },
  ];

  return (
    <section id="skills" className="py-20 relative bg-white border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <Code className="w-3.5 h-3.5 text-blue-700" />
            <span>Technical & Creative</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            Skills & What I'm Learning
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-normal">
            Real skills I study and practice regularly as a Class 11 Computer Science student.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all ${cat.cardStyle}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${cat.badgeStyle}`}>
                    {cat.badge}
                  </span>
                  <span className="text-xs text-blue-900 font-bold">
                    {cat.items.length} Skills
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-blue-950">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5 mb-3">
                  {cat.subtitle}
                </p>

                <p className="text-xs text-slate-700 leading-relaxed mb-6 font-normal">
                  {cat.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3.5 py-2 rounded-xl bg-white border border-sky-200 shadow-2xs flex items-center gap-2"
                    >
                      <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                      <span className="text-xs font-bold text-slate-900">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] text-slate-600 font-medium">
                {cat.id === 'learning' ? 'Practiced daily with code exercises' : 'Applied in school and personal learning'}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
