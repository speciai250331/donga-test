import { useState } from 'react';
import { BRAND } from '../../constants';
import { useDashboard } from '../../context/DashboardContext';
import { Project } from '../../types';

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || `project-${Date.now()}`;
};

const generateId = (): string => {
  return `proj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export const DiagnosticManagePage = () => {
  const { projects, addProject, updateProject, deleteProject, getProjectRecords } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'standard' | 'imm'>('standard');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = `${window.location.origin}/ai-test/diagnostic`;

  const handleCreate = () => {
    if (!newName.trim()) return;
    const slug = generateSlug(newName);
    const project: Project = {
      id: generateId(),
      name: newName.trim(),
      slug,
      type: newType,
      isActive: true,
      showResult: true,
      createdAt: new Date().toISOString(),
    };
    addProject(project);
    setNewName('');
    setNewType('standard');
    setShowModal(false);
  };

  const copyLink = (slug: string, id: string) => {
    const url = `${baseUrl}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`"${name}" 프로젝트를 삭제하시겠습니까?`)) {
      deleteProject(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark }}>프로젝트 관리</h1>
          <p style={{ fontSize: 13, color: BRAND.gray[500], marginTop: 4 }}>진단 프로젝트를 생성하고 관리합니다.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '10px 20px', border: 'none', borderRadius: 8,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            background: BRAND.primary, color: 'white',
          }}
        >
          + 새 프로젝트 만들기
        </button>
      </div>

      {/* Project Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
        {projects.map(project => {
          const recordCount = getProjectRecords(project.id).length;
          return (
            <div key={project.id} style={{
              background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`,
              overflow: 'hidden',
            }}>
              {/* Card Header */}
              <div style={{
                padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark }}>{project.name}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500,
                    background: project.type === 'imm' ? '#FEF3C7' : BRAND.gray[100],
                    color: project.type === 'imm' ? '#D97706' : BRAND.gray[600],
                  }}>
                    {project.type === 'imm' ? 'IMM' : '표준'}
                  </span>
                </div>
                <span style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500,
                  background: project.isActive ? '#D1FAE5' : BRAND.gray[100],
                  color: project.isActive ? '#065F46' : BRAND.gray[500],
                }}>
                  {project.isActive ? '활성' : '비활성'}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: 24 }}>
                {/* Link */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <input
                    readOnly
                    value={`${baseUrl}/${project.slug}`}
                    style={{
                      flex: 1, padding: '8px 12px', border: `1px solid ${BRAND.gray[200]}`,
                      borderRadius: 6, fontSize: 12, color: BRAND.gray[600], background: BRAND.gray[50],
                    }}
                  />
                  <button
                    onClick={() => copyLink(project.slug, project.id)}
                    style={{
                      padding: '8px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                      fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {copiedId === project.id ? '복사됨' : '링크 복사'}
                  </button>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex', gap: 16, marginBottom: 20, padding: '12px 16px',
                  background: BRAND.gray[50], borderRadius: 8,
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: BRAND.gray[500] }}>완료 건수</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>{recordCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: BRAND.gray[500] }}>생성일</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.dark }}>
                      {new Date(project.createdAt).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: BRAND.gray[600] }}>진단 활성화</span>
                    <div
                      onClick={() => updateProject(project.id, { isActive: !project.isActive })}
                      style={{
                        width: 40, height: 22, borderRadius: 11, cursor: 'pointer',
                        background: project.isActive ? BRAND.primary : BRAND.gray[300],
                        position: 'relative', transition: 'background 0.2s',
                      }}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', background: 'white',
                        position: 'absolute', top: 2,
                        left: project.isActive ? 20 : 2,
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: BRAND.gray[600] }}>결과 즉시 표시</span>
                    <div
                      onClick={() => updateProject(project.id, { showResult: !project.showResult })}
                      style={{
                        width: 40, height: 22, borderRadius: 11, cursor: 'pointer',
                        background: project.showResult ? BRAND.primary : BRAND.gray[300],
                        position: 'relative', transition: 'background 0.2s',
                      }}
                    >
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', background: 'white',
                        position: 'absolute', top: 2,
                        left: project.showResult ? 20 : 2,
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    style={{
                      padding: '6px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                      fontSize: 12, cursor: 'pointer', background: 'white', color: '#DC2626',
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div style={{
          background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`,
          padding: '80px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, color: BRAND.gray[300], marginBottom: 16 }}>+</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.gray[600], marginBottom: 8 }}>
            프로젝트가 없습니다
          </div>
          <div style={{ fontSize: 13, color: BRAND.gray[400] }}>
            "새 프로젝트 만들기" 버튼을 클릭하여 첫 번째 프로젝트를 생성하세요.
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            background: 'white', borderRadius: 12, padding: 32, width: 440,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark, marginBottom: 24 }}>
              새 프로젝트 만들기
            </h2>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 6 }}>
                프로젝트 이름
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="예: 2024 상반기 AI 역량 진단"
                style={{
                  width: '100%', padding: '10px 14px', border: `1px solid ${BRAND.gray[300]}`,
                  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                autoFocus
              />
              {newName.trim() && (
                <div style={{ fontSize: 11, color: BRAND.gray[400], marginTop: 4 }}>
                  URL: /diagnostic/{generateSlug(newName)}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: BRAND.gray[700], marginBottom: 6 }}>
                템플릿 선택
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                {([
                  { value: 'standard' as const, label: '표준 진단', desc: '기본 AI 역량 진단' },
                  { value: 'imm' as const, label: 'IMM 진단', desc: 'IMM 기반 진단' },
                ]).map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => setNewType(opt.value)}
                    style={{
                      flex: 1, padding: '14px 16px', borderRadius: 8, cursor: 'pointer',
                      border: `2px solid ${newType === opt.value ? BRAND.primary : BRAND.gray[200]}`,
                      background: newType === opt.value ? BRAND.gray[50] : 'white',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: BRAND.gray[500], marginTop: 2 }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setShowModal(false); setNewName(''); }}
                style={{
                  padding: '10px 20px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
                  fontSize: 13, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                }}
              >
                취소
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                style={{
                  padding: '10px 20px', border: 'none', borderRadius: 8,
                  fontSize: 13, fontWeight: 500, cursor: newName.trim() ? 'pointer' : 'default',
                  background: newName.trim() ? BRAND.primary : BRAND.gray[300],
                  color: 'white',
                }}
              >
                만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
