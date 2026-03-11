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
