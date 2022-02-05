import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { ProfileCard, SearchInput, DrawerContent } from "./index";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  Popover,
} from "@mui/material";
import { useWishlist } from "../context/wishlist-context";
import { useCart } from "../context/cart-context";

export function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    wishlistState: { wishlist },
  } = useWishlist();
  const {
    cartState: { cart },
  } = useCart();
  const [drawer, setDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleProfileOpen(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleProfileClose() {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h5"
            component="a"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "incline",
            }}
            onClick={() => navigate("/")}
          >
            BlendMart
          </Typography>

          <Box
            sx={{
              width: 300,
              maxWidth: "100%",
              marginRight: 4,
              marginLeft: 4,
              display: { xs: "none", sm: "block" },
            }}
          >
            {pathname === "/products" && (
              <SearchInput color="secondary" textColor="white" />
            )}
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton
              size="large"
              aria-label="products"
              color="inherit"
              sx={{ marginRight: 4 }}
              onClick={() => navigate("/products")}
            >
              <StorefrontIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
              sx={{ marginRight: 4 }}
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ marginRight: 4 }}
              onClick={() => navigate("/wishlist")}
            >
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileOpen}
              color="inherit"
              sx={{ marginRight: 1 }}
            >
              <AccountCircle sx={{ fontSize: 26 }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ marginTop: 2 }}
            >
              <ProfileCard handleProfileClose={handleProfileClose} />
            </Popover>
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{
              display: { xs: "block", sm: "none" },
            }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <DrawerContent setDrawer={setDrawer} />
      </Drawer>
    </Box>
  );
}
