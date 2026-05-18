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
