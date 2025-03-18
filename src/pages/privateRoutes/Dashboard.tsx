import { useAuth } from '../../app/hooks/useAuth';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Usuário: {user?.username}</p>

      <button type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
}
