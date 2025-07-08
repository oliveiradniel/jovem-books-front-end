import GirlStudying from '../../../../assets/images/girl-studying.svg?react';
import GoogleBooksIcon from '../../../../assets/icons/google-books.svg?react';

export default function WelcomeMessageToGoogleBooks() {
  return (
    <div className="animate-fade-in flex min-h-full flex-1 flex-col items-center justify-center">
      <div className="flex items-center">
        <h1 className="font-bebas-neue text-center text-[clamp(1.6rem,4vw,3rem)] text-white">
          Bem vindo a google books!
        </h1>
        <GoogleBooksIcon className="h-[clamp(2rem,6vw,6rem)] w-[clamp(2rem,6vw,4rem)]" />
      </div>

      <p className="font-quicksand mt-2 text-center text-[clamp(0.8rem,2vw,0.9rem)] text-white">
        Aqui você pode facilitar seu cadastro utilizando essa integração para
        preencher os dados dos seus livros e iniciar sua leitura com mais
        praticidade.
      </p>

      <GirlStudying className="mt-8 w-[30vw] lg:w-[20vw]" />
    </div>
  );
}
