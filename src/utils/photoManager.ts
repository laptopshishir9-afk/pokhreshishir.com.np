// Photo & Media manager with Real-Time Firebase Cloud Firestore synchronization.
// Uploaded photos and logos sync automatically across all devices (Mobile Phones, Laptops, Tablets).

import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const STORAGE_KEY = 'shishir_real_profile_photo';
const EVENT_NAME = 'shishir_photo_updated';

const SCHOOL_LOGO_KEY = 'shishir_school_logo_data';
const SCHOOL_LOGO_EVENT = 'shishir_school_logo_updated';

// Universal relative paths that work on GitHub Pages, localhost, and custom domains
const baseUrl =
  typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : './';
const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const DEFAULT_PHOTO_PATHS = [
  `${prefix}assets/shishir-photo.jpg`,
  `${prefix}assets/shishir-photo.png`,
  `${prefix}assets/shishir-avatar.svg`,
  `${prefix}assets/profile.jpg`,
  './assets/shishir-photo.jpg',
  './assets/shishir-avatar.svg',
  'assets/shishir-photo.jpg',
];

export const DEFAULT_COLLEGE_LOGO_PATHS = [
  `${prefix}assets/college-logo.png`,
  `${prefix}assets/college-logo.jpg`,
  `${prefix}assets/everest-logo.svg`,
  `${prefix}assets/school-logo.png`,
  './assets/college-logo.png',
  './assets/everest-logo.svg',
  'assets/college-logo.png',
];

// Initialize Real-time Firestore Cloud Sync across all devices
if (typeof window !== 'undefined') {
  try {
    const mediaDocRef = doc(db, 'site_media', 'default');
    onSnapshot(mediaDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.ownerPhoto && data.ownerPhoto !== localStorage.getItem(STORAGE_KEY)) {
          try {
            localStorage.setItem(STORAGE_KEY, data.ownerPhoto);
            window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data.ownerPhoto }));
          } catch {
            // Ignore quota
          }
        }
        if (data.collegeLogo && data.collegeLogo !== localStorage.getItem(SCHOOL_LOGO_KEY)) {
          try {
            localStorage.setItem(SCHOOL_LOGO_KEY, data.collegeLogo);
            window.dispatchEvent(new CustomEvent(SCHOOL_LOGO_EVENT, { detail: data.collegeLogo }));
          } catch {
            // Ignore quota
          }
        }
      }
    });
  } catch (err) {
    console.warn('Firestore media synchronization initializing', err);
  }
}

export function getStoredProfilePhoto(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function saveStoredProfilePhoto(dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: dataUrl }));

    // Sync to Firestore Cloud so mobile and all devices receive it
    const mediaDocRef = doc(db, 'site_media', 'default');
    setDoc(
      mediaDocRef,
      {
        ownerPhoto: dataUrl,
        lastUpdated: Date.now(),
        updatedBy: 'laptopshishir9@gmail.com',
      },
      { merge: true }
    ).catch((err) => console.error('Error syncing photo to Firestore', err));
  } catch (err) {
    console.error('Failed to save profile photo to localStorage', err);
  }
}

export function removeStoredProfilePhoto(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: null }));

    const mediaDocRef = doc(db, 'site_media', 'default');
    setDoc(mediaDocRef, { ownerPhoto: '', lastUpdated: Date.now() }, { merge: true }).catch(
      () => {}
    );
  } catch (err) {
    console.error('Failed to remove profile photo', err);
  }
}

export function subscribeProfilePhoto(callback: (photoUrl: string | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<string>;
    callback(customEvent.detail || null);
  };

  window.addEventListener(EVENT_NAME, handleUpdate);
  return () => window.removeEventListener(EVENT_NAME, handleUpdate);
}

// ---------------------------------------------------------------------------
// COLLEGE / SCHOOL LOGO MANAGER (ACCESSIBLE ACROSS ALL PAGES)
// ---------------------------------------------------------------------------

export function getStoredSchoolLogo(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SCHOOL_LOGO_KEY);
}

export function saveStoredSchoolLogo(dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SCHOOL_LOGO_KEY, dataUrl);
    window.dispatchEvent(new CustomEvent(SCHOOL_LOGO_EVENT, { detail: dataUrl }));

    // Sync to Firestore Cloud so mobile and all devices receive it
    const mediaDocRef = doc(db, 'site_media', 'default');
    setDoc(
      mediaDocRef,
      {
        collegeLogo: dataUrl,
        lastUpdated: Date.now(),
        updatedBy: 'laptopshishir9@gmail.com',
      },
      { merge: true }
    ).catch((err) => console.error('Error syncing logo to Firestore', err));
  } catch (err) {
    console.error('Failed to save school logo', err);
  }
}

export function removeStoredSchoolLogo(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SCHOOL_LOGO_KEY);
    window.dispatchEvent(new CustomEvent(SCHOOL_LOGO_EVENT, { detail: null }));

    const mediaDocRef = doc(db, 'site_media', 'default');
    setDoc(mediaDocRef, { collegeLogo: '', lastUpdated: Date.now() }, { merge: true }).catch(
      () => {}
    );
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

// Helper to trigger browser download of dataURL as a file for GitHub repository
export function downloadDataUrlFile(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Client-side image compressor: Converts large photos into clean, optimized images
// so they fit in memory and sync across all devices rapidly (<50KB).
export function compressImage(file: File, maxWidth = 600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
