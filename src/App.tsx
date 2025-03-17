import { AuthProvider } from './app/contexts/AuthProvider';

import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
