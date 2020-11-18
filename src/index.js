import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import App from './Components/App';
import { StateProvider } from './Context/StateProvider';
import reducer, { initialState } from './Context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
