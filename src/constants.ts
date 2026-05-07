import { Project, Experience, ResearchPaper } from "./types";

export const PERSONAL_INFO = {
  name: "Md. Sajedur Rahman",
  nickname: "Sajid",
  role: "AI Researcher | Full-Stack Developer | Mobile App Specialist",
  bio: "I am a high-achieving CSE student at BUBT (CGPA 3.92) specializing in Artificial Intelligence. As a dedicated researcher and software engineer, I bridge the gap between complex machine learning models and user-centric applications.",
  email: "developersajid.net@gmail.com",
  location: "Bangladesh",
  education: "B.Sc in CSE, BUBT",
  cgpa: "3.92",
  socials: {
    github: "https://github.com/engineersajid",
    linkedin: "https://linkedin.com/in/developersajid",
    facebook: "https://www.facebook.com/programmer.sajid",
    twitter: "https://twitter.com/developersajid",
    youtube: "https://www.youtube.com/@ExplorerMotivation?sub_confirmation=1",
    scholar:
      "https://scholar.google.com/citations?user=your_id&user=rs8VqhUAAAAJ",
  },
  youtube: {
    name: "Explorer Motivation",
    handle: "@ExplorerMotivation",
    link: "https://www.youtube.com/@ExplorerMotivation?sub_confirmation=1",
    tagline: "Powerful motivation for life",
    topics: ["Speech", "Self Development", "Life Solution", "Biography"],
    subscribers: 56214,
  },
};

export const PROJECTS: Project[] = [
  {
    id: "mango-fusion-net",
    title: "MangoFusionNet",
    description:
      "Lead Researcher for a state-of-the-art Deep Learning framework for mango variety classification, achieving 98.33% accuracy with integrated Explainable AI (XAI).",
    tech: ["Deep Learning", "XAI", "Python", "TensorFlow"],
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=100&w=1600",
    link: "https://www.sciencedirect.com/science/article/pii/S2352340925007590",
    github: "#",
  },
  {
    id: "med-fusion-net",
    title: "MedFusionNet",
    description:
      "A hybrid framework utilizing YOLO and SAM 2 for automated disease detection and report generation from radiology images (Chest X-rays).",
    tech: ["YOLO v8", "SAM 2", "PyTorch", "Medical AI"],
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=100&w=1600",
    link: "#",
    github: "#",
  },
  {
    id: "bubt-cover",
    title: "BUBT Cover Page Gen",
    description:
      "A productivity-focused mobile application built with Flutter helping thousands of students generate academic cover pages instantly.",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=100&w=1600",
    link: "#",
    github: "#",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "BUBT (Thesis)",
    role: "AI Researcher (Lead)",
    period: "2024 - Present",
    description: [
      "Developing advanced Computer Vision models for agricultural and medical diagnostics.",
      "Achieving 98%+ accuracy across multiple classification frameworks.",
      "Exploring Federated Learning and Explainable AI (XAI) for transparent modeling.",
    ],
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "MangoClassify-12: A Comprehensive Data Article",
    abstract:
      "Published in Elsevier's Data in Brief (Volume 59, 2025). Contributing a robust dataset for agricultural computer vision and variety classification.",
    date: "2025",
    links: {
      paper:
        "https://www.sciencedirect.com/science/article/pii/S2352340925007590",
    },
  },
];

export const SKILLS = {
  ai: ["Deep Learning", "Federated Learning", "YOLO", "GANs", "XAI"],
  mobile: ["Flutter", "Dart", "Riverpod", "MVVM Architecture"],
  web: ["MERN Stack", "Express.js", "React", "Node.js", "MongoDB"],
  cyber: ["OSINT", "Web Vulnerability Analysis", "Penetration Testing"],
  languages: [
    "Bengali (Native)",
    "English (Professional)",
    "Japanese (Learning)",
  ],
};
