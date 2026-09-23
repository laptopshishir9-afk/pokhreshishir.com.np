import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BookOpen, Mail, Shield, Sparkles } from 'lucide-react';
import {
  getStoredProfilePhoto,
  subscribeProfilePhoto,
  DEFAULT_PHOTO_PATHS,
} from '../utils/photoManager';

interface NavbarProps {
  activeSection: string;
  currentPage?: 'home' | 'about-me' | 'admin';
  onNavigateHome?: () => void;
  onNavigateAboutMe?: () => void;
  onNavigateAdmin?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Video Editing', href: '#video-editing' },
  { label: 'Future Goal', href: '#future-goal' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  currentPage = 'home',
  onNavigateHome,
  onNavigateAboutMe,
  onNavigateAdmin,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    () => getStoredProfilePhoto() || DEFAULT_PHOTO_PATHS[0]
  );
  const [photoError, setPhotoError] = useState(false);

  // Secret multi-click trigger on brand avatar to unlock owner seat
  const [avatarClicks, setAvatarClicks] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = subscribeProfilePhoto((newUrl) => {
      if (newUrl) {
        setPhotoUrl(newUrl);
        setPhotoError(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = avatarClicks + 1;
    setAvatarClicks(nextCount);

    if (nextCount >= 5) {
      setAvatarClicks(0);
      if (onNavigateAdmin) onNavigateAdmin();
    } else {
      if (currentPage !== 'home') {
        if (onNavigateHome) onNavigateHome();
        else window.location.hash = '#home';
      }
    }
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (currentPage !== 'home') {
      if (onNavigateHome) onNavigateHome();
      else window.location.hash = href;
      setTimeout(() => {
        const id = href.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      const id = href.replace('#', '');
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs py-3 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* =========================================================================
              LEFT: CIRCULAR PHOTO + NAME + "Class 11 • Computer Science"
             ========================================================================= */}
          <div
            id="brand-header-info"
            onClick={handleAvatarClick}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            title="Shishir Pokhrel Portfolio"
          >
            {/* Small circular profile photo with thin yellow border */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-sky-50 shadow-xs flex items-center justify-center">
              {photoUrl && !photoError ? (
                <img
                  id="navbar-profile-photo"
                  src={photoUrl}
                  alt="Shishir Pokhrel"
                  referrerPolicy="no-referrer"
                  onError={() => setPhotoError(true)}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="font-display font-extrabold text-xs text-blue-900">SP</span>
              )}
            </div>

            {/* Name + Subtitle */}
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                Shishir Pokhrel
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                <span>Class 11 • Computer Science</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CENTER / DESKTOP: HOME, ABOUT, EDUCATION, SKILLS, HOBBIES, ... ON TOP
             ========================================================================= */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                currentPage === 'home' && activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  id={`nav-link-${item.href.substring(1)}`}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3 py-1.5 text-xs font-bold rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-blue-900 bg-sky-100/70 shadow-2xs'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-sky-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-amber-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Dedicated Read More / Full Bio button */}
            <button
              type="button"
              onClick={onNavigateAboutMe}
              className={`ml-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors flex items-center gap-1.5 ${
                currentPage === 'about-me'
                  ? 'bg-amber-400 text-blue-950 border border-amber-500 shadow-2xs'
                  : 'text-blue-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read More</span>
            </button>
          </nav>

          {/* =========================================================================
              RIGHT: SIMPLE CONTACT ME BUTTON + HAMBURGER MENU (FOR MOBILE / TABLET)
             ========================================================================= */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Desktop Seat Admin Quick Access */}
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-600 hover:text-amber-800 text-xs font-semibold transition-all cursor-pointer"
              title="Seat Admin (Exclusively for laptopshishir9@gmail.com)"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Seat Admin</span>
            </button>

            <a
              id="header-contact-btn"
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs hover:shadow-sm"
            >
              <span>Contact Me</span>
            </a>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              id="header-hamburger-menu-btn"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SLIDE-OUT / POPUP HAMBURGER NAVIGATION DRAWER (FOR MOBILE SCREENS)
         ========================================================================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-950 z-40 backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              id="navigation-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-4 sm:right-8 z-50 w-80 max-w-[92vw] bg-white rounded-3xl border border-sky-200 shadow-2xl p-5 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-100">
                <span className="font-display font-bold text-sm text-blue-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Navigation Menu</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Biography quick link */}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (onNavigateAboutMe) onNavigateAboutMe();
                }}
                className="w-full mb-3 px-4 py-2.5 rounded-2xl bg-amber-100/80 hover:bg-amber-200/90 border border-amber-300 text-blue-950 font-extrabold text-xs flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-800" />
                  <span>Read Full Biography</span>
                </span>
                <span className="text-[10px] bg-amber-400 px-2 py-0.5 rounded-full font-bold">STORY</span>
              </button>

              {/* Navigation links */}
              <div className="grid grid-cols-2 gap-1.5 my-2">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    currentPage === 'home' && activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700 hover:bg-sky-50 hover:text-blue-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="pt-3 mt-3 border-t border-sky-100 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get In Touch</span>
                </a>

                {/* Discrete Owner Seat Entrance */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (onNavigateAdmin) onNavigateAdmin();
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Seat Admin (laptopshishir9@gmail.com only)</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
