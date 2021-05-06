import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlist-reducer";

const Wishlist = createContext();

export function WishlistProvider({children}){

    const [ wishlistState, dispatchWishlist ] = useReducer(wishlistReducer, { wishlist: []});

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(api);
                const fetchWishlist = response.data.wishlist;
                dispatchWishlist({ type: "WISHLIST_DATA", payload: fetchWishlist });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return(
        <Wishlist.Provider value={{ wishlistState, dispatchWishlist }}>
            {children}
        </Wishlist.Provider>
    )
}

export function useWishlist(){
    return useContext(Wishlist);
}