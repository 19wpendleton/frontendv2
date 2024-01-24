import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContactFormContextProvider } from './context/ContactFormContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContactFormContextProvider>
      <App />
    </ContactFormContextProvider>
);
