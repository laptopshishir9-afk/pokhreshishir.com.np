import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { HobbiesSection } from './components/HobbiesSection';
import { VideoEditingSection } from './components/VideoEditingSection';
import { FutureGoalSection } from './components/FutureGoalSection';
import { ContactSection } from './components/ContactSection';
import { OwnerBackendSection } from './components/OwnerBackendSection';
import { Footer } from './components/Footer';
import { AboutMePage } from './components/AboutMePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about-me' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('about-me')) return 'about-me';
      if (hash.includes('admin') || hash.includes('backend')) return 'admin';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('about-me')) {
        setCurrentPage('about-me');
      } else if (hash.includes('admin') || hash.includes('backend')) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAboutMe = () => {
    setCurrentPage('about-me');
    window.location.hash = '#/about-me';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    setCurrentPage('admin');
    window.location.hash = '#/admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll spy to detect active viewport section when on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sectionIds = [
      'home',
      'about',
      'education',
      'skills',
      'hobbies',
      'video-editing',
      'future-goal',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-300 selection:text-blue-950 relative overflow-x-hidden font-sans">
      {/* 1. Modern Clean Sticky Navbar */}
      <Navbar
        activeSection={activeSection}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateAboutMe={navigateToAboutMe}
        onNavigateAdmin={navigateToAdmin}
      />

      {currentPage === 'about-me' ? (
        /* Dedicated Full Bio & Photo Upload Guide Page */
        <AboutMePage onBackToHome={navigateToHome} />
      ) : currentPage === 'admin' ? (
        /* Dedicated Seat Admin & Direct Visitor Messages Page (NOT displayed on public portfolio) */
        <OwnerBackendSection onBackToHome={navigateToHome} />
      ) : (
        /* Main Single-Page Portfolio (Clean public view with NO admin verification box) */
        <>
          {/* 2. Hero Section (Name & Title at Top, 3D Photo Frame to Side, Read More button) */}
          <HeroSection onReadMore={navigateToAboutMe} />

          {/* 3. About Me Section */}
          <AboutSection onReadMore={navigateToAboutMe} />

          {/* 4. Education (Everest English Boarding Secondary School, Class 11 CS, A+ grade) */}
          <EducationSection />

          {/* 5. Skills & Current Learning (Basic, Currently Learning, Creative) */}
          <SkillsSection />

          {/* 6. Hobbies & Disciplines (8 authentic items with Lucide icons) */}
          <HobbiesSection />

          {/* 7. Video Editing (Clean highlights & storytelling) */}
          <VideoEditingSection />

          {/* 8. Future Goal (Software Engineer) */}
          <FutureGoalSection />

          {/* 9. Contact Section & Official Social Media Buttons */}
          <ContactSection />
        </>
      )}

      {/* Clean High-Contrast Footer */}
      <Footer onNavigateAdmin={navigateToAdmin} />
    </div>
  );
}
