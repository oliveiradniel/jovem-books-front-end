import { httpClient } from './utils/httpClient';

import { IUserAPIResponse, TUpdateUser } from '../../@types/User';

class UsersService {
  async getMe() {
    const { data } = await httpClient.get<IUserAPIResponse>('/users');

    return data;
  }

  async updateUser({
    username,
    firstName,
    lastName,
    email,
    file,
  }: TUpdateUser) {
    const form = new FormData();

    form.append('username', username);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);

    if (file) {
      form.append('image', file);
    } else {
      form.append('removeImage', JSON.stringify(true));
    }

    const { data } = await httpClient.put<IUserAPIResponse>('/users', form);

    return data;
  }

  async deleteUser() {
    await httpClient.delete('/users');
  }
}

export default new UsersService();
