import { Home, ProductNavbar, FilterBox, ProductCard , ProductPage, Cart, WishList, ErrorPage} from "./components";
import { useProduct } from "./context/product-context";
import { Routes, Route } from "react-router-dom";
import "./App.css";


export default function App() {
  const { state } = useProduct();

  function Products(){
    return(
      <>
        <ProductNavbar/>
        <div className="container">
          { state.item !== null && <ProductPage/> }
          <h1 style={{margin: "6rem 0 0 0", textAlign: "center", color: "rgb(68, 69, 74)"}}>Products</h1>
          <FilterBox/>
          <ProductCard/> 
        </div>
      </>
    )
  }
  return (
    <div className="App">
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
