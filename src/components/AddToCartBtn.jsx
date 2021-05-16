import axios from "axios";
import { useCart } from "../context/cart-context";
import { useProduct } from "../context/product-context";

export function AddToCartBtn({item}){
    const { dispatch } = useProduct()
    const { dispatchCart } = useCart();

     const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
     const addtoCart = async (product) => {
        dispatch({type: "LOAD_LOADER"});
        try {
            await axios.post(api, { _id: product._id, quantity: 1 });
            dispatchCart({ type: "ADD_TO_CART", payload: product});
            dispatch({type: "SHOW_TOAST", payload:`${product.name} Added to Cart.`});
            dispatch({type: "HIDE_LOADER"});
        } catch (error) {
            console.error(error);
        }
     }
    
    return(
        <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
            disabled={!item.inStock} 
            onClick={ async () =>  addtoCart(item)}>
            <i className="fas fa-shopping-cart"></i>
            {item.inStock ? "Add To Cart" : "Out of Stock"}
        </button>
    )
}
