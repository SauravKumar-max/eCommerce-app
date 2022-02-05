import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Product } from "../context/context.types";
import { useCartCall } from "../apiCalls/cart";
import { useWishlist } from "../context";
import { ConfirmModal } from "./ConfirmModal";
import { useState } from "react";

export function CartCard({ product }: { product: Product }): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const { _id, brand, image, name, price, originalPrice, quantity } = product;
  const { loading, removeCartItem, moveToWishlist, increaseQty, decreaseQty } =
    useCartCall();
  const { wishlistState } = useWishlist();
  const findProductInWishlist = wishlistState.wishlist.find(
    (item) => item._id === _id
  );

  return (
    <Box
      sx={{
        border: "solid 1px #adadad",
        p: 1,
        marginBottom: "1rem",
        boxShadow: 2,
      }}
    >
      <ConfirmModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        product={product}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack
        spacing={1}
        direction="row"
        sx={{ borderBottom: "solid 1px #adadad", paddingBottom: 2 }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: { xs: "9rem", sm: "10rem" },
          }}
        />
        <Box sx={{ paddingRight: "2rem" }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "text.primary",
              paddingLeft: 1,
            }}
          >
            {brand}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              color: "text.primary",
              paddingLeft: 1,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "text.primary",
              paddingLeft: 1,
            }}
          >
            Rs. {price}
            <span
              style={{
                fontSize: "0.8rem",
                color: "#000000ab",
                textDecoration: "line-through",
                margin: "0.6rem",
              }}
            >
              Rs. {originalPrice}
            </span>
          </Typography>
          <Stack direction="row" alignItems="center">
            <IconButton
              aria-label="delete"
              disabled={quantity === 1 ? true : false}
              color="primary"
              onClick={() => decreaseQty(product)}
            >
              <IndeterminateCheckBoxIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "text.primary",
                padding: 1,
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              aria-label="delete"
              disabled={false}
              color="primary"
              onClick={() => increaseQty(product)}
            >
              <AddBoxIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1} paddingTop={1} alignItems="center">
        <Button sx={{ fontWeight: "bold" }} onClick={() => setOpenModal(true)}>
          Remove
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#adadad" }}
        />
        <Button
          sx={{ fontWeight: "bold" }}
          onClick={
            findProductInWishlist
              ? () => removeCartItem(product, "Moved to Wishlist")
              : () => moveToWishlist(product)
          }
        >
          Move To Wishlist
        </Button>
      </Stack>
    </Box>
  );
}
