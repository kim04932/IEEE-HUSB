
import { Executive, ActivityPhoto, ActivitySchedule, ClubGoal, InsightPost, HeroLinks } from './types';

export const INITIAL_GOALS: ClubGoal[] = [
  {
    id: '1',
    title: '기술을 통한 인류 공헌',
    description: 'IEEE의 핵심 가치인 "Advancing Technology for Humanity"를 실천하며, 기술로 더 나은 세상을 만듭니다.',
    iconName: 'globe',
  },
  {
    id: '2',
    title: '함께하는 동반 성장',
    description: '혼자 공부하는 것이 아닌, "공부하며 함께 성장하는 학회"로서 지식 공유와 멘토링을 지향합니다.',
    iconName: 'users',
  },
  {
    id: '3',
    title: '끊임없는 학문적 탐구',
    description: '최신 기술 트렌드를 학습하고 연구하며, 예비 공학인으로서의 전문성을 갖춰 나갑니다.',
    iconName: 'zap',
  },
];

export const INITIAL_HERO_LINKS: HeroLinks = {
  newMemberUrl: 'https://forms.gle/sCT6hQrpGBCNu63g7',
  existingMemberUrl: 'https://forms.gle/PN9J4PNuNqnQDQWh7',
  instagramUrl: 'https://www.instagram.com/ieee_hongik?igsh=MTM4ejFodmh2N213cQ==',
  studyRecruitUrl: 'https://www.instagram.com/ieee_hongik?igsh=MTM4ejFodmh2N213cQ==', // Using Instagram URL as placeholder
};

export const INITIAL_EXECUTIVES: Executive[] = [
  {
    id: '1',
    name: '김철수',
    role: 'Chair (학회장)',
    year: '2024',
    major: '전자전기공학부',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    description: 'IEEE HUSB의 12대 학회장으로서 기술 세미나 정례화를 주도했습니다.',
  },
  {
    id: '2',
    name: '이영희',
    role: 'Vice Chair (부학회장)',
    year: '2024',
    major: '컴퓨터공학과',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    description: '대외 협력 및 IEEE Seoul Section과의 연계 행사를 기획합니다.',
  },
  {
    id: '3',
    name: '박민수',
    role: 'Technical Lead',
    year: '2024',
    major: '컴퓨터공학과',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    description: 'AI 및 임베디드 스터디 그룹을 운영하며 기술적 깊이를 더합니다.',
  },
];

export const INITIAL_PHOTOS: ActivityPhoto[] = [
  {
    id: '1',
    title: 'IEEE Student Congress',
    semester: '2023-2',
    imageUrls: [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102',
    ],
    description: '전국 IEEE Student Branch 회원들이 모여 기술 교류와 네트워킹을 진행했습니다.',
    date: '2023-08-15',
  },
  {
    id: '2',
    title: '홍익 학술제 발표',
    semester: '2023-2',
    imageUrls: ['https://picsum.photos/800/600?random=11'],
    description: '한 학기 동안 연구한 프로젝트 성과를 학우들 앞에서 발표하는 시간을 가졌습니다.',
    date: '2023-11-20',
  },
  {
    id: '3',
    title: '신입 회원 환영회',
    semester: '2024-1',
    imageUrls: ['https://picsum.photos/800/600?random=12'],
    description: '새로운 예비 공학인들을 맞이하며 IEEE HUSB의 비전을 공유했습니다.',
    date: '2024-03-05',
  },
];

export const INITIAL_SCHEDULE: ActivitySchedule[] = [
  {
    id: '1',
    title: '개강 총회',
    date: '2024-09-02',
    status: 'completed',
    description: '2학기 스터디 계획 발표 및 IEEE 멤버십 등록 안내.',
  },
  {
    id: '2',
    title: '논문 리딩 스터디',
    date: '2024-09-10',
    status: 'ongoing',
    description: '매주 최신 IEEE Transaction 논문을 선정하여 리뷰 진행.',
  },
  {
    id: '3',
    title: 'IEEE Day 행사',
    date: '2024-10-01',
    status: 'planned',
    description: '전 세계적인 IEEE Day를 기념하여 기술 퀴즈 대회 개최.',
  },
];

export const INITIAL_INSIGHTS: InsightPost[] = [
  {
    id: '1',
    title: '2024 IEEE Tech Trend 리포트',
    author: '박민수',
    date: '2024-08-15',
    summary: '올해 주목해야 할 핵심 기술: 생성형 AI, 양자 컴퓨팅, 그리고 지속 가능한 기술.',
    content: 'IEEE Computer Society가 선정한 2024년 기술 트렌드를 분석합니다. \n\n가장 주목받는 분야는 단연 생성형 AI(Generative AI)입니다. 하지만 기술적 발전뿐만 아니라 AI의 윤리적 사용(Ethical AI)에 대한 논의도 활발해지고 있습니다. 엔지니어로서 우리는 기술의 성능뿐만 아니라 사회적 영향력까지 고려해야 합니다.\n\n또한, 기후 위기에 대응하기 위한 지속 가능한 컴퓨팅(Sustainable Computing) 기술도 중요한 화두입니다. 데이터 센터의 전력 효율을 높이고, 탄소 배출을 줄이는 알고리즘 설계가 필요합니다.',
    tags: ['IEEE', 'Tech Trend', 'AI'],
  },
];
