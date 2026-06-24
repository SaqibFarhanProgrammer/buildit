'use client';

import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import { ITaskCard, ProjectTrackingT } from '@/types/project tracking/types';
import ProjectBoard from './ProjectBoard';

type PropType = {
  projectData: ProjectTrackingT;
  tasks: ITaskCard[];
};

export default function ProjectBoardShell({ projectData, tasks }: PropType) {
  return (
    <ProjectTrackingProvider initialProject={projectData}>
      <ProjectBoard tasks={tasks} />
    </ProjectTrackingProvider>
  );
}
