import { ChangeEvent, useState } from 'react';

import AuthorsMapper from '../app/services/mappers/AuthorsMapper';

import { ZodSchema } from 'zod';
import { handleBookErrors } from '../pages/privateRoutes/EditBook/errors/handleBookErrors';

import FormGroup from './FormGroup';
import Input from './Input';
import Button from './Button';

import { ErrorData } from '../@types/ErrorData';
import { useParams } from 'react-router-dom';
import { emitToast } from '../utils/emitToast';

interface BookFormProps<T> {
  buttonLabel: 'Criar' | 'Salvar alterações';
  onSubmit: (book: T) => Promise<void>;
  validationSchema: ZodSchema<T>;
}

export default function BookForm<T>({
  buttonLabel,
  onSubmit,
  validationSchema,
}: BookFormProps<T>) {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setIsLoading(true);

      const formData = {
        id: id,
        title,
        authors: AuthorsMapper.toPersistence({ authors }),
        sinopse,
        imagePath: null,
        genreLiterary: ['ADVENTURE'],
        numberOfPages: 100,
      };

      const data = validationSchema.parse(formData);

      await onSubmit(data);
    } catch (error) {
      const result = handleBookErrors(error);
      if (result) {
        setErrorsData((prevState) => [...prevState, { ...result }]);
        return;
      }

      const errorMessage = `Não foi possível ${buttonLabel === 'Criar' ? 'criar o' : 'salvar as alterações do'} livro.`;

      emitToast({ type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </form>
  );
}
