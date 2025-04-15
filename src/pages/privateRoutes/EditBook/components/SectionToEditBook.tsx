import BookForm from '../../../../components/BookForm';

import { IBook } from '../../../../@types/Book';

interface SectionToEditBookProps {
  book: IBook;
}

export default function SectionToEditBook({ book }: SectionToEditBookProps) {
  async function handleSubmit(book: any) {
    console.log(book);
  }

  // async function handleSubmit() {
  //   try {
  //     setIsUpdatingBook(true);

  //     const persistenceAuthors = AuthorsMapper.toPersistence({ authors });

  //     EditBookSchema.parse({
  //       title,
  //       authors: persistenceAuthors,
  //       sinopse,
  //     });

  //     const updatedBook = await BooksService.updateBook({
  //       id: id!,
  //       title,
  //       authors,
  //       sinopse: sinopse ?? null,
  //     });

  //     emitToast({ type: 'success', message: 'Livro atualizado com sucesso.' });

  //     setTitle(updatedBook.title);
  //     setAuthors(updatedBook.authors);
  //     setSinopse(updatedBook.sinopse ?? '');
  //   } catch (error) {
  //     const result = handleEditBookErrors(error);
  //     if (result) {
  //       setErrorsData((prevState) => [...prevState, result]);
  //       return;
  //     }

  //     emitToast({
  //       type: 'error',
  //       message: 'Não foi possível atualizar o livro.',
  //     });
  //   } finally {
  //     setIsUpdatingBook(false);
  //   }
  // }

  return (
    <>
      <BookForm buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  );
}
