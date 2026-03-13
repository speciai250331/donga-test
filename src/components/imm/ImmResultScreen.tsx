import React from 'react';
import { IMM_BRAND } from '../../constants/imm-brand';
import { IMM_QUESTIONS } from '../../constants/imm-questions';
import { Result, Answers, SubjectiveAnswers } from '../../types';
import { getScorePercentage } from '../../utils';
import { Level } from '../../constants';

const getImmLevelGradient = (level: string): string => {
  switch (level) {
    case Level.INTERMEDIATE:
      return `linear-gradient(135deg, ${IMM_BRAND.primary} 0%, ${IMM_BRAND.primaryDark} 100%)`;
    case Level.BEGINNER:
      return `linear-gradient(135deg, #D4A843 0%, #B8912E 100%)`;
    default:
      return `linear-gradient(135deg, ${IMM_BRAND.gray[500]} 0%, ${IMM_BRAND.gray[700]} 100%)`;
  }
};

const generateImmAdvice = (result: Result) => {
  const { level } = result;
  if (level === Level.INTERMEDIATE) {
    return {
      currentAssessment: 'AI의 기본 개념과 투자 업무 실전 활용 모두에서 높은 이해도를 보여주고 있습니다. 프롬프트 엔지니어링에 대한 이해가 뛰어나며, 딜 소싱부터 실사, 밸류에이션까지 다양한 투자 프로세스에 AI를 효과적으로 활용할 수 있는 역량을 갖추고 있습니다.',
      strengths: '체계적인 프롬프트 설계 능력, 투자 분석 단계별 AI 활용 역량, 다양한 AI 도구 실전 경험',
      improvements: '고급 프롬프트 기법(Few-shot, Chain-of-Thought), AI 기반 자동화 워크플로우 구축, 자체 AI 분석 파이프라인 설계',
      recommendations: '- 고급 프롬프트 엔지니어링 마스터 과정\n- AI 기반 투자 분석 자동화 워크샵\n- 팀 내 AI Champion 역할 수행 및 사내 AI 활용 가이드 제작',
    };
  } else if (level === Level.BEGINNER) {
    return {
      currentAssessment: 'AI 기본 개념에 대한 이해는 양호하나, 투자 업무 실전 활용에서 성장 가능성이 큽니다. 프롬프트 작성의 기초를 알고 있으며, 체계적인 학습을 통해 투자 분석 효율을 크게 높일 수 있습니다.',
      strengths: '생성형 AI 기본 개념 이해, 투자 업무에서의 AI 윤리 인식, 학습 의지',
      improvements: '투자 시나리오별 구체적 프롬프트 작성법, 단계별 실사 프로세스 AI 적용, 재무 데이터 분석 AI 활용',
      recommendations: '- 투자 전문가를 위한 프롬프트 엔지니어링 기초 과정\n- 딜 소싱/실사/밸류에이션별 AI 활용 실습\n- AI 기반 투자 보고서 작성 워크샵',
    };
  } else {
    return {
      currentAssessment: 'AI에 대한 기초 학습이 필요한 단계입니다. 생성형 AI의 개념과 투자 업무에서의 기본적인 활용법부터 차근차근 학습하면 빠르게 성장할 수 있습니다.',
      strengths: 'AI 학습에 대한 관심과 의지, 투자 도메인 전문성 기반의 AI 적용 가능성',
      improvements: 'AI 기본 개념 이해, 프롬프트 개념 학습, ChatGPT 등 기본 도구 사용 경험',
      recommendations: '- AI 입문 기초 과정 (필수)\n- 투자 업무 맞춤형 AI 체험 실습\n- 1:1 멘토링 프로그램 참여',
    };
  }
};

const CircularGauge: React.FC<{
  score: number; max: number; size?: number; strokeWidth?: number; color?: string;
}> = ({ score, max, size = 140, strokeWidth = 12, color = 'white' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const offset = circumference * (1 - pct);
  return (
    <div className="relative flex-shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score.toFixed(1)}</span>
        <span className="text-xs text-white opacity-70">/ {max}</span>
      </div>
    </div>
  );
};

const MiniGauge: React.FC<{ score: number; max: number; color: string }> = ({ score, max, color }) => {
  const size = 56; const sw = 5; const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r; const pct = Math.min(score / max, 1);
  const offset = circ * (1 - pct);
  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={IMM_BRAND.gray[100]} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>{Math.round(pct * 100)}%</span>
      </div>
    </div>
  );
};

const getScoreColor = (score: number, max: number): string => {
  const ratio = score / max;
  if (ratio >= 1) return '#22C55E';
  if (ratio >= 0.5) return '#EAB308';
  return '#EF4444';
};

