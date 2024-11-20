import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context/StateContext';
import reducer, { initialeState } from './context/StateReducers';
import { AuthProvider } from './context/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <ToastContainer />
    <StateProvider initialState={initialeState} reducer={reducer}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StateProvider>
  </div>
);

reportWebVitals();
