import { Home, Navbar, Cart, WishList, ErrorPage, Products} from "./components/index";
import { Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/products" element={ <Products/> } />
        <Route path="/cart" element={ <Cart/>} />
        <Route path="/wishlist" element={ <WishList/>} />
        <Route path="*" element={ <ErrorPage/> } />
      </Routes>
      
    </div>
  );
}
