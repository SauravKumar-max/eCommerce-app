import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context"
import { useWishlist } from "../context/wishlist-context";
import axios from "axios";
import { useProduct } from "../context/product-context";
import { useState } from "react";
import { Loader } from "./index";



export function AddToWishlistBtn({item}){
    const { dispatch } = useProduct();
    const { dispatchWishlist } = useWishlist();
    const { login } = useAuth();
    const [ spinner, setSpinner ] = useState(false);
    const navigate = useNavigate();

    const addToWishlist = async (product) => {
        setSpinner(true);
        try {
            const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
            const response = await axios.post(api, { _id: product._id});
            if(response.status === 200){
                setSpinner(false);
                dispatchWishlist({type: "ADD_TO_WISHLIST", payload: product});
                dispatch({type: "SHOW_TOAST", payload: `${product.name} added to Wishlist`});
            }   
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <button 
            onClick={() => login ? addToWishlist(item) : navigate('/login')}
            className="secondary-btn">
            {spinner ? 
                <Loader color={"#3d41d7"}/> 
                : 
                <>
                    <i className="far fa-heart"></i>
                    Add To Wishlist
                </>
            }
        </button>
    )
}