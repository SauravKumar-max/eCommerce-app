import axios, {AxiosError} from "axios";
import { ServerError } from "../context/context.types";
import { User } from "./utils.types";

export function getTokenFromLocalStroage():{token: string|null; isUserLoggedIn: boolean}{
    const { isUserLoggedIn, token } = JSON.parse(localStorage.getItem('login') || "{}");
    if(isUserLoggedIn && token){
      return { token: token?.replace('Bearer', '') , isUserLoggedIn };
    }
    return { token: null , isUserLoggedIn: false };
}

export function removeTokenFromLocalStorage(){
  localStorage?.removeItem('login');
}

export function setupAuthHeaderForServiceCalls(token: string | null) {
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}

export async function getUser(): Promise<User | ServerError>{
  try{
    const api = process.env.REACT_APP_API_URL + '/user';
    const response = await axios.get(api);
    return response.data;
  }catch (error){
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
  }
  console.log(error)
  return { message: "something snapped!" };
  }
}