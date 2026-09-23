// School logo manager: stores the Everest English Boarding Secondary School logo in localStorage
// Only manageable by Shishir inside the authenticated Owner Seat Admin portal.

const SCHOOL_LOGO_KEY = 'shishir_school_logo_data';
const SCHOOL_LOGO_EVENT = 'shishir_school_logo_updated';

// Fallback paths if a logo image is placed in public/
export const DEFAULT_SCHOOL_LOGO_PATHS = [
  '/assets/school-logo.png',
  '/assets/everest-logo.png',
  '/school-logo.png',
  '/everest-logo.png',
];

export function getStoredSchoolLogo(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SCHOOL_LOGO_KEY);
}

export function saveStoredSchoolLogo(dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCHOOL_LOGO_KEY, dataUrl);
    window.dispatchEvent(new CustomEvent(SCHOOL_LOGO_EVENT, { detail: dataUrl }));
  } catch (err) {
    console.error('Failed to save school logo', err);
  }
}

export function removeStoredSchoolLogo(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SCHOOL_LOGO_KEY);
    window.dispatchEvent(new CustomEvent(SCHOOL_LOGO_EVENT, { detail: null }));
  } catch (err) {
    console.error('Failed to remove school logo', err);
  }
}

export function subscribeSchoolLogo(callback: (logoUrl: string | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<string | null>;
    callback(customEvent.detail || null);
  };

  window.addEventListener(SCHOOL_LOGO_EVENT, handleUpdate);
  return () => window.removeEventListener(SCHOOL_LOGO_EVENT, handleUpdate);
}
