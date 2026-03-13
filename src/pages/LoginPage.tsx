import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BRAND } from '../constants';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error } = await login(email, password);
    if (error) {
      setError(error);
      setSubmitting(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${BRAND.dark} 0%, #2A4055 100%)`,
    }}>
      <div style={{
        width: 400, background: 'white', borderRadius: 16, padding: 40,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, background: BRAND.primary, borderRadius: 12,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 16,
          }}>AI</div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: BRAND.dark, marginBottom: 4 }}>
            관리자 로그인
          </h1>
          <p style={{ fontSize: 13, color: BRAND.gray[500] }}>
            AI 역량 진단 시스템
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 6 }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${BRAND.gray[300]}`,
                borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="admin@example.com"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 6 }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${BRAND.gray[300]}`,
                borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: 8, fontSize: 13, color: '#DC2626', marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', padding: '14px', border: 'none', borderRadius: 8,
              background: submitting ? BRAND.gray[400] : BRAND.primary,
              color: 'white', fontSize: 14, fontWeight: 600, cursor: submitting ? 'default' : 'pointer',
            }}
          >
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
};
