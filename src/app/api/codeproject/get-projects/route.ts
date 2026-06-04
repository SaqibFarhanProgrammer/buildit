import { connectDB } from '@/core/db/DbConnection';
import { GetProjects } from '@/services/codeProject/create-project.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();



    const response = await GetProjects( await request);

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
