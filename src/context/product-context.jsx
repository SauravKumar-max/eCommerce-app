import { createContext, useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";

const ProductList = createContext();

export function useProduct() {
    return useContext(ProductList);
}

export function ProductProvider({children}){
    const [ data, setData ] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get("/api/products");
                setData(response.data.products);
            } catch (error) {
                console.log(error);
            }
        })();
      }, []);
    

    const [state, dispatch] = useReducer(productReducer,  { showInventoryAll: true, showFastDeliveryOnly: false, sortBy: null, searchInputValue: "", priceRange: "1000", toggleFilter: false});

    return (
        <ProductList.Provider value={{ data, state, dispatch}}>
            {children}
        </ProductList.Provider>
    )
}


const productReducer = (state, action) => {
    switch (action.type) {
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

