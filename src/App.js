import {  Navbar, Toast, PrivateRoute, Loader} from "./components/index";
import { Home, Cart, WishList, Products, Login, ErrorPage, SingUp} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { useProduct } from "./context/product-context";
import "./App.css";


export default function App() {
  const { state } = useProduct();
    return (
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <SingUp/> } />
          <Route path="/products" element={ <Products/> } />
          <PrivateRoute path="/cart" element={ <Cart/> }/>
          <PrivateRoute path="/wishlist" element={ <WishList/>} />
          <Route path="*" element={ <ErrorPage/> } />
        </Routes>
        { state.toast.toShow && <Toast/> }
        { state.screenLoader && <div className="screen-loader"><Loader color={"#fff"}/> </div>}
      </div>
    );
}
