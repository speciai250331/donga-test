import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    part: 1,
    title: "Q1. AI와 생성형 AI에 대한 이해: 다음 중 생성형 AI(Generative AI)에 대한 설명으로 가장 적절한 것은?",
    options: [
      { id: 'A', label: '데이터를 분석하고 패턴을 찾아내는 AI', score: 0 },
      { id: 'B', label: '텍스트, 이미지, 코드 등 새로운 콘텐츠를 생성할 수 있는 AI', score: 1 },
      { id: 'C', label: '사람의 음성을 인식하는 AI', score: 0 },
      { id: 'D', label: '잘 모르겠다', score: 0 }
    ]
  },
  {
    id: 2,
    part: 1,
    title: "Q2. AI 도구 사용 경험: 현재 귀하의 AI 도구 사용 경험은?",
    options: [
      { id: 'A', label: '사용해본 적 없음', score: 0 },
      { id: 'B', label: '1~2회 사용해봄 (ChatGPT, Gemini 등)', score: 0.3 },
      { id: 'C', label: '가끔 업무/학습에 활용 (주 1~2회)', score: 0.7 },
      { id: 'D', label: '자주 활용하며 프롬프트를 작성할 수 있음 (주 3회 이상)', score: 1 }
    ]
  },
  {
    id: 3,
    part: 1,
    title: "Q3. 프롬프트(Prompt) 이해도: \"프롬프트\"가 무엇인지 설명한 것으로 가장 적절한 것은?",
    options: [
      { id: 'A', label: 'AI에게 내리는 명령어나 질문', score: 1 },
      { id: 'B', label: 'AI가 생성한 결과물', score: 0 },
      { id: 'C', label: 'AI 모델의 학습 데이터', score: 0 },
      { id: 'D', label: '잘 모르겠다', score: 0 }
    ]
  },
  {
    id: 4,
    part: 1,
    title: "Q4. AI 윤리 및 한계 인식: AI 사용 시 주의해야 할 사항으로 적절하지 않은 것은?",
    options: [
      { id: 'A', label: 'AI가 생성한 정보도 사실 확인이 필요하다', score: 0 },
      { id: 'B', label: '개인정보나 민감한 정보는 입력하지 않아야 한다', score: 0 },
      { id: 'C', label: 'AI 결과물은 항상 100% 정확하므로 그대로 사용해도 된다', score: 1 },
      { id: 'D', label: '저작권 문제를 고려해야 한다', score: 0 }
    ]
  },
  {
    id: 5,
    part: 1,
    title: "Q5. AI 활용 목적: 교육에 참여하는 주요 목적은? (복수 선택 가능)",
    isMultiple: true,
    options: [
      { id: 'A', label: 'AI가 무엇인지 기본 개념 이해', score: 1 },
      { id: 'B', label: '업무 효율화 (문서 작성, 자료 정리 등)', score: 1 },
      { id: 'C', label: '창의적 작업 (기획, 콘텐츠 제작 등)', score: 1 },
      { id: 'D', label: '데이터 분석 및 자동화', score: 1 },
      { id: 'E', label: '프로그래밍/코딩 보조', score: 1 }
    ]
  },
  {
    id: 6,
    part: 2,
    title: "Q6. 시나리오 1: 정보 검색 및 요약. 어떤 프롬프트를 사용하시겠습니까?",
    scenario: "상황: 회의 자료 준비를 위해 '2024년 글로벌 AI 트렌드'에 대한 정보가 필요합니다.",
    options: [
      { id: 'A', label: 'AI 트렌드 알려줘', score: 0 },
      { id: 'B', label: '2024년 글로벌 AI 트렌드를 5가지로 요약해줘', score: 0.5 },
      { id: 'C', label: '2024년 글로벌 AI 산업 트렌드를 비즈니스 관점에서 요약하되, 각 트렌드별로 사례를 1개씩 포함해서 3분 발표 분량으로 작성해줘', score: 1 },
      { id: 'D', label: '어떻게 질문해야 할지 모르겠다', score: 0 }
    ]
  },
  {
    id: 7,
    part: 2,
    title: "Q7. 시나리오 2: 문서 작성. 가장 효과적인 프롬프트는?",
    scenario: "상황: 신제품 출시 보도자료 초안을 작성해야 합니다.",
    options: [
      { id: 'A', label: '보도자료 써줘', score: 0 },
      { id: 'B', label: "신제품 보도자료 작성해줘. 제품명은 'AI 스피커 홈봇'이야", score: 0.5 },
      { id: 'C', label: '다음 정보로 보도자료 작성: [제품명: AI 스피커 홈봇 / 출시일: 3월 15일 / 주요 기능: 음성인식, IoT 연동 / 타겟: 30~40대 가족] 언론사 배포용, A4 1장 분량, 전문적인 톤으로', score: 1 },
      { id: 'D', label: 'AI에게 맡기기 어려울 것 같다', score: 0 }
    ]
  },
  {
    id: 8,
    part: 2,
    title: "Q8. 시나리오 3: 반복 수정 (Iteration). 다음 중 가장 적절한 대응은?",
    scenario: "상황: AI가 생성한 결과물이 마음에 들지 않습니다.",
    options: [
      { id: 'A', label: '포기하고 다른 도구를 사용한다', score: 0 },
      { id: 'B', label: '같은 질문을 반복한다', score: 0 },
      { id: 'C', label: '"좀 더 구체적으로 써줘"라고 요청한다', score: 0.5 },
      { id: 'D', label: '"2번 문단을 좀 더 전문적인 톤으로 수정하고, 통계 데이터를 추가해줘"처럼 구체적으로 수정 요청한다', score: 1 }
    ]
  },
  {
    id: 9,
    part: 2,
    title: "Q9. 시나리오 4: 데이터 분석. AI를 활용한다면?",
    scenario: "상황: 고객 설문조사 결과 100개 응답을 분석해야 합니다.",
    options: [
      { id: 'A', label: 'AI로는 불가능하다고 생각한다', score: 0 },
      { id: 'B', label: '"이 데이터를 분석해줘"라고 파일을 업로드한다', score: 0.5 },
      { id: 'C', label: '"설문 데이터를 업로드할게. 주요 인사이트 3가지를 뽑아주고, 연령대별 차이점을 표로 정리해줘"', score: 1 },
      { id: 'D', label: '엑셀로 직접 분석하는 게 더 빠를 것 같다', score: 0 }
    ]
  },
  {
    id: 10,
    part: 2,
    title: "Q10. 시나리오 5: 창의적 작업. 어떻게 AI를 활용하시겠습니까?",
    scenario: "상황: 회사 창립 20주년 기념 슬로건을 제안해야 합니다.",
    options: [
      { id: 'A', label: '슬로건 만들어줘', score: 0 },
      { id: 'B', label: '20주년 슬로건 10개 추천해줘', score: 0.5 },
      { id: 'C', label: '우리 회사는 IT 교육 기업이고, 혁신과 성장을 강조해왔어. 20주년을 맞아 미래 비전을 담은 슬로건을 10개 제안해줘. 각 슬로건에 대한 콘셉트 설명도 포함해줘', score: 1 },
      { id: 'D', label: '창의적인 작업은 AI보다 사람이 더 잘한다', score: 0 }
    ]
  },
  {
    id: 11,
    part: 2,
    title: "Q11. 시나리오 6: 프롬프트 체인 (다단계 작업). 가장 효율적인 방법은?",
    scenario: "상황: 블로그 글 1편을 완성하려고 합니다.",
    options: [
      { id: 'A', label: '한 번에 "블로그 글 써줘"라고 요청', score: 0.5 },
      { id: 'B', label: '초안만 요청하고 직접 수정', score: 0.5 },
      { id: 'C', label: '①주제 아이디어 브레인스토밍 → ②개요 작성 → ③본문 작성 → ④마무리 교정 순으로 단계별 요청', score: 1 },
      { id: 'D', label: 'AI 없이 직접 작성', score: 0 }
    ]
  },
  {
    id: 12,
    part: 2,
    title: "Q12. 시나리오 7: 이미지 생성 AI 활용. 이미지 생성 AI 사용 경험은?",
    scenario: "상황: 프레젠테이션용 이미지가 필요합니다.",
    options: [
      { id: 'A', label: '사용해본 적 없고, 방법도 모른다', score: 0 },
      { id: 'B', label: '들어본 적은 있지만 사용해본 적 없다', score: 0 },
      { id: 'C', label: '1~2회 사용해봤고, 간단한 이미지 생성 가능', score: 0.5 },
      { id: 'D', label: '자주 사용하며, 원하는 스타일로 생성 가능 (스타일, 구도 등 지정)', score: 1 }
    ]
  },
  {
    id: 13,
    part: 2,
    title: "Q13. 시나리오 8: 코드 작성 보조. AI를 활용할 수 있습니까?",
    scenario: "상황: 간단한 엑셀 매크로나 Python 스크립트가 필요합니다.",
    options: [
      { id: 'A', label: '프로그래밍은 전혀 모르고, AI도 도움이 안 될 것 같다', score: 0 },
      { id: 'B', label: 'AI에게 요청할 수 있다는 건 알지만, 코드 이해는 어렵다', score: 0.5 },
      { id: 'C', label: 'AI에게 코드를 요청하고, 간단한 수정은 가능하다', score: 0.5 },
      { id: 'D', label: 'AI로 코드를 생성하고, 테스트 및 디버깅까지 진행할 수 있다', score: 1 }
    ]
  },
  {
    id: 14,
    part: 2,
    title: "Q14. 시나리오 9: 멀티모달 활용. 이런 작업이 가능하다는 것을 알고 계십니까?",
    scenario: "상황: 사진 속 텍스트를 추출하거나, PDF 문서를 요약해야 합니다.",
    options: [
      { id: 'A', label: '가능한지 몰랐다', score: 0 },
      { id: 'B', label: '가능하다는 건 알지만 해본 적 없다', score: 0 },
      { id: 'C', label: '몇 번 해봤다 (이미지/문서 업로드 후 질문)', score: 0.5 },
      { id: 'D', label: '자주 활용한다 (OCR, PDF 요약, 이미지 분석 등)', score: 1 }
    ]
  },
  {
    id: 15,
    part: 2,
    title: "Q15. 시나리오 10: 종합 문제 해결. AI로 수행할 때의 접근 방식은?",
    scenario: "상황: 경쟁사 3곳 조사, 인사이트 도출, 액션플랜 3가지 제안.",
    options: [
      { id: 'A', label: '너무 복잡해서 AI로는 어렵다', score: 0 },
      { id: 'B', label: '한 번의 프롬프트로 전체를 요청한다', score: 0.5 },
      { id: 'C', label: '①조사 요청 → ②검토 → ③인사이트 요청 → ④액션플랜 요청으로 나눠서 진행', score: 0.5 },
      { id: 'D', label: '①검색도구 활용 정보 수집 → ②AI로 분석 → ③맥락 정보 추가 맞춤형 제안 → ④리뷰 후 추가 질문', score: 1 }
    ]
  }
];
