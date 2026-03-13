import { useState, useRef, DragEvent } from 'react';
import { BRAND } from '../../constants';
import { useDashboard } from '../../context/DashboardContext';
import { parseExcelFile, generateSampleExcel } from '../../utils/excelParser';

export const ExcelUpload = () => {
  const { setRecords } = useDashboard();
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setStatus('error');
      setMessage('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.');
      return;
    }

    setStatus('loading');
    setMessage('파일을 분석하고 있습니다...');

    try {
      const records = await parseExcelFile(file);
      setRecords(records);
      setStatus('success');
      setMessage(`${records.length}명의 진단 데이터가 업로드되었습니다.`);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : '파일 처리 중 오류가 발생했습니다.');
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onFileSelect = () => {
    const file = fileRef.current?.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div style={{ background: 'white', borderRadius: 12, border: `1px solid ${BRAND.gray[200]}`, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${BRAND.gray[100]}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.dark }}>데이터 업로드</span>
        <button
          onClick={generateSampleExcel}
          style={{
            padding: '6px 14px', border: `1px solid ${BRAND.gray[300]}`, borderRadius: 6,
            fontSize: 12, fontWeight: 500, cursor: 'pointer', background: 'white', color: BRAND.gray[600],
          }}
        >
          샘플 엑셀 다운로드
        </button>
      </div>
      <div style={{ padding: 24 }}>
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? BRAND.primary : BRAND.gray[300]}`,
            borderRadius: 10,
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragging ? BRAND.primaryLight : BRAND.gray[50],
            transition: 'all 0.2s',
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={onFileSelect}
            style={{ display: 'none' }}
          />
          <div style={{ fontSize: 32, marginBottom: 8, color: BRAND.gray[400] }}>+</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: BRAND.gray[600], marginBottom: 4 }}>
            엑셀 파일을 드래그하거나 클릭하여 업로드
          </div>
          <div style={{ fontSize: 12, color: BRAND.gray[400] }}>
            .xlsx, .xls 형식 지원 (컬럼: 이름, 부서, 직급, 레벨, 총점, PART1, PART2, 진단일)
          </div>
        </div>

        {status !== 'idle' && (
          <div style={{
            marginTop: 16, padding: '12px 16px', borderRadius: 8, fontSize: 13,
            background: status === 'success' ? '#ECFDF5' : status === 'error' ? '#FEF2F2' : BRAND.gray[50],
            color: status === 'success' ? '#059669' : status === 'error' ? '#DC2626' : BRAND.gray[600],
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
