import { ChangeEvent } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './Input';
import FormGroup from '../../../components/FormGroup';

import { ErrorData } from '../../../@types/ErrorData';

interface SignInFieldsProps {
  username: string;
  password: string;
  focusOn?: 'password' | null;
  isSubmitting: boolean;
  errorsData: ErrorData[];
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SignInFields({
  username,
  password,
  focusOn = null,
  isSubmitting,
  errorsData,
  onUsernameChange,
  onPasswordChange,
}: SignInFieldsProps) {
  return (
    <FormGroup fieldName={['credentials']} errorsData={errorsData}>
      <div className="flex flex-col gap-4">
        <FormGroup fieldName={['username']} errorsData={errorsData}>
          <Input
            theFieldIsEmpty={username.length > 0}
            Icon={FaUser}
            errorsData={errorsData}
            fieldName="username"
            isDisabled={isSubmitting}
            disabled={isSubmitting}
            type="text"
            placeholder="Nome de usuário"
            value={username}
            autoFocus={focusOn !== 'password'}
            onChange={onUsernameChange}
          />
        </FormGroup>

        <FormGroup fieldName={['password']} errorsData={errorsData}>
          <Input
            theFieldIsEmpty={password.length > 0}
            isAPasswordInput
            Icon={RiLockPasswordFill}
            errorsData={errorsData}
            fieldName="password"
            isDisabled={isSubmitting}
            disabled={isSubmitting}
            placeholder="Senha"
            value={password}
            onChange={onPasswordChange}
            autoFocus={focusOn === 'password'}
          />
        </FormGroup>
      </div>
    </FormGroup>
  );
}
