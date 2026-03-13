import { useParams } from 'react-router-dom';
import { Project } from '../types';
import { DiagnosticPage } from './DiagnosticPage';
import { ImmDiagnosticPage } from './ImmDiagnosticPage';
import { BRAND } from '../constants';

const PROJECTS_KEY = 'ai_diag_projects';

export const DynamicDiagnosticPage = () => {
  const { slug } = useParams<{ slug: string }>();

  let project: Project | undefined;
  try {
    const saved = localStorage.getItem(PROJECTS_KEY);
    if (saved) {
      const projects: Project[] = JSON.parse(saved);
      project = projects.find(p => p.slug === slug);
    }
  } catch {
    // ignore parse errors
  }

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: BRAND.gray[50],
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: BRAND.gray[300], marginBottom: 16 }}>404</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: BRAND.gray[600], marginBottom: 8 }}>
            진단을 찾을 수 없습니다
          </div>
          <div style={{ fontSize: 14, color: BRAND.gray[400] }}>
            요청하신 진단 페이지가 존재하지 않습니다.
          </div>
        </div>
      </div>
    );
  }

  if (!project.isActive) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: BRAND.gray[50],
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: BRAND.gray[300], marginBottom: 16 }}>--</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: BRAND.gray[600], marginBottom: 8 }}>
            현재 비활성화된 진단입니다
          </div>
          <div style={{ fontSize: 14, color: BRAND.gray[400] }}>
            관리자가 이 진단을 비활성화했습니다. 관리자에게 문의해 주세요.
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'imm') {
    return <ImmDiagnosticPage />;
  }

  return <DiagnosticPage />;
};
