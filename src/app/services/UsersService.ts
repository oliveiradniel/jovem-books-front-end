import { httpClient } from './utils/httpClient';

import { IUserAPIResponse, TUpdateUser } from '../../@types/User';
import { IPreSignedURL, TGetPreSignedURL } from '../../@types/S3';

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
    imagePath,
    removeImage,
  }: TUpdateUser) {
    const form = new FormData();

    form.append('username', username);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('removeImage', JSON.stringify(removeImage));

    if (imagePath) {
      form.append('imagePath', imagePath);
    }

    const { data } = await httpClient.put<IUserAPIResponse>('/users', form);

    return data;
  }

  async deleteUser() {
    await httpClient.delete('/users');
  }

  async getPreSignedURL({ mimeType, fileSize }: TGetPreSignedURL) {
    const { data } = await httpClient.get<IPreSignedURL>(
      `/users/upload-avatar?type=${mimeType}&size=${fileSize}`
    );

    return {
      url: data.url,
      key: data.key,
    };
  }
}

export default new UsersService();
