import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { AxiosError } from "axios";
import { AuthContextType, ServerError } from "./context.types";
import {
  getTokenFromLocalStroage,
  setupAuthHeaderForServiceCalls,
} from "../utils";
import { getUser } from "../utils";
import { User } from "../utils/utils.types";
import { authReducer } from "../reducer/auth-reducer";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const { isUserLoggedIn, token: savedToken } = getTokenFromLocalStroage();

  const authInitialState = {
    login: isUserLoggedIn,
    token: savedToken,
    errorMessage: "",
    userInfo: {} as User,
    activeAddress: null,
  };

  const [spinner, setSpinner] = useState(false);
  const [authState, dispatchAuth] = useReducer(authReducer, authInitialState);
  setupAuthHeaderForServiceCalls(authState.token);
  // checkTokenExpiration();

  useEffect(() => {
    if (authState.login) {
      (async () => {
        const data = await getUser();
        if ("user" in data) {
          const { user }: { user: User } = data;
          const { address } = user;
          address.length > 0 &&
            dispatchAuth({
              type: "SET_ACTIVE_ADDRESS",
              payload: address[0]._id,
            });
          dispatchAuth({ type: "FETCH_USERINFO", payload: user });
        }
      })();
    }
  }, [authState.login]);

  async function loginUserWithCredentials(email: string, password: string) {
    setSpinner(true);
    try {
      const api = "https://blendmart-backend.onrender.com" + "/user/login";
      const response = await axios.post(api, { user: { email, password } });
      if (response.status === 200) {
        loginUser(response.data);
        setSpinner(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSpinner(false);
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          dispatchAuth({
            type: "LOGIN_ERRORMESSAGE",
            payload: serverError.response.data.message,
          });
        }
      }
    }
  }

  function loginUser({ token }: { token: string }) {
    dispatchAuth({ type: "SET_TOKEN", payload: token });
    dispatchAuth({ type: "IS_LOGIN", payload: true });
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token: `Bearer ${token}` })
    );
  }

  function logout() {
    dispatchAuth({ type: "IS_LOGIN", payload: false });
    dispatchAuth({ type: "SET_TOKEN", payload: null });
    localStorage?.removeItem("login");
  }

  // function checkTokenExpiration() {
  //   if (token) {
  //     const checkToken = jwt.decode(token) as JwtPayload;
  //     if (Date.now() >= checkToken.exp! * 1000) {
  //       return logout();
  //     }
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        authState,
        dispatchAuth,
        spinner,
        loginUserWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
