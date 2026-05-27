export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  language: string;
  lastModified: string;
  filesCount: number;
  status: 'Active' | 'Finished';
}
