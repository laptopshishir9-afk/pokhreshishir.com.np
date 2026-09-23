import React from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Sparkles, Code2, BookOpen, ChevronRight } from 'lucide-react';

export const FutureGoalSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'High School Foundations',
      description: 'Excelling in Class 11 & 12 Computer Science, Mathematics, and Science at Everest School.',
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      cardBg: 'bg-sky-50/70 border-sky-200',
      numColor: 'text-blue-600',
    },
    {
      num: '02',
      title: 'Practical Coding & Building',
      description: 'Writing code every day, mastering Python, Web Development, and creating functional personal websites.',
      icon: <Code2 className="w-5 h-5 text-amber-600" />,
      cardBg: 'bg-amber-50/70 border-2 border-amber-300 shadow-xs',
      numColor: 'text-amber-700',
    },
    {
      num: '03',
      title: 'Software Engineering Degree',
      description: 'Pursuing higher studies in Computer Engineering to build impactful, real-world technology products.',
      icon: <Target className="w-5 h-5 text-blue-700" />,
      cardBg: 'bg-blue-50/70 border-blue-200',
      numColor: 'text-blue-700',
    },
  ];

  return (
    <section id="future-goal" className="py-20 relative bg-gradient-to-b from-sky-50/50 via-white to-amber-50/30 border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-950 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span>Future Ambition</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            Future Goal: Software Engineer
          </h2>
        </div>

        {/* Feature Narrative Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white border-2 border-amber-300/80 p-8 sm:p-10 shadow-sm mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100/40 rounded-full blur-2xl pointer-events-none -z-10" />
          
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider block mb-2">
              Personal Aspiration
            </span>
            <blockquote className="font-display text-xl sm:text-2xl font-extrabold text-blue-950 leading-snug">
              "I want to become a software engineer and build useful things with technology. Right now, I'm focusing on learning coding, web development, editing, and improving myself step by step."
            </blockquote>
            <p className="text-sm text-slate-700 mt-4 leading-relaxed font-normal">
              Instead of rushing, I believe in consistency. As a Class 11 student in Butwal, every single line of code, every edited frame, and every math problem solved is an active step toward that ultimate dream.
            </p>
          </div>
        </motion.div>

        {/* 3 Step Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`rounded-3xl border p-6 sm:p-7 shadow-xs hover:shadow-md transition-all ${step.cardBg}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-white border border-sky-200 shadow-2xs">
                  {step.icon}
                </div>
                <span className={`font-mono font-extrabold text-xs px-2.5 py-1 rounded-full bg-white border border-sky-200 ${step.numColor}`}>
                  STEP {step.num}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-lg text-blue-950">
                {step.title}
              </h3>
              <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-normal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
