import { useState } from 'react';
import { BRAND } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
  <div
    onClick={() => onChange(!value)}
    style={{
      width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
      background: value ? BRAND.primary : BRAND.gray[300],
      padding: 2, transition: 'background 0.2s',
    }}
  >
    <div style={{
      width: 20, height: 20, borderRadius: '50%', background: 'white',
      transform: `translateX(${value ? 20 : 0}px)`, transition: 'transform 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }} />
  </div>
);

export const SettingsPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('AI 역량 진단');
  const [description, setDescription] = useState('임직원 AI 활용 역량 수준을 진단하고 맞춤형 학습 방향을 제시합니다.');
  const [emailNotify, setEmailNotify] = useState(true);
  const [resultNotify, setResultNotify] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: `1px solid ${BRAND.gray[300]}`,
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>시스템 설정</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 24 }}>시스템 설정을 관리합니다.</p>

      {/* General Settings */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          일반 설정
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 8 }}>진단 제목</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 8 }}>진단 설명</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <button onClick={handleSave} style={{
            padding: '10px 24px', border: 'none', borderRadius: 8,
            background: saved ? '#059669' : BRAND.primary, color: 'white',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            {saved ? '저장됨' : '저장'}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          알림 설정
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: '이메일 알림', desc: '새로운 진단 완료 시 이메일로 알림을 받습니다.', value: emailNotify, onChange: setEmailNotify },
            { label: '결과 알림', desc: '진단 결과가 생성되면 알림을 받습니다.', value: resultNotify, onChange: setResultNotify },
            { label: '주간 리포트', desc: '매주 월요일 주간 요약 리포트를 받습니다.', value: weeklyReport, onChange: setWeeklyReport },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: BRAND.dark, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: BRAND.gray[500] }}>{item.desc}</div>
              </div>
              <Toggle value={item.value} onChange={item.onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          관리자 계정 정보
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 4 }}>이메일</div>
              <div style={{ fontSize: 14, color: BRAND.dark, fontWeight: 500 }}>{user?.email || '-'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 4 }}>마지막 로그인</div>
              <div style={{ fontSize: 14, color: BRAND.dark, fontWeight: 500 }}>{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('ko-KR') : '-'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 4 }}>계정 ID</div>
              <div style={{ fontSize: 12, color: BRAND.gray[400], fontFamily: 'monospace' }}>{user?.id || '-'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 4 }}>가입일</div>
              <div style={{ fontSize: 14, color: BRAND.dark, fontWeight: 500 }}>{user?.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
