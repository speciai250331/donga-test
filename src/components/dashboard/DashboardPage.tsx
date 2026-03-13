import { useState } from 'react';
import { BRAND } from '../../constants';
import { useDashboard } from '../../context/DashboardContext';
import { ExcelUpload } from './ExcelUpload';

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

const dotColor = (level: string) => {
  if (level === '중급') return BRAND.primary;
  if (level === '초급') return '#F59E0B';
  return BRAND.gray[400];
};

const PAGE_SIZE = 10;

export const DashboardPage = () => {
  const { records, stats, clearRecords, projects, getProjectRecords, getProjectStats } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('전체');
  const [filterDept, setFilterDept] = useState('전체');
  const [filterProject, setFilterProject] = useState('전체');
  const [page, setPage] = useState(1);

  const activeRecords = filterProject === '전체' ? records : getProjectRecords(filterProject);
  const activeStats = filterProject === '전체' ? stats : getProjectStats(filterProject);

  const hasData = activeRecords.length > 0;

  // Filtered records for table
  const filtered = activeRecords.filter(r => {
    if (searchTerm && !r.name.includes(searchTerm) && !r.dept.includes(searchTerm)) return false;
    if (filterLevel !== '전체' && r.level !== filterLevel) return false;
    if (filterDept !== '전체' && r.dept !== filterDept) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const deptList = ['전체', ...Array.from(new Set(records.map(r => r.dept)))];

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  // Part score circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const part1Ratio = activeStats.part1Avg / 5;
  const part2Ratio = activeStats.part2Avg / 10;
  const part1Arc = circumference * part1Ratio;
  const part2Arc = circumference * part2Ratio;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark }}>AI 역량 진단 대시보드</h1>
          <p style={{ fontSize: 13, color: BRAND.gray[500], marginTop: 4 }}>{today} 기준</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <select
            value={filterProject}
            onChange={e => { setFilterProject(e.target.value); setPage(1); }}
            style={{
              padding: '10px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
              fontSize: 13, background: 'white', cursor: 'pointer',
            }}
          >
            <option value="전체">전체 프로젝트</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {hasData && (
            <button
              onClick={clearRecords}
              style={{
                padding: '10px 20px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
              }}
            >
              데이터 초기화
            </button>
          )}
        </div>
      </div>

      {/* Excel Upload */}
      <ExcelUpload />

      {/* Empty State */}
      {!hasData && (
        <div style={{
          background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`,
          padding: '80px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, color: BRAND.gray[300], marginBottom: 16 }}>+</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.gray[600], marginBottom: 8 }}>
            진단 데이터가 없습니다
          </div>
          <div style={{ fontSize: 13, color: BRAND.gray[400] }}>
            위의 업로드 영역에서 엑셀 파일을 업로드하면 대시보드가 자동으로 생성됩니다.
          </div>
        </div>
      )}

      {hasData && (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
            {[
              { label: '총 진단 완료', value: activeStats.totalCompleted, sub: `${activeStats.totalCompleted}명 데이터 로드됨` },
              { label: '평균 점수', value: activeStats.avgScore, sub: '15점 만점 기준' },
              { label: 'PART 1 평균', value: activeStats.part1Avg, sub: '5점 만점 기준' },
              { label: 'PART 2 평균', value: activeStats.part2Avg, sub: '10점 만점 기준' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: `1px solid ${BRAND.gray[200]}` }}>
                <div style={{ fontSize: 12, color: BRAND.gray[500], marginBottom: 12 }}>{s.label}</div>
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
                {activeStats.levelDist.map(l => (
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
                    <circle cx="80" cy="80" r={radius} fill="none" stroke={BRAND.gray[200]} strokeWidth="20" />
                    <circle cx="80" cy="80" r={radius} fill="none" stroke={BRAND.primary} strokeWidth="20"
                      strokeDasharray={`${part1Arc} ${circumference - part1Arc}`} transform="rotate(-90 80 80)" />
                    <circle cx="80" cy="80" r={radius} fill="none" stroke={BRAND.primaryDark} strokeWidth="20"
                      strokeDasharray={`${part2Arc} ${circumference - part2Arc}`} transform="rotate(90 80 80)" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' as const }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: BRAND.dark }}>{activeStats.avgScore}</div>
                    <div style={{ fontSize: 11, color: BRAND.gray[500] }}>평균</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.primary }} />
                    <span style={{ fontSize: 13, color: BRAND.gray[600] }}>PART 1 기본이해</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark, marginLeft: 'auto' }}>{activeStats.part1Avg} / 5</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: BRAND.primaryDark }} />
                    <span style={{ fontSize: 13, color: BRAND.gray[600] }}>PART 2 실전역량</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark, marginLeft: 'auto' }}>{activeStats.part2Avg} / 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department + Recent Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Department Summary */}
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
                부서별 현황
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {activeStats.departments.map(d => (
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

            {/* Recent Activity */}
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
                최근 활동
              </div>
              <div style={{ padding: 24 }}>
                {activeStats.recentActivity.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 0',
                    borderBottom: i < activeStats.recentActivity.length - 1 ? `1px solid ${BRAND.gray[100]}` : 'none',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: dotColor(a.level) }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: BRAND.gray[700] }}>
                        <strong style={{ color: BRAND.dark }}>{a.name}</strong>님이 진단을 완료했습니다. <strong>{a.level}</strong>
                      </div>
                      <div style={{ fontSize: 11, color: BRAND.gray[400], marginTop: 4 }}>{a.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learner Table */}
          <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark }}>학습자별 진단 결과</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="이름 또는 부서 검색"
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                  style={{
                    padding: '8px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                    fontSize: 12, outline: 'none', width: 180,
                  }}
                />
                <select
                  value={filterLevel}
                  onChange={e => { setFilterLevel(e.target.value); setPage(1); }}
                  style={{
                    padding: '8px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                    fontSize: 12, background: 'white', cursor: 'pointer',
                  }}
                >
                  {['전체', '중급', '초급', '기초'].map(v => (
                    <option key={v} value={v}>{v === '전체' ? '레벨 전체' : v}</option>
                  ))}
                </select>
                <select
                  value={filterDept}
                  onChange={e => { setFilterDept(e.target.value); setPage(1); }}
                  style={{
                    padding: '8px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                    fontSize: 12, background: 'white', cursor: 'pointer',
                  }}
                >
                  {deptList.map(v => (
                    <option key={v} value={v}>{v === '전체' ? '부서 전체' : v}</option>
                  ))}
                </select>
              </div>
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
                  {paginated.map((l, i) => (
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
                      <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.part1}</td>
                      <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.part2}</td>
                      <td style={{ padding: 16, fontSize: 13, color: BRAND.gray[700] }}>{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: BRAND.gray[500] }}>
                {filtered.length}명 중 {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} 표시
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${BRAND.gray[200]}`, borderRadius: 6,
                    background: 'white', fontSize: 13, color: BRAND.gray[600], cursor: page === 1 ? 'default' : 'pointer',
                    opacity: page === 1 ? 0.4 : 1,
                  }}
                >{'<'}</button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      style={{
                        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${pageNum === page ? BRAND.primary : BRAND.gray[200]}`, borderRadius: 6,
                        background: pageNum === page ? BRAND.primary : 'white', fontSize: 13,
                        color: pageNum === page ? 'white' : BRAND.gray[600], cursor: 'pointer',
                      }}
                    >{pageNum}</button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${BRAND.gray[200]}`, borderRadius: 6,
                    background: 'white', fontSize: 13, color: BRAND.gray[600], cursor: page === totalPages ? 'default' : 'pointer',
                    opacity: page === totalPages ? 0.4 : 1,
                  }}
                >{'>'}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
