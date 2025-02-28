import React from 'react';
import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import App from './App';
import { ThemeProvider, ErrorBoundary } from '@/components';
import './index.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
