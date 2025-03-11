import Logo from '../assets/icons/logo-home.svg?react';

export default function Home() {
  return (
    <div className="bg-linear-to-r from-black to-royal-blue w-screen h-screen">
      <div className=" p-12 bg-contain bg-none bg-no-repeat bg-right h-full lg:bg-[url(/wallpaper-home.svg)]">
        <div className="flex gap-4">
          <Logo />
          <p className="text-snow-white font-quicksand">Jovem Books</p>
        </div>

        <h1 className="text-snow-white font-quicksand text-6xl w-72 mt-42">
          Controle seu progresso
        </h1>

        <div className="flex flex-col items-start justify-between mt-16 sm:flex-row sm:items-center">
          <p className="text-ashen-purple font-roboto w-64 text-base mb-5">
            Tenha um relatório completo sobre os livros que já leu.
          </p>

          <button
            type="button"
            className="w-60 bg-dark-burgundy h-full rounded-3xl text-light-gray font-bold font-quicksand py-2 transition-opacity duration-300 ease-in-out hover:opacity-75 hover:cursor-pointer active:opacity-100"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
}
