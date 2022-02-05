import { Alert, Snackbar } from "@mui/material";
import { useProduct } from "../context/product-context";

export function SuccessSnackbar() {
  const { productState, dispatchProduct } = useProduct();
  const { open, message } = productState.snackbar;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatchProduct({ type: "HIDE_SNACKBAR" })}
    >
      <Alert
        severity="success"
        sx={{
          width: "100%",
          fontWeight: "bold",
          color: "white",
          fontSize: { xs: "0.8rem", sm: "1rem" },
          backgroundColor: "green",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
