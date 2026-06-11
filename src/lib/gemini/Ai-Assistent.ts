import { AppError } from '@/lib/AppError';
import { CodingLevel, UserRole } from '@/types';
import axios from 'axios';

export type UserinfoT = {
  userExpreince: string;
  CodingLevel: CodingLevel;
  ROle: UserRole;
};

type MistralChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export async function mistralai(querry: string, userinfo: UserinfoT) {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    throw new AppError('MISTRAL_API_KEY is not configured', 500);
  }

  const systemInstruction = `
    You are a coding assistant. Answer the user's query based on their experience level.
    User Experience: ${userinfo.userExpreince} years.
    Coding Level: ${userinfo.CodingLevel}.
    Role: ${userinfo.ROle}.
    Provide a concise, direct, and structured answer.
  `;

  const jsonSchema = {
    type: 'object',
    properties: {
      answer: {
        type: 'string',
        description:
          'The direct answer to the user query tailored to their skill level.',
      },
      code_example: {
        type: 'string',
        description: 'A code snippet if applicable, or an empty string.',
      },
      difficulty: {
        type: 'string',
        description:
          'Suggested difficulty level for the user (Beginner, Intermediate, Advanced).',
      },
    },
    required: ['answer', 'code_example', 'difficulty'],
    additionalProperties: false,
  };

  try {
    const response = await axios.post<MistralChatResponse>(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: querry },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'coding_assistant_response',
            strict: true,
            schema: jsonSchema,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const rawText = response.data?.choices?.[0]?.message?.content;

    if (typeof rawText !== 'string') {
      throw new AppError('Empty AI response', 500);
    }

    return JSON.parse(rawText);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        error.message;

      throw new AppError(message || 'AI service failed', error.response?.status || 500);
    }

    throw new AppError('AI service failed', 500);
  }
}
