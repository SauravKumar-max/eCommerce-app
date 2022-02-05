import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import { Product } from "../../context/context.types";
import { AddToCart, WishlistHeart } from "../index";
import { cardStyle, wishlistBtnStyle, cardMediaStyle } from "../../mui-styles";
import { useNavigate } from "react-router-dom";

export function ProductCard({ product }: { product: Product }): JSX.Element {
  const navigate = useNavigate();
  const { _id, brand, image, name, price, originalPrice } = product;
  return (
    <Card sx={cardStyle}>
      <Box component="div" sx={wishlistBtnStyle}>
        <WishlistHeart product={product} />
      </Box>
      <CardMedia
        sx={cardMediaStyle}
        component="img"
        src={image}
        alt={name}
        onClick={() => navigate(`/product/${_id}`)}
      />
      <Stack
        justifyContent="space-between"
        sx={{
          padding: "0 0.7rem",
          marginTop: "0.4rem",
          // height: { xs: "16vh", sm: "auto" },
        }}
      >
        <Box component="div">
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {name}
          </Typography>
          <Typography
            component="small"
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              fontWeight: "bold",
              color: "text.secondary",
            }}
          >
            {brand}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "0.7rem", sm: "0.9rem" },
              fontWeight: "bold",
              color: "black",
            }}
          >
            Rs. {price}{" "}
            <Typography
              component="span"
              sx={{
                color: "text.primary",
                fontSize: { xs: "0.6rem", sm: "0.8rem" },
                fontWeight: "bold",
                textDecoration: "line-through",
              }}
            >
              Rs. {originalPrice}
            </Typography>
          </Typography>
        </Box>
        <AddToCart
          product={product}
          fontSize={{ xs: "0.7rem", sm: "0.9rem" }}
        />
      </Stack>
    </Card>
  );
}
