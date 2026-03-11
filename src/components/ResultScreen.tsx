import React from 'react';
import { BRAND } from '../constants';
import { Result } from '../types';
import { generateAdvice, getScorePercentage, getLevelGradient } from '../utils';

interface ResultScreenProps {
  result: Result;
  isAnimating: boolean;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, isAnimating, onRestart }) => {
  const advice = generateAdvice(result);

  return (
    <div className={`space-y-6 transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Result Hero */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 text-white"
        style={{ background: getLevelGradient(result.level) }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20" style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            진단 완료
          </div>

          <h1 className="text-4xl font-black mb-2">
            {result.level} 레벨
          </h1>
          <p className="text-lg opacity-90 mb-6">
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

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold tracking-wide mb-1" style={{ color: BRAND.gray[400] }}>PART 1</div>
              <div className="text-base font-semibold" style={{ color: BRAND.dark }}>기본 이해도</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: BRAND.primary }}>{result.part1Score.toFixed(1)}</div>
              <div className="text-xs" style={{ color: BRAND.gray[400] }}>/ 5.0</div>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${getScorePercentage(result.part1Score, 5)}%`, background: BRAND.primary }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: BRAND.gray[500] }}>AI 개념, 프롬프트 이해, 윤리적 활용</p>
        </div>

        <div className="p-5 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold tracking-wide mb-1" style={{ color: BRAND.gray[400] }}>PART 2</div>
              <div className="text-base font-semibold" style={{ color: BRAND.dark }}>실전 역량</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black" style={{ color: BRAND.primaryDark }}>{result.part2Score.toFixed(1)}</div>
              <div className="text-xs" style={{ color: BRAND.gray[400] }}>/ 10.0</div>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray[100] }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${getScorePercentage(result.part2Score, 10)}%`, background: BRAND.primaryDark }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: BRAND.gray[500] }}>시나리오 기반 AI 활용 능력</p>
        </div>
      </div>

      {/* AI Analysis */}
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
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                현재 평가
              </h4>
              <p className="leading-relaxed">{advice.currentAssessment}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                강점 영역
              </h4>
              <p className="leading-relaxed">{advice.strengths}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: BRAND.dark }}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                개선 영역
              </h4>
              <p className="leading-relaxed">{advice.improvements}</p>
            </div>
            <div>
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

      {/* Next Steps */}
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

      {/* Restart Button */}
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
