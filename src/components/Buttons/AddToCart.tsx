import * as React from "react";
import { Button, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useCartCall } from "../../apiCalls/cart";
import { useCart } from "../../context";
import { Product } from "../../context/context.types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export type Props = {
  product: Product | undefined;
  fontSize: {
    xs: string;
    sm: string;
  };
};

export function AddToCart({ product, fontSize }: Props): JSX.Element {
  const { loading, addtoCart } = useCartCall();
  const { cartState } = useCart();
  const { authState } = useAuth();
  const { login } = authState;
  const navigate = useNavigate();
  const findProductInCart = cartState.cart.find(
    (item) => item._id === product?._id
  );
  return (
    <>
      {findProductInCart ? (
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          sx={{
            fontSize: { ...fontSize },
            fontWeight: "bold",
            width: "100%",
            margin: "0.8rem 0",
            border: "solid 1px #3d41d7",
          }}
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </Button>
      ) : (
        <Button
          disabled={!product?.inStock || loading}
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress color="primary" size="1.2rem" />
            ) : (
              <ShoppingCartIcon
                sx={{
                  fontSize: 1,
                }}
              />
            )
          }
          sx={{
            fontSize: { ...fontSize },
            fontWeight: "bold",
            width: "100%",
            margin: "0.8rem 0",
          }}
          onClick={login ? () => addtoCart(product) : () => navigate("/login")}
        >
          {product?.inStock ? "Add To Cart" : "Out of Stock"}
        </Button>
      )}
    </>
  );
}
