import type { SkillSummary } from '../types';
import type { Locale } from './types';

type SkillCopy = {
  name: string;
  description: string;
  examplePrompt?: string;
};

const KO_SKILLS: Record<string, SkillCopy> = {
  'web-prototype': {
    name: '웹 프로토타입',
    description: '단일 화면 또는 랜딩 페이지용 범용 웹 프로토타입을 만듭니다.',
  },
  'saas-landing': {
    name: 'SaaS 랜딩 페이지',
    description: '히어로, 기능, 가격, 신뢰 요소, CTA를 갖춘 SaaS 마케팅 페이지입니다.',
  },
  dashboard: {
    name: '대시보드',
    description: '좌측 사이드바, 상단 바, KPI 카드, 차트가 포함된 관리자/분석 대시보드입니다.',
  },
  'pricing-page': {
    name: '가격 페이지',
    description: '플랜 카드, 비교표, FAQ, CTA가 포함된 가격/요금제 페이지입니다.',
  },
  'docs-page': {
    name: '문서 페이지',
    description: '개발자 문서나 제품 가이드에 맞는 문서형 페이지를 만듭니다.',
  },
  'blog-post': {
    name: '블로그 글',
    description: '마스트헤드, 히어로 이미지, 본문, 인용, 작성자 정보가 있는 긴 글 레이아웃입니다.',
  },
  'mobile-app': {
    name: '모바일 앱',
    description: '실제 모바일 화면 흐름과 탭/카드/상태 UI를 갖춘 앱 프로토타입입니다.',
  },
  'mobile-onboarding': {
    name: '모바일 온보딩',
    description: '가입, 권한 요청, 가치 제안 등 모바일 첫 사용 흐름을 설계합니다.',
  },
  'simple-deck': {
    name: '간단한 슬라이드 덱',
    description: '가로 스와이프가 가능한 단일 HTML 슬라이드 덱을 빠르게 만듭니다.',
  },
  'magazine-web-ppt': {
    name: '매거진 웹 PPT',
    description: '전자잡지와 전자잉크 감성의 가로형 웹 PPT를 만듭니다. 발표/공유용 덱에 적합합니다.',
  },
  'digital-eguide': {
    name: '디지털 e-가이드',
    description: '커버와 본문 스프레드를 갖춘 리드 마그넷/플레이북형 디지털 가이드입니다.',
  },
  'email-marketing': {
    name: '이메일 마케팅',
    description: '프로모션, 뉴스레터, 제품 업데이트용 이메일 레이아웃을 만듭니다.',
  },
  'social-carousel': {
    name: '소셜 캐러셀',
    description: '여러 장의 소셜 미디어 카드/캐러셀을 시각적으로 구성합니다.',
  },
  'magazine-poster': {
    name: '매거진 포스터',
    description: '강한 타이포그래피와 편집 디자인 감각의 포스터/키비주얼을 만듭니다.',
  },
  'motion-frames': {
    name: '모션 프레임',
    description: '짧은 모션/스토리보드용 핵심 프레임을 구성합니다.',
  },
  'sprite-animation': {
    name: '스프라이트 애니메이션',
    description: '스프라이트 기반의 간단한 애니메이션 장면을 만듭니다.',
  },
  'wireframe-sketch': {
    name: '와이어프레임 스케치',
    description: '빠른 구조 검토를 위한 저충실도 와이어프레임을 만듭니다.',
  },
  'gamified-app': {
    name: '게이미파이드 앱',
    description: '레벨, 보상, 진행률 등 게임화 요소가 있는 앱 화면을 설계합니다.',
  },
  'dating-web': {
    name: '데이트/매칭 웹',
    description: '매칭, 커뮤니티 신호, KPI가 있는 소비자형 데이터 대시보드입니다.',
  },
  critique: {
    name: '디자인 리뷰',
    description: 'HTML 산출물을 5차원으로 평가하고 점수, 근거, 개선 목록을 담은 리포트를 만듭니다.',
  },
  tweaks: {
    name: '세부 조정',
    description: '기존 산출물의 색, 간격, 카피, 컴포넌트 배치를 작게 수정할 때 사용합니다.',
  },
  'pm-spec': {
    name: 'PM 스펙',
    description: '문제, 목표, 요구사항, 비범위, 수용 기준을 정리한 제품 스펙 문서입니다.',
  },
  'weekly-update': {
    name: '주간 업데이트',
    description: '이번 주 진행, 다음 주 계획, 리스크, 요청 사항을 한 페이지로 정리합니다.',
  },
  'team-okrs': {
    name: '팀 OKR',
    description: '목표와 핵심 결과, 이니셔티브를 팀 단위로 정리합니다.',
  },
  'eng-runbook': {
    name: '엔지니어링 런북',
    description: '운영 절차, 장애 대응, 체크리스트가 포함된 런북 문서를 만듭니다.',
  },
  'kanban-board': {
    name: '칸반 보드',
    description: '업무 흐름과 상태를 시각화하는 칸반 보드/업무 관리 화면입니다.',
  },
  'meeting-notes': {
    name: '회의록',
    description: '논의 내용, 결정 사항, 액션 아이템을 보기 좋게 정리합니다.',
  },
  invoice: {
    name: '인보이스',
    description: '브랜드가 반영된 청구서/견적서 형태의 문서를 만듭니다.',
  },
  'finance-report': {
    name: '재무 리포트',
    description: 'KPI, 차트, 요약을 갖춘 재무/운영 리포트 문서입니다.',
  },
  'hr-onboarding': {
    name: 'HR 온보딩',
    description: '신규 입사자 안내, 체크리스트, 일정, 리소스를 정리합니다.',
  },
};

function keyFor(skill: SkillSummary): string {
  return KO_SKILLS[skill.id] ? skill.id : skill.name;
}

export function displaySkillName(skill: SkillSummary, locale: Locale): string {
  if (locale === 'ko-KR') return KO_SKILLS[keyFor(skill)]?.name ?? skill.name;
  return skill.name;
}

export function displaySkillDescription(skill: SkillSummary, locale: Locale): string {
  if (locale === 'ko-KR') return KO_SKILLS[keyFor(skill)]?.description ?? skill.description;
  return skill.description;
}

export function displaySkillPrompt(skill: SkillSummary, locale: Locale): string | null {
  if (locale === 'ko-KR') return KO_SKILLS[keyFor(skill)]?.examplePrompt ?? null;
  return null;
}
