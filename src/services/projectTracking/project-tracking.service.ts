import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { Project } from '@/models/codeEdittor/Project.model';
import { ProjectTracking } from '@/models/project traccking/project-tracking.models';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { VerifyToken } from '@/utils/EncodeEmail';
import { getUserProfile } from '@/utils/GetProfiledata';
import { NextRequest } from 'next/server';

export async function GetProjectTrackingProjects(token: string) {
  try {
    await connectDB();
    if (!token) {
      throw new Error('Value is not found in token');
    }

    const value = VerifyToken(token);
    if (!value) {
      throw new Error('Token is not found in parameter');
    }

    const projects = await ProjectTracking.find({
      createdByUserId: value.userId,
    }).lean();

    console.log(projects);
    const cleanProjects = projects.map((project) => ({
      ...project,
      _id: project._id?.toString(),
      createdByUserId: project.createdByUserId?.toString(),
      members:
        project.members?.map((memberId: any) => memberId.toString()) || [],
      tasks: project.tasks?.map((taskId: any) => taskId.toString()) || [],
      createdAt: project.createdAt
        ? new Date(project.createdAt).toISOString()
        : null,
      updatedAt: project.createdAt
        ? new Date(project.createdAt).toISOString()
        : null,
    }));

    return cleanProjects;
  } catch (error) {
    console.error('Error fetching project tracking projects:', error);
    throw error; // Re-throw the error so your page can handle it safely
  }
}

export async function CreateProjectTracking(request: NextRequest) {
  try {
    const userid = IsUserAuthenticate(request);

    if (!userid) {
      throw new AppError('userid not found in token', 300);
    }

    const body = await request.json();

    const { title, description, state, members } = body;

    await connectDB();
  } catch (error) {
    console.log(error);
  }
}
