// import { ProductInitialState } from "../context/context.types";
import { ProductInitialState } from "../context/context.types";
import { PRODUCT_ACTIONTYPE } from "./reducer.types";

export const productReducer = (state: ProductInitialState, action: PRODUCT_ACTIONTYPE) => {
    switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: action.payload
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: action.payload
          });
        case "SORT":
          return {...state, sortBy: action.payload};

        case "SEARCH":
          return {...state, searchInputValue: action.payload};

        case "PRICE_RANGE": 
          return {...state, priceRange: action.payload};

        case "SHOW_SNACKBAR":
            return { ...state, snackbar: {...state.snackbar, open: true, message: action.payload }  }
 
        case "HIDE_SNACKBAR":
          return { ...state, snackbar: {...state.snackbar, open: false }}

        default:
          return state;
      }
}