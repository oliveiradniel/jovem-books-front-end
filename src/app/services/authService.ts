import { httpClient } from './httpClient';

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

async function signUp(data: SignUpProps) {
  await httpClient.post('sign-up', {
    data: { ...data },
  });
}

async function signIn(credentials: SignInProps) {
  const { data } = await httpClient.post<{ accessToken: string }>('sign-in', {
    data: { ...credentials },
  });

  return data;
}

export const authService = {
  signUp,
  signIn,
};
