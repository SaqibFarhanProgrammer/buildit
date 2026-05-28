import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { IProject, Project } from '@/models/codeEdittor/Project.model.';
import { VerifyToken } from '@/utils/EncodeEmail';
import { NextRequest } from 'next/server';

export async function CreateProject(request: NextRequest) {
  try {
    await connectDB();
    // reques tis alread waited
    const body = await request.json();
    const { name, description, language } = body as IProject;

    if (!name || !description || !language) {
      throw new AppError('Missing required project data', 400);
    }

    const token = request.cookies.get('token')?.value;
    if (!token) {
      throw new AppError('Unauthorized', 401);
    }
    const decoded = VerifyToken(token);

    // Here you would typically save the project to a database

    if (!decoded?.userId) {
      throw new AppError('Unauthorized from Create porject', 401);
    }

    const project = await Project.create({
      name: name,
      description: description,
      language: language,
      CreatedUserid: decoded?.userId,
      content: '',
      state: 'active',
    });

    // For this example, we'll just return a success message

    return {
      message: 'Project created successfully',
      project: project,
    };
  } catch (error: unknown) {
    throw new AppError('Failed to create project', 500);
  }
}
