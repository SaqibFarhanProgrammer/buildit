import { AppError } from '@/lib/AppError';
import { EdittorAI } from '@/lib/gemini/Edittor-Ai';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({
        // add messsage and sttus cod

        message: 'you are not valid user to request this url',
        status: 401,
      });
    }

    const body = await request.json();

    const { coding_experince, coding_level, code } = body;
    const res = await EdittorAI(coding_experince, coding_level, code);

    return NextResponse.json({
        message:"res fetched succes",
        status:200,
        Response:res
    })
  } catch (error: unknown) {
      console.error('REGISTER_USER_ERROR:', error);
  
      let message = 'Server Error';
      let statusCode = 500;
  
      if (error instanceof AppError) {
        message = error.message;
        statusCode = error.statusCode;
      } else if (error instanceof Error) {
        message = error.message;
      }
  
      return NextResponse.json({ message }, { status: statusCode });
  }
}
