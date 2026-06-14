export type ProjectTrackingT = {
  _id: string;
  title: string;
  description: string;
  state: 'active' | 'archive';
  IsAdmin: boolean;
  YourhwereAdded: boolean;
  members: string[];
  tasks: string[];
  createdByUserName: string;
  createdByUserImage?: string;
};
