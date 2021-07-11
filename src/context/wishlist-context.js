import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlist-reducer";
import { useAuth } from "./auth-context";
import axios from "axios";
 
const Wishlist = createContext();

export function WishlistProvider({children}){
    const [ wishlistState, dispatchWishlist ] = useReducer(wishlistReducer, { wishlist: []});
    const { token } = useAuth();

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
    useEffect(() => {
        (async () => {
            if(token){
                try {
                    const response = await axios.get(api);
                    const fetchWishlist = response.data.userWishlist;
                    dispatchWishlist({ type: "WISHLIST_DATA", payload: fetchWishlist });
                } catch (error) {
                    if(error.response.status === 401){
                        console.error("some-thing is wrong!", error);
                   }
                 }
            }
        })()
    }, [token]);

    return(
        <Wishlist.Provider value={{ wishlistState, dispatchWishlist }}>
            {children}
        </Wishlist.Provider>
    )
}

export function useWishlist(){
    return useContext(Wishlist);
}