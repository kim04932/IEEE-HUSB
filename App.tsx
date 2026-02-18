
import React, { useState, useMemo, useEffect } from 'react';
import { ViewState, Executive, ActivityPhoto, ActivitySchedule, DataType, InsightPost, HeroLinks, ClubGoal } from './types';
import { INITIAL_EXECUTIVES, INITIAL_GOALS, INITIAL_PHOTOS, INITIAL_SCHEDULE, INITIAL_INSIGHTS, INITIAL_HERO_LINKS } from './constants';
import { 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Target, 
  Plus, 
  Menu, 
  X, 
  GraduationCap,
  Clock,
  Heart,
  Zap,
  Globe,
  BookOpen,
  Hash,
  User,
  LogIn,
  LogOut,
  ChevronRight,
  Award,
  ChevronLeft,
  Pencil,
  Trash2
} from 'lucide-react';
import { Modal } from './components/Modal';
import { AddDataForm } from './components/AddDataForm';
import { LoginForm } from './components/LoginForm';

// --- Types for Editable Content ---
interface SiteContent {
  // Hero
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroMotto: string;
  heroDescription: string;
  
  // Home
  homeTitle: string;
  
  // Executives
  executivesTitle: string;
  executivesSubtitle: string;
  executivesYearLabel: string; // "년도 임원진"
  executivesModalTitle: string; // "Executive Team"
  
  // Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  
  // Schedule
  scheduleTitle: string;
  scheduleSubtitle: string;
  
  // Insights
  insightsTitle: string;
  insightsSubtitle: string;
}

const INITIAL_CONTENT: SiteContent = {
  heroLabel: "IEEE Seoul Section Hongik University Student Branch",
  heroTitleLine1: "인류를 위한 기술 발전,",
  heroTitleLine2: "함께 성장하는 배움의 공동체",
  heroMotto: "\"Advancing Technology for Humanity\"",
  heroDescription: "우리는 공부하며 함께 성장하는 학회로서, 더 나은 기술 사회를 만들어갑니다.",
  
  homeTitle: "학회 목표",
  
  executivesTitle: "Alumni",
  executivesSubtitle: "역대 임원진 및 주요 활동 멤버 소개",
  executivesYearLabel: "년도 임원진",
  executivesModalTitle: "Executive Team",
  
  galleryTitle: "Activity Gallery",
  gallerySubtitle: "학회의 다양한 활동과 추억을 기록합니다.",
  
  scheduleTitle: "Activity Schedule",
  scheduleSubtitle: "스터디, 세미나, 행사 등 주요 일정을 안내합니다.",
  
  insightsTitle: "Tech Insights",
  insightsSubtitle: "회원들이 공유하는 최신 기술 트렌드와 지식.",
};

// --- Sub Components ---

