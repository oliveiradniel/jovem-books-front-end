import { httpClient } from './httpClient';

interface SignUpProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

async function signUp(data: SignUpProps) {
  await httpClient.post('sign-up', {
    data: { ...data },
  });
}

export const authService = {
  signUp,
};
