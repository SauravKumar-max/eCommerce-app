import { Fab } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useWishlist } from "../../context/wishlist-context";
import { Product } from "../../context/context.types";
import { useWishlistCall } from "../../apiCalls/wishlist";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export function WishlistHeart({
  product,
}: {
  product: Product | undefined;
}): JSX.Element {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { login } = authState;
  const { wishlistState } = useWishlist();
  const { addToWishlist, removewishlist } = useWishlistCall();
  const findProductInWishlist = wishlistState?.wishlist.find(
    (item) => item._id === product?._id
  );

  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="wishlist"
      sx={{
        width: { xs: "2.1rem", sm: "2.1rem" },
        height: { xs: "1.9rem", sm: "2.1rem" },
        borderRadius: "50%",
      }}
    >
      {findProductInWishlist ? (
        <FavoriteIcon
          color="error"
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
          onClick={() => removewishlist(product, "Removed from Wishlist")}
        />
      ) : (
        <FavoriteBorderIcon
          color="error"
          sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}
          onClick={
            login ? () => addToWishlist(product) : () => navigate("/login")
          }
        />
      )}
    </Fab>
  );
}
