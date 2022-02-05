import React, { Dispatch, SetStateAction } from "react";
import {
  Stack,
  Radio,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { modalBoxStyle, textBold } from "../../mui-styles";
import { useProduct } from "../../context/product-context";

export function SortBox({
  setSortOpen,
}: {
  setSortOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { productState, dispatchProduct } = useProduct();
  const { sortBy } = productState;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchProduct({
      type: "SORT",
      payload: (event.target as HTMLInputElement).value,
    });
    setSortOpen(false);
  };
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
        Sort By
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          sx={{ color: "text.primary" }}
          value={sortBy}
          onChange={handleChange}
        >
          <FormControlLabel value="RATING" control={<Radio />} label="Rating" />
          <FormControlLabel
            value="HIGH_TO_LOW"
            control={<Radio />}
            label="Price - High to Low"
          />
          <FormControlLabel
            value="LOW_TO_HIGH"
            control={<Radio />}
            label="Price - Low to High"
          />
        </RadioGroup>
      </FormControl>
      <Button
        onClick={() => {
          dispatchProduct({ type: "SORT", payload: null });
          setSortOpen(false);
        }}
      >
        Clear
      </Button>
    </Stack>
  );
}
