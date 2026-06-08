import { GoogleGenAI } from '@google/genai';
import { SystemInstrutionsCodeEdittor } from '@/utils/SystemInstrutionsCodeEdittor';
import { AppError } from '../AppError';

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

    const interaction = await ai.interactions.create({
      model: 'gemini-3.5-flash',
      input: codeSnippet,
      system_instruction: SystemInstrutionsCodeEdittor(
        user_Experince,
        userCodingLevel
      ),
    });

    if (!interaction?.output_text) {
      throw new AppError('AI returned empty response', 502);
    }

    return interaction.output_text;
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(error?.message || 'AI service failed', 500);
  }
}
