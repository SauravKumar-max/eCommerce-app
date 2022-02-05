import { Grid, Box, Typography } from "@mui/material";
import { EmptyMessageBox, WishlistCard } from "../../components";
import { useWishlist } from "../../context/wishlist-context";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

export function Wishlist() {
  const { wishlistState } = useWishlist();
  const { wishlist } = wishlistState;
  return (
    <Box sx={{ margin: "5rem auto", width: "100%", maxWidth: "85rem" }}>
      {wishlist.length === 0 ? (
        <EmptyMessageBox
          message="Wishlist is Empty!"
          icon={
            <HeartBrokenIcon
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
          Wishlist
        </Typography>
      )}
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
        {wishlistState.wishlist.map((product) => (
          <Grid key={product._id} item>
            <WishlistCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
