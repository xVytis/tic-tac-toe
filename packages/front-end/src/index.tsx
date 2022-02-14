import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

const rootElem = document.getElementById('root');
rootElem &&
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElem,
  );
