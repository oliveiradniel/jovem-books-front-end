interface DeleteButtonProps {
  buttonLabel: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}

export default function DeleteButton({
  buttonLabel,
  disabled,
  onClick,
}: DeleteButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`text-snow-white bg-blood-red hover:bg-blood-red/70 disabled:bg-light-gray/70 flex h-10 w-12 items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:cursor-pointer disabled:hover:cursor-default`}
    >
      {buttonLabel}
    </button>
  );
}
