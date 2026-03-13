import { useState, useEffect } from 'react';
import { ImmHeader, ImmFooter, ImmIntroScreen, ImmAssessmentScreen, ImmResultScreen } from '../components/imm';
import { IMM_QUESTIONS } from '../constants/imm-questions';
import { IMM_BRAND } from '../constants/imm-brand';
import { Level } from '../constants';
import { Step, Answers, SubjectiveAnswers, Result } from '../types';

const calculateImmScore = (answers: Answers): Result => {
  let part1Score = 0;
  let part2Score = 0;

  IMM_QUESTIONS.forEach(q => {
    if (q.isSubjective) return;
    const selected = answers[q.id] || [];
    if (selected.length === 0) return;

    const maxOptionScore = Math.max(
      ...q.options.filter(o => selected.includes(o.id)).map(o => o.score),
      0
    );

    if (q.part === 1) {
      part1Score += maxOptionScore;
    } else {
      part2Score += maxOptionScore;
    }
  });

  const total = part1Score + part2Score;
  let level: string = Level.BASIC;
  if (total >= 10.5) level = Level.INTERMEDIATE;
  else if (total >= 5.5) level = Level.BEGINNER;

  return { score: total, level, part1Score, part2Score };
};

export const ImmDiagnosticPage = () => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<SubjectiveAnswers>({});
  const [result, setResult] = useState<Result | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, step]);

  const progress = Math.round(((currentQuestionIndex + 1) / IMM_QUESTIONS.length) * 100);

  const handleSelectOption = (questionId: number, optionId: string, isMultiple?: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (isMultiple) {
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...current, optionId] };
        }
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const handleSubjectiveChange = (questionId: number, text: string) => {
    setSubjectiveAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const handleSubmit = () => {
    const res = calculateImmScore(answers);
    setResult(res);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('intro');
    setAnswers({});
    setSubjectiveAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: `linear-gradient(180deg, ${IMM_BRAND.gray[50]} 0%, #FFFFFF 100%)`, fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <ImmHeader step={step} progress={step === 'assessment' ? progress : undefined} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        {step === 'intro' && (
          <ImmIntroScreen onStart={() => setStep('assessment')} isAnimating={isAnimating} />
        )}
        {step === 'assessment' && (
          <ImmAssessmentScreen
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            subjectiveAnswers={subjectiveAnswers}
            isAnimating={isAnimating}
            onSelectOption={handleSelectOption}
            onSubjectiveChange={handleSubjectiveChange}
            onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
            onPrevious={() => setCurrentQuestionIndex(prev => prev - 1)}
            onSubmit={handleSubmit}
          />
        )}
        {step === 'result' && result && (
          <ImmResultScreen
            result={result}
            answers={answers}
            subjectiveAnswers={subjectiveAnswers}
            isAnimating={isAnimating}
            onRestart={handleRestart}
          />
        )}
      </main>

      <ImmFooter />
    </div>
  );
};
