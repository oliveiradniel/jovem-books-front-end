import { httpClient } from './utils/httpClient';

import { IUserAPIResponse, TUpdateUser } from '../../@types/User';

class UsersService {
  async getMe() {
    const { data } = await httpClient.get<IUserAPIResponse>('/users');

    return data;
  }

  async updateUser(user: TUpdateUser) {
    const { data } = await httpClient.put<IUserAPIResponse>('/users', user);

    return data;
  }

  async deleteUser() {
    await httpClient.delete('/users');
  }
}

export default new UsersService();
