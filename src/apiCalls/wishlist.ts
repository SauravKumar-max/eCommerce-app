import { useWishlist, useProduct, useCart } from "../context/index";
import { Product } from "../context/context.types";
import axios from "axios";


export function useWishlistCall(){
    const api = process.env["REACT_APP_API_URL"];
    const { dispatchWishlist } = useWishlist();
    const { dispatchProduct } = useProduct();
    const { dispatchCart } = useCart();

    const addToWishlist = async (product:Product | undefined) => {
        dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: product! });
        dispatchProduct({type: "SHOW_SNACKBAR", payload: `${product?.name} Added to Wishlist`});
        try {
            await axios.post(`${api}/wishlists`, {_id: product?._id});
        } catch (error) {
            console.log(error)
        }
    }

    const removewishlist = async (product: Product | undefined, message: string) => {
        dispatchWishlist({type: "REMOVE_FROM_WISHLIST", payload: product!._id });
        dispatchProduct({type: "SHOW_SNACKBAR", payload: product?.name + " " + message})
        try {
            await axios.delete(`${api}/wishlists/${product?._id}`);
        } catch (error) {
            console.log(error);
        }
    } 

    const moveToCart = async (product: Product | undefined) => {
        dispatchWishlist({type: "REMOVE_FROM_WISHLIST", payload: product!._id });
        dispatchCart({ type: "ADD_TO_CART", payload: product!});
        dispatchProduct({type: "SHOW_SNACKBAR", payload: `${product?.name} Moved to Cart`})
        try {
            await axios.delete(`${api}/wishlists/${product?._id}`);
            await axios.post(`${api}/carts`, { _id: product?._id, quantity: 1 });
        } catch (error) {
            console.log(error);
        }
    } 


    return { addToWishlist, removewishlist, moveToCart }
}