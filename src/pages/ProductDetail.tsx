import { Box, Stack, Typography, Backdrop } from "@mui/material";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/product-context";
import StarIcon from "@mui/icons-material/Star";
import { AddToCart, AddToWishlist } from "../components";
import CircularProgress from "@mui/material/CircularProgress";

export function ProductDetail(): JSX.Element {
  const { id: productId } = useParams();
  const { products, loader } = useProduct();
  const product = products?.find((item) => item._id === productId);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        marginY: { xs: "4rem", md: "5rem" },
        marginX: "auto",
        width: "100%",
        maxWidth: "fit-content",
      }}
    >
      {loader ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Box
            component="img"
            src={product?.image}
            alt={product?.name}
            sx={{
              width: "100%",
              maxWidth: "26rem",
              margin: "auto",
            }}
          />

          <Stack direction="column" justifyContent="space-between">
            <Box component="div" sx={{ padding: "0 1rem" }}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {product?.brand}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  borderBottom: "solid 1px #adadad",
                  paddingBottom: "0.5rem",
                }}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                >
                  {product?.name}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    display: "flex",
                    color: "text.primary",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {product?.ratings}
                  <StarIcon
                    color="primary"
                    sx={{ fontSize: "1.2rem", marginX: "0.2rem" }}
                  />
                </Typography>
              </Stack>
              <Typography
                component="p"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginY: "0.4rem",
                }}
              >
                Rs. {product?.price}
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#000000ab",
                    textDecoration: "line-through",
                    margin: "0.8rem",
                  }}
                >
                  Rs.{product?.originalPrice}
                </span>
              </Typography>
              <Box
                component="div"
                sx={{ paddingX: "1rem", fontSize: "0.9rem" }}
              >
                <ul>
                  <li>
                    {product?.inStock ? (
                      <p style={{ color: "green" }}>In Stock</p>
                    ) : (
                      <p style={{ color: "red" }}>Out of Stock</p>
                    )}
                  </li>

                  <li>
                    {product?.fastDelivery ? (
                      <p style={{ color: "green" }}>Fast Delivery Avilable</p>
                    ) : (
                      <p style={{ color: "orange" }}>
                        Fast Delivery Not Avilable
                      </p>
                    )}
                  </li>
                </ul>
              </Box>
            </Box>

            <Stack direction="column" sx={{ margin: { xs: "1rem", md: "0" } }}>
              <AddToWishlist product={product} />
              <AddToCart
                product={product}
                fontSize={{ xs: "0.9rem", sm: "0.9rem" }}
              />
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
}
