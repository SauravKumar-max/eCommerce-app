import { Stack, Button, Typography, TextField, Backdrop } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthCall } from "../../apiCalls/auth";
import { inputStyle, linkStyle, modalBoxStyle } from "../../mui-styles";
import CircularProgress from "@mui/material/CircularProgress";

export type AddressFormProps = {
  setAddressOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddressForm({ setAddressOpen }: AddressFormProps): JSX.Element {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const { loader, addAddress } = useAuthCall();

  useEffect(() => {
    if (name && phone && pincode && street && locality && city && state) {
      return setCheckForm(true);
    }
    return setCheckForm(false);
  }, [name, phone, pincode, street, locality, city, state]);

  function addDummyAddress() {
    setName("Guest");
    setPhone("07575454575");
    setPincode("404356");
    setLocality("Mumbai");
    setCity("Mumbai");
    setState("Maharashtra");
    setStreet(
      "5th Floor, Sahar Classic, Sahar Road/sahar Village, Opp P & T Colony"
    );
  }
  return (
    <Stack alignItems={"center"} direction={"column"} sx={modalBoxStyle}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "text.primary",
          fontSize: "1.2rem",
        }}
      >
        Add New Address
      </Typography>

      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        type="tel"
        size="small"
        required={true}
        sx={inputStyle}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Pin Code"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Houses no. / Street / Area"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Locality / Town"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="State"
        variant="outlined"
        type="text"
        size="small"
        required={true}
        sx={inputStyle}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Typography sx={linkStyle} onClick={addDummyAddress}>
        Fill Dummy Address
      </Typography>

      <Button
        variant="contained"
        disabled={!checkForm}
        sx={{ fontWeight: "bold", width: "100%", marginTop: 1 }}
        onClick={() =>
          addAddress(
            { name, phone, pincode, street, locality, city, state },
            setAddressOpen
          )
        }
      >
        Add Address
      </Button>
    </Stack>
  );
}
