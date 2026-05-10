export type SignupType = {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

export type LoginType = {
  Email: string;
  Password: string;
};

export type ProfileCreationType = {
  ProgrammingLanguage: string;
  Role: 'FrontEnd' | 'Backend' | 'Both';
  Experince: number;
  Theme: 'Dark' | 'Light';
  CodingLevel: 'Beginner' | 'Intermediate' | 'Export';
};

export type UserStatesType = {
  CodingHours: number;
};
