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
    const [ loader, setLoader ] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(api);
                setData(response.data.products);
                setLoader(false);
            } catch (error) {
                console.log(error);
            }
        })();
      }, []);

      const stateObject = { 
          showInventoryAll: true, 
          showFastDeliveryOnly: false, 
          sortBy: null, 
          searchInputValue: "", 
          priceRange: "1000", 
          toggleFilter: false, 
          item: null, 
          toast: {
                toShow: false,
                message: "toast message will be here." 
            },
           screenLoader: false, 
            
        }
    

    const [state, dispatch] = useReducer(productReducer, stateObject );

    return (
        <ProductList.Provider value={{ loader, api, data, state, dispatch}}>
            {children}
        </ProductList.Provider>
    )
}


