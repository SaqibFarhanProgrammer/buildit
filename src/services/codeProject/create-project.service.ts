import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { IProject, Project } from '@/models/codeEdittor/Project.model';
import { ProjectType } from '@/types';
import { VerifyToken } from '@/utils/EncodeEmail';
import { NextRequest } from 'next/server';

type ProjectsResponse = {
  success: true;
  source: 'database' | 'cache';
  data: ProjectType[];
};

const cache = new Map<string, ProjectType[]>();

export async function CreateProject(request: NextRequest) {
  try {
    await connectDB();
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

    if (!decoded?.userId || typeof decoded.userId !== 'string') {
      throw new AppError('Unauthorized from Create project', 401);
    }

    const project = await Project.create({
      name,
      description,
      language,
      CreatedUserid: decoded.userId,
      content: '',
      state: 'active',
    });

    return {
      message: 'Project created successfully',
      project,
    };
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create project', 500);
  }
}

export async function GetProjects(
  input: NextRequest | string
): Promise<ProjectsResponse> {
  try {
    const token =
      typeof input === 'string' ? input : input.cookies.get('token')?.value;

    if (!token) {
      throw new AppError('Unauthorized', 401);
    }

    const decoded = VerifyToken(token);
    const userId = typeof decoded?.userId === 'string' ? decoded.userId : null;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const cacheKey = `projects:${userId}`;
    if (cache.has(cacheKey)) {
      return {
        success: true,
        source: 'cache',
        data: cache.get(cacheKey)!,
      };
    }

    await connectDB();

    const projects = await Project.find({ CreatedUserid: userId }).lean();
    const plainProjects: ProjectType[] = projects.map((project) => ({
      ...project,
      _id:
        typeof project._id === 'string'
          ? project._id
          : (project._id?.toString?.() ?? ''),
      createdAt:
        project.createdAt instanceof Date
          ? project.createdAt.toISOString()
          : String(project.createdAt),
    }));

    cache.set(cacheKey, plainProjects);

    return {
      success: true,
      source: 'database',
      data: plainProjects,
    };
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    console.error(error);
    throw new AppError('Failed to fetch projects', 500);
  }
}
