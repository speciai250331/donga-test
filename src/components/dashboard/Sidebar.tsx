import { useLocation, useNavigate } from 'react-router-dom';
import { BRAND } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { section: '메인', items: [
    { label: '대시보드', path: '/admin' },
    { label: '진단 관리', path: '/admin/diagnostic' },
    { label: '진단 결과', path: '/admin/results' },
  ]},
  { section: '분석', items: [
    { label: '부서별 현황', path: '/admin/departments' },
    { label: '추이 분석', path: '/admin/trends' },
    { label: '리포트', path: '/admin/reports' },
  ]},
  { section: '설정', items: [
    { label: '문항 관리', path: '/admin/questions' },
    { label: '시스템 설정', path: '/admin/settings' },
  ]},
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <aside
      style={{
        width: 240,
        background: BRAND.dark,
        padding: '24px 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', marginBottom: 32, cursor: 'pointer' }}
        onClick={() => navigate('/admin')}
      >
        <div
          style={{
            width: 36, height: 36, background: BRAND.primary, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 12,
          }}
        >
          DA
        </div>
        <div>
          <small style={{ display: 'block', fontSize: 10, color: BRAND.gray[400] }}>동아쏘시오홀딩스</small>
          <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Admin</span>
        </div>
      </div>

      {navItems.map(group => (
        <div key={group.section}>
          <div style={{
            padding: '16px 20px 8px', fontSize: 10, textTransform: 'uppercase' as const,
            letterSpacing: 1, color: BRAND.gray[500],
          }}>
            {group.section}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {group.items.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    padding: '12px 20px', fontSize: 13, cursor: 'pointer',
                    borderLeft: `3px solid ${isActive ? BRAND.primary : 'transparent'}`,
                    background: isActive ? 'rgba(1,171,204,0.1)' : 'transparent',
                    color: isActive ? BRAND.primary : BRAND.gray[400],
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = BRAND.gray[400];
                    }
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Logout */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', borderTop: `1px solid rgba(255,255,255,0.1)` }}>
        {user && (
          <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.email}
          </div>
        )}
        <button
          onClick={async () => { await logout(); navigate('/login'); }}
          style={{
            width: '100%', padding: '10px 0', border: `1px solid rgba(255,255,255,0.15)`,
            borderRadius: 8, background: 'transparent', color: BRAND.gray[400],
            fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BRAND.gray[400]; }}
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};
