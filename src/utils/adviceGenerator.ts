import { Level } from '../constants';
import { Result, Advice } from '../types';

export const generateAdvice = (result: Result): Advice => {
  const { level } = result;

  let currentAssessment = '';
  let strengths = '';
  let improvements = '';
  let recommendations = '';

  if (level === Level.INTERMEDIATE) {
    currentAssessment = 'AI의 기본 개념과 실전 활용 모두에서 높은 이해도를 보여주고 있습니다. 프롬프트 엔지니어링에 대한 이해가 뛰어나며, 다양한 AI 도구를 효과적으로 활용할 수 있는 역량을 갖추고 있습니다.';
    strengths = '체계적인 프롬프트 작성 능력, 단계별 작업 분해 능력, 다양한 AI 도구 활용 경험';
    improvements = '고급 프롬프트 기법(Few-shot, Chain-of-Thought), AI 자동화 워크플로우 구축';
    recommendations = '• 고급 프롬프트 엔지니어링 마스터 과정\n• AI 업무 자동화 실전 워크샵\n• 팀 내 AI 활용 리더 역할 수행';
  } else if (level === Level.BEGINNER) {
    currentAssessment = 'AI 기본 개념에 대한 이해는 양호하나, 실전 활용 역량에서 발전 가능성이 있습니다. 프롬프트 작성의 기초는 알고 있으나 구체적인 활용법을 학습하면 큰 성장이 기대됩니다.';
    strengths = '생성형 AI 기본 개념 이해, AI 윤리에 대한 인식, 학습 의지';
    improvements = '구체적인 프롬프트 작성법, 단계별 작업 분해 능력, 멀티모달 AI 활용';
    recommendations = '• 프롬프트 엔지니어링 기초 과정\n• 업무별 AI 활용 실습 워크샵\n• AI 도구 체험 및 실전 적용 과제';
  } else {
    currentAssessment = 'AI에 대한 기초 학습이 필요한 단계입니다. 생성형 AI의 개념과 기본적인 활용법부터 차근차근 학습하면 빠르게 성장할 수 있습니다.';
    strengths = 'AI 학습에 대한 관심과 의지, 새로운 기술 습득 가능성';
    improvements = 'AI 기본 개념 이해, 프롬프트 개념 학습, AI 도구 사용 경험';
    recommendations = '• AI 입문 기초 과정 (필수)\n• 생성형 AI 체험 실습\n• 1:1 멘토링 프로그램';
  }

  return { currentAssessment, strengths, improvements, recommendations };
};
