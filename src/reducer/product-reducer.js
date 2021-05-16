
export const productReducer = (state, action) => {
    switch (action.type) {

      case "SHOW_PRODUCT":
            return { ...state, item: action.payload};

        case "HIDE_PRODUCT": 
            return {...state, item: null};

        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly
          });
        case "SORT":
          return {...state, sortBy: action.payload};

        case "SEARCH":
          return {...state, searchInputValue: action.payload};

        case "PRICE_RANGE": 
          return {...state, priceRange: action.payload};

        case "TOGGLE_FILTERS": 
            return {...state, toggleFilter: !state.toggleFilter};

        case "SHOW_TOAST":
            return { ...state, toast: {...state.toast, toShow: true, message: action.payload }  }
 
        case "HIDE_TOAST":
          return { ...state, toast: {...state.toast, toShow: false, message: "toast hidden"}}

        case "LOAD_LOADER":
          return { ...state, screenLoader: true };

        case "HIDE_LOADER":
          return { ...state, screenLoader: false };

        default:
          return state;
      }
}


