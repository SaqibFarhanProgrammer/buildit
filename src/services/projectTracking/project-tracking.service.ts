import { connectDB } from '@/core/db/DbConnection';
import { Project } from '@/models/codeEdittor/Project.model';
import { ProjectTracking } from '@/models/project traccking/project-tracking.models';
import { VerifyToken } from '@/utils/EncodeEmail';

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
