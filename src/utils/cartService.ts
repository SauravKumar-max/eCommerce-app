import { ServerError } from "../context/context.types";
import axios, {AxiosError} from "axios";
import { Cart } from "./utils.types";

export async function getCart(): Promise<Cart | ServerError>{
    try{
        const api = process.env.REACT_APP_API_URL + "/carts";
        const response = await axios.get<Cart>(api);
        return response.data;
    }catch(error){
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
              return serverError.response.data;
            }
        }
        console.log({error})
        return { message: "something snapped!" };
    }
}
