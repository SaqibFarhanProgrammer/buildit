import { CodingLevel, UserRole } from '@/types';
import { Mistral } from '@mistralai/mistralai';

export type UserinfoT = {
  userExpreince: string;
  CodingLevel: CodingLevel;
  ROle: UserRole;
};

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

export async function mistralai(querry: string, userinfo: UserinfoT) {
  const systemInstruction = `
    You are a coding assistant. Answer the user's query based on their experience level.
    User Experience: ${userinfo.userExpreince} years.
    Coding Level: ${userinfo.CodingLevel}.
    Role: ${userinfo.ROle}.
    Provide a concise, direct, and structured answer.
  `;

  // 2. Strict JSON structure (Schema) define karna
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
  };

  const response = await client.chat.complete({
    model: 'mistral-large-latest',
    responseFormat: {
      type: 'json_object',
      // @ts-ignore (Mistral SDK versions might require this depending on your type strictly matching json_schema)
      jsonSchema: jsonSchema,
    },
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: querry }, // Aapki user query yahan add ho gayi
    ],
  });

  const rawText = response.choices?.[0]?.message?.content;

  if (typeof rawText === 'string') {
    const jsonOutput = JSON.parse(rawText);
    console.log(jsonOutput);
    return jsonOutput;
  }
}
