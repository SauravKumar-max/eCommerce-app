import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type StatusCardProps = {
  message: string;
  btnText: string;
  color: string;
  icon: React.ReactNode;
};

export function PaymentStatusCard({
  message,
  btnText,
  color,
  icon,
}: StatusCardProps) {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      sx={{
        border: "solid 1px #adadad",
        boxShadow: 2,
        padding: "1rem",
        width: { xs: "93%", sm: "60%" },
        margin: "10rem auto",
      }}
    >
      {icon}
      <Typography
        sx={{
          color: { color },
          fontSize: { xs: "2rem", sm: "3rem" },
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
      <Button
        variant="outlined"
        sx={{ fontWeight: "bold", m: 1 }}
        onClick={
          btnText === "Try Again"
            ? () => navigate("/cart")
            : () => navigate("/products")
        }
      >
        {btnText}
      </Button>
    </Stack>
  );
}
