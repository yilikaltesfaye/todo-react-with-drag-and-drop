import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GlobalStyle } from "./styles/GlobalStyleSheet";
import { ThemeProvider } from './Context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

