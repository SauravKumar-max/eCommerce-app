import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer/cart-reducer";


const Cart = createContext();

export function CartProvider({ children }){


    const [ cartState, dispatchCart ] = useReducer(cartReducer, { cart: [] })

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(api);
                const fetchCart = response.data.cart;
                dispatchCart({type: "CART_DATA", payload: fetchCart});
            } catch (error) {
                console.error(error);
            }
        })()
    },[])

    
    return (
        <Cart.Provider value={{ cartState, dispatchCart }}>
            {children}
        </Cart.Provider>
    )
}
   

export function useCart(){
    return useContext(Cart);
}