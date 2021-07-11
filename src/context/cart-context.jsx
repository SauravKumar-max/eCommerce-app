import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cart-reducer";
import axios from "axios";
import { useAuth } from "./auth-context";

const Cart = createContext();

export function CartProvider({ children }){
    const { token } = useAuth();
    const [ cartState, dispatchCart ] = useReducer(cartReducer, { cart: [], confirmModal: false, itemToRemove: null });

    useEffect(() => {
        (async () => {
            if(token){
                try{
                    const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
                    const response = await axios.get(api);
                    const fetchCart = response.data.userCart;
                    dispatchCart({type: "CART_DATA", payload: fetchCart});
                } catch (error) {
                   if(error.response.status === 401){
                        console.error("some-thing is wrong!", error)
                   }
                }
            }
        })()
    }, [token]);

    return (
        <Cart.Provider value={{ cartState, dispatchCart }}>
            {children}
        </Cart.Provider>
    )
}
   

export function useCart(){
    return useContext(Cart);
}