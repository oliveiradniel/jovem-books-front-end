import { ChangeEvent, useState } from 'react';

import FormGroup from './FormGroup';
import Input from './Input';
import Button from './Button';

import { ErrorData } from '../@types/ErrorData';
import { UpdateBookProps } from '../app/services/BooksService';

interface BookFormProps {
  buttonLabel: string;
  onSubmit: (book: Omit<UpdateBookProps, 'id'>) => void;
}

export default function BookForm({ buttonLabel, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

  const isFormValid =
    title.length > 0 && authors.length > 0 && errorsData.length === 0;

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'title')
    );

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'title',
          message: 'O título do livro é obrigatório',
        },
      ]);
    }

    setTitle(value);
  }

  function handleAuthorsChange(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    setErrorsData((prevState) =>
      prevState.filter((error) => error.fieldName !== 'authors')
    );

    if (value.length === 0) {
      setErrorsData((prevState) => [
        ...prevState,
        {
          fieldName: 'authors',
          message: 'O livro deve ter pelo menos um autor(a)',
        },
      ]);
    }

    setAuthors(value);
  }

  function handleSinopseChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let { value } = event.target;

    value = value.replace(/^\s+/, '');
    value = value.replace(/\s+/g, ' ');

    setSinopse(value);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    onSubmit({ title, authors, sinopse });
  }

  return (
    <form className="mt-10 flex flex-col gap-4">
      <FormGroup fieldName={['title']} errorsData={errorsData}>
        <Input
          label="Título"
          errorsData={errorsData}
          fieldName="title"
          name="title"
          placeholder="Dom Quixote"
          value={title}
          onChange={handleTitleChange}
        />
      </FormGroup>

      <FormGroup
        fieldName={['authors']}
        errorsData={errorsData}
        wariningText="Separe os autores(as) por vírgula."
      >
        <Input
          label="Autor(es)"
          errorsData={errorsData}
          fieldName="authors"
          name="authors"
          placeholder="Miguel de Cervantes"
          value={authors}
          onChange={handleAuthorsChange}
        />
      </FormGroup>

      <div className="flex gap-2">
        <label
          htmlFor="sinopse"
          className="text-snow-white font-quicksand w-26"
        >
          Sinopse
        </label>
        <div className="relative h-[150px] max-h-[150px] min-h-[100px] w-full">
          <textarea
            name="sinopse"
            placeholder="Sinopse do livro"
            value={sinopse ?? ''}
            onChange={handleSinopseChange}
            className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
          />
        </div>
      </div>

      <Button
        buttonLabel={buttonLabel}
        disabled={!isFormValid}
        isLoading={false}
        onClick={handleSubmit}
      />
    </form>
  );
}
