import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useWishlist } from "../../context/wishlist-context";
import { Product } from "../../context/context.types";
import { useWishlistCall } from "../../apiCalls/wishlist";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export function AddToWishlist({
  product,
}: {
  product: Product | undefined;
}): JSX.Element {
  const { authState } = useAuth();
  const { login } = authState;
  const navigate = useNavigate();
  const { wishlistState } = useWishlist();
  const findProductInWishlist = wishlistState?.wishlist.find(
    (item) => item._id === product?._id
  );
  const { addToWishlist } = useWishlistCall();
  return (
    <>
      {findProductInWishlist ? (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            width: "100%",
            margin: "0.1rem 0",
          }}
          onClick={() => navigate("/wishlist")}
        >
          Go To Wishlist
        </Button>
      ) : (
        <Button
          variant="outlined"
          startIcon={<FavoriteBorderIcon />}
          sx={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            width: "100%",
            margin: "0.1rem 0",
            border: "solid 1px #3d41d7",
          }}
          onClick={
            login ? () => addToWishlist(product) : () => navigate("/login")
          }
        >
          Add To Wishlist
        </Button>
      )}
    </>
  );
}
