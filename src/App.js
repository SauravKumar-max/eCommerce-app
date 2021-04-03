import { Navbar, FilterBox, ProductCard , ProductPage, Cart, WishList} from "./components";
import { useProductDetails } from "./context/productpage-context";
import "./App.css";


export default function App() {
  const { routes, cartState } = useProductDetails();

  function Products(){
    return(
      <div className="container">
        { cartState.items !== null && <ProductPage/> }
        <FilterBox/>
        <ProductCard/> 
      </div>
    )
  }
  return (
    <div className="App">
      <Navbar/>
      { routes === "products"  && <Products/> }
      { routes === "cart" && <Cart/> }
      { routes === "wishlist" && <WishList/> }
    </div>
  );
}
