import { WishlistInitialState } from "../context/context.types";
import { WISHLIST_ACTIONTYPE } from "./reducer.types";

export const wishlistReducer = ( wishlistState: WishlistInitialState, action: WISHLIST_ACTIONTYPE ) => {
    switch (action.type) {
        case "WISHLIST_DATA":
            return { ...wishlistState, wishlist: action.payload }

        case "ADD_TO_WISHLIST":
            return { ...wishlistState, wishlist: [ ...wishlistState.wishlist, action.payload ]};
            
        case "REMOVE_FROM_WISHLIST": 
            return { ...wishlistState, wishlist: [...wishlistState.wishlist.filter(item => item._id !== action.payload)]}
    
        default:
            return wishlistState;
    }
}