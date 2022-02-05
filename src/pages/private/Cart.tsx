import { Box, Stack, Typography, Backdrop } from "@mui/material";
import { CartCard, EmptyMessageBox, PriceDetail } from "../../components";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useCart } from "../../context/cart-context";
import CircularProgress from "@mui/material/CircularProgress";
import { useProduct } from "../../context";

export function Cart(): JSX.Element {
  const { loader } = useProduct();
  const { cartState } = useCart();
  const { cart } = cartState;
  return (
    <Box
      sx={{
        marginY: "5rem",
        marginX: "auto",
        paddingX: "1rem",
        width: "100%",
        maxWidth: "70rem",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {cart.length === 0 ? (
        <EmptyMessageBox
          message="Cart Is Empty!"
          icon={
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: { xs: "3rem", sm: "5rem" }, color: "#000000ab" }}
            />
          }
          includeBtn={true}
        />
      ) : (
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "text.primary",
            textAlign: "center",
            m: 2,
          }}
        >
          Cart
        </Typography>
      )}

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}
      >
        <Stack direction="column-reverse" sx={{ width: "100%" }}>
          {cart.map((product) => (
            <CartCard key={product._id} product={product} />
          ))}
        </Stack>
        {cart.length > 0 && (
          <PriceDetail btnText="Place Order" continueTransaction={false} />
        )}
      </Stack>
    </Box>
  );
}
