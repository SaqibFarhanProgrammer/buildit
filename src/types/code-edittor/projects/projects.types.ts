export interface ProjectType {
  _id: string;
  name: string;
  language: string;
  description?: string;
  content?: string;
  state: 'active' | 'Finished';
  status?: 'Active' | 'Finished';
  filesCount?: number;
  CreatedUserid?: string;
  createdAt: string;
}
