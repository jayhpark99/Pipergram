import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthContextProvider } from './lib/app-context';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.querySelector('#root')
);
