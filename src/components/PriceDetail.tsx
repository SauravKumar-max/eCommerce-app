import { Typography, Divider, Stack, Button, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useCart, useAuth } from "../context";
import { Product } from "../context/context.types";
import { textBold } from "../mui-styles";
import { useNavigate } from "react-router-dom";
import { useAuthCall } from "../apiCalls/auth";

export type PriceDetailProps = {
  btnText: string;
  continueTransaction: boolean;
};

export function PriceDetail({
  btnText,
  continueTransaction,
}: PriceDetailProps): JSX.Element {
  const { cartState } = useCart();
  const { cart } = cartState;
  const priceReducer = (acc: number, val: Product) =>
    acc + val.price * val.quantity;
  const totalPrice = cart.reduce(priceReducer, 0);
  const navigate = useNavigate();
  const { loader, redirectToStripePayment } = useAuthCall();
  const { authState } = useAuth();
  const { activeAddress } = authState;

  return (
    <Stack
      direction="column"
      sx={{
        border: "solid 1px #adadad",
        height: "fit-content",
        p: 2,
        width: "100%",
        maxWidth: { md: "22rem" },
        boxShadow: 2,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography fontSize="0.9rem" sx={{ marginBottom: 1 }}>
        Price Details({cart.length} items)
      </Typography>
      <Divider sx={{ borderColor: "#adadad" }} />
      <Stack direction="row" justifyContent="space-between" sx={{ marginY: 1 }}>
        <Typography sx={textBold}>Total MRP</Typography>
        <Typography sx={textBold}>Rs. {totalPrice}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={textBold}>Discount on MRP</Typography>
        <Typography sx={{ fontWeight: "bold", color: "red", marginBottom: 1 }}>
          - Rs.100
        </Typography>
      </Stack>
      <Divider sx={{ borderColor: "#adadad" }} />
      <Stack direction="row" justifyContent="space-between" sx={{ marginY: 1 }}>
        <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Total Amount
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Rs. {totalPrice - 100}
        </Typography>
      </Stack>
      <Button
        disabled={continueTransaction && activeAddress === null ? true : false}
        variant="contained"
        sx={{ fontWeight: "bold" }}
        onClick={
          continueTransaction
            ? () => redirectToStripePayment()
            : () => navigate("/address")
        }
      >
        {btnText}
      </Button>
    </Stack>
  );
}
