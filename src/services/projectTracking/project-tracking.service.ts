import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import { ProjectTracking } from '@/models/project traccking/project-tracking.models';
import { TaskTracking } from '@/models/project traccking/task-tracking.models';
import { User } from '@/models/User.model';
import { ITaskCard } from '@/types/project tracking/types';
import { GetUseridByToken, IsUserAuthenticate } from '@/utils/AuthRequest';
import { VerifyToken } from '@/utils/EncodeEmail';
import { getUserProfile } from '@/utils/GetProfiledata';
import { cookies } from 'next/headers';
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

    const cleanProjects = projects.map((project) => ({
      ...project,
      _id: project._id?.toString(),
      createdByUserId: project.createdByUserId?.toString(),
      members:
        project.members?.map((memberId: any) => memberId.toString()) || [],
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
    const userid = await IsUserAuthenticate(request);

    if (!userid) {
      throw new AppError('Unauthorized', 401);
    }

    const body = await request.json();

    const { title, description, state, members } = body;

    if (!title || typeof title !== 'string') {
      throw new AppError('Title is required', 400);
    }

    if (!description || typeof description !== 'string') {
      throw new AppError('Description is required', 400);
    }

    if (!state || typeof state !== 'string') {
      throw new AppError('State is required', 400);
    }

    if (members && !Array.isArray(members)) {
      throw new AppError('Members must be an array', 400);
    }

    await connectDB();

    const project = await ProjectTracking.create({
      title: title.trim(),
      description: description.trim(),
      state: 'active',

      members: members || [],
      createdByUserId: userid,
      isAdmin: true,
    });

    return {
      success: true,
      message: 'Project created successfully',
      data: {
        id: project._id.toString(),
      },
    };
  } catch (error: any) {
    console.error('CreateProjectTracking Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Internal Server Error', 500);
  }
}

export async function GetProjectTrackingProject(
  projectId: string,
  token: string
) {
  try {
    if (!projectId) {
      throw new AppError('Project id is required', 400);
    }

    if (!token) {
      throw new AppError('Token is required', 401);
    }

    await connectDB();

    const payload = VerifyToken(token);

    if (!payload?.userId) {
      throw new AppError('Invalid token', 401);
    }

    const project = await ProjectTracking.findOne({
      _id: projectId,
      createdByUserId: payload.userId,
    }).lean();

    console.log(project?.members);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return {
      success: true,
      data: {
        ...project,
        _id: project._id.toString(),
        createdByUserId: project.createdByUserId?.toString(),
        members: project.members?.map((member: any) => member.toString()) || [],
        createdAt: project.createdAt?.toISOString(),
        updatedAt: project.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error('GetProjectTrackingProject Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to fetch project', 500);
  }
}

export async function CreateProjectTrackingTask(request: NextRequest) {
  try {
    const body = await request.json();

    const { projectId, title, summary, state, assignToMemberId, dueDate } =
      body;

    const useriD = await GetUseridByToken();

    if (!projectId) {
      throw new AppError('Project id is required', 400);
    }

    if (!title?.trim()) {
      throw new AppError('Title is required', 400);
    }

    if (!summary?.trim()) {
      throw new AppError('Summary is required', 400);
    }

    if (!state) {
      throw new AppError('State is required', 400);
    }

    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const profileData = await getUserProfile(token!);

    const task = await TaskTracking.create({
      projectid: projectId,
      title: title.trim(),
      summary: summary.trim(),
      state,
      createdUserid: useriD,
      assignToMemberId: assignToMemberId || undefined,
      dueDate: dueDate || undefined,
      createdByUserName: profileData?.data.name,
      createdByUserNameAvatar: profileData?.data.image,
    });

    return {
      success: true,
      message: 'Task created successfully',
      data: task,
    };
  } catch (error) {
    console.error('CreateProjectTrackingTask Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to create task', 500);
  }
}

export async function GetAllTasks(projectId: string) {
  try {
    if (!projectId?.trim()) {
      throw new AppError('Project id is required', 400);
    }

    await connectDB();

    const tasks = await TaskTracking.find({
      projectid: projectId,
    }).lean();

    return tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      summary: task.summary,
      state: task.state,
      assignToMemberId: task.assignToMemberId || null,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
      createdAt: task.createdAt.toString(),
      createdByUserName: task.createdByUserName,
      createdByUserImage: task.createdByUserNameAvatar,
    }));
  } catch (error) {
    console.error('GetAllTasks Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to fetch tasks', 500);
  }
}

export async function AddMember(request: NextRequest) {
  try {
    const body = await request.json();

    const { projectiD, UserEmail, MemberRole } = body;

    if (!projectiD) {
      throw new AppError('Project id is required', 400);
    }

    if (!UserEmail?.trim()) {
      throw new AppError('User email is required', 400);
    }

    if (!MemberRole) {
      throw new AppError('Member role is required', 400);
    }

    await connectDB();

    const user = await User.findOne({
      email: UserEmail.trim(),
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const project = await ProjectTracking.findById(projectiD);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const memberExists = project.members.some(
      (member) => member.userid.toString() === user._id.toString()
    );

    if (memberExists) {
      throw new AppError('User is already a member', 409);
    }

    project.members.push({
      userid: user._id,
      MemberRole,
    });

    await project.save();

    return {
      success: true,
      message: 'Member added successfully',
      data: project,
    };
  } catch (error) {
    console.error('AddMember Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to add member', 500);
  }
}

export async function GetProjectMembers(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectid } = body;

    const project = await ProjectTracking.findOne({
      _id: projectid,
    });

    const Memberlistids = project?.members;
    console.log(Memberlistids);
  } catch (error) {}
}
