// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './app/contexts/AuthProvider';

import { Slide, ToastContainer } from 'react-toastify';

import { queryClient } from './config/queryClient';

import Router from './Router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
