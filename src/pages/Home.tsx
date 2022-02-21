import { Box, Stack, Typography, Button } from "@mui/material";
import { Carousel } from "../components";
import { useNavigate } from "react-router-dom";

export function Home(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: { xs: "4rem", sm: "5rem" } }}>
      <Box sx={{ m: { xs: 1, sm: 2 } }}>
        <Carousel />
      </Box>
      <Stack alignItems={"center"} sx={{ paddingBottom: "2rem" }}>
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: "center",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Shop On Top Brands
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            textAlign: "center",
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Upto 60% Off
        </Typography>
        <Button
          variant="outlined"
          sx={{ fontWeight: "bold", border: "solid 1px #3d41d7" }}
          onClick={() => navigate("/products")}
        >
          Shop Now
        </Button>
      </Stack>
    </Box>
  );
}
