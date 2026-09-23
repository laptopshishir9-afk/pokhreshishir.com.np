// Centralized Website Text & Content Manager with Real-Time Firebase Firestore Cloud Sync.
// Any text edited from the Seat Admin updates immediately across ALL devices (mobile, laptop, etc.).

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface SiteContent {
  heroPrefix: string;
  heroName: string;
  heroSubtitle: string;
  heroIntro: string;
  schoolName: string;
  schoolLocation: string;
  academicMilestone: string;
  futureGoal: string;
  aboutStory: string;
  lastUpdated: number;
  updatedBy: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroPrefix: "Hi, I’m ",
  heroName: "Shishir Pokhrel",
  heroSubtitle: "CLASS 11 COMPUTER SCIENCE STUDENT • BUTWAL, NEPAL",
  heroIntro:
    "I am a Class 11 Computer Science student studying at Everest English Boarding Secondary School. I live in Jitgadhi, Butwal-13, Rupandehi, Nepal. I am passionate about technology, coding websites, learning algorithms, and creative video editing.",
  schoolName: "Everest English Boarding Secondary School",
  schoolLocation: "Jitgadhi, Butwal-13, Rupandehi, Nepal",
  academicMilestone: "Passed SEE Examination with A+",
  futureGoal:
    "To become a highly skilled Software Engineer, creating scalable software applications, modern websites, and impactful technological solutions.",
  aboutStory:
    "My journey began with a natural curiosity for how computers work and how ideas can be turned into interactive software. Every day, I practice coding, study computer science fundamentals, and explore modern web development.",
  lastUpdated: 1727049600000,
  updatedBy: "laptopshishir9@gmail.com",
};

const LOCAL_STORAGE_KEY = 'shishir_site_custom_content_v1';
const CONTENT_EVENT = 'shishir_content_updated_event';

// In-memory reactive state
let currentContent: SiteContent = { ...DEFAULT_SITE_CONTENT };

// Load from localStorage immediately so rendering is instant
if (typeof window !== 'undefined') {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      currentContent = { ...DEFAULT_SITE_CONTENT, ...JSON.parse(cached) };
    }
  } catch {
    // Ignore parse error
  }
}

// Subscribe to Firestore for real-time live synchronization across all devices
if (typeof window !== 'undefined') {
  try {
    const contentDocRef = doc(db, 'site_content', 'default');
    onSnapshot(contentDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<SiteContent>;
        currentContent = { ...DEFAULT_SITE_CONTENT, ...data };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentContent));
        } catch {
          // Ignore quota
        }
        window.dispatchEvent(new CustomEvent(CONTENT_EVENT, { detail: currentContent }));
      }
    });
  } catch (err) {
    console.warn('Firestore offline or initializing', err);
  }
}

export function getSiteContent(): SiteContent {
  return currentContent;
}

export function subscribeSiteContent(callback: (content: SiteContent) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  callback(currentContent);

  const handler = (e: Event) => {
    const custom = e as CustomEvent<SiteContent>;
    if (custom.detail) {
      callback(custom.detail);
    }
  };

  window.addEventListener(CONTENT_EVENT, handler);
  return () => window.removeEventListener(CONTENT_EVENT, handler);
}

// Save updated text: saves locally AND updates Firestore so all mobile devices & visitors update live
export async function updateSiteContent(updates: Partial<SiteContent>): Promise<{ success: boolean; error?: string }> {
  try {
    const newContent: SiteContent = {
      ...currentContent,
      ...updates,
      lastUpdated: Date.now(),
      updatedBy: "laptopshishir9@gmail.com",
    };

    currentContent = newContent;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch {
      // Ignore quota
    }
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT, { detail: newContent }));

    // Sync to Firestore Cloud
    const contentDocRef = doc(db, 'site_content', 'default');
    await setDoc(contentDocRef, newContent, { merge: true });

    return { success: true };
  } catch (err: any) {
    console.error('Failed to sync site content to Firestore', err);
    return { success: false, error: err?.message || 'Failed to sync to cloud database.' };
  }
}
