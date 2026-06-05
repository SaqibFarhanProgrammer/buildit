import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { IProject, Project } from '@/models/codeEdittor/Project.model';
import { ProjectType } from '@/types';
import { VerifyToken } from '@/utils/EncodeEmail';
import { NextRequest } from 'next/server';

export async function CreateProject(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, description, language } = body as ProjectType;

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
      content: 'console.log("Hello, World!");',
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
const cache = new Map<string, ProjectType[]>();

function serializeProject(project: any): ProjectType {
  return {
    _id: project._id?.toString(),
    name: project.name,
    language: project.language,
    description: project.description,
    content: project.content,
    state: project.state,
    CreatedUserid: project.CreatedUserid,
    createdAt: project.createdAt ? project.createdAt.toISOString() : undefined,
  };
}

export async function GetProjects(token: string) {
  try {
    const decoded = VerifyToken(token);
    const userId = typeof decoded?.userId === 'string' ? decoded.userId : null;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const cacheKey = `projects:${userId}`;
    if (cache.has(cacheKey)) {
      console.log('cache hit');

      return {
        success: true,
        source: 'cache',
        data: cache.get(cacheKey)!,
      };
    }

    await connectDB();
    const projects = await Project.find({ CreatedUserid: userId }).lean();
    const serializedProjects = projects.map(serializeProject);

    cache.set(cacheKey, serializedProjects);

    return {
      success: true,
      source: 'database',
      data: serializedProjects,
    };
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    console.error(error);
    throw new AppError('Failed to fetch projects', 500);
  }
}

export async function GetProjectContent(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id).lean();

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return {
      _id: project._id?.toString(),
      name: project.name,
      language: project.language,
      description: project.description,
      content: project.content,
      state: project.state,
      CreatedUserid: project.CreatedUserid,
      createdAt: project.createdAt?.toISOString(),
    };
  } catch (error: unknown) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch project content', 500);
  }
}
