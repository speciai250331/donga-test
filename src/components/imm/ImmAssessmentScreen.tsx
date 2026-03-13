import React from 'react';
import { IMM_BRAND } from '../../constants/imm-brand';
import { IMM_QUESTIONS } from '../../constants/imm-questions';
import { Answers, SubjectiveAnswers } from '../../types';

interface ImmAssessmentScreenProps {
  currentQuestionIndex: number;
  answers: Answers;
  subjectiveAnswers: SubjectiveAnswers;
  isAnimating: boolean;
  onSelectOption: (questionId: number, optionId: string, isMultiple?: boolean) => void;
  onSubjectiveChange: (questionId: number, text: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const ImmAssessmentScreen: React.FC<ImmAssessmentScreenProps> = ({
  currentQuestionIndex,
  answers,
  subjectiveAnswers,
  isAnimating,
  onSelectOption,
  onSubjectiveChange,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const currentQuestion = IMM_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === IMM_QUESTIONS.length - 1;
  const isSubjective = currentQuestion.isSubjective;

  const hasAnswer = isSubjective
    ? (subjectiveAnswers[currentQuestion.id]?.trim().length ?? 0) > 0
    : (answers[currentQuestion.id]?.length ?? 0) > 0;

  return (
    <div className={`space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: currentQuestion.part === 1 ? IMM_BRAND.primary : IMM_BRAND.primaryDark }}
          >
            PART {currentQuestion.part}
          </div>
          <div className="text-sm font-medium" style={{ color: IMM_BRAND.gray[400] }}>
            {currentQuestion.part === 1 ? '기본 이해도' : '실전 역량'}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: IMM_BRAND.dark }}>
          <span style={{ color: IMM_BRAND.primary }}>{currentQuestionIndex + 1}</span>
          <span style={{ color: IMM_BRAND.gray[300] }}>/</span>
          <span>{IMM_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-1">
        {IMM_QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              background: idx <= currentQuestionIndex
                ? IMM_BRAND.primary
                : IMM_BRAND.gray[200]
            }}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl border" style={{ background: 'white', borderColor: IMM_BRAND.gray[200] }}>
        {currentQuestion.scenario && (
          <div
            className="mb-5 p-4 rounded-xl border-l-4 text-sm leading-relaxed"
            style={{
              background: IMM_BRAND.primaryLight,
              borderColor: IMM_BRAND.primary,
              color: IMM_BRAND.gray[700]
            }}
          >
            <div className="flex items-center gap-2 mb-2 font-semibold" style={{ color: IMM_BRAND.primary }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              상황
            </div>
            {currentQuestion.scenario}
          </div>
        )}

        <h3 className="text-lg font-bold leading-relaxed mb-2" style={{ color: IMM_BRAND.dark }}>
          {currentQuestion.title}
        </h3>

        {currentQuestion.isMultiple && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: IMM_BRAND.gray[100], color: IMM_BRAND.gray[600] }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            복수 선택 가능
          </div>
        )}

        {isSubjective && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            주관식 문항
          </div>
        )}

        {/* Options or Subjective Input */}
        {isSubjective ? (
          <div className="mt-4">
            <textarea
              value={subjectiveAnswers[currentQuestion.id] || ''}
              onChange={e => onSubjectiveChange(currentQuestion.id, e.target.value)}
              placeholder="귀하의 투자 업무에서 AI를 가장 효과적으로 활용할 수 있는 영역과 구체적인 활용 방안을 자유롭게 작성해 주세요.&#10;&#10;예시:&#10;- 활용하고 싶은 투자 업무 영역&#10;- 구체적인 AI 활용 시나리오&#10;- 기대하는 효과"
              className="w-full rounded-xl border-2 p-4 text-sm leading-relaxed transition-all duration-200 resize-none"
              style={{
                borderColor: (subjectiveAnswers[currentQuestion.id]?.trim().length ?? 0) > 0 ? IMM_BRAND.primary : IMM_BRAND.gray[200],
                background: (subjectiveAnswers[currentQuestion.id]?.trim().length ?? 0) > 0 ? IMM_BRAND.primaryLight : 'white',
                minHeight: 200,
                outline: 'none',
                color: IMM_BRAND.dark,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = IMM_BRAND.primary; }}
              onBlur={e => {
                if (!(subjectiveAnswers[currentQuestion.id]?.trim().length ?? 0)) {
                  e.currentTarget.style.borderColor = IMM_BRAND.gray[200];
                }
              }}
            />
            <div className="mt-2 text-right text-xs" style={{ color: IMM_BRAND.gray[400] }}>
              {(subjectiveAnswers[currentQuestion.id] || '').length}자 작성
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {currentQuestion.options.map((option) => {
              const isSelected = (answers[currentQuestion.id] || []).includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => onSelectOption(currentQuestion.id, option.id, currentQuestion.isMultiple)}
                  className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200"
                  style={{
                    borderColor: isSelected ? IMM_BRAND.primary : IMM_BRAND.gray[200],
                    background: isSelected ? IMM_BRAND.primaryLight : 'white',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold shrink-0 transition-all duration-200"
                      style={{
                        background: isSelected ? IMM_BRAND.primary : IMM_BRAND.gray[100],
                        color: isSelected ? 'white' : IMM_BRAND.gray[500]
                      }}
                    >
                      {option.id}
                    </span>
                    <span
                      className="text-sm leading-relaxed pt-0.5"
                      style={{ color: isSelected ? IMM_BRAND.dark : IMM_BRAND.gray[700] }}
                    >
                      {option.label}
                    </span>
                    {isSelected && (
                      <svg className="w-5 h-5 ml-auto shrink-0" style={{ color: IMM_BRAND.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={onPrevious}
          className="flex-1 py-4 px-6 rounded-xl font-semibold border-2 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ borderColor: IMM_BRAND.gray[300], color: IMM_BRAND.gray[600] }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={!hasAnswer}
            className="flex-[2] py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${IMM_BRAND.primary} 0%, ${IMM_BRAND.primaryDark} 100%)` }}
          >
            결과 확인하기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasAnswer}
            className="flex-[2] py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${IMM_BRAND.primary} 0%, ${IMM_BRAND.primaryDark} 100%)` }}
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
