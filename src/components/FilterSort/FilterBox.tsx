import React, { Dispatch, SetStateAction, useState } from "react";
import { modalBoxStyle, textBold } from "../../mui-styles";
import { useProduct } from "../../context/product-context";
import {
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
} from "@mui/material";

export function FilterBox({
  setFilterOpen,
}: {
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { productState, dispatchProduct } = useProduct();
  const { showInventoryAll, showFastDeliveryOnly, priceRange } = productState;
  const [includeAllStock, setIncludeAllStock] = useState(showInventoryAll);
  const [includeFastDelivery, setDelivery] = useState(showFastDeliveryOnly);
  const [rangeValue, setRangeValue] = useState<number | number[]>(priceRange);

  function rangeHandler(event: Event, newValue: number | number[]) {
    setRangeValue(newValue as number);
  }

  function filterHandler() {
    dispatchProduct({ type: "TOGGLE_INVENTORY", payload: includeAllStock });
    dispatchProduct({ type: "TOGGLE_DELIVERY", payload: includeFastDelivery });
    dispatchProduct({ type: "PRICE_RANGE", payload: rangeValue });
    setFilterOpen(false);
  }
  return (
    <Stack direction="column" sx={modalBoxStyle}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          ...textBold,
          borderBottom: "solid 1px #3d41d7",
          paddingBottom: "0.2rem",
        }}
      >
        Filter By
      </Typography>
      <Typography
        id="modal-modal-title"
        component="p"
        sx={{ fontSize: "1.2rem", marginTop: "0.5rem", fontWeight: "bold" }}
      >
        Avability
      </Typography>
      <FormGroup sx={{ color: "text.primary" }}>
        <FormControlLabel
          checked={includeAllStock}
          onChange={() => setIncludeAllStock((value) => !value)}
          control={<Checkbox />}
          label="Include Out of Stock"
        />
        <FormControlLabel
          checked={includeFastDelivery}
          onChange={() => setDelivery((value) => !value)}
          control={<Checkbox />}
          label="Fast Delivery Only"
        />
      </FormGroup>
      <Typography
        component="p"
        sx={{ fontSize: "1.2rem", marginTop: "0.5rem", fontWeight: "bold" }}
      >
        Price Range
      </Typography>
      <Slider
        size="small"
        value={rangeValue}
        aria-label="Price Range"
        valueLabelDisplay="auto"
        marks
        step={500}
        min={500}
        max={8000}
        onChange={rangeHandler}
      />
      <Button
        variant="contained"
        sx={{ fontWeight: "bold", marginTop: 1 }}
        onClick={filterHandler}
      >
        Filter
      </Button>
    </Stack>
  );
}
