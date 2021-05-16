import { Home, Navbar, Cart, WishList, ErrorPage, Products, Toast} from "./components/index";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useProduct } from "./context/product-context";

export default function App() {
const { state } = useProduct();
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
      { state.toast.toShow && <Toast/> }
      {state.screenLoader && <div className="full-loader"></div>}
    </div>
  );
}
