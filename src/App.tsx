import { AuthProvider } from './app/contexts/AuthProvider';

import { Slide, ToastContainer } from 'react-toastify';

import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
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
