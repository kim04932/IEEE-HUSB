
export enum ViewState {
  HOME = 'HOME',
  EXECUTIVES = 'EXECUTIVES',
  GALLERY = 'GALLERY',
  SCHEDULE = 'SCHEDULE',
  INSIGHTS = 'INSIGHTS',
}

export interface Executive {
  id: string;
  name: string;
  role: string;
  year: string; // e.g., "2024"
  major: string;
  imageUrl: string;
  description: string;
}

export interface ActivityPhoto {
  id: string;
  title: string;
  semester: string; // e.g., "2023-1", "2023-2"
  imageUrls: string[]; 
  description: string;
  date: string;
}

export interface ActivitySchedule {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  status: 'planned' | 'completed' | 'ongoing';
  description: string;
}

export interface ClubGoal {
  id: string;
  title: string;
  description: string;
  iconName: string; // Simple string identifier for icon
}

export interface InsightPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  summary: string;
  tags: string[];
}

export interface HeroLinks {
  newMemberUrl: string;
  existingMemberUrl: string;
  instagramUrl: string;
  studyRecruitUrl: string;
}

// Helper type for the Add Modal
export type DataType = 'executive' | 'photo' | 'schedule' | 'insight' | 'links' | 'goal';
