import { ChangeEvent } from 'react';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import Input from './Input';
import FormGroup from '../../../components/FormGroup';
import { useErrors } from '../../../app/hooks/useErrors';

interface SignInFieldsProps {
  username: string;
  password: string;
  focusOn?: 'password' | null;
  isSubmitting: boolean;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SignInFields({
  username,
  password,
  focusOn = null,
  isSubmitting,
  onUsernameChange,
  onPasswordChange,
}: SignInFieldsProps) {
  const { getErrorMessageByFieldName } = useErrors();

  return (
    <FormGroup error={getErrorMessageByFieldName(['credentials'])}>
      <div className="flex flex-col gap-4">
        <FormGroup error={getErrorMessageByFieldName(['username'])}>
          <Input
            error={getErrorMessageByFieldName(['username'])}
            theFieldIsEmpty={username.length > 0}
            Icon={FaUser}
            isDisabled={isSubmitting}
            disabled={isSubmitting}
            type="text"
            placeholder="Nome de usuário"
            value={username}
            autoFocus={focusOn !== 'password'}
            onChange={onUsernameChange}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName(['password'])}>
          <Input
            error={getErrorMessageByFieldName(['password'])}
            theFieldIsEmpty={password.length > 0}
            isAPasswordInput
            Icon={RiLockPasswordFill}
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
