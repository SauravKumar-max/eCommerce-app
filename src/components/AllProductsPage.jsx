import { useProduct } from "../context/product-context";
import { FilterBox, ProductCard, ProductPage } from "./index";

export function Products(){
    const { state } = useProduct();
  return(
      <div className="container">
        { state.item !== null && <ProductPage/> }
        <h1 style={{margin: "6rem 0 0 0", textAlign: "center", color: "rgb(68, 69, 74)"}}>Products</h1>
        <FilterBox/>
        <ProductCard/> 
      </div>
  )
}