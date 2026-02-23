export type WorkCategory = 'DEV' | 'WRITING' | 'POLICY' | 'BRANDING';

export type WorkItem = {
  id: number;
  title: string;
  category: WorkCategory;
  year: string;
  summary: string;
  image: string;
};

export const heroTokens = ['I build', 'I write', 'I ship', 'with intent'];

export const aboutKeywords = [
  'Urban & Policy Thinking',
  'Editorial Writing',
  'Public Communication',
  'Systems + Storytelling',
  'Youth Leadership'
];

export const works: WorkItem[] = [
  {
    id: 1,
    title: 'Portfolio Motion System',
    category: 'DEV',
    year: '2026',
    summary: 'Next.js + GSAP 기반 인터랙티브 포트폴리오 모션 아키텍처 설계.',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: '진학레터 잇다 칼럼',
    category: 'WRITING',
    year: '2026',
    summary: '학생부종합전형 분석 및 교과·비교과 탐구활동 칼럼 기고.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: '청소년 정책 제안 프로젝트',
    category: 'POLICY',
    year: '2025',
    summary: '청소년 참여권 확대를 위한 정책 아젠다 기획 및 제안.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    title: 'School Leadership Identity',
    category: 'BRANDING',
    year: '2025',
    summary: '학생자치 커뮤니케이션 톤앤매너와 시각 아이덴티티 정리.',
    image:
      'https://images.unsplash.com/photo-1515165562835-c4c0f276d9f2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    title: 'Math Research Assistant Workflow',
    category: 'DEV',
    year: '2025',
    summary: '질의응답 및 학습관리 흐름을 문서화하고 운영 프로세스 개선.',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    title: '청라온 아카이브 리프레임',
    category: 'WRITING',
    year: '2024',
    summary: '정책/사회 이슈 기사 100여 건을 큐레이션하고 에디토리얼 재구성.',
    image:
      'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    title: 'Youth Civic Toolkit',
    category: 'POLICY',
    year: '2024',
    summary: '청소년 공공참여를 위한 가이드라인 및 협업 시나리오 제작.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    title: 'LDG Lab Channel Design',
    category: 'BRANDING',
    year: '2026',
    summary: 'SNS 채널 운영을 위한 카피/시각 모듈 제작 및 배포.',
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80'
  }
];

export const stats = [
  { label: 'Projects Shipped', value: 38, suffix: '+' },
  { label: 'Articles Written', value: 130, suffix: '+' },
  { label: 'Public Collaborations', value: 24, suffix: '' },
  { label: 'Years of Civic Participation', value: 10, suffix: 'Y' }
];
