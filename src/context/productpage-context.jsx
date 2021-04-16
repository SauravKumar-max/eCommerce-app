import { createContext, useContext, useReducer, useState } from "react";

const ProductDetails = createContext();

export function ProductDetailsProvider({ children }){
    const [ routes, setRoutes ] = useState("products");
    const [ cartState, dispatchCart ] = useReducer(cartReducer, {itemsInCart: [], itemsInWishList: [], items: null})
    return (
        <ProductDetails.Provider value={{routes, setRoutes, cartState, dispatchCart}}>
            {children}
        </ProductDetails.Provider>
    )
}

   

function cartReducer(cartState, action ){
      
    switch (action.type) {
        case "SHOW_PRODUCT":
            return { ...cartState, items: action.payload};

        case "HIDE_PRODUCT": 
            return {...cartState, items: null};

        case "ADD_TO_CART":
                return {...cartState, itemsInCart: [...cartState.itemsInCart, {...action.payload, quantity: 1} ]};

        case "ADD_TO_WISHLIST":
                return {...cartState, itemsInWishList: [...cartState.itemsInWishList, action.payload]};
        
        case "REMOVE_FROM_CART":
            return {...cartState, itemsInCart: cartState.itemsInCart.filter(item => item.id !== action.payload)};
        
        case "REMOVE_FROM_WISHLIST": 
            return {...cartState, itemsInWishList: cartState.itemsInWishList.filter(item => item.id !== action.payload)};

        case "INCREASE_QUANTITY":
            return {...cartState, itemsInCart: cartState.itemsInCart.map(item => item.id === action.payload ? {...item, quantity: item.quantity + 1} : item)};
            
        case "DECREASE_QUANTITY": 
            return {...cartState, itemsInCart: cartState.itemsInCart.map(item => item.id === action.payload ? {...item, quantity: item.quantity - 1} : item)};

        default:
            break;
    }

}

export function useProductDetails(){
    return useContext(ProductDetails);
}