import React from 'react';
import ReactDOM from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/common/theme-provider.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';

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
