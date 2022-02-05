import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type EmptyProps = {
  message: string;
  icon: React.ReactNode;
  includeBtn: boolean;
};

export function EmptyMessageBox({
  message,
  icon,
  includeBtn,
}: EmptyProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "2rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: { xs: "1.7rem", sm: "3rem" },
          fontWeight: "bold",
          color: "#000000ab",
        }}
      >
        {message}
      </Typography>
      <Typography>{icon}</Typography>
      {includeBtn && (
        <Button
          variant="outlined"
          sx={{ fontWeight: "bold", border: "solid 1px #3d41d7" }}
          onClick={() => navigate("/products")}
        >
          Back To Shopping
        </Button>
      )}
    </Box>
  );
}
