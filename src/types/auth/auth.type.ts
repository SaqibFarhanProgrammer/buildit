export type SignupType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ProfileCreationType = {
  programmingLanguage: string;
  role: 'FrontEnd' | 'Backend' | 'Both';
  experience: number;
  theme: 'Dark' | 'Light';
  codingLevel: 'Beginner' | 'Intermediate' | 'Expert';
};

export type UserStatesType = {
  codingHours: number;
};

export type UserRole = 'FrontEnd' | 'Backend' | 'Both';
export type ThemeType = 'Dark' | 'Light';
export type CodingLevel = 'Beginner' | 'Intermediate' | 'Expert';

export interface UserProfile {
  programmingLanguage: string;
  role: UserRole;
  experience: number;
  theme: ThemeType;
  codingLevel: CodingLevel;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  profile: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}
