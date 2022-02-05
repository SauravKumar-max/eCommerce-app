import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProduct } from "../context/product-context";

export type SearchProps = {
  color: "primary" | "secondary" | undefined;
  textColor: string;
};

export function SearchInput({ color, textColor }: SearchProps): JSX.Element {
  const { productState, dispatchProduct } = useProduct();
  const { searchInputValue } = productState;
  function searchHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatchProduct({ type: "SEARCH", payload: e.target.value });
  }
  return (
    <>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search"
        variant="standard"
        color={color}
        focused
        value={searchInputValue}
        onChange={searchHandleChange}
        InputProps={{
          sx: {
            fontSize: { xs: 16, sm: 16 },
            color: textColor,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: { xs: "#3d41d7", sm: textColor } }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
