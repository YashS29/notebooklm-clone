import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Configure PDF.js worker with stable version
import * as pdfjsLib from 'pdfjs-dist';

// Use stable, well-tested version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);