import { useAuth } from '../../app/hooks/useAuth';

import AuthService from '../../app/services/AuthService';

import { SignInSchema } from '../../assets/schemas/UserSchema';
import { handleSignInErrors } from './errors/handleSignInErrors';

import SessionForm from './components/SessionForm';
import SessionTemplate from './components/SessionTemplate';

import { TSignIn } from '../../@types/User';

export default function SignIn() {
  const { signIn } = useAuth();

  async function handleSubmit(credentials: TSignIn) {
    const { accessToken } = await AuthService.signIn(credentials);

    signIn(accessToken);
  }

  return (
    <SessionTemplate
      title="Entrar"
      highlightText="Com uma lista completa de livros da Google BOOKS, você pode criar sua própria lista de livros e controlar seu progresso de leitura."
      isSubmitting={false}
    >
      <SessionForm
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
        handleErrors={handleSignInErrors}
      />
    </SessionTemplate>
  );
}
