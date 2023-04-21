import { useState } from "react";
import { useCart, useProduct, useWishlist } from "../context";
import { Product } from "../context/context.types";
import axios from "axios";

export function useCartCall(){
    const api = "https://blendmart-backend.onrender.com";
    const [ loading, setLoading ] = useState(false);
    const { dispatchProduct } = useProduct();
    const { dispatchWishlist } = useWishlist();
    const { dispatchCart } = useCart();

    const addtoCart = async (product:Product | undefined) => {
        setLoading(true);
        try {
            const response = await axios.post(`${api}/carts`, { _id: product?._id, quantity: 1 });
            if(response.status === 200){
                setLoading(false);
                dispatchCart({ type: "ADD_TO_CART", payload: product!});
                dispatchProduct({type: "SHOW_SNACKBAR", payload:`${product?.name} Added to Cart.`});
            }
        } catch (error) {
            console.error(error);
        }
    }

    const removeCartItem = async (product: Product, message:string) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${api}/carts/${product._id}`);
            if(response.status === 200){
                setLoading(false);
                dispatchCart({ type: "REMOVE_FROM_CART", payload: product?._id });
                dispatchProduct({type: "SHOW_SNACKBAR", payload: product?.name + " " + message});
            }     
        } catch (error) {
            console.log(error);
        }
    }

    const moveToWishlist = async (product: Product) => {
        const rawProduct = { ...product, quantity: 1 }
        setLoading(true)
        try {
            await axios.delete(`${api}/carts/${product._id}`);
            await axios.post(`${api}/wishlists`, { _id: product?._id });
            setLoading(false);
            dispatchWishlist({type: "ADD_TO_WISHLIST", payload: rawProduct })
            dispatchCart({ type: "REMOVE_FROM_CART", payload: product?._id });
            dispatchProduct({type: "SHOW_SNACKBAR", payload:`${product?.name} moved to Wishlist.`});
        } catch (error) {
            console.log(error);
        }
    }

    const increaseQty = async (product: Product) => {
        setLoading(true)
        try {
            await axios.post(`${api}/carts/${product._id}` , { quantity: product.quantity + 1 });
            dispatchCart({type: "INCREASE_QUANTITY", payload: product._id});
            dispatchProduct({type: "SHOW_SNACKBAR", payload: `${product.name} Quantity increased. `});
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const decreaseQty = async (product: Product) => {
        setLoading(true)
        try {
            await axios.post(`${api}/carts/${product._id}`, { quantity: product.quantity - 1 });
            dispatchCart({type: "DECREASE_QUANTITY", payload: product._id});
            dispatchProduct({type: "SHOW_SNACKBAR", payload:`${product?.name} Quantity decreased.`});
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const removeAllFromCart = async () => {
        dispatchCart({ type: "CART_DATA", payload: [] });
        try{
            await axios.delete(`${api}/carts/remove-all`);
        }catch(error){
            console.log({error})
        }
    }


    return { 
        loading, 
        addtoCart, 
        removeCartItem, 
        moveToWishlist, 
        increaseQty, 
        decreaseQty, 
        removeAllFromCart 
    };
}