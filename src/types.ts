export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ResearchPaper {
  title: string;
  abstract: string;
  date: string;
  links: {
    paper?: string;
    code?: string;
  };
}
