'use client';

import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import {
  ITaskCard,
  ProjectTrackingT,
  TaskT,
} from '@/types/project tracking/types';
import ProjectBoard from './ProjectBoard';
import { MemberType } from '@/models/project traccking/project-tracking.models';

type PropType = {
  projectData: ProjectTrackingT;
  tasks: TaskT[];
  Members:MemberType[]
};

export default function ProjectBoardShell({ projectData,Members, tasks }: PropType) {
  return (
    <ProjectTrackingProvider initialProject={projectData}>
      <ProjectBoard members={Members} tasks={tasks} />
    </ProjectTrackingProvider>
  );
}
