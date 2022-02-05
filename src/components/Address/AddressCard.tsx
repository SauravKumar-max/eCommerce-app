import {
  Box,
  Typography,
  Stack,
  Button,
  Radio,
  Divider,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Dispatch, SetStateAction } from "react";
import { useAuthCall } from "../../apiCalls/auth";
import { useAuth } from "../../context";
import { Address } from "../../utils/utils.types";

export type AddressCardProps = {
  address: Address;
  setAddressOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddressCard({
  address,
  setAddressOpen,
}: AddressCardProps): JSX.Element {
  const { _id, name, city, phone, locality, pincode, state, street } = address;
  const { loader, removeAddress } = useAuthCall();
  const { authState, dispatchAuth } = useAuth();
  return (
    <Box sx={{ border: "solid 1px #adadad", boxShadow: 2, p: 1 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack key={_id} direction="row" alignItems="flex-start">
        <Radio
          value={_id}
          name="address-buttons"
          checked={authState.activeAddress === _id}
          onChange={() =>
            dispatchAuth({ type: "SET_ACTIVE_ADDRESS", payload: _id })
          }
        />
        <Box sx={{ p: 1, color: "text.primary" }}>
          <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>{phone}</Typography>
          <Typography>
            {street}, {locality}, {city}, {state} - {pincode}
          </Typography>
        </Box>
      </Stack>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderColor: "#adadad" }}
      />
      {/* <Stack direction={"row"} sx={{ paddingTop: 1 }}> */}
      {/* <Button
          sx={{ fontWeight: "bold", marginRight: 1 }}
          onClick={() => setAddressOpen(true)}
        >
          Edit
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#adadad" }}
        /> */}
      <Button
        sx={{ fontWeight: "bold", marginTop: 1 }}
        onClick={() => removeAddress(address._id)}
      >
        Remove
      </Button>
      {/* </Stack> */}
    </Box>
  );
}
