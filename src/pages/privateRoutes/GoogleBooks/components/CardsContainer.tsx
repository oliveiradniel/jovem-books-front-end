interface CardsContainerProps {
  children: React.ReactNode;
}

export default function CardsContainer({ children }: CardsContainerProps) {
  return (
    <div className="mt-6 flex max-h-[500px] flex-wrap justify-center gap-4 overflow-y-auto px-5 sm:justify-start">
      {children}
    </div>
  );
}
