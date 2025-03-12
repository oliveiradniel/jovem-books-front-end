import Logo from '../assets/icons/logo-home.svg?react';

export default function Home() {
  return (
    <div className="to-royal-blue h-screen w-screen bg-linear-to-r from-black">
      <div className="h-full bg-none bg-contain bg-right bg-no-repeat p-12 lg:bg-[url(/wallpaper-home.svg)]">
        <div className="flex gap-4">
          <Logo />
          <p className="text-snow-white font-quicksand">Jovem Books</p>
        </div>

        <h1 className="text-snow-white font-quicksand mt-42 w-72 text-6xl">
          Controle seu progresso
        </h1>

        <div className="mt-16 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="text-ashen-purple font-roboto mb-5 w-64 text-base">
            Tenha um relatório completo sobre os livros que já leu.
          </p>

          <button
            type="button"
            className="bg-dark-burgundy text-light-gray font-quicksand h-full w-60 rounded-3xl py-2 font-bold transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-75 active:opacity-100"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
}
