import Button from './Button';
import Navigation from './Navigation';

interface SessionTemplate {
  title: string;
  children: React.ReactNode;
  buttonLabel: string;
  highlightText: string;
}

export default function SessionTemplate({
  title,
  children,
  buttonLabel,
  highlightText,
}: SessionTemplate) {
  return (
    <div className="to-royal-blue h-screen w-screen bg-linear-to-r from-black p-5">
      <div className="bg-navy-blue-op-40 flex h-full w-full justify-between gap-20 rounded-2xl p-5">
        <div className="relative max-w-md flex-1">
          <Navigation />

          <h1 className="text-snow-white font-quicksand mt-20 mb-8 text-4xl">
            {title}
          </h1>

          <form className="animate-fade-in flex flex-col gap-4">
            {children}

            <Button label={buttonLabel} />
          </form>
        </div>
        <div className="bg-dark-burgundy-op-80 hidden max-w-md flex-1 items-center justify-center rounded-lg p-6 sm:flex">
          <span className="text-light-gray font-bebas-neue animate-move-in-right text-center text-4xl">
            {highlightText}
          </span>
        </div>
      </div>
    </div>
  );
}
