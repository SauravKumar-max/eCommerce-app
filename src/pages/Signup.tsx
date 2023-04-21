import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, TextField, Stack, Button, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  authContainerStyle,
  authHeaderStyle,
  buttonStyle,
  inputStyle,
  smallTextStyle,
  linkStyle,
  disabledButtonStyle,
} from "../mui-styles";
import axios from "axios";
import { useAuth } from "../context/auth-context";

export type InputValue = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LocationState = {
  from: {
    pathname: string;
  };
};

export function Signup(): JSX.Element {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { authState, loginUserWithCredentials } = useAuth();
  const { login } = authState;
  const [checkForm, setCheckForm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [inputValue, setInputValue] = useState<InputValue>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (login) {
      const locationState = state as LocationState | null;
      navigate(locationState?.from ? locationState.from.pathname : "/");
      setSpinner(false);
    }
  }, [login, navigate, state]);

  useEffect(() => {
    const { name, username, email, password, confirmPassword } = inputValue;
    if (
      name !== "" &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        return setCheckForm(true);
      }
    }
    return setCheckForm(false);
  }, [inputValue]);

  async function signupHandler() {
    setSpinner(true);
    try {
      const api = "https://blendmart-backend.onrender.com" + "/user";
      const response = await axios.post(api, {
        name: inputValue.name.toUpperCase(),
        username: inputValue.username,
        email: inputValue.email,
        password: inputValue.password,
      });
      console.log(response);
      if (response.status === 200) {
        loginUserWithCredentials(inputValue.email, inputValue.password);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        sx={{ ...authContainerStyle, margin: "6rem auto 2rem auto" }}
      >
        <Typography sx={authHeaderStyle}>SignUp</Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          sx={inputStyle}
          value={inputValue.email}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, email: e.target.value }))
          }
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          sx={inputStyle}
          value={inputValue.name}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, name: e.target.value }))
          }
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          sx={inputStyle}
          value={inputValue.username}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, username: e.target.value }))
          }
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          sx={inputStyle}
          value={inputValue.password}
          onChange={(e) =>
            setInputValue((input) => ({ ...input, password: e.target.value }))
          }
        />
        <TextField
          id="outlined-basic"
          label="Re-Enter Password"
          variant="outlined"
          type="password"
          sx={inputStyle}
          value={inputValue.confirmPassword}
          onChange={(e) =>
            setInputValue((input) => ({
              ...input,
              confirmPassword: e.target.value,
            }))
          }
        />
        <Button
          variant="contained"
          sx={checkForm ? buttonStyle : disabledButtonStyle}
          onClick={checkForm ? () => signupHandler() : () => null}
        >
          {spinner ? "Singingup" : "Signup"}
        </Button>
        <Typography sx={smallTextStyle}>
          Already have an account.
          <Typography
            component="span"
            sx={linkStyle}
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </Typography>
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
