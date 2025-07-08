interface ButtonChooseImageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonLabel: string;
}

export default function ButtonChooseImage({
  buttonLabel,
  children,
  ...props
}: ButtonChooseImageProps) {
  return (
    <button
      type="button"
      {...props}
      className={`bg-sky-blue/80 disabled:bg-light-gray/70 font-roboto hover:bg-sky-blue/60 flex w-[140px] items-center justify-center rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:cursor-default`}
    >
      {buttonLabel}
      {children}
    </button>
  );
}
