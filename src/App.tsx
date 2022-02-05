import React from "react";
import { Navbar, PrivateRoute, SuccessSnackbar } from "./components";
import {
  Home,
  Products,
  ProductDetail,
  Cart,
  Wishlist,
  Login,
  Signup,
  PaymentStatus,
  Address,
} from "./pages/index";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-transaction"
          element={
            <PrivateRoute>
              <PaymentStatus />
            </PrivateRoute>
          }
        />
        <Route
          path="/address"
          element={
            <PrivateRoute>
              <Address />
            </PrivateRoute>
          }
        />
      </Routes>
      <SuccessSnackbar />
    </div>
  );
}

export default App;
