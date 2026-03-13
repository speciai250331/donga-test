import { useState } from 'react';
import { BRAND } from '../../constants';

// (예) 샘플 데이터 - 실제 운영 시 DB 연동 필요
const MOCK_RESULTS = [
  { id: 1, name: '(예) 김민수', rank: '사원', dept: '연구개발본부', level: '중급', total: 12.3, p1: 4.2, p2: 8.1, date: '2026.01.26', answers: [3,4,5,3,4,8,7,9,6,8,7,9,8,7,6] },
  { id: 2, name: '(예) 이지영', rank: '대리', dept: '마케팅본부', level: '초급', total: 8.4, p1: 3.5, p2: 4.9, date: '2026.01.26', answers: [2,3,4,2,3,5,4,6,3,5,4,6,5,4,3] },
  { id: 3, name: '(예) 최수진', rank: '사원', dept: '생산본부', level: '기초', total: 4.2, p1: 2.1, p2: 2.1, date: '2026.01.26', answers: [1,2,1,2,1,2,3,2,1,2,3,2,1,2,3] },
];

const DEPTS = ['전체', '연구개발본부', '마케팅본부', '경영지원본부', '생산본부', '영업본부', '품질관리본부'];
const LEVELS = ['전체', '중급', '초급', '기초'];

const badgeStyle = (level: string) => {
  if (level === '중급') return { background: BRAND.primaryLight, color: BRAND.primary };
  if (level === '초급') return { background: '#FEF3C7', color: '#D97706' };
  return { background: BRAND.gray[100], color: BRAND.gray[600] };
};

export const ResultsPage = () => {
  const [filterLevel, setFilterLevel] = useState('전체');
  const [filterDept, setFilterDept] = useState('전체');
  const [selectedResult, setSelectedResult] = useState<typeof MOCK_RESULTS[0] | null>(null);

  const filtered = MOCK_RESULTS.filter(r =>
    (filterLevel === '전체' || r.level === filterLevel) &&
    (filterDept === '전체' || r.dept === filterDept)
  );

  const selectStyle = {
    padding: '8px 12px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
    fontSize: 13, outline: 'none', background: 'white', color: BRAND.gray[700],
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>진단 결과</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 4 }}>전체 진단 결과를 조회하고 상세 내용을 확인합니다.</p>
      <p style={{ fontSize: 12, color: BRAND.accent, marginBottom: 24 }}>* 아래 데이터는 (예) 샘플입니다. 실제 운영 시 DB 연동이 필요합니다.</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} style={selectStyle}>
          {LEVELS.map(l => <option key={l} value={l}>{l === '전체' ? '레벨 전체' : l}</option>)}
        </select>
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)} style={selectStyle}>
          {DEPTS.map(d => <option key={d} value={d}>{d === '전체' ? '부서 전체' : d}</option>)}
        </select>
        <span style={{ fontSize: 13, color: BRAND.gray[500], lineHeight: '36px', marginLeft: 'auto' }}>
          총 {filtered.length}건
        </span>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['이름', '부서', '레벨', '총점', 'PART 1', 'PART 2', '진단일', ''].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: BRAND.gray[500], background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${BRAND.gray[100]}` }}>
                  <td style={{ padding: 16, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, background: BRAND.primaryLight, color: BRAND.primary,
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 600,
                      }}>{r.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 500, color: BRAND.dark }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: BRAND.gray[400] }}>{r.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{r.dept}</td>
                  <td style={{ padding: 16 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, ...badgeStyle(r.level) }}>{r.level}</span>
                  </td>
                  <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{r.total}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{r.p1}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{r.p2}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{r.date}</td>
                  <td style={{ padding: 16 }}>
                    <button
                      onClick={() => setSelectedResult(r)}
                      style={{
                        padding: '6px 12px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                        fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                      }}
                    >상세보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <div
          onClick={() => setSelectedResult(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{
            background: 'white', borderRadius: 16, padding: 32, width: 560, maxHeight: '80vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>{selectedResult.name} 상세 결과</h2>
              <button onClick={() => setSelectedResult(null)} style={{
                border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: BRAND.gray[400],
              }}>x</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { label: '총점', value: selectedResult.total },
                { label: 'PART 1', value: selectedResult.p1 },
                { label: 'PART 2', value: selectedResult.p2 },
              ].map(s => (
                <div key={s.label} style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: BRAND.primary }}>{s.value}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, marginBottom: 12 }}>문항별 점수</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selectedResult.answers.map((score, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 60, fontSize: 12, color: BRAND.gray[600] }}>Q{i + 1} {i < 5 ? '(P1)' : '(P2)'}</span>
                  <div style={{ flex: 1, height: 8, background: BRAND.gray[100], borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${(score / (i < 5 ? 5 : 10)) * 100}%`,
                      background: BRAND.primary, borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ width: 50, textAlign: 'right', fontSize: 12, fontWeight: 600, color: BRAND.gray[700] }}>
                    {score}/{i < 5 ? 5 : 10}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
