import { connectDB } from '@/core/db/DbConnection';
import { AppError } from '@/lib/AppError';
import {
  MemberType,
  ProjectTracking,
} from '@/models/project traccking/project-tracking.models';
import { TaskTracking, TaskState } from '@/models/project traccking/task-tracking.models';
import { User } from '@/models/User.model';
import { ITaskCard, MemberDetailType } from '@/types/project tracking/types';
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
      $or: [
        {
          createdByUserId: value.userId,
        },
        {
          'members.userid': value.userId,
        },
      ],
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
      isAdmin: project.createdByUserId === value.userId ? true : false,
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

    const token = request.cookies.get('token')?.value;

    if (!token) {
      throw new AppError('token is request at create project ', 401);
    }

    const body = await request.json();

    const { title, description, state } = body;

    if (!title || typeof title !== 'string') {
      throw new AppError('Title is required', 400);
    }

    if (!description || typeof description !== 'string') {
      throw new AppError('Description is required', 400);
    }

    if (!state || typeof state !== 'string') {
      throw new AppError('State is required', 400);
    }

    await connectDB();

    const profileData = await getUserProfile(token);
    if (!profileData) {
      throw new AppError('ProfileData is request at create project ', 401);
    }

    await ProjectTracking.create({
      title: title.trim(),
      description: description.trim(),
      state: 'active',
      members: [
        {
          userid: profileData.data._id,
          MemberRole: 'admin',
        },
      ],
      createdByUserId: userid,
      isAdmin: true,
    });

    return {
      success: true,
      message: 'Project created successfully',
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
    })
      .select({
        _id: 1,
        title: 1,
        description: 1,
        state: 1,
        createdByUserId: 1,
        createdByUserName: 1,
        members: 1,
        tasks: 1,
        isAdmin: 1,
        createdAt: 1,
      })
      .lean();

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return {
      success: true,
      data: {
        _id: project._id.toString(),
        title: project.title,
        description: project.description,
        state: project.state,
        createdByUserId: project.createdByUserId?.toString(),
        members: project.members.map((member) => ({
          userid: member.userid.toString(),
          MemberRole: member.MemberRole,
        })),
        createdAt: project.createdAt?.toISOString(),
        updatedAt: project.updatedAt?.toISOString(),
        isAdmin: project.createdByUserId === payload.userId ? true : false,
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

function formatTaskResponse(task: {
  _id: { toString(): string };
  title: string;
  summary: string;
  state: TaskState;
  assignToMemberId?: string;
  dueDate?: Date;
  createdAt: Date;
  createdByUserName: string;
  createdByUserNameAvatar: string;
}) {
  return {
    _id: task._id.toString(),
    title: task.title,
    summary: task.summary,
    state: task.state,
    assignToMemberId: task.assignToMemberId || null,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    createdAt: new Date(task.createdAt).toISOString(),
    createdByUserName: task.createdByUserName,
    createdByUserImage: task.createdByUserNameAvatar,
  };
}

async function assertCanManageProjectTasks(userId: string, projectId: string) {
  await connectDB();

  const project = await ProjectTracking.findById(projectId)
    .select('members')
    .lean();

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const member = project.members.find(
    (m) => m.userid.toString() === userId.toString()
  );

  if (!member) {
    throw new AppError('You are not a member of this project', 403);
  }

  if (member.MemberRole === 'viewer') {
    throw new AppError('Viewers cannot modify tasks', 403);
  }

  return project;
}

export async function UpdateProjectTrackingTask(request: NextRequest) {
  try {
    const userId = await IsUserAuthenticate(request);

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const body = await request.json();
    const {
      taskId,
      projectId,
      title,
      summary,
      state,
      assignToMemberId,
      dueDate,
    } = body;

    if (!taskId) {
      throw new AppError('Task id is required', 400);
    }

    if (!projectId) {
      throw new AppError('Project id is required', 400);
    }

    if (!title?.trim()) {
      throw new AppError('Title is required', 400);
    }

    await assertCanManageProjectTasks(userId, projectId);

    const task = await TaskTracking.findOne({
      _id: taskId,
      projectid: projectId,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    task.title = title.trim();
    task.summary = summary?.trim() ?? '';

    if (state) {
      task.state = state;
    }

    if (assignToMemberId !== undefined) {
      task.assignToMemberId = assignToMemberId || undefined;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : undefined;
    }

    await task.save();

    return {
      success: true,
      message: 'Task updated successfully',
      task: formatTaskResponse(task),
    };
  } catch (error) {
    console.error('UpdateProjectTrackingTask Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to update task', 500);
  }
}

export async function DeleteProjectTrackingTask(request: NextRequest) {
  try {
    const userId = await IsUserAuthenticate(request);

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const projectId = searchParams.get('projectId');

    if (!taskId || !projectId) {
      throw new AppError('Task id and project id are required', 400);
    }

    await assertCanManageProjectTasks(userId, projectId);

    const task = await TaskTracking.findOneAndDelete({
      _id: taskId,
      projectid: projectId,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return {
      success: true,
      message: 'Task deleted successfully',
    };
  } catch (error) {
    console.error('DeleteProjectTrackingTask Error:', error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Failed to delete task', 500);
  }
}

export async function AddMember(request: NextRequest) {
  try {
    const body = await request.json();

    const { projectiD, UserEmail, MemberRole } = body;

    console.log(MemberRole);

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

    const memberExists = project.members.find(
      (member) => member.userid.toString() === user._id.toString()
    );

    if (memberExists) {
      throw new AppError('User is already a member', 409);
    }

    project.members.push({
      userid: user._id,
      MemberRole: MemberRole,
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
export async function GetProjectMembers(projectId: string) {
  try {
    const project = await ProjectTracking.findById(projectId)
      .select('members')
      .lean();

    if (!project) {
      throw new AppError('Project not found', 401);
    }

    const userIds = project.members.map((member) => member.userid);

    const users = await User.find({
      _id: { $in: userIds },
    })
      .select('name email image')
      .lean();

    const userMap = new Map(users.map((user) => [user._id.toString(), user]));

    const finalMembers = project.members.map((member) => {
      const user = userMap.get(member.userid.toString());

      return {
        userId: member.userid.toString(),
        name: user?.name ?? '',
        image: user?.image ?? '',
        role: member.MemberRole,
      };
    });

    return finalMembers;
  } catch (error) {
    throw error;
  }
}
