import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Hammer,
  Code2,
  Layout,
  Film,
  PenTool,
  Compass,
  Sparkles,
  Heart,
  X
} from 'lucide-react';
import { HOBBIES_DATA } from '../data/portfolioData';
import { HobbyItem } from '../types';

export const HobbiesSection: React.FC = () => {
  const [selectedHobby, setSelectedHobby] = useState<HobbyItem | null>(null);

  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-amber-600" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-700" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-sky-600" />;
      case 'Film':
        return <Film className="w-5 h-5 text-amber-500" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-blue-800" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-sky-700" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="hobbies" className="py-20 relative bg-gradient-to-b from-sky-50/40 via-white to-amber-50/30 border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-blue-600" />
            <span>Personal Passions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            My Interests & Daily Disciplines
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-normal">
            In my free time, I like building things, editing videos, exploring technology, practicing my handwriting, and learning something new.
          </p>
        </div>

        {/* 8 Authentic Hobbies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOBBIES_DATA.map((hobby, idx) => (
            <motion.div
              key={hobby.id}
              id={`hobby-item-${hobby.id}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => setSelectedHobby(hobby)}
              className="cursor-pointer rounded-2xl bg-white border border-sky-200 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-amber-50 group-hover:border-amber-300 transition-all">
                {getHobbyIcon(hobby.icon)}
              </div>
              <h3 className="font-display font-bold text-base text-blue-950 group-hover:text-blue-600 transition-colors">
                {hobby.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {hobby.shortDesc}
              </p>
              <div className="mt-3 text-[11px] font-bold text-blue-600 group-hover:text-amber-600 transition-colors">
                Tap to read more →
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Reading Hobby Details */}
        <AnimatePresence>
          {selectedHobby && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-8 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedHobby(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-blue-950 hover:bg-sky-50"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center mb-4">
                  {getHobbyIcon(selectedHobby.icon)}
                </div>

                <h3 className="font-display font-extrabold text-2xl text-blue-950">
                  {selectedHobby.title}
                </h3>

                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {selectedHobby.shortDesc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selectedHobby.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-blue-950 text-xs font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-sky-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedHobby(null)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
