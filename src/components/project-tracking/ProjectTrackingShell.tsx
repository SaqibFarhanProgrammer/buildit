'use client';

import { ProjectTrackingProvider } from '@/context/ProjectTracking.context';
import { ProjectTrackingT } from '@/types/project tracking/types';
import ProjectTrackingList from './ProjectTrackingList';

type PropType = {
  projectsData?: ProjectTrackingT[];
};

export default function ProjectTrackingShell({ projectsData = [] }: PropType) {
  return (
    <ProjectTrackingProvider initialProjects={projectsData}>
      <ProjectTrackingList />
    </ProjectTrackingProvider>
  );
}
