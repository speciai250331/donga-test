import React from 'react';
import { BRAND } from '../constants';

interface IntroScreenProps {
  onStart: () => void;
  isAnimating: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, isAnimating }) => {
  return (
    <div className={`space-y-10 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      {/* Hero Section */}
      <div className="text-center space-y-5">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: BRAND.primaryLight, color: BRAND.primary }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          2025 AI 교육 프로그램
        </div>
        <h1 className="text-4xl font-bold leading-tight" style={{ color: BRAND.dark }}>
          AI 역량 <span style={{ color: BRAND.primary }}>사전 진단</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: BRAND.gray[500] }}>
          귀하의 현재 AI 활용 역량을 진단하고<br />
          최적화된 학습 경로를 제안해 드립니다.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: 'clock', label: '소요 시간', value: '약 10분', desc: '15개 문항' },
          { icon: 'chart', label: '평가 영역', value: '2개 파트', desc: '기본이해 + 실전역량' },
          { icon: 'target', label: '결과 제공', value: '즉시 확인', desc: 'AI 맞춤 분석' },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer"
            style={{ background: 'white', borderColor: BRAND.gray[200] }}
          >
            <div className="w-8 h-8 mb-2">
              {item.icon === 'clock' && (
                <svg fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {item.icon === 'chart' && (
                <svg fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )}
              {item.icon === 'target' && (
                <svg fill="none" viewBox="0 0 24 24" stroke={BRAND.primary} strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </div>
            <div className="text-xs font-medium mb-1" style={{ color: BRAND.gray[400] }}>{item.label}</div>
            <div className="text-lg font-bold mb-1" style={{ color: BRAND.dark }}>{item.value}</div>
            <div className="text-sm" style={{ color: BRAND.gray[500] }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Assessment Structure */}
      <div className="p-6 rounded-2xl border" style={{ background: 'white', borderColor: BRAND.gray[200] }}>
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: BRAND.dark }}>
          <span className="w-1 h-5 rounded-full" style={{ background: BRAND.primary }}></span>
          진단 구성
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: BRAND.gray[50] }}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0 text-sm"
              style={{ background: BRAND.primary }}
            >
              01
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold mb-1" style={{ color: BRAND.dark }}>PART 1 · 기본 이해도</div>
              <div className="text-sm" style={{ color: BRAND.gray[500] }}>AI 및 생성형 AI 개념, 프롬프트 이해, 윤리적 활용에 대한 기초 지식을 확인합니다.</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold" style={{ color: BRAND.primary }}>5</div>
              <div className="text-xs" style={{ color: BRAND.gray[400] }}>문항</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: BRAND.gray[50] }}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0 text-sm"
              style={{ background: BRAND.primaryDark }}
            >
              02
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold mb-1" style={{ color: BRAND.dark }}>PART 2 · 실전 역량</div>
              <div className="text-sm" style={{ color: BRAND.gray[500] }}>실제 업무 시나리오 기반으로 AI 활용 능력과 프롬프트 작성 역량을 평가합니다.</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-lg font-bold" style={{ color: BRAND.primary }}>10</div>
              <div className="text-xs" style={{ color: BRAND.gray[400] }}>문항</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="w-full py-5 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)` }}
      >
        진단 시작하기
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};
