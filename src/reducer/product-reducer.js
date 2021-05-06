
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
 

        default:
          return state;
      }
}


