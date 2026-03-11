import { useState, useEffect } from 'react';
import { Header, Footer, IntroScreen, AssessmentScreen, ResultScreen } from './components';
import { QUESTIONS } from './constants';
import { calculateScore } from './utils';
import { Step, Answers, Result } from './types';

function App() {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Result | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, step]);

  const progress = Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100);

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

  const handleSubmit = () => {
    const res = calculateScore(answers);
    setResult(res);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('intro');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #F8FAFB 0%, #FFFFFF 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <Header step={step} progress={step === 'assessment' ? progress : undefined} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        {step === 'intro' && (
          <IntroScreen
            onStart={() => setStep('assessment')}
            isAnimating={isAnimating}
          />
        )}

        {step === 'assessment' && (
          <AssessmentScreen
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            isAnimating={isAnimating}
            onSelectOption={handleSelectOption}
            onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
            onPrevious={() => setCurrentQuestionIndex(prev => prev - 1)}
            onSubmit={handleSubmit}
          />
        )}

        {step === 'result' && result && (
          <ResultScreen
            result={result}
            isAnimating={isAnimating}
            onRestart={handleRestart}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
