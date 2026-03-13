export interface Option {
  id: string;
  label: string;
  score: number;
}

export interface Question {
  id: number;
  part: 1 | 2;
  title: string;
  scenario?: string;
  isMultiple?: boolean;
  isSubjective?: boolean;
  options: Option[];
}

export interface Result {
  score: number;
  level: string;
  part1Score: number;
  part2Score: number;
}

export interface Advice {
  currentAssessment: string;
  strengths: string;
  improvements: string;
  recommendations: string;
}

export type Step = 'intro' | 'assessment' | 'result';

export interface Answers {
  [questionId: number]: string[];
}

export interface SubjectiveAnswers {
  [questionId: number]: string;
}

export interface LearnerRecord {
  name: string;
  dept: string;
  rank: string;
  level: string;
  total: number;
  part1: number;
  part2: number;
  date: string;
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  type: 'standard' | 'imm';
  isActive: boolean;
  showResult: boolean;
  createdAt: string;
}
