export interface ProjectType {
  _id?: string;
  name: string;
  language: string;
  description?: string;
  content?: string;
  state: 'active' | 'Finished';
  CreatedUserid?: string;
  createdAt?: Date;
}
