import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, MapPin, Star } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import {
  getStoredSchoolLogo,
  subscribeSchoolLogo,
  DEFAULT_COLLEGE_LOGO_PATHS,
} from '../utils/photoManager';

export const EducationSection: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState<string | null>(
    () => getStoredSchoolLogo() || DEFAULT_COLLEGE_LOGO_PATHS[0]
  );
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeSchoolLogo((newLogo) => {
      setLogoSrc(newLogo || DEFAULT_COLLEGE_LOGO_PATHS[0]);
      setLogoError(false);
    });
    return unsubscribe;
  }, []);

  return (
    <section id="education" className="py-20 relative bg-gradient-to-b from-sky-50/50 via-white to-amber-50/30 border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            Education & High School Studies
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-normal">
            Class 11 Computer Science faculty at Everest English Boarding Secondary School in Butwal, Nepal.
          </p>
        </div>

        {/* Education Architecture Layout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white border-2 border-sky-200 p-6 sm:p-8 shadow-sm hover:border-amber-300 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* School Logo Reserved Slot (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              {/* <!-- ADD EVEREST ENGLISH BOARDING SECONDARY SCHOOL LOGO HERE --> */}
              <div
                id="school-logo-reserved-area"
                className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 flex flex-col items-center justify-center p-4 relative group hover:border-blue-400 transition-colors"
              >
                {logoSrc && !logoError ? (
                  <img
                    src={logoSrc}
                    alt="Everest English Boarding Secondary School & College Logo"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-blue-700 shadow-xs mb-3 ring-4 ring-amber-100">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-bold text-blue-950">
                      Everest Secondary School & College
                    </span>
                    <span className="text-[11px] text-amber-800 font-semibold mt-0.5">
                      Butwal-13, Nepal
                    </span>
                  </div>
                )}
              </div>

              <span className="text-xs text-slate-600 font-medium mt-3 max-w-[220px]">
                Everest English Boarding Secondary School & College Logo
              </span>
            </div>

            {/* Academic Details (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-blue-900 border border-sky-300">
                  CURRENT ENROLLMENT
                </span>
                <span className="text-xs text-amber-800 font-bold bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Class 11 (2025 - 2026)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-blue-950">
                Everest English Boarding Secondary School
              </h3>

              <p className="text-sm text-slate-700 font-medium mt-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                Rupandehi, Butwal-13, Jitgadhi, Nepal
              </p>

              {/* Grid of Key Info with Yellowish & Light Blue accents */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
                <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200">
                  <span className="text-xs font-bold uppercase text-blue-700 block">Class Level</span>
                  <span className="text-base font-extrabold text-blue-950 mt-1 block">Class 11</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200">
                  <span className="text-xs font-bold uppercase text-blue-700 block">Faculty</span>
                  <span className="text-base font-extrabold text-blue-900 mt-1 block">Computer Science</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-2xs">
                  <span className="text-xs font-extrabold uppercase text-amber-900 block">Academic Milestone</span>
                  <span className="text-sm sm:text-base font-extrabold text-amber-950 mt-1 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                    <span>Passed SEE Examination with A+</span>
                  </span>
                </div>
              </div>

              {/* Current Subjects */}
              <div>
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider block mb-2">
                  Key Subjects Studied
                </span>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_DATA.subjects.map((sub) => (
                    <span
                      key={sub}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-blue-950 border border-sky-200 hover:border-amber-300 text-xs font-bold shadow-2xs transition-colors"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
