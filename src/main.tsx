import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pdfjs } from 'react-pdf';

import App from '@/App.tsx';
import { ErrorBoundary } from '@/components';

import './index.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
