import React from 'react';
import { BRAND, QUESTIONS } from '../constants';
import { Result, Answers } from '../types';
import { generateAdvice, getScorePercentage, getLevelGradient } from '../utils';

interface ResultScreenProps {
  result: Result;
  answers: Answers;
  isAnimating: boolean;
  onRestart: () => void;
}

/** SVG circular gauge component */
const CircularGauge: React.FC<{
  score: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  animate?: boolean;
}> = ({ score, max, size = 120, strokeWidth = 10, color = BRAND.primary, label, animate = true }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={animate ? { transition: 'stroke-dashoffset 1.5s ease-out' } : undefined}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-3xl font-black text-white">{score.toFixed(1)}</span>
        <span className="text-xs text-white opacity-70">/ {max}</span>
      </div>
      {label && <span className="mt-1 text-xs text-white opacity-80">{label}</span>}
    </div>
  );
};

/** Mini circular gauge for part score cards */
const MiniGauge: React.FC<{
  score: number;
  max: number;
  color: string;
}> = ({ score, max, color }) => {
  const size = 56;
  const sw = 5;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score / max, 1);
  const offset = circ * (1 - pct);

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={BRAND.gray[100]} strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>{Math.round(pct * 100)}%</span>
      </div>
    </div>
  );
};

/** Get score color based on ratio */
const getScoreColor = (score: number, max: number): string => {
  const ratio = score / max;
  if (ratio >= 1) return '#22C55E';
  if (ratio >= 0.5) return '#EAB308';
  return '#EF4444';
};

/** Get score bg color */
const getScoreBg = (score: number, max: number): string => {
  const ratio = score / max;
  if (ratio >= 1) return '#F0FDF4';
  if (ratio >= 0.5) return '#FEFCE8';
  return '#FEF2F2';
};

/** Calculate per-question score from answers */
const getQuestionScore = (questionId: number, answers: Answers): number => {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) return 0;
  const selected = answers[questionId] || [];
  if (selected.length === 0) return 0;
  return Math.max(...question.options.filter(o => selected.includes(o.id)).map(o => o.score), 0);
};

/** Get max possible score for a question */
const getQuestionMaxScore = (questionId: number): number => {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) return 1;
  return Math.max(...question.options.map(o => o.score));
};

