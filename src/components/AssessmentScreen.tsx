import React from 'react';
import { BRAND, QUESTIONS } from '../constants';
import { Answers } from '../types';

interface AssessmentScreenProps {
  currentQuestionIndex: number;
  answers: Answers;
  isAnimating: boolean;
  onSelectOption: (questionId: number, optionId: string, isMultiple?: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  currentQuestionIndex,
  answers,
  isAnimating,
  onSelectOption,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  return (
    <div className={`space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: currentQuestion.part === 1 ? BRAND.primary : BRAND.primaryDark }}
          >
            PART {currentQuestion.part}
          </div>
          <div className="text-sm font-medium" style={{ color: BRAND.gray[400] }}>
            {currentQuestion.part === 1 ? '기본 이해도' : '실전 역량'}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: BRAND.dark }}>
          <span style={{ color: BRAND.primary }}>{currentQuestionIndex + 1}</span>
          <span style={{ color: BRAND.gray[300] }}>/</span>
          <span>{QUESTIONS.length}</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-1">
        {QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              background: idx < currentQuestionIndex
                ? BRAND.primary
                : idx === currentQuestionIndex
                  ? BRAND.primary
                  : BRAND.gray[200]
            }}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        {currentQuestion.scenario && (
          <div
            className="mb-5 p-4 rounded-xl border-l-4 text-sm leading-relaxed"
            style={{
              background: BRAND.primaryLight,
              borderColor: BRAND.primary,
              color: BRAND.gray[700]
            }}
          >
            <div className="flex items-center gap-2 mb-2 font-semibold" style={{ color: BRAND.primary }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              상황
            </div>
            {currentQuestion.scenario}
          </div>
        )}

        <h3 className="text-lg font-bold leading-relaxed mb-2" style={{ color: BRAND.dark }}>
          {currentQuestion.title}
        </h3>

        {currentQuestion.isMultiple && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: BRAND.gray[100], color: BRAND.gray[600] }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            복수 선택 가능
          </div>
        )}

        <div className="space-y-3 mt-4">
          {currentQuestion.options.map((option) => {
            const isSelected = (answers[currentQuestion.id] || []).includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(currentQuestion.id, option.id, currentQuestion.isMultiple)}
                className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200"
                style={{
                  borderColor: isSelected ? BRAND.primary : BRAND.gray[200],
                  background: isSelected ? BRAND.primaryLight : 'white',
                }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold shrink-0 transition-all duration-200"
                    style={{
                      background: isSelected ? BRAND.primary : BRAND.gray[100],
                      color: isSelected ? 'white' : BRAND.gray[500]
                    }}
                  >
                    {option.id}
                  </span>
                  <span
                    className="text-sm leading-relaxed pt-0.5"
                    style={{ color: isSelected ? BRAND.dark : BRAND.gray[700] }}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <svg className="w-5 h-5 ml-auto shrink-0" style={{ color: BRAND.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={onPrevious}
          className="flex-1 py-4 px-6 rounded-xl font-semibold border-2 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ borderColor: BRAND.gray[300], color: BRAND.gray[600] }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={!(answers[currentQuestion.id]?.length > 0)}
            className="flex-[2] py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)` }}
          >
            결과 확인하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!(answers[currentQuestion.id]?.length > 0)}
            className="flex-[2] py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)` }}
          >
            다음
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
