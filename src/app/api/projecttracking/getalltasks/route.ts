import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectid } = body;

    



  } catch (error) {}
}