/** Get selected option label */
const getSelectedLabel = (questionId: number, answers: Answers): string => {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) return '-';
  const selected = answers[questionId] || [];
  if (selected.length === 0) return '(미응답)';
  return selected
    .map(id => question.options.find(o => o.id === id)?.label || id)
    .join(', ');
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, answers, isAnimating, onRestart }) => {
  const advice = generateAdvice(result);
  const part1Questions = QUESTIONS.filter(q => q.part === 1);
  const part2Questions = QUESTIONS.filter(q => q.part === 2);
  const part1Pct = getScorePercentage(result.part1Score, 5);
  const part2Pct = getScorePercentage(result.part2Score, 10);

  return (
    <div className={`space-y-6 transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

      {/* ===== Hero with SVG Gauge ===== */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-white"
        style={{ background: getLevelGradient(result.level) }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20" style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          {/* SVG Circular Gauge */}
          <div className="relative flex-shrink-0">
            <CircularGauge score={result.score} max={15} size={140} strokeWidth={12} color="white" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              진단 완료
            </div>

            <h1 className="text-4xl font-black mb-1">
              {result.level} 레벨
            </h1>
            <p className="text-lg opacity-90 mb-4">
              총점 <span className="font-bold text-2xl">{result.score.toFixed(1)}</span> / 15.0점
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>0</span>
                <span>5.5 (초급)</span>
                <span>10.5 (중급)</span>
                <span>15</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${getScorePercentage(result.score, 15)}%`, background: 'white' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PART 1 / PART 2 Score Cards with Mini Gauges ===== */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
          <div className="flex items-center gap-3 mb-3">
            <MiniGauge score={result.part1Score} max={5} color={BRAND.primary} />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: BRAND.gray[400] }}>PART 1</div>
              <div className="text-base font-semibold" style={{ color: BRAND.dark }}>기본 이해도</div>
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-black" style={{ color: BRAND.primary }}>{result.part1Score.toFixed(1)}</span>
              <span className="text-sm ml-1" style={{ color: BRAND.gray[400] }}>/ 5.0</span>
            </div>
            <span className="text-sm font-bold" style={{ color: BRAND.primary }}>{part1Pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${part1Pct}%`, background: BRAND.primary }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: BRAND.gray[500] }}>AI 개념, 프롬프트 이해, 윤리적 활용</p>
        </div>

        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
          <div className="flex items-center gap-3 mb-3">
            <MiniGauge score={result.part2Score} max={10} color={BRAND.primaryDark} />
            <div className="flex-1">
              <div className="text-xs font-bold tracking-wide mb-0.5" style={{ color: BRAND.gray[400] }}>PART 2</div>
              <div className="text-base font-semibold" style={{ color: BRAND.dark }}>실전 역량</div>
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-black" style={{ color: BRAND.primaryDark }}>{result.part2Score.toFixed(1)}</span>
              <span className="text-sm ml-1" style={{ color: BRAND.gray[400] }}>/ 10.0</span>
            </div>
            <span className="text-sm font-bold" style={{ color: BRAND.primaryDark }}>{part2Pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${part2Pct}%`, background: BRAND.primaryDark }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: BRAND.gray[500] }}>시나리오 기반 AI 활용 능력</p>
        </div>
      </div>

      {/* ===== Capability Summary Bar Chart ===== */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: BRAND.gray[200], background: BRAND.gray[50] }}>
          <h2 className="font-bold flex items-center gap-2" style={{ color: BRAND.dark }}>
            <span className="w-1 h-5 rounded-full" style={{ background: BRAND.primary }}></span>
            역량 영역 요약
          </h2>
        </div>
        <div className="p-5 space-y-4">
          {/* PART 1 bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold" style={{ color: BRAND.dark }}>PART 1 - 기본 이해도</span>
              <span className="text-sm font-bold" style={{ color: BRAND.primary }}>{result.part1Score.toFixed(1)} / 5.0</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
              <div
                className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                style={{ width: `${Math.max(part1Pct, 8)}%`, background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryDark})` }}
              >
                {part1Pct >= 20 && <span className="text-[10px] font-bold text-white">{part1Pct}%</span>}
              </div>
            </div>
          </div>
          {/* PART 2 bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold" style={{ color: BRAND.dark }}>PART 2 - 실전 역량</span>
              <span className="text-sm font-bold" style={{ color: BRAND.primaryDark }}>{result.part2Score.toFixed(1)} / 10.0</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
              <div
                className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                style={{ width: `${Math.max(part2Pct, 8)}%`, background: `linear-gradient(90deg, ${BRAND.primaryDark}, #017A94)` }}
              >
                {part2Pct >= 20 && <span className="text-[10px] font-bold text-white">{part2Pct}%</span>}
              </div>
            </div>
          </div>
          {/* Overall position */}
          <div className="pt-3 border-t" style={{ borderColor: BRAND.gray[200] }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold" style={{ color: BRAND.dark }}>종합 (전체 15점 대비)</span>
              <span className="text-sm font-bold" style={{ color: BRAND.dark }}>{result.score.toFixed(1)} / 15.0</span>
            </div>
            <div className="relative h-4 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.max(getScorePercentage(result.score, 15), 8)}%`,
                  background: getLevelGradient(result.level),
                }}
              />
              {/* Level markers */}
              <div className="absolute top-0 h-full w-px" style={{ left: `${(5.5 / 15) * 100}%`, background: BRAND.gray[300] }} />
              <div className="absolute top-0 h-full w-px" style={{ left: `${(10.5 / 15) * 100}%`, background: BRAND.gray[300] }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px]" style={{ color: BRAND.gray[400] }}>기초</span>
              <span className="text-[10px]" style={{ color: BRAND.gray[400], marginLeft: '20%' }}>초급 (5.5)</span>
              <span className="text-[10px]" style={{ color: BRAND.gray[400] }}>중급 (10.5)</span>
              <span className="text-[10px]" style={{ color: BRAND.gray[400] }}>15</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Question-by-Question Detail ===== */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: BRAND.gray[200], background: BRAND.gray[50] }}>
          <h2 className="font-bold flex items-center gap-2" style={{ color: BRAND.dark }}>
            <span className="w-1 h-5 rounded-full" style={{ background: BRAND.accent }}></span>
            문항별 상세 분석
          </h2>
          <p className="text-xs mt-1" style={{ color: BRAND.gray[400] }}>각 문항의 득점과 선택한 답변을 확인하세요</p>
        </div>
        <div className="divide-y" style={{ borderColor: BRAND.gray[100] }}>
          {/* PART 1 */}
          <div className="px-5 py-3" style={{ background: BRAND.primaryLight }}>
            <span className="text-xs font-bold" style={{ color: BRAND.primary }}>PART 1 - 기본 이해도 (5문항)</span>
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
                    <div className="text-sm font-semibold mb-0.5" style={{ color: BRAND.dark }}>
                      Q{q.id}. {shortTitle}
                    </div>
                    <div className="text-xs truncate" style={{ color: BRAND.gray[500] }}>
                      {getSelectedLabel(q.id, answers)}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ background: bg, color }}
                  >
                    {score.toFixed(1)} / {maxScore.toFixed(1)}
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}

          {/* PART 2 */}
          <div className="px-5 py-3" style={{ background: '#EFF8FA' }}>
            <span className="text-xs font-bold" style={{ color: BRAND.primaryDark }}>PART 2 - 실전 역량 (10문항)</span>
          </div>
          {part2Questions.map(q => {
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
                    <div className="text-sm font-semibold mb-0.5" style={{ color: BRAND.dark }}>
                      Q{q.id}. {shortTitle}
                    </div>
                    <div className="text-xs truncate" style={{ color: BRAND.gray[500] }}>
                      {getSelectedLabel(q.id, answers)}
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ background: bg, color }}
                  >
                    {score.toFixed(1)} / {maxScore.toFixed(1)}
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== AI Analysis Report ===== */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: BRAND.gray[200], background: BRAND.gray[50] }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)` }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold" style={{ color: BRAND.dark }}>AI 분석 리포트</h2>
            <p className="text-xs" style={{ color: BRAND.gray[400] }}>맞춤형 학습 가이드</p>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4 text-sm" style={{ color: BRAND.gray[700] }}>
            <div className="p-4 rounded-xl" style={{ background: BRAND.gray[50] }}>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                현재 평가
              </h4>
              <p className="leading-relaxed">{advice.currentAssessment}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#F0FDF4' }}>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#22C55E" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                강점 영역
              </h4>
              <p className="leading-relaxed">{advice.strengths}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#FEF2F2' }}>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                개선 영역
              </h4>
              <p className="leading-relaxed">{advice.improvements}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: BRAND.primaryLight }}>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                추천 학습 경로
              </h4>
              <p className="leading-relaxed whitespace-pre-line">{advice.recommendations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Next Steps ===== */}
      <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: BRAND.dark }}>
          <span className="w-1 h-5 rounded-full" style={{ background: BRAND.primary }}></span>
          다음 단계 안내
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl" style={{ background: BRAND.primaryLight }}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ background: BRAND.primary }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-semibold text-sm" style={{ color: BRAND.dark }}>레벨별 반 편성</div>
            </div>
            <p className="text-xs" style={{ color: BRAND.gray[600] }}>
              <span className="font-bold" style={{ color: BRAND.primary }}>{result.level} 레벨</span>에 최적화된 학습 그룹에 배정됩니다.
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: BRAND.gray[50] }}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ background: BRAND.gray[600] }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="font-semibold text-sm" style={{ color: BRAND.dark }}>맞춤형 학습 자료</div>
            </div>
            <p className="text-xs" style={{ color: BRAND.gray[600] }}>
              취약 영역인 <span className="font-bold">PART {result.part1Score > result.part2Score ? '2 (실전역량)' : '1 (기본이해)'}</span>에 대한 집중 학습 자료가 제공됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Restart Button ===== */}
      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold border-2 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
        style={{ borderColor: BRAND.gray[300], color: BRAND.gray[600] }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        다시 진단하기
      </button>
    </div>
  );
};
