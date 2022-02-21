import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../components";

export function Home(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: { xs: "4rem", sm: "5rem" } }}>
      <Box sx={{ m: { xs: 1, sm: 2 } }}>
        <Carousel />{" "}
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
