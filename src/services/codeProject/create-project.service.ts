import { connectDB } from '@/core/db/DbConnection';
import { IProject } from '@/models/codeEdittor/Project.model.';

export async function CreateProject(body: IProject) {
  try {
    await connectDB();

    const { name, description, language, CreatedUserid, content } = body;

    // Here you would typically save the project to a database

    const newProject = {
      name,
      description,
      language,
      CreatedUserid,
      content: '',
    };

    // For this example, we'll just return a success message

    return {
      message: 'Project created successfully',
    };
  } catch (error) {
    throw new Error('Failed to create project');
  }
}
