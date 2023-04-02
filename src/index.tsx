import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './styles/app.scss';
import './styles/buttons.scss';
import './styles/animation.scss';
import './styles/containers.scss';
import './styles/inputs.scss';
import './styles/toolbars.scss'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

