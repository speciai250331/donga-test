import { QUESTIONS, Level } from '../constants';
import { Answers, Result } from '../types';

export const calculateScore = (answers: Answers): Result => {
  let part1Score = 0;
  let part2Score = 0;

  QUESTIONS.forEach(q => {
    const selected = answers[q.id] || [];
    if (selected.length === 0) return;

    if (q.part === 1) {
      const maxOptionScore = Math.max(...q.options.filter(o => selected.includes(o.id)).map(o => o.score), 0);
      part1Score += maxOptionScore;
    } else {
      const maxOptionScore = Math.max(...q.options.filter(o => selected.includes(o.id)).map(o => o.score), 0);
      part2Score += maxOptionScore;
    }
  });

  const total = part1Score + part2Score;
  let level: string = Level.BASIC;
  if (total >= 10.5) level = Level.INTERMEDIATE;
  else if (total >= 5.5) level = Level.BEGINNER;

  return { score: total, level, part1Score, part2Score };
};

export const getScorePercentage = (score: number, max: number): number => {
  return Math.round((score / max) * 100);
};
