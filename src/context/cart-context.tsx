import { createContext, useContext, useEffect, useReducer } from "react";
import { CartContextType, Product } from "./context.types";
import { cartReducer } from "../reducer/cart-reducer";
import { useAuth } from "./auth-context";
import { getCart } from "../utils";

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: JSX.Element }) {
  const cartInitialState = {
    cart: [] as Product[],
  };
  const { authState } = useAuth();
  const { login } = authState;
  const [cartState, dispatchCart] = useReducer(cartReducer, cartInitialState);

  useEffect(() => {
    (async () => {
      if (login) {
        const data = await getCart();
        if ("userCart" in data) {
          dispatchCart({
            type: "CART_DATA",
            payload: data.userCart,
          });
        }
      }
    })();
  }, [login]);

  return (
    <CartContext.Provider value={{ cartState, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