const getScoreBg = (score: number, max: number): string => {
  const ratio = score / max;
  if (ratio >= 1) return '#F0FDF4';
  if (ratio >= 0.5) return '#FEFCE8';
  return '#FEF2F2';
};

const getQuestionScore = (questionId: number, answers: Answers): number => {
  const question = IMM_QUESTIONS.find(q => q.id === questionId);
  if (!question || question.isSubjective) return 0;
  const selected = answers[questionId] || [];
  if (selected.length === 0) return 0;
  return Math.max(...question.options.filter(o => selected.includes(o.id)).map(o => o.score), 0);
};

const getQuestionMaxScore = (questionId: number): number => {
  const question = IMM_QUESTIONS.find(q => q.id === questionId);
  if (!question || question.isSubjective || question.options.length === 0) return 1;
  return Math.max(...question.options.map(o => o.score));
};

const getSelectedLabel = (questionId: number, answers: Answers, subjectiveAnswers: SubjectiveAnswers): string => {
  const question = IMM_QUESTIONS.find(q => q.id === questionId);
  if (!question) return '-';
  if (question.isSubjective) {
    const text = subjectiveAnswers[questionId];
    return text ? (text.length > 80 ? text.slice(0, 80) + '...' : text) : '(미응답)';
  }
  const selected = answers[questionId] || [];
  if (selected.length === 0) return '(미응답)';
  return selected.map(id => question.options.find(o => o.id === id)?.label || id).join(', ');
};

interface ImmResultScreenProps {
  result: Result;
  answers: Answers;
  subjectiveAnswers: SubjectiveAnswers;
  isAnimating: boolean;
  onRestart: () => void;
}

