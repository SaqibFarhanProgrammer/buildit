import { mistralai } from '@/lib/gemini/Ai-Assistent';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { querry, userinfo } = body;

    if (!querry) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    if (!userinfo || !userinfo.CodingLevel || !userinfo.ROle) {
      return NextResponse.json(
        { error: 'Complete userinfo is required' },
        { status: 400 }
      );
    }

    const aiResponse = await mistralai(querry, userinfo);

    return NextResponse.json({ success: true, data: aiResponse });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
