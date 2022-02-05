import {
  EmptyMessageBox,
  PriceDetail,
  AddressCard,
  AddressForm,
} from "../../components";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useAuth } from "../../context/auth-context";
import { Box, Typography, Stack, Button, Modal } from "@mui/material";
import React, { useState } from "react";

export function Address(): JSX.Element {
  const [addressOpen, setAddressOpen] = useState(false);
  const { authState } = useAuth();
  const { userInfo } = authState;
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
      <Modal
        open={addressOpen}
        onClose={() => setAddressOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <AddressForm setAddressOpen={setAddressOpen} />
        </div>
      </Modal>
      {userInfo.address?.length === 0 ? (
        <EmptyMessageBox
          message="Add an Address"
          icon={
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: { xs: "3rem", sm: "5rem" }, color: "#000000ab" }}
            />
          }
          includeBtn={false}
        />
      ) : (
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "text.primary",
            m: 2,
          }}
        >
          Address
        </Typography>
      )}

      <Box sx={{ width: "fit-content", margin: "auto", marginBottom: "1rem" }}>
        <Button
          variant="outlined"
          sx={{
            margin: "auto",
            width: "fit-content",
            fontWeight: "bold",
          }}
          onClick={() => setAddressOpen(true)}
        >
          Add New Address
        </Button>
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ width: { xs: "100%", sm: "80%" }, margin: "auto" }}
      >
        <Stack
          direction={
            userInfo.address?.length === 1 ? "column" : "column-reverse"
          }
          spacing={2}
          sx={{ width: "100%" }}
        >
          {userInfo.address?.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              setAddressOpen={setAddressOpen}
            />
          ))}
        </Stack>
        {userInfo.address?.length > 0 && (
          <PriceDetail
            btnText="continue with stripe"
            continueTransaction={true}
          />
        )}
      </Stack>
    </Box>
  );
}
