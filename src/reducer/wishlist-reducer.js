

export function wishlistReducer( wishlistState, action ){

    switch (action.type) {
        case "WISHLIST_DATA":
            return { ...wishlistState, wishlist: action.payload }

        case "ADD_TO_WISHLIST":
            return { ...wishlistState, wishlist: [ ...wishlistState.wishlist, action.payload ]};
            
        case "DELETE_FROM_WISHLIST": 
            return { ...wishlistState, wishlist: [...wishlistState.wishlist.filter(item => item._id !== action.payload)]}
    
        default:
            break;
    }

}