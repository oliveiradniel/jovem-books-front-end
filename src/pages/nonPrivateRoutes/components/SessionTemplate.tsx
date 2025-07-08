import Navigation from './Navigation';

interface SessionTemplate {
  title: string;
  children: React.ReactNode;
  highlightText: string;
  isSubmitting?: boolean;
}

export default function SessionTemplate({
  title,
  children,
  highlightText,
  isSubmitting = false,
}: SessionTemplate) {
  return (
    <div className="bg-blue-black h-screen w-screen p-5">
      <div className="bg-navy-blue/20 flex h-full w-full justify-between gap-20 rounded-2xl p-5">
        <div className="relative max-w-md flex-1">
          <Navigation disabled={isSubmitting} />

          <h1 className="font-quicksand mt-20 mb-8 text-4xl text-white">
            {title}
          </h1>

          {children}
        </div>
        <div className="hidden max-w-md flex-1 items-center justify-center rounded-lg bg-white/6 p-6 sm:flex">
          <span className="font-bebas-neue animate-move-in-right text-center text-4xl text-white/80">
            {highlightText}
          </span>
        </div>
      </div>
    </div>
  );
}
