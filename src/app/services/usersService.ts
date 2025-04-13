import { httpClient } from './utils/httpClient';

export interface UserAPIResponse {
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

class UsersService {
  async getMe() {
    const { data } = await httpClient.get<UserAPIResponse>('/users');

    return data;
  }
}

export default new UsersService();
