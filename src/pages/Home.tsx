import { Box } from "@mui/material";
import { Carousel } from "../components";

export function Home(): JSX.Element {
  return (
    <Box sx={{ marginTop: { xs: "4rem", sm: "5rem" } }}>
      <Box sx={{ m: { xs: 1, sm: 2 } }}>
        <Carousel />
      </Box>
    </Box>
  );
}
