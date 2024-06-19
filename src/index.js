import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    <ToastContainer position="top-right" autoClose={1500} draggablePercent={60} />
    {/* </React.StrictMode> */}
  </Provider >
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
