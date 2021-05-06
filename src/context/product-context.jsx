import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { productReducer } from "../reducer/product-reducer";
import axios from "axios";

const ProductList = createContext();

export function useProduct() {
    return useContext(ProductList);
}

export function ProductProvider({children}){
    const api = "https://ecommerce-backend.sauravkumar007.repl.co/products";
    const [ data, setData ] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(api);
                setData(response.data.products);
            } catch (error) {
                console.log(error);
            }
        })();
      }, []);
    

    const [state, dispatch] = useReducer(productReducer,  { showInventoryAll: true, showFastDeliveryOnly: false, sortBy: null, searchInputValue: "", priceRange: "1000", toggleFilter: false, item: null});

    return (
        <ProductList.Provider value={{ api, data, state, dispatch}}>
            {children}
        </ProductList.Provider>
    )
}


