export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <button
            type="button"
            className="text-snow-white font-roboto hover:text-snow-white-op-70 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            Entrar
          </button>
        </li>
        <li className="text-snow-white font-roboto">
          <button
            type="button"
            className="text-snow-white font-roboto hover:text-snow-white-op-70 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            Criar conta
          </button>
        </li>
      </ul>
    </nav>
  );
}
