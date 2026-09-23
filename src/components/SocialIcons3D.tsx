import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SocialIcons3DProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withWhatsAppButton?: boolean;
}

export const SocialIcons3D: React.FC<SocialIcons3DProps> = ({
  size = 'md',
  className = '',
  withWhatsAppButton = false,
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-11 h-11',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  /**
   * Official Brand Logos - exact official vector paths from brand guidelines.
   * Pure vector icons. No emojis, no text phone numbers or URLs.
   */
  const getBrandDetails = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return {
          label: 'Facebook',
          badgeColor: 'text-[#1877F2]',
          hoverBorder: 'hover:border-[#1877F2] hover:bg-[#1877F2]/5',
          svg: (
            <svg className={iconSizes[size]} fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          ),
        };
      case 'instagram':
        return {
          label: 'Instagram',
          badgeColor: 'text-[#E4405F]',
          hoverBorder: 'hover:border-[#E4405F] hover:bg-[#E4405F]/5',
          svg: (
            <svg className={iconSizes[size]} fill="#E4405F" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ),
        };
      case 'tiktok':
        return {
          label: 'TikTok',
          badgeColor: 'text-[#000000]',
          hoverBorder: 'hover:border-slate-800 hover:bg-slate-100',
          svg: (
            <svg className={iconSizes[size]} fill="#111827" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.8 1.42-.01 2.73-.89 3.23-2.22.25-.61.32-1.28.31-1.94V.02h2.07z" />
            </svg>
          ),
        };
      case 'whatsapp':
        return {
          label: 'WhatsApp',
          badgeColor: 'text-[#25D366]',
          hoverBorder: 'hover:border-[#25D366] hover:bg-[#25D366]/5',
          svg: (
            <svg className={iconSizes[size]} fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.301-.15-1.78-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.783-1.676-2.084-.175-.301-.018-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.3.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.239-.245-.589-.494-.509-.678-.519l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.512c0 1.482 1.08 2.912 1.23 3.112.15.2 2.126 3.246 5.151 4.553.72.311 1.281.497 1.719.636.723.23 1.381.197 1.902.12.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.306.176-1.431-.076-.126-.276-.201-.577-.351zM12.042.002C5.397.002.004 5.394.004 12.04c0 2.124.555 4.197 1.609 6.022L.004 24l6.096-1.6c1.769.965 3.766 1.474 5.942 1.474 6.643 0 12.038-5.393 12.038-12.039 0-6.645-5.395-12.039-12.038-12.039zm0 22.029c-1.802 0-3.568-.485-5.109-1.401l-.366-.218-3.799.997 1.014-3.704-.239-.38c-1.006-1.602-1.538-3.468-1.538-5.383 0-5.534 4.502-10.036 10.037-10.036 5.535 0 10.038 4.502 10.038 10.036 0 5.534-4.503 10.036-10.038 10.036z" />
            </svg>
          ),
        };
      case 'email':
      default:
        return {
          label: 'Email',
          badgeColor: 'text-sky-600',
          hoverBorder: 'hover:border-sky-500 hover:bg-sky-50',
          svg: (
            <svg className={iconSizes[size]} fill="none" stroke="#0284c7" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        };
    }
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 flex-wrap ${className}`}>
      {PERSONAL_INFO.socials.map((item) => {
        const brand = getBrandDetails(item.platform);
        return (
          <motion.a
            key={item.platform}
            id={`social-link-${item.platform}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            title={brand.label}
            className="relative block focus:outline-none group"
            whileHover={{
              y: -2,
              scale: 1.05,
              transition: { type: 'spring', stiffness: 350, damping: 18 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`relative ${sizeClasses[size]} rounded-2xl bg-white border border-sky-200 text-slate-700 shadow-2xs flex items-center justify-center transition-all duration-200 hover:border-amber-400 ${brand.hoverBorder}`}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">
                {brand.svg}
              </div>
            </div>
          </motion.a>
        );
      })}

      {withWhatsAppButton && (
        <motion.a
          id="whatsapp-chat-button"
          href={PERSONAL_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Shishir on WhatsApp"
          className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-slate-800 hover:border-[#25D366] hover:bg-[#25D366]/5 shadow-2xs font-bold text-xs transition-all duration-200"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.783-1.676-2.084-.175-.301-.018-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.3.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.239-.245-.589-.494-.509-.678-.519l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.512c0 1.482 1.08 2.912 1.23 3.112.15.2 2.126 3.246 5.151 4.553.72.311 1.281.497 1.719.636.723.23 1.381.197 1.902.12.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.306.176-1.431-.076-.126-.276-.201-.577-.351zM12.042.002C5.397.002.004 5.394.004 12.04c0 2.124.555 4.197 1.609 6.022L.004 24l6.096-1.6c1.769.965 3.766 1.474 5.942 1.474 6.643 0 12.038-5.393 12.038-12.039 0-6.645-5.395-12.039-12.038-12.039zm0 22.029c-1.802 0-3.568-.485-5.109-1.401l-.366-.218-3.799.997 1.014-3.704-.239-.38c-1.006-1.602-1.538-3.468-1.538-5.383 0-5.534 4.502-10.036 10.037-10.036 5.535 0 10.038 4.502 10.038 10.036 0 5.534-4.503 10.036-10.038 10.036z" />
          </svg>
          <span className="font-semibold text-slate-800">Message on WhatsApp</span>
        </motion.a>
      )}
    </div>
  );
};
