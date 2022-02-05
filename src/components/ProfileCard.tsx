import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useCart, useWishlist } from "../context";

export type ProfileProps = {
  handleProfileClose: () => void;
};

export function ProfileCard({ handleProfileClose }: ProfileProps): JSX.Element {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { login, userInfo } = authState;
  const { dispatchCart } = useCart();
  const { dispatchWishlist } = useWishlist();
  return (
    <Box sx={{ p: 2 }}>
      {login ? (
        <Box>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            Hi, {userInfo?.name}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {userInfo?.email}
          </Typography>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontWeight: "bold",
              marginTop: 1,
              width: "100%",
              border: "solid 1px #3d41d7",
            }}
            onClick={() => {
              logout();
              dispatchCart({ type: "CART_DATA", payload: [] });
              dispatchWishlist({ type: "WISHLIST_DATA", payload: [] });
              handleProfileClose();
            }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            To access account <br /> Please LogIn.
          </Typography>
          <Button
            variant="contained"
            size="medium"
            sx={{ fontWeight: "bold", marginTop: 1, width: "100%" }}
            onClick={() => {
              navigate("/login");
              handleProfileClose();
            }}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
}
