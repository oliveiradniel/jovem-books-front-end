import { httpClient } from './utils/httpClient';

interface SignUpProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInProps {
  username: string;
  password: string;
}

class AuthService {
  async signIn(credentials: SignInProps) {
    const { data } = await httpClient.post<{ accessToken: string }>(
      '/sign-in',
      credentials
    );

    return data;
  }

  async signUp(data: SignUpProps) {
    await httpClient.post('/sign-up', data);
  }
}

export default new AuthService();
