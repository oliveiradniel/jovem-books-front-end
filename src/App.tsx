import { AuthProvider } from './app/contexts/AuthProvider';

import { Slide, ToastContainer } from 'react-toastify';

import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={Slide}
        closeButton={false}
        closeOnClick
      />
    </AuthProvider>
  );
}

export default App;
