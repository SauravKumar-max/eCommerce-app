import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";
import { useProduct } from "../context/product-context";
import { Loader } from "./Loader";

export function AddToCartBtn({item}){
    const [ spinner, setSpinner ] = useState(false);
    const { dispatch } = useProduct()
    const { dispatchCart } = useCart();
    const { login } = useAuth();
    const navigate = useNavigate();


    const addtoCart = async (product) => {
        setSpinner(true);
        try {
            const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
            const response = await axios.post(api, { _id: product._id, quantity: 1 });
            if(response.status === 200){
                setSpinner(false);
                dispatchCart({ type: "ADD_TO_CART", payload: product});
                dispatch({type: "SHOW_TOAST", payload:`${product.name} Added to Cart.`});
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <>
        {
            spinner ? <button className="primary-btn"> <Loader color={'#fff'}/> </button>
            
            : 
        
            <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                disabled={!item.inStock} 
                onClick={ login ? async () =>  addtoCart(item) : () => navigate('/login')}
            >
                <i className="fas fa-shopping-cart"></i>
                {item.inStock ? "Add To Cart" : "Out of Stock"}
            </button>
        }   
        </>
    )
}
