import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createClient, cacheExchange, fetchExchange, Provider } from 'urql';

const client = createClient({
  url: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>
);
