import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (
  title: string,
  type: 'executive' | 'activity' | 'goal' | 'insight',
  context?: string
): Promise<string> => {
  try {
    let prompt = "";
    if (type === 'executive') {
      prompt = `Write a short, professional, and inspiring introduction (about 2 sentences) for a university club executive member named or titled "${title}". ${context ? `Context: ${context}` : ''} in Korean.`;
    } else if (type === 'activity') {
      prompt = `Write a short, engaging caption (about 2-3 sentences) for a university club activity photo or event titled "${title}". ${context ? `Context: ${context}` : ''} in Korean.`;
    } else if (type === 'insight') {
      prompt = `Write a short, informative summary (2-3 sentences) for a tech blog post titled "${title}". The post discusses: ${context}. in Korean.`;
    } else {
      prompt = `Write a short, visionary mission statement (1-2 sentences) for a club goal titled "${title}". in Korean.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "내용을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 설명 생성에 실패했습니다. 직접 입력해주세요.";
  }
};