import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CarteiraProvider } from './context/CarteiraContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CarteiraProvider>
        <App />
      </CarteiraProvider>
    </BrowserRouter>
  </StrictMode>,
);
