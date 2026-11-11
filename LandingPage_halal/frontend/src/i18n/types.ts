import type { Verdict } from "@/lib/verdict";

export interface TextBlock {
  title: string;
  text: string;
}

export interface DemoIngredient {
  name: string;
  verdict: Verdict;
  /** Code additif (E120, CI 75470…) si pertinent. */
  code?: string;
  origin: string;
  source: string;
  /** Présent lorsque les écoles juridiques divergent. */
  schools?: string;
}

export interface DemoProduct {
  name: string;
  brand: string;
  category: string;
  ingredients: DemoIngredient[];
}

export interface ProjectCopy {
  name: string;
  tag: string;
  description: string;
  watchlistLabel: string;
  watchlist: string[];
  cta: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Dictionary {
  meta: { title: string; description: string; ogAlt: string };
  a11y: { skipToContent: string; mainNav: string; languageSwitcher: string; opensNewTab: string };
  nav: { how: string; verdicts: string; demo: string; openData: string; contribute: string; faq: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaSearch: string;
    ctaScan: string;
    trust: string[];
    mockupLabel: string;
  };
  search: {
    title: string;
    projectLabel: string;
    inputLabel: string;
    placeholder: string;
    submit: string;
    loading: string;
    empty: string;
    error: string;
    results: string;
    minChars: string;
    seeAll: string;
  };
  projects: { eyebrow: string; title: string; lead: string; food: ProjectCopy; beauty: ProjectCopy };
  how: { eyebrow: string; title: string; lead: string; steps: [TextBlock, TextBlock, TextBlock] };
  verdicts: {
    eyebrow: string;
    title: string;
    lead: string;
    labels: Record<Verdict, string>;
    descriptions: Record<Verdict, string>;
    disclaimerTitle: string;
    disclaimer: string;
  };
  demo: {
    eyebrow: string;
    title: string;
    lead: string;
    tabsLabel: string;
    tabFood: string;
    tabBeauty: string;
    overall: string;
    overallHint: string;
    ingredients: string;
    flagged: string;
    origin: string;
    source: string;
    schools: string;
    fictional: string;
    food: DemoProduct;
    beauty: DemoProduct;
  };
  openData: {
    eyebrow: string;
    title: string;
    lead: string;
    points: [TextBlock, TextBlock, TextBlock, TextBlock];
    methodologyTitle: string;
    methodology: string[];
    apiCta: string;
  };
  stats: {
    eyebrow: string;
    title: string;
    lead: string;
    products: string;
    ingredients: string;
    contributors: string;
    loading: string;
    fallback: string;
    live: string;
    popularTitle: string;
  };
  contribute: {
    eyebrow: string;
    title: string;
    lead: string;
    add: TextBlock & { cta: string };
    report: TextBlock & { cta: string };
    code: TextBlock & { cta: string };
  };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  footer: {
    tagline: string;
    projects: string;
    resources: string;
    community: string;
    legal: string;
    methodology: string;
    api: string;
    github: string;
    contribute: string;
    legalNotice: string;
    privacy: string;
    contact: string;
    language: string;
    license: string;
  };
  legalPage: {
    title: string;
    noticeTitle: string;
    notice: string;
    privacyTitle: string;
    privacy: string;
    back: string;
  };
}
