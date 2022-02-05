import { Box } from "@mui/material";
import { FilterSort, ProductList, SearchInput } from "../components";

export function Products(): JSX.Element {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        maxWidth: "85rem",
        margin: "5rem auto",
      }}
    >
      <FilterSort />
      <Box
        component="div"
        sx={{
          display: { xs: "flex", sm: "none" },
          width: "fit-content",
          margin: "1rem auto",
        }}
      >
        <SearchInput color="primary" textColor="black" />
      </Box>
      <ProductList />
    </Box>
  );
}
