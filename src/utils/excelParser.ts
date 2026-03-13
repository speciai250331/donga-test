import * as XLSX from 'xlsx';
import { LearnerRecord } from '../types';

const COLUMN_MAP: Record<string, keyof LearnerRecord> = {
  '이름': 'name',
  '부서': 'dept',
  '직급': 'rank',
  '레벨': 'level',
  '총점': 'total',
  'PART1': 'part1',
  'PART2': 'part2',
  '진단일': 'date',
};

const REQUIRED_COLUMNS = Object.keys(COLUMN_MAP);

export const parseExcelFile = (file: File): Promise<LearnerRecord[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

        if (json.length === 0) {
          reject(new Error('엑셀 파일에 데이터가 없습니다.'));
          return;
        }

        const headers = Object.keys(json[0]);
        const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
        if (missing.length > 0) {
          reject(new Error(`필수 컬럼이 누락되었습니다: ${missing.join(', ')}`));
          return;
        }

        const records: LearnerRecord[] = json.map((row, idx) => {
          const record: Partial<LearnerRecord> = {};
          for (const [kor, eng] of Object.entries(COLUMN_MAP)) {
            const val = row[kor];
            if (val === undefined || val === null || val === '') {
              throw new Error(`${idx + 2}행의 "${kor}" 값이 비어있습니다.`);
            }
            if (eng === 'total' || eng === 'part1' || eng === 'part2') {
              record[eng] = Number(val);
              if (isNaN(record[eng] as number)) {
                throw new Error(`${idx + 2}행의 "${kor}" 값이 숫자가 아닙니다.`);
              }
            } else {
              record[eng] = String(val);
            }
          }
          return record as LearnerRecord;
        });

        resolve(records);
      } catch (err) {
        reject(err instanceof Error ? err : new Error('엑셀 파일 파싱 중 오류가 발생했습니다.'));
      }
    };

    reader.onerror = () => reject(new Error('파일을 읽을 수 없습니다.'));
    reader.readAsArrayBuffer(file);
  });
};

export const generateSampleExcel = () => {
  const sampleData = [
    { '이름': '홍길동', '부서': '경영지원본부', '직급': '사원', '레벨': '중급', '총점': 11.5, 'PART1': 4.0, 'PART2': 7.5, '진단일': '2026.03.13' },
    { '이름': '김철수', '부서': '마케팅본부', '직급': '대리', '레벨': '초급', '총점': 8.2, 'PART1': 3.2, 'PART2': 5.0, '진단일': '2026.03.13' },
    { '이름': '이영희', '부서': '연구개발본부', '직급': '과장', '레벨': '기초', '총점': 4.1, 'PART1': 1.8, 'PART2': 2.3, '진단일': '2026.03.12' },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '진단결과');
  XLSX.writeFile(wb, '진단결과_샘플.xlsx');
};
