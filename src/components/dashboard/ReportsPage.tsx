import { BRAND } from '../../constants';

// (예) 샘플 데이터 - 실제 운영 시 DB 연동 필요
const REPORTS = [
  { id: 1, title: '(예) 2026년 1월 월간 리포트', type: '월간', date: '2026.02.01', status: '완료', summary: { participants: 248, avgScore: 8.7, completionRate: 79.5 } },
  { id: 2, title: '(예) 2025년 4분기 분기 리포트', type: '분기', date: '2026.01.15', status: '완료', summary: { participants: 682, avgScore: 8.3, completionRate: 75.2 } },
  { id: 3, title: '(예) 2025년 12월 월간 리포트', type: '월간', date: '2026.01.01', status: '완료', summary: { participants: 198, avgScore: 8.3, completionRate: 72.1 } },
];

const KEY_METRICS = [
  { label: '(예) 총 진단 참여자', value: '248', change: '+12.5%', up: true },
  { label: '(예) 전체 평균 점수', value: '8.7', change: '+0.6', up: true },
  { label: '(예) 전체 완료율', value: '79.5%', change: '+7.2%', up: true },
];

export const ReportsPage = () => {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>리포트</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 4 }}>월간/분기별 리포트를 확인하고 다운로드합니다.</p>
      <p style={{ fontSize: 12, color: BRAND.accent, marginBottom: 24 }}>* 아래 데이터는 (예) 샘플입니다. 실제 운영 시 DB 연동이 필요합니다.</p>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {KEY_METRICS.map(m => (
          <div key={m.label} style={{ background: 'white', borderRadius: 12, padding: 24, border: `1px solid ${BRAND.gray[200]}` }}>
            <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 12 }}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: BRAND.dark }}>{m.value}</span>
              {m.change && (
                <span style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                  background: m.up ? '#ECFDF5' : '#FEF2F2', color: m.up ? '#059669' : '#DC2626',
                }}>{m.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Report List */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          리포트 목록
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {REPORTS.map(r => (
            <div key={r.id} style={{
              padding: 24, borderBottom: `1px solid ${BRAND.gray[100]}`,
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{
                    padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: r.type === '분기' ? BRAND.primaryLight : BRAND.gray[100],
                    color: r.type === '분기' ? BRAND.primary : BRAND.gray[600],
                  }}>{r.type}</span>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark }}>{r.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>참여자: {r.summary.participants}명</span>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>평균: {r.summary.avgScore}점</span>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>완료율: {r.summary.completionRate}%</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: BRAND.gray[400] }}>{r.date}</span>
              <button
                onClick={() => alert('리포트 다운로드 기능은 준비 중입니다.')}
                style={{
                  padding: '8px 16px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
                  fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                  fontWeight: 500, whiteSpace: 'nowrap',
                }}
              >다운로드</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
