import { useState } from 'react';

import { useSetDocumentTitle } from '@/app/hooks/useSetDocumentTitle';

import AuthService from '../../app/services/AuthService';

import { SignUpSchema } from '../../assets/schemas/UserSchema';
import { handleSignUpErrors } from '../../app/handleErrors/handleSignUpErrors';

import RegistrationCompleted from './components/RegistrationCompleted';
import SessionForm from './components/SessionForm';

import { TSignUp } from '../../@types/User';
import SessionTemplate from './components/SessionTemplate';

export default function SignUp() {
  useSetDocumentTitle({ title: 'Criar conta' });

  const [fullName, setFullName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isTheRegistrationComplete, setIsTheRegistrationComplete] =
    useState(false);

  async function handleSubmit(data: TSignUp) {
    setIsSubmitting(true);

    await AuthService.signUp(data);

    setIsSubmitting(false);
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
        isSubmitting={isSubmitting}
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
