import React from 'react';
import { BRAND } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-5" style={{ borderColor: BRAND.gray[200], background: BRAND.gray[50] }}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: BRAND.primary }}
          >
            DA
          </div>
          <div className="text-xs" style={{ color: BRAND.gray[400] }}>
            동아쏘시오홀딩스 AI 역량 진단 시스템
          </div>
        </div>
        <div className="text-xs" style={{ color: BRAND.gray[400] }}>
          © 2025 DONG-A SOCIO HOLDINGS
        </div>
      </div>
    </footer>
  );
};
