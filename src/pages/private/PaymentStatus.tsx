import { useEffect, useState } from "react";
import { EmptyMessageBox, PaymentStatusCard } from "../../components";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useCartCall } from "../../apiCalls/cart";

export function PaymentStatus(): JSX.Element {
  const { search } = useLocation();
  const [status, setStatus] = useState<string | null>("");
  const { removeAllFromCart } = useCartCall();

  useEffect(() => {
    if (search.includes("success")) {
      setStatus("success");
      removeAllFromCart();
    } else if (search.includes("failure")) {
      setStatus("failure");
    } else {
      setStatus(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Box sx={{ margin: "5rem auto" }}>
      {status === null && (
        <EmptyMessageBox
          message="No Recent Transaction"
          includeBtn={true}
          icon={
            <CreditCardIcon
              sx={{ fontSize: { xs: "3rem", sm: "5rem" }, color: "#000000ab" }}
            />
          }
        />
      )}

      {status === "success" && (
        <PaymentStatusCard
          message="Payment Successfull"
          btnText="Back To Shopping"
          color="green"
          icon={
            <CheckCircleIcon
              sx={{
                fontSize: { xs: "2rem", sm: "3rem" },
                color: "green",
                textAlign: "center",
              }}
            />
          }
        />
      )}

      {status === "failure" && (
        <PaymentStatusCard
          message="Payment Failed"
          btnText="Try Again"
          color="red"
          icon={
            <CancelIcon
              sx={{
                fontSize: { xs: "2rem", sm: "3rem" },
                color: "red",
                textAlign: "center",
              }}
            />
          }
        />
      )}
    </Box>
  );
}
