import React, { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";
import {
  authContainerStyle,
  authHeaderStyle,
  buttonStyle,
  inputStyle,
  smallTextStyle,
  linkStyle,
  disabledButtonStyle,
  errorStyle,
} from "../mui-styles";
import {
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/auth-context";

export type LocationState = {
  from: {
    pathname: string;
  };
};

export function Login(): JSX.Element {
  const { authState, dispatchAuth, loginUserWithCredentials, spinner } =
    useAuth();
  const { login, errorMessage } = authState;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      return setCheckForm(true);
    }
    return setCheckForm(false);
  }, [email, password]);

  useEffect(() => {
    if (login) {
      const locationState = state as LocationState | null;
      navigate(locationState?.from ? locationState.from.pathname : "/");
    }
  }, [login, navigate, state]);

  function loginHandler() {
    loginUserWithCredentials(email, password);
  }

  function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (errorMessage) {
      dispatchAuth({ type: "LOGIN_ERRORMESSAGE", payload: "" });
    }
  }

  function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (errorMessage) {
      dispatchAuth({ type: "LOGIN_ERRORMESSAGE", payload: "" });
    }
  }

  return (
    <>
      <Stack direction="column" alignItems="center" sx={authContainerStyle}>
        <Typography sx={authHeaderStyle}>LogIn</Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          sx={inputStyle}
          value={email}
          required={true}
          onChange={emailChangeHandler}
        />
        <FormControl variant="outlined" sx={inputStyle}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={passwordChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errorMessage && (
          <Typography sx={errorStyle}>Error: {errorMessage}</Typography>
        )}
        <Button
          variant="contained"
          sx={checkForm ? buttonStyle : disabledButtonStyle}
          onClick={checkForm ? () => loginHandler() : () => null}
        >
          {spinner ? "Logging..." : "Login"}
        </Button>
        <Typography sx={smallTextStyle}>
          Don't have an account.
          <Typography
            component="span"
            sx={linkStyle}
            onClick={() => navigate("/signup")}
          >
            {" "}
            SignUp
          </Typography>
        </Typography>
        <Typography
          sx={linkStyle}
          onClick={() => {
            setEmail("guest123@gmail.com");
            setPassword("Guest@123");
          }}
        >
          Fill Guest Credentials
        </Typography>
      </Stack>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
