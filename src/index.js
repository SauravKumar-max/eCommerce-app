import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from "./context/product-context";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode> 
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <App />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
