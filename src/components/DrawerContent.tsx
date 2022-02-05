import { Box, Stack, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAuth } from "../context/auth-context";
import { Dispatch, SetStateAction } from "react";
import { useCart, useWishlist } from "../context";

export type DrawerProps = {
  setDrawer: Dispatch<SetStateAction<boolean>>;
};

export function DrawerContent({ setDrawer }: DrawerProps): JSX.Element {
  const { dispatchCart } = useCart();
  const { dispatchWishlist } = useWishlist();
  const { authState, logout } = useAuth();
  const { userInfo, login } = authState;
  const navigate = useNavigate();
  return (
    <Stack
      direction="column"
      justifyContent={"space-between"}
      sx={{ height: "100vh", padding: "1rem 2rem 1rem 1rem" }}
    >
      <Box>
        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#3d41d7",
          }}
        >
          MyMart
        </Typography>
        {login ? (
          <>
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
                fontSize: "1rem",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              {userInfo?.email}
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
              setDrawer(false);
            }}
          >
            Login
          </Button>
        )}

        <Stack direction={"column"} spacing={2} sx={{ marginTop: "1rem" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#3d41d7" : "black",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            })}
            onClick={() => setDrawer(false)}
          >
            <HomeIcon sx={{ marginRight: "0.7rem" }} /> Home
          </NavLink>
          <NavLink
            to="/products"
            style={({ isActive }) => ({
              color: isActive ? "#3d41d7" : "black",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            })}
            onClick={() => setDrawer(false)}
          >
            <StorefrontIcon sx={{ marginRight: "0.7rem" }} /> Product
          </NavLink>
          <NavLink
            to="/cart"
            style={({ isActive }) => ({
              color: isActive ? "#3d41d7" : "black",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            })}
            onClick={() => setDrawer(false)}
          >
            <ShoppingCartIcon sx={{ marginRight: "0.7rem" }} />{" "}
            <span>Cart</span>
          </NavLink>
          <NavLink
            to="/wishlist"
            style={({ isActive }) => ({
              color: isActive ? "#3d41d7" : "black",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
            })}
            onClick={() => setDrawer(false)}
          >
            <FavoriteIcon sx={{ marginRight: "0.7rem" }} />{" "}
            <span>Wishlist</span>
          </NavLink>
        </Stack>
      </Box>
      {login && (
        <Button
          variant="outlined"
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
            setDrawer(false);
          }}
        >
          Logout
        </Button>
      )}
    </Stack>
  );
}
