import { useNavigate } from 'react-router-dom';
import { BRAND } from '../../constants';

const MOCK_STATS = {
  totalCompleted: 248,
  totalTarget: 312,
  avgScore: 8.7,
  completionRate: 79.5,
  todayCount: 23,
  part1Avg: 3.2,
  part2Avg: 5.5,
};

const LEVEL_DIST = [
  { label: '중급', count: 87, pct: 35, cls: 'intermediate' },
  { label: '초급', count: 119, pct: 48, cls: 'beginner' },
  { label: '기초', count: 42, pct: 17, cls: 'basic' },
];

const CATEGORIES = [
  { label: 'AI 개념', pct: 85 },
  { label: '프롬프트', pct: 72 },
  { label: 'AI 윤리', pct: 78 },
  { label: '정보 검색', pct: 65 },
  { label: '문서 작성', pct: 58 },
  { label: '데이터 분석', pct: 52 },
  { label: '프롬프트 체인', pct: 45 },
  { label: '멀티모달', pct: 38 },
];

const RECENT_ACTIVITY = [
  { name: '김민수', level: '중급', time: '3분 전', dot: BRAND.primary },
  { name: '이지영', level: '초급', time: '15분 전', dot: '#F59E0B' },
  { name: '박준혁', level: '중급', time: '32분 전', dot: BRAND.primary },
  { name: '최수진', level: '기초', time: '1시간 전', dot: BRAND.gray[400] },
  { name: '정하늘', level: '초급', time: '1시간 전', dot: '#F59E0B' },
];

const DEPARTMENTS = [
  { name: '경영지원본부', count: 45, avg: 9.2 },
  { name: '마케팅본부', count: 38, avg: 8.8 },
  { name: '연구개발본부', count: 62, avg: 10.1 },
  { name: '영업본부', count: 52, avg: 7.9 },
  { name: '생산본부', count: 28, avg: 7.2 },
  { name: '품질관리본부', count: 23, avg: 8.4 },
];

const LEARNERS = [
  { name: '김민수', rank: '사원', dept: '연구개발본부', level: '중급', total: 12.3, p1: 4.2, p2: 8.1, date: '2026.01.26' },
  { name: '이지영', rank: '대리', dept: '마케팅본부', level: '초급', total: 8.4, p1: 3.5, p2: 4.9, date: '2026.01.26' },
  { name: '박준혁', rank: '과장', dept: '경영지원본부', level: '중급', total: 11.2, p1: 4.0, p2: 7.2, date: '2026.01.26' },
  { name: '최수진', rank: '사원', dept: '생산본부', level: '기초', total: 4.2, p1: 2.1, p2: 2.1, date: '2026.01.26' },
  { name: '정하늘', rank: '대리', dept: '영업본부', level: '초급', total: 7.8, p1: 3.2, p2: 4.6, date: '2026.01.26' },
  { name: '강도현', rank: '차장', dept: '연구개발본부', level: '중급', total: 13.2, p1: 4.5, p2: 8.7, date: '2026.01.25' },
  { name: '윤서연', rank: '사원', dept: '품질관리본부', level: '초급', total: 9.0, p1: 3.8, p2: 5.2, date: '2026.01.25' },
  { name: '장현우', rank: '과장', dept: '마케팅본부', level: '중급', total: 10.7, p1: 3.9, p2: 6.8, date: '2026.01.25' },
];

const badgeStyle = (level: string) => {
  if (level === '중급') return { background: BRAND.primaryLight, color: BRAND.primary };
  if (level === '초급') return { background: '#FEF3C7', color: '#D97706' };
  return { background: BRAND.gray[100], color: BRAND.gray[600] };
};

const levelBarBg = (cls: string) => {
  if (cls === 'intermediate') return `linear-gradient(90deg, ${BRAND.primaryLight} 0%, ${BRAND.primary} 100%)`;
  if (cls === 'beginner') return `linear-gradient(90deg, #B8E5EF 0%, ${BRAND.primary} 100%)`;
  return `linear-gradient(90deg, ${BRAND.gray[200]} 0%, ${BRAND.gray[400]} 100%)`;
};

