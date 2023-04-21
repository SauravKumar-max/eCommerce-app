import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { productReducer } from "../reducer/product-reducer";
import {
  ProductContextType,
  Product,
  ProductInitialState,
  Props,
} from "./context.types";
import axios from "axios";

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export function ProductProvider({ children }: Props) {
  const productInitialState: ProductInitialState = {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: null,
    searchInputValue: "",
    priceRange: 6000,
    snackbar: {
      open: false,
      message: "toast message will be here.",
    },
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(true);
  const [productState, dispatchProduct] = useReducer(
    productReducer,
    productInitialState
  );

  useEffect(() => {
    (async function () {
      try {
        const api = process.env["REACT_APP_API_URL"] + "/products";
        const response = await axios.get(api);
        setProducts(response.data.products);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ProductContext.Provider
      value={{ loader, products, productState, dispatchProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
