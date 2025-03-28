export default function Input({ ...props }) {
  return (
    <input
      className="bg-navy-blue-2 focus:border-snow-white-op-70 font-quicksand text-light-gray border-navy-blue-2 mt-2 h-8 appearance-none rounded-[4px] border px-2 text-sm transition-colors duration-300 ease-in-out outline-none"
      {...props}
    />
  );
}
