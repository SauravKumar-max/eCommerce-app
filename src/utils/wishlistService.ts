import { ServerError } from "../context/context.types";
import axios, {AxiosError} from "axios";
import { Wishlist } from "./utils.types";

export async function getWishlist(): Promise<Wishlist | ServerError>{
    try{
        const api = "https://blendmart-backend.onrender.com/wishlists";
        const response = await axios.get<Wishlist>(api);
        return response.data;
    }catch(error){
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
