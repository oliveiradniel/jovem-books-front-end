interface InformationContainerProps {
  children: React.ReactNode;
}

export default function InformationContainer({
  children,
}: InformationContainerProps) {
  return (
    <div className="sm:bg-navy-blue/40 mb-4 flex w-full flex-col items-center gap-4 rounded-lg bg-transparent px-3 py-3 sm:flex-row">
      {children}
    </div>
  );
}
