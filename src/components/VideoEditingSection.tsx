import React from 'react';
import { motion } from 'motion/react';
import { Film, Sparkles, Scissors, Play } from 'lucide-react';

export const VideoEditingSection: React.FC = () => {
  return (
    <section id="video-editing" className="py-20 relative bg-gradient-to-b from-sky-50/60 via-amber-50/30 to-blue-50/40 border-t border-sky-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white border-2 border-amber-200/80 p-8 sm:p-12 shadow-md relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Section badge in yellowish and blue */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Film className="w-3.5 h-3.5 text-blue-700" />
            <span>Creative Passion</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-blue-950">
            Video Editing
          </h2>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed mt-4 font-normal">
            In my free time, I enjoy editing videos, experimenting with cuts, rhythm, visual pacing, and creative storytelling. I focus on sound alignment, smooth transitions, and dynamic pacing as part of my creative learning.
          </p>

          {/* 3 Creative Editing Highlights in Yellowish, Light Blue, and Blue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-sky-100 text-left">
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2.5">
                <Scissors className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-blue-950">Cuts & Transitions</h4>
              <p className="text-xs text-slate-600 mt-1">
                Pacing scenes cleanly to create smooth, natural visual transitions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-amber-950">Rhythm & Beat Sync</h4>
              <p className="text-xs text-slate-600 mt-1">
                Matching visual changes with audio flow and background music.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-blue-800 text-amber-300 flex items-center justify-center mb-2.5">
                <Play className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-blue-950">Visual Storytelling</h4>
              <p className="text-xs text-slate-600 mt-1">
                Arranging clips to tell a clear and engaging creative story.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
