import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setupMockServer from "./api/mock.server";
import { ProductProvider } from "./context/product-context";
import { ProductDetailsProvider } from "./context/productpage-context";
import { BrowserRouter as Router } from "react-router-dom";

setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <ProductDetailsProvider>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </ProductDetailsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