const Navbar = ({ currentView, setView, mobileMenuOpen, setMobileMenuOpen, isLoggedIn, onLoginClick, onLogoutClick }: any) => {
  const navItems = [
    { id: ViewState.HOME, label: 'About Us', icon: <Target className="w-4 h-4" /> },
    { id: ViewState.EXECUTIVES, label: 'Alumni', icon: <Users className="w-4 h-4" /> },
    { id: ViewState.GALLERY, label: 'Activity Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: ViewState.SCHEDULE, label: 'Activity Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: ViewState.INSIGHTS, label: 'Tech Insights', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 text-xl font-bold text-brand-900 cursor-pointer"
            onClick={() => setView(ViewState.HOME)}
          >
             IEEE Hongik SB
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  currentView === item.id 
                    ? 'text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="h-6 mx-2 border-l border-gray-200"></div>

            {isLoggedIn ? (
              <button 
                onClick={onLogoutClick}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors rounded-full hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                   currentView === item.id ? 'bg-brand-50 text-brand-700' : 'text-gray-600'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
               {isLoggedIn ? (
                <button 
                  onClick={() => { onLogoutClick(); setMobileMenuOpen(false); }}
                  className="flex items-center w-full gap-3 p-3 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃 (관리자)
                </button>
              ) : (
                <button 
                  onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                  className="flex items-center w-full gap-3 p-3 text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4" />
                  관리자 로그인
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ 
  links, 
  isLoggedIn, 
  onEditLinks, 
  content, 
  onEditContent 
}: { 
  links: HeroLinks, 
  isLoggedIn: boolean, 
  onEditLinks: () => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => (
  <div className="relative overflow-hidden text-white rounded-b-[3rem] shadow-xl min-h-[500px] flex items-center">
    {/* Background Layers */}
    <div className="absolute inset-0 bg-brand-900"></div>
    {/* Image Layer with Blur */}
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]" 
      style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Hongik_University_Hongmun-gwan.jpg/1200px-Hongik_University_Hongmun-gwan.jpg')` }}
    ></div>
    {/* Gradient Overlay for Readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-900/80 to-brand-900"></div>

    <div className="relative container px-4 py-24 mx-auto text-center md:py-32 z-10">
      <div 
        className={`mb-4 inline-block px-4 py-1.5 rounded-full bg-brand-800/50 border border-brand-700 backdrop-blur-sm text-sm font-medium text-brand-200 ${isLoggedIn ? 'cursor-pointer hover:bg-brand-700/50' : ''}`}
        onClick={isLoggedIn ? () => onEditContent('heroLabel') : undefined}
      >
        {content.heroLabel}
      </div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in-up leading-tight">
        <span 
          className={isLoggedIn ? 'cursor-pointer hover:text-brand-200 transition-colors' : ''}
          onClick={isLoggedIn ? () => onEditContent('heroTitleLine1') : undefined}
        >
          {content.heroTitleLine1}
        </span>
        <br/> 
        <span 
          className={`text-brand-300 ${isLoggedIn ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
          onClick={isLoggedIn ? () => onEditContent('heroTitleLine2') : undefined}
        >
          {content.heroTitleLine2}
        </span>
      </h1>
      <div className="max-w-2xl mx-auto mb-10 text-lg text-brand-100 md:text-xl font-light">
        <p 
          className={`mb-1 font-medium ${isLoggedIn ? 'cursor-pointer hover:text-white' : ''}`}
          onClick={isLoggedIn ? () => onEditContent('heroMotto') : undefined}
        >
          {content.heroMotto}
        </p>
        <p
          className={isLoggedIn ? 'cursor-pointer hover:text-white' : ''}
          onClick={isLoggedIn ? () => onEditContent('heroDescription') : undefined}
        >
          {content.heroDescription}
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row flex-wrap justify-center items-center">
        <a 
          href={links.newMemberUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3 font-semibold text-brand-900 transition bg-white rounded-full hover:bg-brand-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          신입 회원 지원하기
        </a>
        <a 
          href={links.existingMemberUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3 font-semibold text-brand-900 transition bg-white rounded-full hover:bg-brand-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          기존 회원 지원하기
        </a>
        <a 
          href={links.instagramUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3 font-semibold text-brand-900 transition bg-white rounded-full hover:bg-brand-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          학회 인스타 둘러보기
        </a>
        <a 
          href={links.studyRecruitUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3 font-semibold text-brand-900 transition bg-white rounded-full hover:bg-brand-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
        >
          스터디원 모집
        </a>
      </div>
      {isLoggedIn && (
        <button 
          onClick={onEditLinks}
          className="mt-6 text-xs text-brand-300 hover:text-white flex items-center justify-center gap-1 mx-auto bg-black/20 px-3 py-1 rounded-full"
        >
          <Pencil size={12} /> 링크 수정 (관리자)
        </button>
      )}
    </div>
  </div>
);

const ViewHome = ({ 
  goals, 
  links, 
  isLoggedIn, 
  onEditLinks, 
  onEditGoal,
  content,
  onEditContent
}: { 
  goals: ClubGoal[], 
  links: HeroLinks, 
  isLoggedIn: boolean, 
  onEditLinks: () => void,
  onEditGoal: (goal: ClubGoal) => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'zap': return <Zap className="w-8 h-8 text-yellow-500" />;
      case 'users': return <Users className="w-8 h-8 text-blue-500" />;
      case 'heart': return <Heart className="w-8 h-8 text-red-500" />;
      default: return <Globe className="w-8 h-8 text-brand-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <Hero 
        links={links} 
        isLoggedIn={isLoggedIn} 
        onEditLinks={onEditLinks} 
        content={content}
        onEditContent={onEditContent}
      />
      <div className="container px-4 py-16 mx-auto">
        <div className="mb-12 text-center relative group">
          <span className="text-sm font-semibold tracking-wider text-brand-600 uppercase">Our Values</span>
          <h2 
            className={`mt-2 text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600 transition-colors' : ''}`}
            onClick={isLoggedIn ? () => onEditContent('homeTitle') : undefined}
            title={isLoggedIn ? "제목 수정" : undefined}
          >
            {content.homeTitle}
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {goals.map((goal) => (
            <div key={goal.id} className="relative p-8 transition-shadow bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group">
              <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform rounded-full bg-gray-50 group-hover:scale-110">
                {getIcon(goal.iconName)}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{goal.title}</h3>
              <p className="leading-relaxed text-gray-600 keep-all">{goal.description}</p>
              
              {isLoggedIn && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onEditGoal(goal); }}
                  className="absolute top-4 right-4 p-2 text-gray-400 opacity-100 hover:text-brand-600 bg-white/80 rounded-full transition-all border border-gray-100"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ViewExecutives = ({ 
  executives, 
  onAdd, 
  isLoggedIn,
  onEdit,
  onDelete,
  content,
  onEditContent
}: { 
  executives: Executive[], 
  onAdd: () => void, 
  isLoggedIn: boolean, 
  onEdit: (data: Executive) => void,
  onDelete: (id: string) => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const groupedExecutives = useMemo(() => {
    const groups: { [key: string]: Executive[] } = {};
    executives.forEach(exec => {
      if (!groups[exec.year]) groups[exec.year] = [];
      groups[exec.year].push(exec);
    });
    return groups;
  }, [executives]);

  const years = Object.keys(groupedExecutives).sort((a, b) => Number(b) - Number(a));

  const getChairName = (year: string) => {
    const chair = groupedExecutives[year].find(e => e.role.toLowerCase().includes('chair') && !e.role.toLowerCase().includes('vice'));
    return chair ? chair.name : 'Unknown';
  };

  useEffect(() => {
    if (selectedYear && !groupedExecutives[selectedYear]) {
      setSelectedYear(null);
    }
  }, [groupedExecutives, selectedYear]);

  return (
    <div className="container px-4 py-12 mx-auto animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 
            className={`text-3xl font-bold text-gray-900 flex items-center gap-2 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600 transition-colors' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('executivesTitle'); } : undefined}
            title={isLoggedIn ? "제목 수정" : undefined}
          >
            {content.executivesTitle}
          </h2>
          <p 
            className={`mt-2 text-gray-600 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('executivesSubtitle'); } : undefined}
            title={isLoggedIn ? "부제목 수정" : undefined}
          >
            {content.executivesSubtitle}
          </p>
        </div>
        {isLoggedIn && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            임원진 추가
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {years.map(year => (
          <div 
            key={year} 
            className="p-6 transition-all bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md cursor-pointer group relative"
            onClick={() => setSelectedYear(year)}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold tracking-wider text-brand-500 uppercase">YEAR</span>
                <div className="flex items-center gap-2">
                   <h3 className="text-2xl font-bold text-gray-900">{year}</h3>
                </div>
                <h3 
                  className={`text-xl font-bold text-brand-900 mb-1 ${isLoggedIn ? 'cursor-pointer hover:text-brand-700' : ''}`}
                  onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('executivesYearLabel'); } : undefined}
                  title={isLoggedIn ? "년도 라벨 수정" : undefined}
                >
                  {year}{content.executivesYearLabel}
                </h3>
                <p className="text-gray-600">Chair (학회장): {getChairName(year)}</p>
              </div>
              <ChevronRight className="text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
            {isLoggedIn && (
              <div className="absolute top-4 right-12 flex gap-2">
                 {/* Delete logic for entire year group? Or just view? Currently delete is per person in detail view. */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal for Year */}
      <Modal 
        isOpen={!!selectedYear} 
        onClose={() => setSelectedYear(null)} 
        title={`${selectedYear} ${content.executivesModalTitle}`}
      >
        <div className="mb-4">
          {isLoggedIn && (
             <p 
               className="text-sm text-brand-500 cursor-pointer hover:underline inline-block"
               onClick={() => onEditContent('executivesModalTitle')}
             >
               (제목 수정: {content.executivesModalTitle})
             </p>
          )}
        </div>
        <div className="space-y-4">
          {selectedYear && groupedExecutives[selectedYear]?.map((exec) => (
            <div key={exec.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl relative group">
              <img 
                src={exec.imageUrl} 
                alt={exec.name} 
                className="object-cover w-16 h-16 rounded-full shadow-sm"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-gray-900">{exec.name}</h4>
                  <span className="px-2 py-0.5 text-xs font-medium text-brand-700 bg-brand-100 rounded-full">
                    {exec.role}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{exec.major}</p>
                <p className="text-gray-700">{exec.description}</p>
              </div>
              {isLoggedIn && (
                <div className="absolute top-4 right-4 flex gap-2">
                   <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(exec); }}
                    className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-white rounded-full transition-colors"
                    title="수정"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(exec.id); }}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-white rounded-full transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const ViewGallery = ({ 
  photos, 
  onAdd, 
  isLoggedIn,
  onEdit,
  onDelete,
  content,
  onEditContent
}: { 
  photos: ActivityPhoto[], 
  onAdd: () => void, 
  isLoggedIn: boolean,
  onEdit: (data: ActivityPhoto) => void,
  onDelete: (id: string) => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ActivityPhoto | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterSemester, setFilterSemester] = useState<string>('All');

  const openModal = (photo: ActivityPhoto) => {
    setSelectedPhoto(photo);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedPhoto) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPhoto.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (selectedPhoto) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPhoto.imageUrls.length) % selectedPhoto.imageUrls.length);
    }
  };

  const semesters = useMemo(() => {
    const unique = Array.from(new Set(photos.map(p => p.semester)));
    return unique.sort().reverse(); 
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (filterSemester === 'All') return photos;
    return photos.filter(p => p.semester === filterSemester);
  }, [photos, filterSemester]);

  return (
    <div className="container px-4 py-12 mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 
            className={`text-3xl font-bold text-gray-900 flex items-center gap-2 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600 transition-colors' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('galleryTitle'); } : undefined}
            title={isLoggedIn ? "제목 수정" : undefined}
          >
            {content.galleryTitle}
          </h2>
          <p 
            className={`mt-2 text-gray-600 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('gallerySubtitle'); } : undefined}
            title={isLoggedIn ? "부제목 수정" : undefined}
          >
            {content.gallerySubtitle}
          </p>
        </div>
        {isLoggedIn && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            사진 추가
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
         <button
           onClick={() => setFilterSemester('All')}
           className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
             filterSemester === 'All'
               ? 'bg-brand-600 text-white shadow-md'
               : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
           }`}
         >
           전체 보기
         </button>
         {semesters.map(sem => (
           <button
             key={sem}
             onClick={() => setFilterSemester(sem)}
             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
               filterSemester === sem
                 ? 'bg-brand-600 text-white shadow-md'
                 : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
             }`}
           >
             {sem}
           </button>
         ))}
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">해당 학기의 활동 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative overflow-hidden transition-all bg-white shadow-lg rounded-xl hover:shadow-xl group cursor-pointer"
              onClick={() => openModal(photo)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={photo.imageUrls[0]} 
                  alt={photo.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-medium">더 보기 ({photo.imageUrls.length}장)</span>
                </div>
                
                {isLoggedIn && (
                   <div className="absolute top-2 right-2 flex gap-1 z-30">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(photo); }}
                      className="p-2 text-gray-600 bg-white rounded-full hover:bg-gray-100 hover:text-brand-600 shadow-sm"
                      title="수정"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(photo.id); }}
                      className="p-2 text-gray-600 bg-white rounded-full hover:bg-red-50 hover:text-red-600 shadow-sm"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-brand-600">{photo.semester}</span>
                  <span className="text-sm text-gray-500">{photo.date}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors">{photo.title}</h3>
                <p className="text-gray-600 line-clamp-2">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <Modal 
          isOpen={!!selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
          title={selectedPhoto.title}
        >
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 group">
            <img 
              src={selectedPhoto.imageUrls[currentImageIndex]} 
              alt={`${selectedPhoto.title} - ${currentImageIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            {selectedPhoto.imageUrls.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
                  {currentImageIndex + 1} / {selectedPhoto.imageUrls.length}
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-between items-start">
             <div>
              <div className="flex items-center gap-3 mb-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPhoto.date}</span>
                <span className="flex items-center gap-1"><GraduationCap size={14} /> {selectedPhoto.semester}</span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPhoto.description}</p>
             </div>
             {isLoggedIn && (
               <button 
                onClick={() => { onDelete(selectedPhoto.id); setSelectedPhoto(null); }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors ml-4 shrink-0"
              >
                <Trash2 size={14} /> 현재 게시물 삭제
              </button>
             )}
          </div>
        </Modal>
      )}
    </div>
  );
};

const ViewSchedule = ({ 
  schedule, 
  onAdd, 
  isLoggedIn,
  onEdit,
  onDelete,
  content,
  onEditContent
}: { 
  schedule: ActivitySchedule[], 
  onAdd: () => void, 
  isLoggedIn: boolean,
  onEdit: (data: ActivitySchedule) => void,
  onDelete: (id: string) => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planned': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'planned': return '예정됨';
      case 'ongoing': return '진행중';
      case 'completed': return '완료됨';
      default: return status;
    }
  };

  return (
    <div className="container px-4 py-12 mx-auto animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 
            className={`text-3xl font-bold text-gray-900 flex items-center gap-2 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600 transition-colors' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('scheduleTitle'); } : undefined}
            title={isLoggedIn ? "제목 수정" : undefined}
          >
            {content.scheduleTitle}
          </h2>
          <p 
            className={`mt-2 text-gray-600 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('scheduleSubtitle'); } : undefined}
            title={isLoggedIn ? "부제목 수정" : undefined}
          >
            {content.scheduleSubtitle}
          </p>
        </div>
        {isLoggedIn && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            일정 추가
          </button>
        )}
      </div>

      <div className="relative border-l-2 border-brand-100 ml-3 md:ml-6 space-y-8">
        {schedule.map((item) => (
          <div key={item.id} className="relative pl-8 md:pl-10 group">
            <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white ${
              item.status === 'completed' ? 'bg-gray-300' : 
              item.status === 'ongoing' ? 'bg-green-500' : 'bg-brand-500'
            }`}></div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full w-fit ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock size={16} />
                <span>{item.date}</span>
              </div>
              
              <p className="text-gray-600">{item.description}</p>
              
              {isLoggedIn && (
                 <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(item); }}
                    className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(item.id); }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewInsights = ({ 
  insights, 
  onAdd, 
  isLoggedIn,
  onEdit,
  onDelete,
  content,
  onEditContent
}: { 
  insights: InsightPost[], 
  onAdd: () => void, 
  isLoggedIn: boolean,
  onEdit: (data: InsightPost) => void,
  onDelete: (id: string) => void,
  content: SiteContent,
  onEditContent: (key: keyof SiteContent) => void
}) => {
  const [selectedPost, setSelectedPost] = useState<InsightPost | null>(null);

  return (
    <div className="container px-4 py-12 mx-auto animate-fade-in max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 
            className={`text-3xl font-bold text-gray-900 flex items-center gap-2 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600 transition-colors' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('insightsTitle'); } : undefined}
            title={isLoggedIn ? "제목 수정" : undefined}
          >
            {content.insightsTitle}
          </h2>
          <p 
            className={`mt-2 text-gray-600 ${isLoggedIn ? 'cursor-pointer hover:text-brand-600' : ''}`}
            onClick={isLoggedIn ? (e) => { e.stopPropagation(); onEditContent('insightsSubtitle'); } : undefined}
            title={isLoggedIn ? "부제목 수정" : undefined}
          >
            {content.insightsSubtitle}
          </p>
        </div>
        {isLoggedIn && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            글 쓰기
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((post) => (
          <div 
            key={post.id} 
            className="flex flex-col h-full bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow cursor-pointer relative group"
            onClick={() => setSelectedPost(post)}
          >
            <div className="p-6 flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs font-medium text-brand-600 bg-brand-50 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {post.summary}
              </p>
              <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="text-xs text-gray-400">{post.date}</div>
              </div>
            </div>
            
            {isLoggedIn && (
              <div className="absolute top-4 right-4 flex gap-2 opacity-100 z-10">
                 <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(post); }}
                  className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-gray-100 rounded-full transition-colors bg-white/80 backdrop-blur-sm shadow-sm"
                  title="수정"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(post.id); }}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors bg-white/80 backdrop-blur-sm shadow-sm"
                  title="삭제"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPost && (
        <Modal 
          isOpen={!!selectedPost} 
          onClose={() => setSelectedPost(null)} 
          title="Tech Insight"
        >
          <article className="prose prose-blue max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-4 border-b">
              <span className="flex items-center gap-1"><User size={16} /> {selectedPost.author}</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> {selectedPost.date}</span>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
              {selectedPost.content}
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
              {selectedPost.tags.map((tag, idx) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                  <Hash size={12} /> {tag}
                </span>
              ))}
            </div>
          </article>
        </Modal>
      )}
    </div>
  );
};

export default function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Data States
  const [executives, setExecutives] = useState<Executive[]>(INITIAL_EXECUTIVES);
  const [photos, setPhotos] = useState<ActivityPhoto[]>(INITIAL_PHOTOS);
  const [schedule, setSchedule] = useState<ActivitySchedule[]>(INITIAL_SCHEDULE);
  const [goals, setGoals] = useState<ClubGoal[]>(INITIAL_GOALS);
  const [insights, setInsights] = useState<InsightPost[]>(INITIAL_INSIGHTS);
  const [heroLinks, setHeroLinks] = useState<HeroLinks>(INITIAL_HERO_LINKS);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_CONTENT);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<DataType>('executive');
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setView(ViewState.HOME);
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleEditLinks = () => {
    setModalType('links');
    setEditingItem(heroLinks);
    setIsAddModalOpen(true);
  };

  const handleEditGoal = (goal: ClubGoal) => {
    setModalType('goal');
    setEditingItem(goal);
    setIsAddModalOpen(true);
  };

  const handleEditContent = (key: keyof SiteContent) => {
    const newValue = window.prompt("내용을 수정하세요:", siteContent[key]);
    if (newValue !== null) {
      setSiteContent(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const openAddModal = (type: DataType, itemToEdit?: any) => {
    setModalType(type);
    setEditingItem(itemToEdit || null);
    setIsAddModalOpen(true);
  };

  const handleAddData = (data: any) => {
    if (modalType === 'links') {
      setHeroLinks(data);
      return;
    }

    if (modalType === 'executive') {
      if (editingItem) {
        setExecutives(prev => prev.map(item => item.id === editingItem.id ? data : item));
      } else {
        setExecutives(prev => [...prev, data]);
      }
    } else if (modalType === 'photo') {
      if (editingItem) {
        setPhotos(prev => prev.map(item => item.id === editingItem.id ? data : item));
      } else {
        setPhotos(prev => [...prev, data]);
      }
    } else if (modalType === 'schedule') {
      if (editingItem) {
        setSchedule(prev => prev.map(item => item.id === editingItem.id ? data : item));
      } else {
        setSchedule(prev => [...prev, data]);
      }
    } else if (modalType === 'insight') {
      if (editingItem) {
        setInsights(prev => prev.map(item => item.id === editingItem.id ? data : item));
      } else {
        setInsights(prev => [...prev, data]);
      }
    } else if (modalType === 'goal') {
      setGoals(prev => prev.map(item => item.id === data.id ? data : item));
    }
  };

  const handleDeleteData = (id: string, type: DataType) => {
    // Immediate delete without confirm
    if (type === 'executive') {
      setExecutives(prev => prev.filter(item => item.id !== id));
    } else if (type === 'photo') {
      setPhotos(prev => prev.filter(item => item.id !== id));
    } else if (type === 'schedule') {
      setSchedule(prev => prev.filter(item => item.id !== id));
    } else if (type === 'insight') {
      setInsights(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <ViewHome 
          goals={goals} 
          links={heroLinks} 
          isLoggedIn={isLoggedIn} 
          onEditLinks={handleEditLinks} 
          onEditGoal={handleEditGoal}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
      case ViewState.EXECUTIVES:
        return <ViewExecutives 
          executives={executives} 
          onAdd={() => openAddModal('executive')} 
          isLoggedIn={isLoggedIn}
          onEdit={(item) => openAddModal('executive', item)}
          onDelete={(id) => handleDeleteData(id, 'executive')}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
      case ViewState.GALLERY:
        return <ViewGallery 
          photos={photos} 
          onAdd={() => openAddModal('photo')} 
          isLoggedIn={isLoggedIn}
          onEdit={(item) => openAddModal('photo', item)}
          onDelete={(id) => handleDeleteData(id, 'photo')}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
      case ViewState.SCHEDULE:
        return <ViewSchedule 
          schedule={schedule} 
          onAdd={() => openAddModal('schedule')} 
          isLoggedIn={isLoggedIn}
          onEdit={(item) => openAddModal('schedule', item)}
          onDelete={(id) => handleDeleteData(id, 'schedule')}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
      case ViewState.INSIGHTS:
        return <ViewInsights 
          insights={insights} 
          onAdd={() => openAddModal('insight')} 
          isLoggedIn={isLoggedIn}
          onEdit={(item) => openAddModal('insight', item)}
          onDelete={(id) => handleDeleteData(id, 'insight')}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
      default:
        return <ViewHome 
          goals={goals} 
          links={heroLinks} 
          isLoggedIn={isLoggedIn} 
          onEditLinks={handleEditLinks} 
          onEditGoal={handleEditGoal}
          content={siteContent}
          onEditContent={handleEditContent}
        />;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />
      
      <main>
        {renderCurrentView()}
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">관리자 로그인</h2>
            <LoginForm 
              onLogin={handleLoginSuccess} 
              onClose={() => setShowLoginModal(false)} 
            />
          </div>
        </div>
      )}

      {/* Add/Edit Data Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title={
          modalType === 'links' ? '링크 수정' : 
          modalType === 'goal' ? '학회 목표 수정' :
          `${editingItem ? '수정' : '추가'}: ${
            modalType === 'executive' ? '임원진' : 
            modalType === 'photo' ? '활동 사진' : 
            modalType === 'insight' ? '기술 인사이트' : '일정'
          }`
        }
      >
        <AddDataForm 
          type={modalType} 
          initialData={editingItem}
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={handleAddData} 
        />
      </Modal>
    </div>
  );
}
