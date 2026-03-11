import React from 'react';
import { BRAND } from '../constants';

interface HeaderProps {
  step: string;
  progress?: number;
}

export const Header: React.FC<HeaderProps> = ({ step, progress }) => {
  return (
    <header
      className="w-full border-b sticky top-0 z-50"
      style={{
        borderColor: BRAND.gray[200],
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ background: BRAND.primary }}
          >
            DA
          </div>
          <div>
            <div className="text-xs font-medium tracking-wide" style={{ color: BRAND.gray[400] }}>
              동아쏘시오홀딩스
            </div>
            <div className="text-sm font-semibold" style={{ color: BRAND.dark }}>
              AI 역량 사전 진단
            </div>
          </div>
        </div>
        {step === 'assessment' && progress !== undefined && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium" style={{ color: BRAND.gray[400] }}>진행률</span>
            <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: BRAND.gray[200] }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: BRAND.primary }}
              />
            </div>
            <span className="text-xs font-semibold" style={{ color: BRAND.primary }}>{progress}%</span>
          </div>
        )}
      </div>
    </header>
  );
};
