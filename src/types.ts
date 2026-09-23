export type SkillLevel = 'Basic' | 'Learning' | 'Exploring';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  category: 'programming' | 'web' | 'creative' | 'tools';
  icon: string;
  description: string;
  color: string;
}

export interface EducationInfo {
  school: string;
  class: string;
  faculty: string;
  location: string;
  subjects: string[];
  previousGrade: string;
}

export interface HobbyItem {
  id: string;
  title: string;
  icon: string;
  emoji: string;
  shortDesc: string;
  tags: string[];
}

export interface ProjectPlaceholder {
  id: string;
  title: string;
  tagline: string;
  status: 'Coming Soon' | 'In Progress';
  description: string;
  techStack: string[];
  plannedFeatures: string[];
}

export interface VideoEditPlaceholder {
  id: string;
  title: string;
  type: string;
  software: string;
  aspectRatio: string;
  duration?: string;
  description: string;
}

export interface JourneyStage {
  step: number;
  phase: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' | 'email';
  name: string;
  url: string;
  color: string;
  ariaLabel: string;
}