export const ImmResultScreen: React.FC<ImmResultScreenProps> = ({ result, answers, subjectiveAnswers, isAnimating, onRestart }) => {
  const advice = generateImmAdvice(result);
  const part1Questions = IMM_QUESTIONS.filter(q => q.part === 1);
  const part2Questions = IMM_QUESTIONS.filter(q => q.part === 2);
  const part1Pct = getScorePercentage(result.part1Score, 5);
  const part2Pct = getScorePercentage(result.part2Score, 10);

  return (
    <div className={`space-y-6 transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-8 text-white" style={{ background: getImmLevelGradient(result.level) }}>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20" style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <CircularGauge score={result.score} max={15} />
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              진단 완료
            </div>
            <h1 className="text-4xl font-black mb-1">{result.level} 레벨</h1>
            <p className="text-lg opacity-90 mb-4">
              총점 <span className="font-bold text-2xl">{result.score.toFixed(1)}</span> / 15.0점
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>0</span><span>5.5 (초급)</span><span>10.5 (중급)</span><span>15</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${getScorePercentage(result.score, 15)}%`, background: 'white' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part Scores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: IMM_BRAND.gray[200] }}>
          <div className="flex items-center gap-3 mb-3">
            <MiniGauge score={result.part1Score} max={5} color={IMM_BRAND.primary} />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: IMM_BRAND.gray[400] }}>PART 1</div>
              <div className="text-base font-semibold" style={{ color: IMM_BRAND.dark }}>기본 이해도</div>
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-black" style={{ color: IMM_BRAND.primary }}>{result.part1Score.toFixed(1)}</span>
              <span className="text-sm ml-1" style={{ color: IMM_BRAND.gray[400] }}>/ 5.0</span>
            </div>
            <span className="text-sm font-bold" style={{ color: IMM_BRAND.primary }}>{part1Pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: IMM_BRAND.gray[100] }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${part1Pct}%`, background: IMM_BRAND.primary }} />
          </div>
          <p className="mt-2 text-xs" style={{ color: IMM_BRAND.gray[500] }}>AI 개념, 프롬프트 이해, 투자 윤리</p>
        </div>
        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: IMM_BRAND.gray[200] }}>
          <div className="flex items-center gap-3 mb-3">
            <MiniGauge score={result.part2Score} max={10} color={IMM_BRAND.primaryDark} />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: IMM_BRAND.gray[400] }}>PART 2</div>
              <div className="text-base font-semibold" style={{ color: IMM_BRAND.dark }}>실전 역량</div>
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-black" style={{ color: IMM_BRAND.primaryDark }}>{result.part2Score.toFixed(1)}</span>
              <span className="text-sm ml-1" style={{ color: IMM_BRAND.gray[400] }}>/ 10.0</span>
            </div>
            <span className="text-sm font-bold" style={{ color: IMM_BRAND.primaryDark }}>{part2Pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: IMM_BRAND.gray[100] }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${part2Pct}%`, background: IMM_BRAND.primaryDark }} />
          </div>
          <p className="mt-2 text-xs" style={{ color: IMM_BRAND.gray[500] }}>투자/금융 시나리오 기반 AI 활용</p>
        </div>
      </div>

      {/* Question Detail */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: IMM_BRAND.gray[200] }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: IMM_BRAND.gray[200], background: IMM_BRAND.gray[50] }}>
          <h2 className="font-bold flex items-center gap-2" style={{ color: IMM_BRAND.dark }}>
            <span className="w-1 h-5 rounded-full" style={{ background: IMM_BRAND.primary }}></span>
            문항별 상세 분석
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: IMM_BRAND.gray[100] }}>
          <div className="px-5 py-3" style={{ background: IMM_BRAND.primaryLight }}>
            <span className="text-xs font-bold" style={{ color: IMM_BRAND.primary }}>PART 1 - 기본 이해도 (5문항)</span>
          </div>
          {part1Questions.map(q => {
            const score = getQuestionScore(q.id, answers);
            const maxScore = getQuestionMaxScore(q.id);
            const color = getScoreColor(score, maxScore);
            const bg = getScoreBg(score, maxScore);
            const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const shortTitle = q.title.replace(/^Q\d+\.\s*/, '').split(':')[0] || q.title;
            return (
              <div key={q.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold mb-0.5" style={{ color: IMM_BRAND.dark }}>Q{q.id}. {shortTitle}</div>
                    <div className="text-xs truncate" style={{ color: IMM_BRAND.gray[500] }}>{getSelectedLabel(q.id, answers, subjectiveAnswers)}</div>
                  </div>
                  <div className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: bg, color }}>
                    {score.toFixed(1)} / {maxScore.toFixed(1)}
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: IMM_BRAND.gray[100] }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}

          <div className="px-5 py-3" style={{ background: '#EDF5F0' }}>
            <span className="text-xs font-bold" style={{ color: IMM_BRAND.primaryDark }}>PART 2 - 실전 역량 (10문항)</span>
          </div>
          {part2Questions.map(q => {
            if (q.isSubjective) {
              return (
                <div key={q.id} className="px-5 py-3">
                  <div className="text-sm font-semibold mb-1" style={{ color: IMM_BRAND.dark }}>Q{q.id}. 종합 활용 (주관식)</div>
                  <div className="p-3 rounded-lg text-xs leading-relaxed" style={{ background: IMM_BRAND.gray[50], color: IMM_BRAND.gray[600] }}>
                    {subjectiveAnswers[q.id] || '(미응답)'}
                  </div>
                </div>
              );
            }
            const score = getQuestionScore(q.id, answers);
            const maxScore = getQuestionMaxScore(q.id);
            const color = getScoreColor(score, maxScore);
            const bg = getScoreBg(score, maxScore);
            const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
            const shortTitle = q.title.replace(/^Q\d+\.\s*/, '').split(':')[0] || q.title;
            return (
              <div key={q.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold mb-0.5" style={{ color: IMM_BRAND.dark }}>Q{q.id}. {shortTitle}</div>
                    <div className="text-xs truncate" style={{ color: IMM_BRAND.gray[500] }}>{getSelectedLabel(q.id, answers, subjectiveAnswers)}</div>
                  </div>
                  <div className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: bg, color }}>
                    {score.toFixed(1)} / {maxScore.toFixed(1)}
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: IMM_BRAND.gray[100] }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: IMM_BRAND.gray[200] }}>
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: IMM_BRAND.gray[200], background: IMM_BRAND.gray[50] }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${IMM_BRAND.primary} 0%, ${IMM_BRAND.primaryDark} 100%)` }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold" style={{ color: IMM_BRAND.dark }}>AI 분석 리포트</h2>
            <p className="text-xs" style={{ color: IMM_BRAND.gray[400] }}>투자 전문가 맞춤 학습 가이드</p>
          </div>
        </div>
        <div className="p-5 space-y-4 text-sm" style={{ color: IMM_BRAND.gray[700] }}>
          <div className="p-4 rounded-xl" style={{ background: IMM_BRAND.gray[50] }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: IMM_BRAND.dark }}>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={IMM_BRAND.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              현재 평가
            </h4>
            <p className="leading-relaxed">{advice.currentAssessment}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: '#F0FDF4' }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: IMM_BRAND.dark }}>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              강점 영역
            </h4>
            <p className="leading-relaxed">{advice.strengths}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: '#FEF2F2' }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: IMM_BRAND.dark }}>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              개선 영역
            </h4>
            <p className="leading-relaxed">{advice.improvements}</p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: IMM_BRAND.primaryLight }}>
            <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: IMM_BRAND.dark }}>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={IMM_BRAND.primary} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              추천 학습 경로
            </h4>
            <p className="leading-relaxed whitespace-pre-line">{advice.recommendations}</p>
          </div>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold border-2 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
        style={{ borderColor: IMM_BRAND.gray[300], color: IMM_BRAND.gray[600] }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        다시 진단하기
      </button>
    </div>
  );
};
