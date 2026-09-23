import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Sparkles, Mail, Compass, Star } from 'lucide-react';
import { TypingHeading } from './TypingHeading';
import {
  getStoredProfilePhoto,
  subscribeProfilePhoto,
  DEFAULT_PHOTO_PATHS,
} from '../utils/photoManager';

interface HeroSectionProps {
  onReadMore?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReadMore }) => {
  const [photoSrc, setPhotoSrc] = useState<string>(
    () => getStoredProfilePhoto() || DEFAULT_PHOTO_PATHS[0]
  );
  const [hasPhotoError, setHasPhotoError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeProfilePhoto((newUrl) => {
      if (newUrl) {
        setPhotoSrc(newUrl);
        setHasPhotoError(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleReadMoreClick = () => {
    if (onReadMore) {
      onReadMore();
    } else {
      window.location.hash = '#/about-me';
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-20 sm:pt-28 sm:pb-28 bg-[#f8fbfe] overflow-hidden"
    >
      {/* Precision Dotted Grid Pattern matching the reference screenshot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1.4px, transparent 1.4px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* =========================================================================
            1. MAIN HEADING WITH TYPING ANIMATION (1s each without stopping)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mb-3"
        >
          <TypingHeading
            prefix="Hi, I’m "
            name="Shishir Pokhrel"
            typeDurationMs={1000}
            pauseDurationMs={1200}
          />
        </motion.div>

        {/* Sub-heading in bold uppercase blue tracking */}
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs sm:text-sm font-black text-blue-600 tracking-[0.22em] sm:tracking-[0.25em] uppercase mb-10 sm:mb-12 select-none"
        >
          CLASS 11 COMPUTER SCIENCE STUDENT • BUTWAL, NEPAL
        </motion.p>

        {/* =========================================================================
            2. COOL MOVEMENT PROFILE PHOTO (Harmonic Levitation, Dual Orbit & Ground Shadow)
           ========================================================================= */}
        <div className="relative flex flex-col items-center justify-center my-4 group">
          {/* Floating Harmonic Motion Wrapper */}
          <motion.div
            id="hero-floating-avatar-wrapper"
            animate={{
              y: [0, -14, 0, -8, 0],
              rotate: [0, 1.4, 0, -1.4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.05,
              y: -18,
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            className="relative cursor-pointer select-none"
          >
            {/* Ambient Backlight Pulsing Glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300 via-amber-200 to-blue-400 blur-2xl pointer-events-none -z-20 transform scale-110"
            />

            {/* Orbit Ring 1: Clockwise Dashed Sky Blue with Orbiting Satellite Spark */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-5 sm:-inset-7 rounded-full border border-dashed border-sky-400/80 pointer-events-none -z-10"
            >
              {/* Luminous orbiting cyan dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] border border-white" />
            </motion.div>

            {/* Orbit Ring 2: Counter-Clockwise Subtle Amber Accent Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2.5 sm:-inset-3.5 rounded-full border border-dotted border-amber-300/60 pointer-events-none -z-10"
            >
              {/* Luminous orbiting gold star */}
              <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] border border-white" />
            </motion.div>

            {/* Floating Sparkle Nodes */}
            <motion.div
              animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-2 text-amber-400 pointer-events-none z-30"
            >
              <Star className="w-5 h-5 fill-amber-300 drop-shadow-sm" />
            </motion.div>

            {/* Circular Photo Container with yellow border */}
            <div
              id="hero-profile-avatar-container"
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-1.5 bg-white border-4 border-amber-400 shadow-2xl overflow-visible flex items-center justify-center transition-shadow group-hover:shadow-[0_20px_50px_rgba(250,204,21,0.35)]"
            >
              {/* Image mask */}
              <div className="w-full h-full rounded-full overflow-hidden bg-sky-50 relative flex items-center justify-center">
                {!hasPhotoError ? (
                  <img
                    id="hero-main-photo"
                    src={photoSrc}
                    alt="Shishir Pokhrel"
                    referrerPolicy="no-referrer"
                    onError={() => setHasPhotoError(true)}
                    className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-blue-100 text-blue-950 p-4">
                    <span className="font-display font-black text-3xl text-blue-800">SP</span>
                    <span className="text-xs font-bold text-slate-800 mt-1">Shishir Pokhrel</span>
                  </div>
                )}
              </div>

              {/* Overlapping badge pill at the bottom center of the photo */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="absolute -bottom-3.5 bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Shishir Pokhrel</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Dynamic Breathing Ground Shadow in physical 3D sync with levitation */}
          <motion.div
            animate={{
              scale: [1, 0.82, 1, 0.88, 1],
              opacity: [0.35, 0.16, 0.35, 0.22, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-44 sm:w-56 h-4 bg-sky-950/20 rounded-full blur-md mt-6 pointer-events-none"
          />
        </div>

        {/* =========================================================================
            3. SIMPLE WHITE INTRODUCTION BOX BELOW THE PHOTO
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-sky-200/90 shadow-sm text-center"
        >
          <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
            I am a <strong className="font-bold text-blue-950">Class 11 Computer Science</strong> student
            studying at{' '}
            <strong className="font-bold text-blue-900">
              Everest English Boarding Secondary School
            </strong>
            . I live in{' '}
            <strong className="font-semibold text-slate-900">
              Jitgadhi, Butwal-13, Rupandehi, Nepal
            </strong>
            . I am passionate about technology, coding websites, learning algorithms, and creative video editing.
          </p>

          {/* Action buttons inside the clean card */}
          <div className="mt-6 pt-5 border-t border-sky-100 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="hero-read-more-btn"
              onClick={handleReadMoreClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs sm:text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-950" />
              <span>Read Full Biography</span>
              <ArrowRight className="w-4 h-4 text-blue-950" />
            </button>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-blue-900 font-bold text-xs sm:text-sm transition-colors"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Explore My Journey</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Send a Message</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
