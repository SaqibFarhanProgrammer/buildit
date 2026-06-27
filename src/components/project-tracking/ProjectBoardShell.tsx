import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import {
  MemberDetailType,
  ProjectTrackingT,
  TaskT,
} from '@/types/project tracking/types';
import ProjectBoard from './ProjectBoard';
import { cookies } from 'next/headers';
import { GetUseridByToken } from '@/utils/AuthRequest';

type PropType = {
  projectData: ProjectTrackingT;
  tasks: TaskT[];
  Members: MemberDetailType[];
};

export default async function ProjectBoardShell({
  projectData,
  Members,
  tasks,
}: PropType) {
  const userid = await GetUseridByToken();

  return (
    <ProjectTrackingProvider initialProject={projectData}>
      <ProjectBoard userid={userid} members={Members} tasks={tasks} />
    </ProjectTrackingProvider>
  );
}
