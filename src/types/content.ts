export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface TechCategory {
  category: string;
  items: { name: string; note?: string }[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  architectureSummary: string;
  architectureDiagram: string[]; // ASCII-style layered description, rendered in a code block
  decisions: { title: string; detail: string }[];
  testing: string[];
  deployment: string[];
  security: string[];
  metrics: ProjectMetric[];
  stack: string[];
  github: string;
  liveUrl?: string;
  apiDocsUrl?: string;
  featured: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  id?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
  externalUrl?: string;
}
