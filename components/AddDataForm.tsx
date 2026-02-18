
import React, { useState, useEffect } from 'react';
import { DataType, HeroLinks } from '../types';
import { generateDescription } from '../services/geminiService';
import { Wand2, Loader2, Upload, Trash2, Globe, Users, Zap, Heart, BookOpen, Star, Target, Award, Lightbulb } from 'lucide-react';

interface AddDataFormProps {
  type: DataType;
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AVAILABLE_ICONS = [
  { name: 'globe', icon: <Globe size={24} /> },
  { name: 'users', icon: <Users size={24} /> },
  { name: 'zap', icon: <Zap size={24} /> },
  { name: 'heart', icon: <Heart size={24} /> },
  { name: 'book-open', icon: <BookOpen size={24} /> },
  { name: 'star', icon: <Star size={24} /> },
  { name: 'target', icon: <Target size={24} /> },
  { name: 'award', icon: <Award size={24} /> },
  { name: 'lightbulb', icon: <Lightbulb size={24} /> },
];

export const AddDataForm: React.FC<AddDataFormProps> = ({ type, initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    year: '',
    major: '',
    title: '',
    date: '',
    semester: '',
    description: '',
    status: 'planned',
    author: '',
    tags: '',
    summary: '',
    iconName: 'globe',
    // Links specific
    newMemberUrl: '',
    existingMemberUrl: '',
    instagramUrl: '',
    studyRecruitUrl: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : '',
      }));
      
      if (initialData.imageUrl) {
        setSelectedImages([initialData.imageUrl]);
      } else if (initialData.imageUrls) {
        setSelectedImages(initialData.imageUrls);
      }
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Explicitly type as File[] to prevent type inference errors
      const files: File[] = Array.from(e.target.files);
      const remainingSlots = 15 - selectedImages.length;
      const filesToProcess = files.slice(0, remainingSlots);

      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAiGenerate = async () => {
    const inputTitle = type === 'executive' ? formData.name : (type === 'goal' ? formData.title : formData.title);
    if (!inputTitle) return;
    
    setIsGenerating(true);
    
    let context = '';
    if (type === 'executive') context = `${formData.role} of the club, Year ${formData.year}`;
    else if (type === 'photo') context = `${formData.semester ? `Semester ${formData.semester}` : ''}`;
    else if (type === 'insight') context = formData.description.substring(0, 100);
    else if (type === 'goal') context = 'Core value of the club';

    const generatedText = await generateDescription(
      inputTitle, 
      type === 'executive' ? 'executive' : type === 'insight' ? 'insight' : type === 'goal' ? 'goal' : 'activity',
      context
    );
    
    if (type === 'insight') {
      setFormData(prev => ({ ...prev, summary: generatedText }));
    } else {
      setFormData(prev => ({ ...prev, description: generatedText }));
    }
    
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'links') {
      const linksData: HeroLinks = {
        newMemberUrl: formData.newMemberUrl,
        existingMemberUrl: formData.existingMemberUrl,
        instagramUrl: formData.instagramUrl,
        studyRecruitUrl: formData.studyRecruitUrl
      };
      onSubmit(linksData);
      onClose();
      return;
    }

    const submissionData = {
      ...formData,
      id: initialData ? initialData.id : Date.now().toString(),
      imageUrl: selectedImages[0] || `https://picsum.photos/400/300?random=${Date.now()}`,
      imageUrls: selectedImages.length > 0 ? selectedImages : [`https://picsum.photos/400/300?random=${Date.now()}`],
      tags: type === 'insight' ? formData.tags.split(',').map(tag => tag.trim()) : undefined,
      content: type === 'insight' ? formData.description : undefined,
    };
    onSubmit(submissionData);
    onClose();
  };

  if (type === 'links') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">신입 회원 지원하기 링크</label>
          <input required name="newMemberUrl" value={formData.newMemberUrl} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">기존 회원 지원하기 링크</label>
          <input required name="existingMemberUrl" value={formData.existingMemberUrl} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">학회 인스타 둘러보기 링크</label>
          <input required name="instagramUrl" value={formData.instagramUrl} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">스터디원 모집 링크</label>
          <input required name="studyRecruitUrl" value={formData.studyRecruitUrl} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">취소</button>
          <button type="submit" className="px-6 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700">수정 완료</button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'executive' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
           <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">활동 연도 (Year)</label>
            <input required type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="2024" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">이름</label>
            <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="홍길동" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">직책</label>
            <input required name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Chair (학회장)" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">전공</label>
            <input required name="major" value={formData.major} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="컴퓨터공학과" />
          </div>
        </div>
      )}

      {(type === 'photo' || type === 'schedule' || type === 'insight' || type === 'goal') && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
            <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="제목을 입력하세요" />
          </div>
          
          {(type === 'photo' || type === 'schedule' || type === 'insight') && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">날짜</label>
                <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
              </div>

              {type === 'insight' && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">작성자</label>
                  <input required name="author" value={formData.author} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="작성자 이름" />
                </div>
              )}

              {type === 'photo' && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">학기</label>
                  <input required name="semester" value={formData.semester} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="2024-1" />
                </div>
              )}
              {type === 'schedule' && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">상태</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none">
                    <option value="planned">예정됨</option>
                    <option value="ongoing">진행중</option>
                    <option value="completed">완료됨</option>
                  </select>
                </div>
              )}
            </div>
          )}
          
          {type === 'insight' && (
             <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">태그 (쉼표로 구분)</label>
              <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="AI, React, Web" />
            </div>
          )}

          {type === 'goal' && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">아이콘 선택</label>
              <div className="grid grid-cols-5 gap-2">
                {AVAILABLE_ICONS.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, iconName: icon.name }))}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                      formData.iconName === icon.name 
                        ? 'bg-brand-50 border-brand-500 text-brand-600 ring-2 ring-brand-200' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {icon.icon}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(type === 'executive' || type === 'photo') && (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {type === 'photo' ? `사진 업로드 (최대 15장) - 현재 ${selectedImages.length}장` : '사진 업로드'}
          </label>
          <div className="flex flex-col gap-3">
             {selectedImages.length < 15 && (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    {type === 'photo' ? '여러 장 선택 가능' : '클릭하여 파일 업로드'}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  multiple={type === 'photo'}
                  onChange={handleImageChange} 
                />
              </label>
             )}

            {selectedImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedImages.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 group">
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1/3 -translate-y-1/3"
                    >
                      <Trash2 size={12} />
                    </button>
                    {idx === 0 && <span className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/50 text-white text-center rounded-b-lg">대표</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            {type === 'insight' ? '본문 내용' : '설명 / 소개'}
          </label>
          {type !== 'insight' && (
             <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isGenerating || (!formData.title && !formData.name)}
              className="flex items-center px-2 py-1 text-xs font-medium text-white transition-colors bg-purple-600 rounded hover:bg-purple-700 disabled:bg-gray-300"
            >
              {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
              AI 자동생성
            </button>
          )}
        </div>
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={type === 'insight' ? 8 : 4}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
          placeholder={type === 'insight' ? "블로그 글 내용을 작성하세요..." : "내용을 입력하세요..."}
        ></textarea>
      </div>

      {type === 'insight' && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">요약 (Summary)</label>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isGenerating || !formData.title || !formData.description}
              className="flex items-center px-2 py-1 text-xs font-medium text-white transition-colors bg-purple-600 rounded hover:bg-purple-700 disabled:bg-gray-300"
            >
              {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
              AI 요약생성
            </button>
          </div>
          <textarea
            required
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
            placeholder="글의 핵심 내용을 요약해주세요..."
          ></textarea>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
          취소
        </button>
        <button type="submit" className="px-6 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700">
          {initialData ? '수정하기' : '등록하기'}
        </button>
      </div>
    </form>
  );
};
