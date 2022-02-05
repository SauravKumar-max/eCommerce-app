import { Product } from "../context/context.types";
import { Address, User } from "../utils/utils.types";

export type PRODUCT_ACTIONTYPE =
    | { type: "TOGGLE_DELIVERY" , payload: boolean }
    | { type: "TOGGLE_INVENTORY", payload: boolean }
    | { type: "SORT", payload: string | null}
    | { type: "SEARCH", payload: string }
    | { type: "PRICE_RANGE", payload: number | number[] }
    | { type: "SHOW_SNACKBAR", payload: string }
    | { type: "HIDE_SNACKBAR" }

export type CART_ACTIONTYPE =
    | { type: "CART_DATA", payload: Product[] }
    | { type: "ADD_TO_CART", payload: Product }
    | { type: "REMOVE_FROM_CART", payload: string }
    | { type: "INCREASE_QUANTITY", payload: string }
    | { type: "DECREASE_QUANTITY", payload: string }

export type WISHLIST_ACTIONTYPE = 
    | { type: "WISHLIST_DATA", payload: Product[] }
    | { type: "ADD_TO_WISHLIST", payload: Product }
    | { type: "REMOVE_FROM_WISHLIST", payload: string }

export type AUTH_ACTIONTYPE = 
    | { type: "FETCH_USERINFO", payload: User }
    | { type: "LOGIN_ERRORMESSAGE", payload: string }
    | { type: "SET_TOKEN", payload: string | null }
    | { type: "IS_LOGIN", payload: boolean }
    | { type: "ADD_ADDRESS", payload: Address }
    | { type: "REMOVE_ADDRESS", payload: string }
    | { type: "SET_ACTIVE_ADDRESS", payload: string | null }
    