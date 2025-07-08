import { httpClient } from './utils/httpClient';

interface SignUpProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignInProps {
  credentials: SignInCredentials;
  signal: AbortSignal;
}

class AuthService {
  async signIn({ credentials, signal }: SignInProps) {
    const { data } = await httpClient.post<{ accessToken: string }>(
      '/sign-in',
      credentials,
      { signal }
    );

    return data;
  }

  async signUp(data: SignUpProps) {
    await httpClient.post('/sign-up', data);
  }
}

export default new AuthService();
