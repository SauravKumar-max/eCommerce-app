import { cardMediaStyle, cardStyle } from "../mui-styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardMedia,
  Card,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { Product } from "../context/context.types";
import { useWishlistCall } from "../apiCalls/wishlist";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context";

export function WishlistCard({ product }: { product: Product }) {
  const { _id, name, image, inStock, price, originalPrice } = product;
  const { removewishlist, moveToCart } = useWishlistCall();
  const { cartState } = useCart();
  const findProductInCart = cartState.cart.find((item) => item._id === _id);
  const navigate = useNavigate();
  return (
    <Card sx={{ ...cardStyle, boxShadow: 2 }}>
      <CardMedia sx={cardMediaStyle} component="img" src={image} alt={name} />
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: 0,
          right: 0,
        }}
      >
        <IconButton
          aria-label="delete"
          color="inherit"
          onClick={() => removewishlist(product, "Removed from Wishlist")}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      {!inStock && (
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: { xs: "9.6rem", sm: "13.2rem" },
            left: 0,
            p: 0.5,
            width: "100%",
            backgroundColor: "#bbbbbbb5",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "0.7rem", sm: "0.9rem", color: "red" },
              fontWeight: "bold",
            }}
          >
            Out of Stock
          </Typography>
        </Box>
      )}

      <Box sx={{ p: 1 }}>
        <Typography
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, fontWeight: "bold" }}
        >
          Rs.{price}
          <Typography
            component="span"
            style={{
              fontSize: "0.7rem",
              color: "#000000ab",
              textDecoration: "line-through",
              margin: "0.5rem",
            }}
          >
            Rs.{originalPrice}
          </Typography>{" "}
        </Typography>
        <Divider sx={{ borderColor: "#adadad", my: 1 }} />
        {inStock ? (
          <Button
            sx={{
              width: "100%",
              fontWeight: "bold",
              fontSize: { xs: "0.7rem", sm: "0.9rem" },
            }}
            onClick={
              findProductInCart
                ? () => removewishlist(product, "Moved to Cart")
                : () => moveToCart(product)
            }
          >
            Move to Cart
          </Button>
        ) : (
          <Button
            sx={{
              width: "100%",
              fontWeight: "bold",
              fontSize: { xs: "0.7rem", sm: "0.9rem" },
            }}
            onClick={() => navigate("/")}
          >
            Back To Shopping
          </Button>
        )}
      </Box>
    </Card>
  );
}
