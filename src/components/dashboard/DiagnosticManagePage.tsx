import { BRAND } from '../../constants';

export const DiagnosticManagePage = () => {
  const diagnosticUrl = `${window.location.origin}/diagnostic`;

  const copyLink = () => {
    navigator.clipboard.writeText(diagnosticUrl);
    alert('진단 링크가 복사되었습니다.');
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark }}>진단 관리</h1>
        <p style={{ fontSize: 13, color: BRAND.gray[500], marginTop: 4 }}>역량 진단 링크를 관리하고 공유합니다.</p>
      </div>

      {/* Diagnostic Link Card */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          진단 링크
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
            <input
              readOnly
              value={diagnosticUrl}
              style={{
                flex: 1, padding: '12px 16px', border: `1px solid ${BRAND.gray[200]}`,
                borderRadius: 8, fontSize: 13, color: BRAND.dark, background: BRAND.gray[50],
              }}
            />
            <button
              onClick={copyLink}
              style={{
                padding: '12px 24px', border: 'none', borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: 'pointer', background: BRAND.primary, color: 'white',
              }}
            >
              링크 복사
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="/diagnostic"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              진단 페이지 미리보기
            </a>
          </div>
        </div>
      </div>

      {/* Diagnostic Settings */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          진단 설정
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: BRAND.dark }}>진단 활성화</div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginTop: 2 }}>비활성화 시 학습자가 진단에 접근할 수 없습니다.</div>
            </div>
            <div style={{
              width: 44, height: 24, borderRadius: 12, background: BRAND.primary,
              position: 'relative', cursor: 'pointer',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 2, right: 2, transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }} />
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${BRAND.gray[100]}`, paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: BRAND.dark }}>결과 즉시 표시</div>
              <div style={{ fontSize: 12, color: BRAND.gray[500], marginTop: 2 }}>완료 후 학습자에게 결과를 바로 보여줍니다.</div>
            </div>
            <div style={{
              width: 44, height: 24, borderRadius: 12, background: BRAND.primary,
              position: 'relative', cursor: 'pointer',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 2, right: 2, transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { label: '총 문항 수', value: '15', sub: 'PART 1: 5문항 / PART 2: 10문항' },
          { label: '예상 소요 시간', value: '10분', sub: '평균 완료 시간 기준' },
          { label: '레벨 구분', value: '3단계', sub: '기초 / 초급 / 중급' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: `1px solid ${BRAND.gray[200]}` }}>
            <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 12 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: BRAND.dark, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: BRAND.gray[400] }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
