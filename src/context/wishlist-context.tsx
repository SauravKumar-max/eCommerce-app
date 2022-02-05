import { createContext, useContext, useEffect, useReducer } from "react";
import { wishlistReducer } from "../reducer/wishlist-reducer";
import { useAuth } from "./auth-context";
import { Product, WishlistContextType, Props } from "./context.types";
import { getWishlist } from "../utils";

const WishlistContext = createContext<WishlistContextType>(
  {} as WishlistContextType
);

export function WishlistProvider({ children }: Props) {
  const wishlistInitialState = {
    wishlist: [] as Product[],
  };
  const { authState } = useAuth();
  const { login } = authState;

  const [wishlistState, dispatchWishlist] = useReducer(
    wishlistReducer,
    wishlistInitialState
  );

  useEffect(() => {
    (async () => {
      if (login) {
        const data = await getWishlist();
        if ("userWishlist" in data) {
          dispatchWishlist({
            type: "WISHLIST_DATA",
            payload: data.userWishlist,
          });
        }
      }
    })();
  }, [login]);

  return (
    <WishlistContext.Provider value={{ wishlistState, dispatchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
