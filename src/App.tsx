import { AuthProvider } from './app/contexts/AuthContext';
import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
