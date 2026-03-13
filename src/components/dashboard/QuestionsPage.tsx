import { useState } from 'react';
import { BRAND } from '../../constants';
import { QUESTIONS } from '../../constants/questions';

const MOCK_STATS = QUESTIONS.map((q, i) => ({
  id: q.id,
  part: q.part,
  title: q.title,
  optionCount: q.options.length,
  correctRate: [82, 75, 68, 71, 58, 45, 52, 38, 62, 55, 48, 42, 35, 58, 65][i],
}));

export const QuestionsPage = () => {
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const question = selectedQ !== null ? QUESTIONS.find(q => q.id === selectedQ) : null;
  const stats = selectedQ !== null ? MOCK_STATS.find(s => s.id === selectedQ) : null;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>문항 관리</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 24 }}>진단 문항을 확인하고 통계를 분석합니다.</p>

      <div style={{ display: 'grid', gridTemplateColumns: selectedQ !== null ? '1fr 1fr' : '1fr', gap: 20 }}>
        {/* Question List */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            문항 목록 ({QUESTIONS.length}문항)
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['번호', '파트', '제목', '정답률', ''].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: BRAND.gray[500], background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_STATS.map(s => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedQ(s.id === selectedQ ? null : s.id)}
                  style={{
                    borderBottom: `1px solid ${BRAND.gray[100]}`, cursor: 'pointer',
                    background: s.id === selectedQ ? BRAND.primaryLight : 'transparent',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontSize: 13, color: BRAND.gray[700] }}>Q{s.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: s.part === 1 ? BRAND.primaryLight : '#FEF3C7',
                      color: s.part === 1 ? BRAND.primary : '#D97706',
                    }}>PART {s.part}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: BRAND.dark, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.title}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 6, background: BRAND.gray[100], borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${s.correctRate}%`, borderRadius: 3,
                          background: s.correctRate >= 60 ? BRAND.primary : s.correctRate >= 40 ? '#F59E0B' : '#EF4444',
                        }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.gray[600] }}>{s.correctRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: BRAND.primary }}>
                    {s.id === selectedQ ? '닫기' : '보기'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Question Detail */}
        {question && stats && (
          <div>
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{
                  padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                  background: question.part === 1 ? BRAND.primaryLight : '#FEF3C7',
                  color: question.part === 1 ? BRAND.primary : '#D97706',
                }}>PART {question.part}</span>
                <span style={{ fontSize: 12, color: BRAND.gray[500] }}>Q{question.id}</span>
                {question.isMultiple && (
                  <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: '#EDE9FE', color: '#7C3AED' }}>복수선택</span>
                )}
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, marginBottom: 12, lineHeight: 1.5 }}>{question.title}</h3>

              {question.scenario && (
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, marginBottom: 16, fontSize: 13, color: BRAND.gray[600], lineHeight: 1.6 }}>
                  {question.scenario}
                </div>
              )}

              <h4 style={{ fontSize: 13, fontWeight: 600, color: BRAND.gray[700], marginBottom: 12 }}>선택지</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {question.options.map(o => (
                  <div key={o.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 16px', background: BRAND.gray[50], borderRadius: 8,
                  }}>
                    <span style={{ fontSize: 13, color: BRAND.gray[700] }}>{o.label}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: o.score >= (question.part === 1 ? 4 : 8) ? BRAND.primary : o.score >= (question.part === 1 ? 2 : 4) ? '#D97706' : BRAND.gray[500],
                    }}>{o.score}점</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, padding: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, marginBottom: 16 }}>문항 통계</h4>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>정답률</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.primary }}>{stats.correctRate}%</span>
                </div>
                <div style={{ height: 12, background: BRAND.gray[100], borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${stats.correctRate}%`,
                    background: `linear-gradient(90deg, ${BRAND.primaryLight} 0%, ${BRAND.primary} 100%)`,
                    borderRadius: 6,
                  }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 4 }}>배점</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>{question.part === 1 ? 5 : 10}점</div>
                </div>
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 4 }}>선택지 수</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>{stats.optionCount}개</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
