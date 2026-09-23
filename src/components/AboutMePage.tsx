import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Sparkles,
  BookOpen,
  Mail,
  Code2,
  Film
} from 'lucide-react';
import {
  getStoredProfilePhoto,
  subscribeProfilePhoto,
  DEFAULT_PHOTO_PATHS
} from '../utils/photoManager';

interface AboutMePageProps {
  onBackToHome: () => void;
}

export const AboutMePage: React.FC<AboutMePageProps> = ({ onBackToHome }) => {
  const [photoSrc, setPhotoSrc] = useState<string>(() => getStoredProfilePhoto() || DEFAULT_PHOTO_PATHS[0]);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const unsubscribe = subscribeProfilePhoto((newUrl) => {
      if (newUrl) {
        setPhotoSrc(newUrl);
        setPhotoError(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-24 font-sans">
      {/* Top Sticky Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-200 py-3 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            type="button"
            id="back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-blue-900 border border-sky-200 font-bold text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Shishir Pokhrel • Full Biography</span>
          </div>

          <a
            href="#contact"
            onClick={() => {
              onBackToHome();
              setTimeout(() => {
                const elem = document.getElementById('contact');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }, 60);
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors hidden sm:inline-block"
          >
            Contact Me →
          </a>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-amber-50/60 border-2 border-sky-200 p-6 sm:p-10 shadow-sm mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Real photo circle avatar */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white border-4 border-amber-300 p-1.5 shadow-md ring-4 ring-sky-100 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-sky-50 relative">
                {!photoError ? (
                  <img
                    src={photoSrc}
                    alt="Shishir Pokhrel"
                    referrerPolicy="no-referrer"
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-sky-50">
                    <span className="font-display font-bold text-2xl text-blue-700">SP</span>
                    <span className="text-[10px] text-slate-500 mt-1">Shishir Pokhrel</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-amber-400 text-blue-950 p-1.5 rounded-full border-2 border-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Intro Header */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
                <span>Personal Story & Background</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 tracking-tight">
                Shishir Pokhrel
              </h1>
              <p className="text-base sm:text-lg font-bold text-blue-700 mt-1">
                Class 11 Computer Science Student • Aspiring Software Engineer
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5 justify-center md:justify-start text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-sky-200 text-blue-950 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Jitgadhi, Butwal-13, Rupandehi, Nepal
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-amber-950 shadow-2xs">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  Everest English Boarding Secondary School
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            EXACT REQUESTED DETAILED BIO TEXT
           ========================================================================= */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-3xl bg-white border-2 border-sky-200/90 p-6 sm:p-10 shadow-sm mb-12 space-y-6 text-slate-800 leading-relaxed text-base sm:text-lg font-normal"
        >
          <div className="border-b border-sky-100 pb-4 mb-6">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider block mb-1">
              About Me
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-blue-950">
              My Journey, Passions & Goals
            </h2>
          </div>

          {/* Paragraph 1 */}
          <p className="leading-relaxed">
            I’m <strong className="font-extrabold text-blue-950">Shishir Pokhrel</strong>, a Class 11 Computer Science student studying at <strong className="font-extrabold text-blue-950">Everest English Boarding Secondary School</strong>. I live in <strong className="font-extrabold text-blue-950">Jitgadhi, Butwal-13, Rupandehi, Nepal</strong>. I have always been interested in learning new things and exploring how different things work. I enjoy learning something new every day, even if it is something small, because I believe that improving little by little can make a big difference over time.
          </p>

          {/* Paragraph 2 */}
          <p className="leading-relaxed">
            I’m especially interested in <strong className="font-extrabold text-blue-950">coding, website building, technology, and video editing</strong>. I like building things and turning simple ideas into something useful. I know the basics of <strong className="font-extrabold text-blue-950">C and QBasic</strong>, and I’m currently learning <strong className="font-extrabold text-blue-950">Python</strong> along with web development and other computer-related skills. I also enjoy creating websites and experimenting with different ideas, even though I’m still a student and at the beginning of my journey.
          </p>

          {/* Paragraph 3 */}
          <p className="leading-relaxed">
            Apart from coding and technology, I enjoy <strong className="font-extrabold text-blue-950">video editing</strong> in my free time. I like trying different editing techniques and creating something interesting from simple footage. I also practice my <strong className="font-extrabold text-blue-950">handwriting</strong>, and I try to use my free time to learn or improve something instead of always spending it doing the same things. My hobbies and interests keep changing as I discover new things, and I enjoy that process of exploring and learning.
          </p>

          {/* Paragraph 4 */}
          <p className="leading-relaxed">
            As a student, I’m still learning and I don’t have a long list of professional achievements or major projects yet. However, I’m interested in building my skills through practice and real projects as I continue my studies. I want to keep improving my coding, web development, editing, and problem-solving skills. In the future, my goal is to become a <strong className="font-extrabold text-blue-950">software engineer</strong> and use technology to build useful, creative, and meaningful things. For now, I’m focused on learning, experimenting, and taking one step at a time toward that goal.
          </p>

          {/* Summary Highlights */}
          <div className="mt-8 pt-8 border-t border-sky-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase block">Education</span>
              <span className="font-bold text-sm text-blue-950 mt-1 block">Class 11 Computer Science</span>
              <span className="text-xs text-slate-600">Everest Sec. School</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Languages Known</span>
              <span className="font-bold text-sm text-amber-950 mt-1 block">C & QBasic (Basics)</span>
              <span className="text-xs text-slate-600">Currently learning Python</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-700 uppercase block">Creative Passions</span>
              <span className="font-bold text-sm text-blue-950 mt-1 block">Video Editing & Web Design</span>
              <span className="text-xs text-slate-600">Handwriting & tech curiosity</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-100/70 border-2 border-amber-300">
              <span className="text-[11px] font-extrabold text-amber-900 uppercase block">Future Ambition</span>
              <span className="font-extrabold text-sm text-blue-950 mt-1 block">Software Engineer</span>
              <span className="text-xs text-slate-700">Building meaningful tech</span>
            </div>
          </div>
        </motion.article>

        {/* Bottom Back Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Portfolio</span>
          </button>
        </div>

      </main>
    </div>
  );
};
