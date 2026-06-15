'use client';

import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import { ProjectDetailT } from '@/types/project tracking/types';
import ProjectBoard from './ProjectBoard';

type PropType = {
  projectData: ProjectDetailT;
};

export default function ProjectBoardShell({ projectData }: PropType) {
  return (
    <ProjectTrackingProvider initialProject={projectData}>
      <ProjectBoard />
    </ProjectTrackingProvider>
  );
}
