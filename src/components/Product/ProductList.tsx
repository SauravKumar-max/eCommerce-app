import { Grid, Skeleton } from "@mui/material";
import { ProductCard, EmptyMessageBox } from "../index";
import { useProduct } from "../../context/product-context";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  getSortedData,
  getFilteredData,
  getSearchData,
  priceRangeFiltered,
} from "../../utils";

export function ProductList() {
  const { products, loader, productState } = useProduct();
  const skeleton = [...Array(10)];
  const {
    searchInputValue,
    priceRange,
    showFastDeliveryOnly,
    showInventoryAll,
    sortBy,
  } = productState;
  const searchResultData = getSearchData(products, searchInputValue);
  const priceRangeData = priceRangeFiltered(searchResultData, priceRange);
  const sortedData = getSortedData(priceRangeData, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showInventoryAll,
    showFastDeliveryOnly
  );

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
      {filteredData.length === 0 && !loader && (
        <EmptyMessageBox
          message="Product Not Found!"
          icon={
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: { xs: "3rem", sm: "5rem" }, color: "#000000ab" }}
            />
          }
          includeBtn={false}
        />
      )}
      {loader
        ? skeleton.map((_, i) => {
            return (
              <Grid key={i} item>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { xs: "11rem", sm: "15rem" },
                    height: { xs: "18.5rem", sm: "23.5rem" },
                  }}
                />
              </Grid>
            );
          })
        : filteredData.map((product) => {
            return (
              <Grid key={product._id} item>
                <ProductCard product={product} />
              </Grid>
            );
          })}
    </Grid>
  );
}