export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark }}>AI 역량 진단 대시보드</h1>
          <p style={{ fontSize: 13, color: BRAND.gray[500], marginTop: 4 }}>2026년 3월 11일 기준</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              padding: '10px 20px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
            }}
          >
            리포트 다운로드
          </button>
          <button
            onClick={() => navigate('/diagnostic')}
            style={{
              padding: '10px 20px', border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer', background: BRAND.primary, color: 'white',
            }}
          >
            진단 시작하기
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        {[
          { label: '총 진단 완료', value: MOCK_STATS.totalCompleted, sub: `전체 대상자 ${MOCK_STATS.totalTarget}명 중`, badge: '+12% ↑', up: true },
          { label: '평균 점수', value: MOCK_STATS.avgScore, sub: '15점 만점 기준', badge: '+0.8 ↑', up: true },
          { label: '진단 완료율', value: `${MOCK_STATS.completionRate}%`, sub: '목표 대비 +4.5%' },
          { label: '금일 진단', value: MOCK_STATS.todayCount, sub: '오늘 완료된 진단', badge: '+23', up: true },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: `1px solid ${BRAND.gray[200]}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: BRAND.gray[500] }}>{s.label}</span>
              {s.badge && (
                <span style={{
                  fontSize: 10, padding: '4px 8px', borderRadius: 4, fontWeight: 500,
                  background: s.up ? '#ECFDF5' : '#FEF2F2', color: s.up ? '#059669' : '#DC2626',
                }}>{s.badge}</span>
              )}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: BRAND.dark, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: BRAND.gray[400] }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Level Distribution + Part Score */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 20 }}>
        {/* Level Distribution */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            레벨별 분포
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {LEVEL_DIST.map(l => (
              <div key={l.cls} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ width: 48, fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{l.label}</span>
                <div style={{ flex: 1, height: 32, background: BRAND.gray[100], borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${l.pct}%`, background: levelBarBg(l.cls),
                    borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 12,
                    transition: 'width 1s ease',
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{l.pct}%</span>
                  </div>
                </div>
                <span style={{ width: 60, textAlign: 'right' as const, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>{l.count}명</span>
              </div>
            ))}
          </div>
        </div>

        {/* Part Score */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            파트별 평균 점수
          </div>
          <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
            <div style={{ position: 'relative', width: 160, height: 160 }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" fill="none" stroke={BRAND.gray[200]} strokeWidth="20" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={BRAND.primary} strokeWidth="20"
                  strokeDasharray="282.7" strokeDashoffset="70.7" transform="rotate(-90 80 80)" />
                <circle cx="80" cy="80" r="60" fill="none" stroke={BRAND.primaryDark} strokeWidth="20"
                  strokeDasharray="282.7" strokeDashoffset="170.7" transform="rotate(90 80 80)" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' as const }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: BRAND.dark }}>{MOCK_STATS.avgScore}</div>
                <div style={{ fontSize: 11, color: BRAND.gray[500] }}>평균</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.primary }} />
                <span style={{ fontSize: 13, color: BRAND.gray[600] }}>PART 1 기본이해</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark, marginLeft: 'auto' }}>{MOCK_STATS.part1Avg} / 5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.primaryDark }} />
                <span style={{ fontSize: 13, color: BRAND.gray[600] }}>PART 2 실전역량</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark, marginLeft: 'auto' }}>{MOCK_STATS.part2Avg} / 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Category */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            카테고리별 평균 정답률
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CATEGORIES.map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 100, fontSize: 12, color: BRAND.gray[600] }}>{c.label}</span>
                <div style={{ flex: 1, height: 8, background: BRAND.gray[100], borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: BRAND.primary, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
                <span style={{ width: 40, textAlign: 'right' as const, fontSize: 12, fontWeight: 600, color: BRAND.gray[600] }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            최근 활동
          </div>
          <div style={{ padding: 24 }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 0',
                borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${BRAND.gray[100]}` : 'none',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: a.dot }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: BRAND.gray[700] }}>
                    <strong style={{ color: BRAND.dark }}>{a.name}</strong>님이 진단을 완료했습니다. <strong>{a.level}</strong>
                  </div>
                  <div style={{ fontSize: 11, color: BRAND.gray[400], marginTop: 4 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Summary */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          부서별 현황
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {DEPARTMENTS.map(d => (
              <div key={d.name} style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{d.name}</span>
                  <span style={{ fontSize: 12, color: BRAND.gray[500] }}>{d.count}명 완료</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: BRAND.primary }}>{d.avg}</span>
                  <span style={{ fontSize: 11, color: BRAND.gray[400] }}>평균 점수</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learner Table */}
      <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
          학습자별 진단 결과
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['이름', '부서', '레벨', '총점', 'PART 1', 'PART 2', '진단일'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left' as const, padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: BRAND.gray[500], textTransform: 'uppercase' as const, letterSpacing: 0.5,
                    background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEARNERS.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${BRAND.gray[100]}` }}>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, background: BRAND.primaryLight, color: BRAND.primary,
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 600,
                      }}>{l.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 500, color: BRAND.dark }}>{l.name}</div>
                        <div style={{ fontSize: 11, color: BRAND.gray[400] }}>{l.rank}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.dept}</td>
                  <td style={{ padding: 16, fontSize: 13 }}>
                    <span style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: 4,
                      fontSize: 11, fontWeight: 600, ...badgeStyle(l.level),
                    }}>{l.level}</span>
                  </td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>
                    <span style={{
                      display: 'inline-block', width: 80, height: 6, background: BRAND.gray[100],
                      borderRadius: 3, overflow: 'hidden', verticalAlign: 'middle', marginRight: 8,
                    }}>
                      <span style={{
                        display: 'block', height: '100%', width: `${(l.total / 15) * 100}%`,
                        background: BRAND.primary, borderRadius: 3,
                      }} />
                    </span>
                    {l.total}
                  </td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.p1}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.p2}</td>
                  <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: BRAND.gray[500] }}>248명 중 1-8 표시</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '1', '2', '3', '...', '31', '›'].map((p, i) => (
              <button key={i} style={{
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${p === '1' ? BRAND.primary : BRAND.gray[200]}`, borderRadius: 6,
                background: p === '1' ? BRAND.primary : 'white', fontSize: 13,
                color: p === '1' ? 'white' : BRAND.gray[600], cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
