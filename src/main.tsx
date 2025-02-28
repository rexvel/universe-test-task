import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pdfjs } from 'react-pdf';

import { ErrorBoundary } from '@/components';
import App from '@/App.tsx';

import './index.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
