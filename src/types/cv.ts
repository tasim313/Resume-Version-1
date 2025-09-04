export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
  twitter: string;
  stackoverflow: string;
  medium: string;
  kaggle: string;
  leetcode: string;
  hackerrank: string;
  profileImage?: string;
  digitalSignature?: string;
}

export interface CareerObjective {
  summary: string;
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  year: string;
  gpa: string;
  achievements: string[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  isCurrentJob: boolean;
}

export interface Skills {
  programmingLanguages: string[];
  frameworks: string[];
  devopsTools: string[];
  databases: string[];
  softSkills: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  githubRepo: string;
  liveLink: string;
  description: string;
  achievements: string[];
  type: 'Web App' | 'Mobile App' | 'AI/ML' | 'DevOps' | 'Open Source';
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  year: string;
  type: 'certification' | 'award' | 'hackathon' | 'publication';
}

export interface AdditionalSection {
  openSourceContributions: string[];
  research: string[];
  patents: string[];
  languages: string[];
  volunteerExperience: string[];
  conferences: string[];
  references: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  careerObjective: CareerObjective;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  additionalSections: AdditionalSection;
}

export type TemplateType = 'google' | 'facebook' | 'minimalist';

export interface CVSettings {
  selectedTemplate: TemplateType;
  theme: 'light' | 'dark';
  primaryColor: string;
}