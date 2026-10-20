import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TuhuellaProvider } from './context/TuHuellaContext';
import { UserProvider } from './context/UserContext';

axios.interceptors.response.use(
  response => response,
  error => {
    // We really want to throw the error so it is handled and we
    // don't get an unhandledrejection error. By throwing here, we
    // are handling the rejection, and bubbling up to the closest
    // error handler (try/catch or catch method call on a promise).
    throw error
  }
)

const getToken = () => {
  return sessionStorage.getItem('authToken');
};

axios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  error => {
    Promise.reject(error);
  }
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <TuhuellaProvider>
       <App />
    </TuhuellaProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
