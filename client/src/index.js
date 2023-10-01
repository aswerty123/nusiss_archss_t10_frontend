import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
// import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

// const MAX_AGE = (1000 * 60 * 60 * 24) / (24 * 60 * 6);

const queryClient = new QueryClient();

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
