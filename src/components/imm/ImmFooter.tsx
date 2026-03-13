import React from 'react';
import { IMM_BRAND } from '../../constants/imm-brand';

export const ImmFooter: React.FC = () => {
  return (
    <footer className="w-full border-t py-5" style={{ borderColor: IMM_BRAND.gray[200], background: IMM_BRAND.gray[50] }}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: IMM_BRAND.primary }}
          >
            IMM
          </div>
          <div className="text-xs" style={{ color: IMM_BRAND.gray[400] }}>
            IMM Investment AI 역량 진단 시스템
          </div>
        </div>
        <div className="text-xs" style={{ color: IMM_BRAND.gray[400] }}>
          &copy; 2025 IMM Investment
        </div>
      </div>
    </footer>
  );
};
