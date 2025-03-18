import { httpClient } from './httpClient';

export interface UserResponse {
  id: string;
  username: string;
  imagePath: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
}

async function me() {
  const { data } = await httpClient.get<UserResponse>('/users');

  return data;
}

export const usersService = {
  me,
};
