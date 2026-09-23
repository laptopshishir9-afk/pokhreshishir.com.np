import React from 'react';
import { ArrowUp, MapPin, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRedirectToSeatAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateAdmin) {
      onNavigateAdmin();
    } else {
      window.location.hash = '#/admin';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-blue-950 text-white py-12 border-t-2 border-amber-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-900">
          
          {/* Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Shishir Pokhrel
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <span className="text-xs text-sky-300 font-medium mt-0.5">
              Class 11 Computer Science Student • Aspiring Software Engineer
            </span>
            <p className="text-xs text-blue-200/80 mt-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Rupandehi, Butwal-13, Jitgadhi, Nepal
            </p>
          </div>

          {/* Quick links & Back to top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-bold text-sky-200">
              <a href="#about" className="hover:text-amber-300 transition-colors">About</a>
              <a href="#education" className="hover:text-amber-300 transition-colors">Education</a>
              <a href="#skills" className="hover:text-amber-300 transition-colors">Skills</a>
              <a href="#video-editing" className="hover:text-amber-300 transition-colors">Video Editing</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors">Contact</a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-blue-900 border border-blue-800 text-amber-300 hover:text-white hover:bg-blue-800 transition-colors shadow-xs cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Small Learning Building Option redirecting to Seat Admin at the very last */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/70 gap-3 text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} Shishir Pokhrel. Everest English Boarding Secondary School.
          </span>

          <div className="flex items-center gap-2.5 text-[11px]">
            <span className="text-amber-400/90 font-mono font-semibold">
              Learning. Building. Creating.
            </span>
            <span className="text-blue-800">•</span>
            {/* Small Seat Admin option redirecting to Direct Visitor Messages & Seat Admin */}
            <a
              id="footer-seat-admin-small-link"
              href="#backend"
              onClick={handleRedirectToSeatAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900/80 hover:bg-amber-400 hover:text-blue-950 text-sky-200 text-[10px] font-semibold transition-all border border-blue-800 cursor-pointer shadow-2xs"
              title="Direct Visitor Messages & Seat Admin"
            >
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>Seat Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

