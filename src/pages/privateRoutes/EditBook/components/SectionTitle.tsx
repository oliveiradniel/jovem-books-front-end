interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h1 className="text-snow-white font-quicksand mt-6 mb-6 text-2xl font-thin">
      {children}
    </h1>
  );
}
