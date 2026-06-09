import { GoogleGenAI } from '@google/genai';
import { SystemInstrutionsCodeEdittor } from '@/utils/SystemInstrutionsCodeEdittor';
import { AppError } from '../AppError';

// Verified Gemini SDK client initialize karein
const ai = new GoogleGenAI({
  apiKey: process.env.CODE_EDITTOR_API_KEY,
});

export async function EdittorAI(
  user_Experince: string,
  userCodingLevel: string,
  codeSnippet: string
) {
  try {
    // 1. Input ko check aur sanitize karein

    if (!codeSnippet || codeSnippet.trim().length === 0) {
      throw new AppError('Code snippet is required', 400);
    }

    // 2. Content generate karein (Corrected SDK Structure)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: codeSnippet, 
      config: {
        // ERROR FIX: systemInstruction ko sahi spelling aur config ke andar pass kiya
        systemInstruction: SystemInstrutionsCodeEdittor(
          user_Experince,
          userCodingLevel
        ),
      },
    });

    // 3. Response se text safely nikalien
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
