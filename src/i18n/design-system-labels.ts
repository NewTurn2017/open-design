import type { Locale } from './types';
import type { DesignSystemSummary } from '../types';

const KO_CATEGORIES: Record<string, string> = {
  'Starter': '시작용',
  'AI & LLM': 'AI 및 LLM',
  'Developer Tools': '개발자 도구',
  'Productivity & SaaS': '생산성 및 SaaS',
  'Backend & Data': '백엔드 및 데이터',
  'Design & Creative': '디자인 및 크리에이티브',
  'Fintech & Crypto': '핀테크 및 크립토',
  'E-Commerce & Retail': '이커머스 및 리테일',
  'Media & Consumer': '미디어 및 소비자',
  'Automotive': '자동차',
  'Uncategorized': '분류 없음',
  'Other': '기타',
};

const ZH_CATEGORIES: Record<string, string> = {
  'Starter': '入门',
  'AI & LLM': 'AI 与 LLM',
  'Developer Tools': '开发者工具',
  'Productivity & SaaS': '效率与 SaaS',
  'Backend & Data': '后端与数据',
  'Design & Creative': '设计与创意',
  'Fintech & Crypto': '金融科技与加密',
  'E-Commerce & Retail': '电商与零售',
  'Media & Consumer': '媒体与消费',
  'Automotive': '汽车',
  'Uncategorized': '未分类',
  'Other': '其他',
};

export function localizeDesignSystemCategory(
  category: string | null | undefined,
  locale: Locale,
): string {
  const raw = category || 'Uncategorized';
  if (locale === 'ko-KR') return KO_CATEGORIES[raw] ?? raw;
  if (locale === 'zh-CN') return ZH_CATEGORIES[raw] ?? raw;
  return raw;
}

export function designSystemSubtitle(
  system: Pick<DesignSystemSummary, 'category' | 'summary'>,
  locale: Locale,
): string {
  if (locale === 'ko-KR') {
    return localizeDesignSystemCategory(system.category, locale);
  }
  return system.summary || localizeDesignSystemCategory(system.category, locale);
}
