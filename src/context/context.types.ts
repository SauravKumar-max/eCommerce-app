import { CART_ACTIONTYPE, PRODUCT_ACTIONTYPE, WISHLIST_ACTIONTYPE, AUTH_ACTIONTYPE } from "../reducer/reducer.types";
import { ReactNode } from "react";
import { User } from "../utils/utils.types";

export type Props = {
    children: ReactNode;
}

export type ProductContextType = {
    loader: boolean;
    products: Product[];
    productState: ProductInitialState;
    dispatchProduct: (action: PRODUCT_ACTIONTYPE) => void;
}

export type ProductInitialState = {
    showInventoryAll: boolean,
    showFastDeliveryOnly: boolean,
    sortBy: string | null,
    searchInputValue: string,
    priceRange: number | number[],
    snackbar: {
      open: boolean,
      message: string,
    },
}

export type Product = {
    _id: string;
    brand: string;
    fastDelivery: boolean;
    image: string;
    inStock: boolean;
    name: string;
    originalPrice: number;
    price: number;
    quantity: number;
    ratings: number;
}
export type CartContextType = {
    cartState: CartInitialState;
    dispatchCart: (action: CART_ACTIONTYPE) => void;
}

export type CartInitialState = {
    cart: Product[],
}

export type AuthContextType = {
    authState: AuthInitialState,
    dispatchAuth: (action: AUTH_ACTIONTYPE) => void;
    spinner: boolean;
    loginUserWithCredentials: (email: string, password: string) => void;
    logout: () => void;
}

export type AuthInitialState = {
    login: boolean;
    token: string | null;
    errorMessage: string;
    userInfo: User;
    activeAddress: string | null; 
}

export type WishlistContextType = {
    wishlistState: WishlistInitialState;
    dispatchWishlist: (action: WISHLIST_ACTIONTYPE) => void;
}

export type WishlistInitialState = {
    wishlist: Product[]
}

export type ServerError = {
    message: string;
};