import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoArrowLeft } from 'react-icons/go';

import Input from './components/Input';
import FormGroup from '../../../components/FormGroup';

import { ErrorData } from '../../../@types/ErrorData';

export default function NewBook() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [sinopse, setSinopse] = useState('');

  const [errorsData, setErrorsData] = useState([] as ErrorData[]);

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

  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-snow-white hover:text-snow-white-op-70 h-10 transition-colors duration-300 ease-in-out hover:cursor-pointer"
        >
          <GoArrowLeft size={20} />
        </button>

        <h1 className="font-quicksand text-snow-white text-2xl">Novo livro</h1>
      </div>

      <form className="mt-10 flex flex-col gap-4 overflow-auto">
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
              onChange={(event) => setSinopse(event.target.value)}
              className="text-sky-blue/80 focus:border-sky-blue/40 border-navy-blue font-quicksand placeholder:text-light-gray h-[150px] max-h-[150px] min-h-[100px] w-full rounded-lg border px-2 pt-1 transition-colors duration-300 ease-in-out outline-none placeholder:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
