import { useState } from 'react';
import { BRAND } from '../../constants';

type Period = 'daily' | 'weekly' | 'monthly';

// (예) 샘플 데이터 - 실제 운영 시 DB 연동 필요
const DAILY_DATA = [
  { label: '(예) 1/24', count: 25, avg: 8.7 },
  { label: '(예) 1/25', count: 20, avg: 8.9 },
  { label: '(예) 1/26', count: 23, avg: 8.7 },
];

const WEEKLY_DATA = [
  { label: '(예) W1', count: 45, avg: 7.8 },
  { label: '(예) W2', count: 58, avg: 8.2 },
  { label: '(예) W3', count: 72, avg: 8.5 },
];

const MONTHLY_DATA = [
  { label: '(예) 11월', count: 156, avg: 8.0 },
  { label: '(예) 12월', count: 198, avg: 8.3 },
  { label: '(예) 1월', count: 248, avg: 8.7 },
];

const LEVEL_TREND = [
  { period: '(예) 11월', intermediate: 42, beginner: 68, basic: 46 },
  { period: '(예) 12월', intermediate: 65, beginner: 85, basic: 48 },
  { period: '(예) 1월', intermediate: 87, beginner: 119, basic: 42 },
];

const dataMap: Record<Period, typeof DAILY_DATA> = { daily: DAILY_DATA, weekly: WEEKLY_DATA, monthly: MONTHLY_DATA };
const periodLabels: Record<Period, string> = { daily: '일별', weekly: '주별', monthly: '월별' };

export const TrendsPage = () => {
  const [period, setPeriod] = useState<Period>('daily');
  const data = dataMap[period];
  const maxCount = Math.max(...data.map(d => d.count));
  const maxAvg = Math.max(...data.map(d => d.avg));
  const minAvg = Math.min(...data.map(d => d.avg));

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark, marginBottom: 8 }}>추이 분석</h1>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 4 }}>진단 완료 및 점수 추이를 분석합니다.</p>
      <p style={{ fontSize: 12, color: BRAND.accent, marginBottom: 24 }}>* 아래 데이터는 (예) 샘플입니다. 실제 운영 시 DB 연동이 필요합니다.</p>

      {/* Period Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['daily', 'weekly', 'monthly'] as Period[]).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{
              padding: '8px 20px', border: `1px solid ${period === p ? BRAND.primary : BRAND.gray[300]}`,
              borderRadius: 8, fontSize: 13, cursor: 'pointer',
              background: period === p ? BRAND.primary : 'white',
              color: period === p ? 'white' : BRAND.gray[600],
              fontWeight: period === p ? 600 : 400,
            }}
          >{periodLabels[p]}</button>
        ))}
      </div>

      {/* Completion Trend Chart */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          진단 완료 추이 ({periodLabels[period]})
        </div>
        <div style={{ padding: 24, display: 'flex', alignItems: 'flex-end', gap: 16, height: 220 }}>
          {data.map(d => (
            <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.dark }}>{d.count}</span>
              <div style={{
                width: '100%', maxWidth: 48, height: `${(d.count / maxCount) * 150}px`,
                background: `linear-gradient(180deg, ${BRAND.primary} 0%, ${BRAND.primaryLight} 100%)`,
                borderRadius: '6px 6px 0 0',
              }} />
              <span style={{ fontSize: 11, color: BRAND.gray[500] }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Average Score Trend */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          평균 점수 추이
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ position: 'relative', height: 200 }}>
            {/* Y-axis labels */}
            {[maxAvg, (maxAvg + minAvg) / 2, minAvg].map((v, i) => (
              <div key={i} style={{
                position: 'absolute', left: 0, top: `${i * 45}%`,
                fontSize: 11, color: BRAND.gray[400], width: 30,
              }}>{v.toFixed(1)}</div>
            ))}
            {/* Chart area */}
            <div style={{ marginLeft: 40, height: '100%', display: 'flex', alignItems: 'flex-end', gap: 16, borderLeft: `1px solid ${BRAND.gray[200]}`, borderBottom: `1px solid ${BRAND.gray[200]}`, paddingBottom: 24 }}>
              {data.map((d) => {
                const normalizedHeight = ((d.avg - minAvg + 0.5) / (maxAvg - minAvg + 1)) * 140;
                return (
                  <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <div style={{
                        width: 12, height: 12, borderRadius: '50%', background: BRAND.primary,
                        border: '3px solid white', boxShadow: `0 0 0 2px ${BRAND.primary}`,
                        marginBottom: `${normalizedHeight}px`,
                      }} />
                      <span style={{
                        position: 'absolute', top: -20, fontSize: 11, fontWeight: 600, color: BRAND.primary,
                      }}>{d.avg}</span>
                    </div>
                    <span style={{ fontSize: 11, color: BRAND.gray[500], marginTop: 8 }}>{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Level Distribution Trend */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          레벨 분포 변화 (월별)
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            {[
              { label: '중급', color: BRAND.primary },
              { label: '초급', color: '#F59E0B' },
              { label: '기초', color: BRAND.gray[400] },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
                <span style={{ fontSize: 12, color: BRAND.gray[600] }}>{l.label}</span>
              </div>
            ))}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['기간', '중급', '초급', '기초', '합계'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: BRAND.gray[500], background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEVEL_TREND.map(t => (
                <tr key={t.period} style={{ borderBottom: `1px solid ${BRAND.gray[100]}` }}>
                  <td style={{ padding: 16, fontSize: 13, fontWeight: 500, color: BRAND.dark }}>{t.period}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.primary, fontWeight: 600 }}>{t.intermediate}명</td>
                  <td style={{ padding: 16, fontSize: 13, color: '#D97706', fontWeight: 600 }}>{t.beginner}명</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[600] }}>{t.basic}명</td>
                  <td style={{ padding: 16, fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{t.intermediate + t.beginner + t.basic}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
