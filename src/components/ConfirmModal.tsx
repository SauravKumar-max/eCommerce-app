import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useCartCall } from "../apiCalls/cart";
import { Product } from "../context/context.types";

export type ConfirmProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  product: Product;
};

export function ConfirmModal({
  openModal,
  setOpenModal,
  product,
}: ConfirmProps): JSX.Element {
  const { loading, removeCartItem } = useCartCall();

  function removeHandler() {
    setOpenModal(false);
    removeCartItem(product, "Removed From Cart");
  }

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, md: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 1,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            sx={{ fontWeight: "bold" }}
          >
            Are you sure you want to remove this item
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
            <Button
              variant="outlined"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={removeHandler}
            >
              Remove
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
