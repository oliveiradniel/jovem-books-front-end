import { useAuth } from '../../app/hooks/useAuth';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <button type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
}
