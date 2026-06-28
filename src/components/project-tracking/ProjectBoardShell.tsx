import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import {
  MemberDetailType,
  ProjectTrackingT,
  TaskT,
} from '@/types/project tracking/types';
import ProjectBoard from './ProjectBoard';
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
  const currentMember = Members.find(
    (m) => m.userId.toString() === userid?.toString()
  );
  const currentUserRole = currentMember?.role ?? 'viewer';

  return (
    <ProjectTrackingProvider
      initialProject={projectData}
      initialMembers={Members}
      initialUserRole={currentUserRole}
    >
      <ProjectBoard tasks={tasks} />
    </ProjectTrackingProvider>
  );
}
