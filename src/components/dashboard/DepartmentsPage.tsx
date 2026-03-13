import { BRAND } from '../../constants';

// (예) 샘플 데이터 - 실제 운영 시 DB 연동 필요
const DEPARTMENTS = [
  { name: '(예) 연구개발본부', total: 72, completed: 62, avg: 10.1, intermediate: 28, beginner: 24, basic: 10 },
  { name: '(예) 마케팅본부', total: 50, completed: 38, avg: 8.8, intermediate: 12, beginner: 18, basic: 8 },
  { name: '(예) 경영지원본부', total: 55, completed: 45, avg: 9.2, intermediate: 18, beginner: 20, basic: 7 },
];

const maxAvg = Math.max(...DEPARTMENTS.map(d => d.avg));

const levelColors = {
  intermediate: BRAND.primary,
  beginner: '#F59E0B',
  basic: BRAND.gray[400],
};

export const DepartmentsPage = () => {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>부서별 현황</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 4 }}>부서별 AI 역량 진단 현황을 한눈에 확인합니다.</p>
      <p style={{ fontSize: 12, color: BRAND.accent, marginBottom: 24 }}>* 아래 데이터는 (예) 샘플입니다. 실제 운영 시 DB 연동이 필요합니다.</p>

      {/* Department Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {DEPARTMENTS.map(d => {
          const rate = Math.round((d.completed / d.total) * 100);
          return (
            <div key={d.name} style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark }}>{d.name}</h3>
                <span style={{ fontSize: 12, color: BRAND.gray[500] }}>{d.completed}/{d.total}명</span>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>완료율</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.primary }}>{rate}%</span>
                </div>
                <div style={{ height: 8, background: BRAND.gray[100], borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${rate}%`, background: BRAND.primary, borderRadius: 4 }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: BRAND.gray[500] }}>평균 점수</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: BRAND.primary }}>{d.avg}</span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: '중급', count: d.intermediate, color: levelColors.intermediate },
                  { label: '초급', count: d.beginner, color: levelColors.beginner },
                  { label: '기초', count: d.basic, color: levelColors.basic },
                ].map(l => (
                  <div key={l.label} style={{
                    flex: 1, textAlign: 'center', padding: '8px 0', background: BRAND.gray[50], borderRadius: 6,
                  }}>
                    <div style={{ fontSize: 11, color: l.color, fontWeight: 600 }}>{l.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.dark }}>{l.count}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Chart */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 32 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          부서 간 평균 점수 비교
        </div>
        <div style={{ padding: 24, display: 'flex', alignItems: 'flex-end', gap: 24, height: 240 }}>
          {DEPARTMENTS.map(d => (
            <div key={d.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{d.avg}</span>
              <div style={{
                width: '100%', height: `${(d.avg / maxAvg) * 160}px`,
                background: `linear-gradient(180deg, ${BRAND.primary} 0%, ${BRAND.primaryLight} 100%)`,
                borderRadius: '6px 6px 0 0',
              }} />
              <span style={{ fontSize: 11, color: BRAND.gray[500], textAlign: 'center', lineHeight: 1.3 }}>
                {d.name.replace('본부', '')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Table */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          부서별 상세 현황
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['부서', '대상', '완료', '완료율', '평균점수', '중급', '초급', '기초'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600,
                  color: BRAND.gray[500], background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEPARTMENTS.map(d => (
              <tr key={d.name} style={{ borderBottom: `1px solid ${BRAND.gray[100]}` }}>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 500, color: BRAND.dark }}>{d.name}</td>
                <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{d.total}명</td>
                <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{d.completed}명</td>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: BRAND.primary }}>{Math.round((d.completed / d.total) * 100)}%</td>
                <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{d.avg}</td>
                <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{d.intermediate}명</td>
                <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{d.beginner}명</td>
                <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{d.basic}명</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
