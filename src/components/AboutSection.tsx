import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Code2, Hammer, Film, MapPin, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onReadMore?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onReadMore }) => {
  const handleReadMoreClick = () => {
    if (onReadMore) {
      onReadMore();
    } else {
      window.location.hash = '#/about-me';
    }
  };

  const visualCards = [
    {
      id: 'learning',
      title: 'Learning',
      subtitle: 'Curiosity & Discipline',
      description: 'Exploring computing tutorials, algorithms, and acquiring new knowledge on a daily basis.',
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      tag: 'Daily Habit',
      bgTag: 'bg-sky-50 text-blue-800 border-sky-200',
    },
    {
      id: 'coding',
      title: 'Coding',
      subtitle: 'Logic & Structure',
      description: 'Practicing programming in C and Python, understanding how computer logic operates.',
      icon: <Code2 className="w-5 h-5 text-amber-600" />,
      tag: 'Foundations',
      bgTag: 'bg-amber-50 text-amber-900 border-amber-300',
    },
    {
      id: 'building',
      title: 'Building',
      subtitle: 'Hands-on Web Design',
      description: 'Translating design ideas into responsive web pages with clean HTML, CSS, and modern code.',
      icon: <Hammer className="w-5 h-5 text-blue-700" />,
      tag: 'Creation',
      bgTag: 'bg-blue-50 text-blue-900 border-blue-200',
    },
    {
      id: 'editing',
      title: 'Editing',
      subtitle: 'Visual Pacing & Rhythm',
      description: 'Cutting videos, matching transitions to sound rhythm, and polishing creative visual flow.',
      icon: <Film className="w-5 h-5 text-amber-500" />,
      tag: 'Creative',
      bgTag: 'bg-amber-100/70 text-amber-950 border-amber-300',
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-white border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>About Me</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            A Student Who Enjoys Building & Learning
          </h2>
        </div>

        {/* Narrative & Context Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Human Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-sky-50/70 via-white to-amber-50/40 border-2 border-sky-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* The exact requested human student text */}
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
                I enjoy learning new things and trying something different every day. I like building things, creating websites, learning coding, editing videos, and improving my skills alongside my studies. I also practice handwriting and enjoy using my free time to learn and create.
              </p>

              {/* Honest reflection on student stage */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-4 font-normal">
                I am currently in Class 11 studying Computer Science at Everest English Boarding Secondary School in Butwal, Nepal. Instead of waiting for the future, I use my present days to explore programming languages, experiment with web design, and practice disciplines like neat handwriting and video editing.
              </p>

              <div className="mt-8 pt-6 border-t border-sky-200/80 flex flex-wrap gap-3 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-sky-200 text-blue-950 shadow-2xs">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Rupandehi, Butwal-13, Jitgadhi, Nepal
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200 text-amber-950 shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  Everest English Boarding Secondary School
                </span>
              </div>
            </div>

            {/* Direct Option to Read More on the Dedicated Page */}
            <div className="mt-8 pt-6 border-t border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 p-4 rounded-2xl border border-amber-200">
              <div>
                <h4 className="font-bold text-sm text-blue-950">Read Complete Biography & Story</h4>
                <p className="text-xs text-slate-600 mt-0.5">Explore full background, coding journey, and future ambitions.</p>
              </div>
              <button
                type="button"
                id="about-read-more-btn"
                onClick={handleReadMoreClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs transition-colors shrink-0 shadow-xs"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* 4 Distinct Cards: Learning, Coding, Building, Editing (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {visualCards.map((item, idx) => (
              <motion.div
                key={item.id}
                id={`about-card-${item.id}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-xl bg-white border border-sky-200/80 p-4.5 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-base text-blue-950">
                        {item.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.bgTag}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
