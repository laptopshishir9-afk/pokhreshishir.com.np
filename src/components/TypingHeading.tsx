import React, { useState, useEffect } from 'react';

interface TypingHeadingProps {
  prefix?: string;
  name?: string;
  typeDurationMs?: number;
  pauseDurationMs?: number;
}

export const TypingHeading: React.FC<TypingHeadingProps> = ({
  prefix = "Hi, I'm ",
  name = "Shishir Pokhrel",
  typeDurationMs = 1000,
  pauseDurationMs = 1200,
}) => {
  const fullText = `${prefix}${name}`;
  const prefixLength = prefix.length;
  const totalLength = fullText.length;

  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // TYPING PHASE: Each character takes (typeDurationMs / totalLength) ~ 40ms
      if (charIndex < totalLength) {
        const stepTime = Math.max(25, Math.floor(typeDurationMs / totalLength));
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, stepTime);
      } else {
        // Finished typing full text: Pause for 1.2s before deleting/retyping
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDurationMs);
      }
    } else {
      // DELETING PHASE: Quick smooth erase over ~500ms
      if (charIndex > 0) {
        const deleteStep = Math.max(15, Math.floor(500 / totalLength));
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, deleteStep);
      } else {
        // Finished deleting: Pause 250ms then start typing again without stopping
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 250);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, totalLength, typeDurationMs, pauseDurationMs]);

  const typedPrefix = fullText.slice(0, Math.min(charIndex, prefixLength));
  const typedName = charIndex > prefixLength ? fullText.slice(prefixLength, charIndex) : '';

  return (
    <h1
      id="hero-typing-name-heading"
      className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 inline-flex flex-wrap items-center justify-center gap-y-2 select-none"
    >
      {/* Prefix: "Hi, I'm " */}
      <span className="text-slate-900">{typedPrefix}</span>

      {/* Highlighted Name: "Shishir Pokhrel" in bright yellow bubble matching screenshot */}
      {typedName.length > 0 && (
        <span
          id="highlighted-user-name"
          className="ml-2 inline-block px-3 py-0.5 sm:px-5 sm:py-1 rounded-2xl bg-amber-400 text-slate-950 font-black shadow-sm border border-amber-300 transition-all align-middle"
        >
          {typedName}
        </span>
      )}

      {/* Blinking Cursor - continuous and smooth */}
      <span
        className="inline-block w-1 h-7 sm:h-11 md:h-12 bg-blue-600 ml-1.5 animate-pulse rounded-full align-middle"
        aria-hidden="true"
      />
    </h1>
  );
};
