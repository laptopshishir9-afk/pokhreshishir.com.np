import { EducationInfo, HobbyItem, JourneyStage, ProjectPlaceholder, SkillItem, SocialLink, VideoEditPlaceholder } from '../types';

export const PERSONAL_INFO = {
  name: "Shishir Pokhrel",
  location: "Rupandehi, Butwal-13, Jitgadhi, Nepal",
  country: "Nepal",
  school: "Everest English Boarding Secondary School",
  class: "Class 11",
  faculty: "Computer Science",
  roleSubtitle: "Class 11 Computer Science Student | Learner | Creator",
  taglines: [
    "Learning. Building. Creating. Improving.",
    "Curious student & aspiring software engineer.",
    "Exploring code, web design, and video editing.",
    "Practicing new skills every single day."
  ],
  futureGoal: "Software Engineer",
  email: "shishir.pokhrel2025@gmail.com",
  // NOTE: WhatsApp number is 9764334844. Per instructions, DO NOT display this number as text anywhere on the website!
  whatsappUrl: "https://wa.me/9764334844?text=Hi%20Shishir%2C%20I%20visited%20your%20portfolio!",
  socials: [
    {
      platform: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/pokhrel.shishir.709585',
      color: '#1877F2',
      ariaLabel: 'Visit Shishir on Facebook'
    },
    {
      platform: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/07_shishir',
      color: '#E4405F',
      ariaLabel: 'Visit Shishir on Instagram'
    },
    {
      platform: 'tiktok',
      name: 'TikTok',
      url: 'https://www.tiktok.com/@goat_x_shishir007',
      color: '#00F2FE',
      ariaLabel: 'Visit Shishir on TikTok'
    },
    {
      platform: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/9764334844?text=Hi%20Shishir%2C%20I%20visited%20your%20portfolio!',
      color: '#25D366',
      ariaLabel: 'Chat with Shishir on WhatsApp'
    },
    {
      platform: 'email',
      name: 'Email',
      url: 'mailto:shishir.pokhrel2025@gmail.com',
      color: '#00D2FF',
      ariaLabel: 'Send email to Shishir'
    }
  ] as SocialLink[]
};

export const EDUCATION_DATA: EducationInfo = {
  school: "Everest English Boarding Secondary School",
  class: "Class 11",
  faculty: "Computer Science",
  location: "Butwal, Rupandehi, Nepal",
  subjects: [
    "Science",
    "Mathematics",
    "Computer Science",
    "Nepali",
    "English"
  ],
  previousGrade: "Passed SEE Examination with A+ Grade."
};

export const SKILLS_CATEGORIZED = {
  basic: [
    {
      name: "C",
      fullName: "C Programming Language",
      category: "Basic Knowledge",
      tag: "Academic Foundation",
      description: "Syntax fundamentals, variables, loops, control structures, and introductory algorithms.",
    },
    {
      name: "QBasic",
      fullName: "QuickBASIC Logic",
      category: "Basic Knowledge",
      tag: "Early Logic",
      description: "Structured procedural programming, conditional flow, and foundational algorithmic thinking.",
    },
  ],
  learning: [
    {
      name: "Python",
      fullName: "Python 3",
      category: "Currently Learning",
      tag: "Core Focus",
      description: "Clean modern syntax, object-oriented concepts, problem solving, and script creation.",
    },
    {
      name: "HTML",
      fullName: "HTML5 Semantic Web",
      category: "Currently Learning",
      tag: "Web Core",
      description: "Accessible document structure, semantic markup, forms, and modern web page anatomy.",
    },
    {
      name: "CSS",
      fullName: "Modern CSS & Styling",
      category: "Currently Learning",
      tag: "Web Core",
      description: "Responsive layouts, Flexbox, Grid, clean typography, and UI styling.",
    },
    {
      name: "JavaScript / Web Dev",
      fullName: "JavaScript & Modern Web",
      category: "Currently Learning",
      tag: "Interactive Logic",
      description: "DOM manipulation, event handling, logic, and building dynamic interactive websites.",
    },
  ],
  creative: [
    {
      name: "Video Editing",
      fullName: "Creative Video Editing",
      category: "Creative Skills",
      tag: "Storytelling",
      description: "Visual pacing, beat synchronization, smooth cuts, transition timing, and motion storytelling.",
    },
    {
      name: "Website Building",
      fullName: "Website Design & Building",
      category: "Creative Skills",
      tag: "Interface Craft",
      description: "Crafting clean, responsive user interfaces with attention to layout, spacing, and user experience.",
    },
  ],
};

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: "learning",
    title: "Learning new things",
    icon: "BookOpen",
    emoji: "",
    shortDesc: "Exploring tutorials, books, and articles to learn something new every single day.",
    tags: ["Daily Habit", "Growth", "Curiosity"]
  },
  {
    id: "building",
    title: "Building things",
    icon: "Hammer",
    emoji: "",
    shortDesc: "Turning ideas into real working projects, whether simple scripts or web pages.",
    tags: ["Creation", "Hands-on", "Projects"]
  },
  {
    id: "coding",
    title: "Coding",
    icon: "Code2",
    emoji: "",
    shortDesc: "Writing programs in C and Python, solving logic puzzles, and understanding computers.",
    tags: ["Logic", "C", "Python", "Problem Solving"]
  },
  {
    id: "websites",
    title: "Website building",
    icon: "Layout",
    emoji: "",
    shortDesc: "Designing clean web layouts with HTML and CSS and bringing them to life in the browser.",
    tags: ["HTML", "CSS", "UI Design", "Responsive"]
  },
  {
    id: "video-editing",
    title: "Video editing",
    icon: "Film",
    emoji: "",
    shortDesc: "Cutting clips, matching beats, and experimenting with pacing and rhythm in free time.",
    tags: ["Pacing", "Cuts", "Motion", "Creativity"]
  },
  {
    id: "handwriting",
    title: "Handwriting practice",
    icon: "PenTool",
    emoji: "",
    shortDesc: "Practicing neat handwriting, disciplined stroke rhythm, and patient craftsmanship.",
    tags: ["Discipline", "Precision", "Focus"]
  },
  {
    id: "exploring-tech",
    title: "Exploring technology",
    icon: "Compass",
    emoji: "",
    shortDesc: "Investigating emerging developer tools, computer systems, and software engineering ideas.",
    tags: ["Tech", "Software", "Innovation"]
  },
  {
    id: "self-improvement",
    title: "Self improvement",
    icon: "Sparkles",
    emoji: "",
    shortDesc: "Balancing high school studies with daily learning, physical focus, and steady personal growth.",
    tags: ["Consistency", "Mindset", "Routine"]
  }
];

