import { useState } from 'react';

import AuthService from '../../app/services/AuthService';

import { SignUpSchema } from '../../assets/schemas/UserSchema';
import { handleSignUpErrors } from './errors/handleSignUpErrors';

import RegistrationCompleted from './components/RegistrationCompleted';
import SessionForm from './components/SessionForm';

import { TSignUp } from '../../@types/User';
import SessionTemplate from './components/SessionTemplate';

export default function SignUp() {
  const [fullName, setFullName] = useState('');

  const [isTheRegistrationComplete, setIsTheRegistrationComplete] =
    useState(false);

  async function handleSubmit(data: TSignUp) {
    await AuthService.signUp(data);

    setFullName(`${data.firstName} ${data.lastName}`);
    setIsTheRegistrationComplete(true);
  }

  return (
    <>
      <RegistrationCompleted
        isVisible={isTheRegistrationComplete}
        fullName={fullName}
        onClose={() => {
          setIsTheRegistrationComplete(false);
        }}
      />

      <SessionTemplate
        title="Criar uma conta"
        highlightText="Está pronto para terminar um livro hoje e iniciar outro? Entre já e atualize os dados sobre seus livros."
        isSubmitting={false}
      >
        <SessionForm
          type="signUp"
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
          handleErrors={handleSignUpErrors}
        />
      </SessionTemplate>
    </>
  );
}
