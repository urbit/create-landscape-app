import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';

const container = document.getElementById('app');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