export const FUTURE_PROJECTS: ProjectPlaceholder[] = [
  {
    id: "personal-portfolio",
    title: "Interactive Personal Portfolio",
    tagline: "My very first custom interactive web project",
    status: "In Progress",
    description: "A clean, modern portfolio site sharing my student journey, learning milestones, and future work with high-contrast UI and smooth animations.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    plannedFeatures: ["Interactive Journey", "3D Tilt Cards", "Light/Dark Mode", "Direct WhatsApp Integration"]
  },
  {
    id: "student-calc-tool",
    title: "Student Utility & Grade Assistant",
    tagline: "Helpful student companion tool",
    status: "Coming Soon",
    description: "A lightweight web app to help secondary school students calculate GPA, track study hours, and organize daily homework tasks.",
    techStack: ["HTML/CSS", "JavaScript", "Python"],
    plannedFeatures: ["GPA Calculator", "Daily Study Timer", "Clean Notes Saver"]
  },
  {
    id: "creative-video-portfolio",
    title: "Video Edits & Motion Vault",
    tagline: "Curated showcase of video editing cuts",
    status: "Coming Soon",
    description: "A dedicated media showcase presenting short-form creative video edits, motion cuts, and audio-synced sequences.",
    techStack: ["Video Editing", "Web Gallery", "Media"],
    plannedFeatures: ["Custom Video Player", "Behind-The-Scenes Timeline", "Short Form Cuts"]
  }
];

export const VIDEO_EDIT_ITEMS: VideoEditPlaceholder[] = [
  {
    id: "edit-1",
    title: "Rhythm & Beat-Sync Montage",
    type: "Short Form / Reel",
    software: "Video Editor",
    aspectRatio: "9:16",
    duration: "Coming Soon",
    description: "Experimenting with audio waveforms, precise beat cuts, speed ramps, and smooth zoom transitions."
  },
  {
    id: "edit-2",
    title: "Cinematic Mood & Color Grading",
    type: "Cinematic Sequence",
    software: "Video Editor",
    aspectRatio: "16:9",
    duration: "Coming Soon",
    description: "Practicing color grading, atmospheric soundtrack pacing, and clean title overlays."
  },
  {
    id: "edit-3",
    title: "Tech Concept Showcase Cut",
    type: "Creative Tech Edit",
    software: "Video Editor",
    aspectRatio: "9:16",
    duration: "Coming Soon",
    description: "Dynamic typography overlays, futuristic sound design, and sleek visual motion effects."
  }
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: 1,
    phase: "Learning",
    subtitle: "Curiosity First",
    description: "Studying computer science fundamentals at school, reading programming documentation, and absorbing new concepts every single day.",
    details: [
      "Class 11 CS curriculum in school",
      "Learning C syntax & QBasic programming structure",
      "Exploring Python tutorials & web fundamentals"
    ]
  },
  {
    step: 2,
    phase: "Practicing",
    subtitle: "Repetition & Discipline",
    description: "Putting knowledge into practice: writing small console scripts, refining neat handwriting, and experimenting with video cut timings.",
    details: [
      "Writing small code exercises",
      "Regular handwriting practice for precision & patience",
      "Testing cuts and effects in video editors"
    ]
  },
  {
    step: 3,
    phase: "Building",
    subtitle: "Turning Ideas Into Reality",
    description: "Combining creativity with code to assemble real interfaces, experiment with interactive websites, and build useful small tools.",
    details: [
      "Designing responsive webpage layouts",
      "Prototyping student tools and personal pages",
      "Iterating based on what works best"
    ]
  },
  {
    step: 4,
    phase: "Improving",
    subtitle: "Continuous Reflection",
    description: "Reviewing mistakes honestly, optimizing code readability, polishing design aesthetics, and aiming to be 1% better every day.",
    details: [
      "Debugging errors step-by-step",
      "Cleaning up spacing, colors, and design rhythm",
      "Staying humble and open to feedback"
    ]
  },
  {
    step: 5,
    phase: "Creating",
    subtitle: "Meaningful Impact",
    description: "The ultimate vision: becoming a skilled software engineer who builds reliable, helpful digital products that solve real-world problems.",
    details: [
      "Aspiring Software Engineering path",
      "Building products that help people",
      "Lifelong passion for technology"
    ]
  }
];

export const PLANNED_PROJECTS = FUTURE_PROJECTS;
export const PLANNED_VIDEO_EDITS = VIDEO_EDIT_ITEMS;

export const ACHIEVEMENTS_DATA = [
  {
    id: "aplus-grade",
    title: "Passed SEE Examination with A+ Grade",
    category: "Academic",
    organization: "Everest English Boarding Secondary School",
    description: "Successfully achieved an A+ grade in the Secondary Education Examination (SEE), qualifying for Class 11 Computer Science faculty.",
    verified: true,
  },
];

