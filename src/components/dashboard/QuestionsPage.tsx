import { useState, useEffect } from 'react';
import { BRAND } from '../../constants';
import { QUESTIONS as DEFAULT_QUESTIONS } from '../../constants/questions';
import { Question } from '../../types';

const STORAGE_KEY = 'donga_custom_questions';

const loadQuestions = (): Question[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return DEFAULT_QUESTIONS;
};

const saveQuestions = (questions: Question[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
};

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>(loadQuestions);
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editScenario, setEditScenario] = useState('');
  const [editOptions, setEditOptions] = useState<{ id: string; label: string; score: number }[]>([]);

  useEffect(() => {
    saveQuestions(questions);
  }, [questions]);

  const question = selectedQ !== null ? questions.find(q => q.id === selectedQ) : null;

  const startEdit = () => {
    if (!question) return;
    setEditTitle(question.title);
    setEditScenario(question.scenario || '');
    setEditOptions(question.options.map(o => ({ ...o })));
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const saveEdit = () => {
    if (!question) return;
    setQuestions(prev => prev.map(q => {
      if (q.id !== question.id) return q;
      return {
        ...q,
        title: editTitle,
        scenario: editScenario || undefined,
        options: editOptions,
      };
    }));
    setEditMode(false);
  };

  const updateOptionLabel = (idx: number, label: string) => {
    setEditOptions(prev => prev.map((o, i) => i === idx ? { ...o, label } : o));
  };

  const updateOptionScore = (idx: number, score: number) => {
    setEditOptions(prev => prev.map((o, i) => i === idx ? { ...o, score } : o));
  };

  const resetToDefault = () => {
    if (window.confirm('모든 문항을 기본값으로 초기화하시겠습니까?')) {
      setQuestions(DEFAULT_QUESTIONS);
      setEditMode(false);
      setSelectedQ(null);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: `1px solid ${BRAND.gray[300]}`,
    borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' as const,
    color: BRAND.dark,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: BRAND.dark }}>문항 관리</h1>
        <button
          onClick={resetToDefault}
          style={{
            padding: '8px 16px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 8,
            fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
          }}
        >
          기본값 초기화
        </button>
      </div>
      <p style={{ fontSize: 13, color: BRAND.gray[500], marginBottom: 24 }}>진단 문항을 확인하고 수정합니다.</p>

      <div style={{ display: 'grid', gridTemplateColumns: selectedQ !== null ? '1fr 1fr' : '1fr', gap: 20 }}>
        {/* Question List */}
        <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, fontSize: 14, fontWeight: 600, color: BRAND.dark }}>
            문항 목록 ({questions.length}문항)
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['번호', '파트', '제목', '선택지', ''].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600,
                    color: BRAND.gray[500], background: BRAND.gray[50], borderBottom: `1px solid ${BRAND.gray[200]}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <tr
                  key={q.id}
                  onClick={() => { setSelectedQ(q.id === selectedQ ? null : q.id); setEditMode(false); }}
                  style={{
                    borderBottom: `1px solid ${BRAND.gray[100]}`, cursor: 'pointer',
                    background: q.id === selectedQ ? BRAND.primaryLight : 'transparent',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontSize: 13, color: BRAND.gray[700] }}>Q{q.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                      background: q.part === 1 ? BRAND.primaryLight : '#FEF3C7',
                      color: q.part === 1 ? BRAND.primary : '#D97706',
                    }}>PART {q.part}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: BRAND.dark, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {q.title}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: BRAND.gray[600] }}>
                    {q.options.length}개
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: BRAND.primary }}>
                    {q.id === selectedQ ? '닫기' : '보기'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Question Detail / Edit */}
        {question && (
          <div>
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, padding: 24, marginBottom: 20 }}>
              {/* Header with badges */}
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
                {question.isSubjective && (
                  <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: '#FEF3C7', color: '#D97706' }}>주관식</span>
                )}
                <div style={{ marginLeft: 'auto' }}>
                  {!editMode ? (
                    <button
                      onClick={startEdit}
                      style={{
                        padding: '6px 14px', border: `1px solid ${BRAND.primary}`, borderRadius: 6,
                        fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.primary, fontWeight: 500,
                      }}
                    >
                      수정
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={cancelEdit}
                        style={{
                          padding: '6px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
                          fontSize: 12, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
                        }}
                      >
                        취소
                      </button>
                      <button
                        onClick={saveEdit}
                        style={{
                          padding: '6px 14px', border: 'none', borderRadius: 6,
                          fontSize: 12, cursor: 'pointer', background: BRAND.primary, color: 'white', fontWeight: 500,
                        }}
                      >
                        저장
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              {editMode ? (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: BRAND.gray[600], marginBottom: 6 }}>문항 제목</label>
                  <textarea
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              ) : (
                <h3 style={{ fontSize: 15, fontWeight: 600, color: BRAND.dark, marginBottom: 12, lineHeight: 1.5 }}>{question.title}</h3>
              )}

              {/* Scenario */}
              {editMode ? (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: BRAND.gray[600], marginBottom: 6 }}>시나리오 (선택)</label>
                  <textarea
                    value={editScenario}
                    onChange={e => setEditScenario(e.target.value)}
                    rows={2}
                    placeholder="시나리오를 입력하세요 (비워두면 표시하지 않음)"
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              ) : (
                question.scenario && (
                  <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, marginBottom: 16, fontSize: 13, color: BRAND.gray[600], lineHeight: 1.6 }}>
                    {question.scenario}
                  </div>
                )
              )}

              {/* Options */}
              {!question.isSubjective && (
                <>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: BRAND.gray[700], marginBottom: 12 }}>선택지</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {editMode ? (
                      editOptions.map((o, idx) => (
                        <div key={o.id} style={{
                          display: 'flex', gap: 8, alignItems: 'center',
                          padding: '10px 14px', background: BRAND.gray[50], borderRadius: 8,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.gray[500], width: 24, flexShrink: 0 }}>{o.id}</span>
                          <input
                            value={o.label}
                            onChange={e => updateOptionLabel(idx, e.target.value)}
                            style={{
                              flex: 1, padding: '8px 10px', border: `1px solid ${BRAND.gray[300]}`,
                              borderRadius: 6, fontSize: 13, outline: 'none', color: BRAND.dark,
                            }}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                            <input
                              type="number"
                              value={o.score}
                              onChange={e => updateOptionScore(idx, parseFloat(e.target.value) || 0)}
                              step={0.1}
                              min={0}
                              style={{
                                width: 60, padding: '8px 8px', border: `1px solid ${BRAND.gray[300]}`,
                                borderRadius: 6, fontSize: 13, outline: 'none', textAlign: 'center', color: BRAND.dark,
                              }}
                            />
                            <span style={{ fontSize: 11, color: BRAND.gray[500] }}>점</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      question.options.map(o => (
                        <div key={o.id} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '12px 16px', background: BRAND.gray[50], borderRadius: 8,
                        }}>
                          <span style={{ fontSize: 13, color: BRAND.gray[700] }}>{o.label}</span>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: o.score >= 1 ? BRAND.primary : o.score >= 0.5 ? '#D97706' : BRAND.gray[500],
                          }}>{o.score}점</span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {question.isSubjective && !editMode && (
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, fontSize: 13, color: BRAND.gray[500] }}>
                  주관식 문항 - 자유 서술형 답변
                </div>
              )}
            </div>

            {/* Info Card */}
            <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, padding: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark, marginBottom: 16 }}>문항 정보</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 4 }}>파트</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>PART {question.part}</div>
                </div>
                <div style={{ padding: 16, background: BRAND.gray[50], borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: BRAND.gray[500], marginBottom: 4 }}>
                    {question.isSubjective ? '유형' : '선택지 수'}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.dark }}>
                    {question.isSubjective ? '주관식' : `${question.options.length}개`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
