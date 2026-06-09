import { GoogleGenAI } from '@google/genai';
import { SystemInstrutionsCodeEdittor } from '@/utils/SystemInstrutionsCodeEdittor';
import { AppError } from '../AppError';

const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

const ai = new GoogleGenAI({
  apiKey: process.env.CODE_EDITTOR_API_KEY,
});

export async function EdittorAI(
  user_Experince: string,
  userCodingLevel: string,
  codeSnippet: string
) {
  try {
    if (!codeSnippet || codeSnippet.trim().length === 0) {
      throw new AppError('Code snippet is required', 400);
    }

    const random = Math.floor(Math.random() * 2);
    const response = await ai.models.generateContent({
      model: models[random],
      contents: codeSnippet,
      config: {
        systemInstruction: SystemInstrutionsCodeEdittor(
          user_Experince,
          userCodingLevel
        ),
      },
    });

    if (!response || !response.text) {
      throw new AppError('AI returned empty response', 502);
    }

    return response.text;
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error?.message || 'AI service failed', 500);
  }
}
