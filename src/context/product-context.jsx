import { createContext, useContext } from "react";


const ProductList = createContext();

export function useProduct() {
    return useContext(ProductList);
}

