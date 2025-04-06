export default function Input({ ...props }) {
  return (
    <input
      className="bg-navy-blue focus:border-sky-blue-op-60 font-quicksand text-light-gray border-navy-blue-2 h-8 appearance-none rounded-[4px] border px-2 text-sm transition-colors duration-300 ease-in-out outline-none"
      {...props}
    />
  );
}
