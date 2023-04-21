import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Address } from "../utils/utils.types";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth, useProduct } from "../context";

export function useAuthCall(){
    const [loader, setLoader] = useState(false);
    const { authState, dispatchAuth } = useAuth();
    const {dispatchProduct} = useProduct()
    const api = "https://blendmart-backend.onrender.com";
    
    async function addAddress(newAddress:Omit<Address, "_id">, setAddressOpen:Dispatch<SetStateAction<boolean>>){
        setLoader(true);
        try{
            const response = await axios.post(`${api}/user/address`, { newAddress })
            const address = response.data.address
            dispatchAuth({type: "ADD_ADDRESS", payload: address })
            dispatchAuth({ type: "SET_ACTIVE_ADDRESS", payload: address._id })
            setLoader(false)
            setAddressOpen(false);
            dispatchProduct({type: "SHOW_SNACKBAR", payload: "Added New Address"});
        }catch(error){
            console.log(error)
        }
    }

    async function removeAddress(addressId: string){
        dispatchAuth({type: "REMOVE_ADDRESS", payload: addressId });
        dispatchProduct({type: "SHOW_SNACKBAR", payload: "Address Removed"});
        authState.activeAddress === addressId && dispatchAuth({ type: "SET_ACTIVE_ADDRESS", payload: null})
        try{
            await axios.delete(`${api}/user/address`, { data: { addressId } })
        }catch(error){
            console.log(error)
        }
    }

    const stripePromise = loadStripe(
        "pk_test_51KGHlPSDlLcyGpiOJjdnKj6CHZG8ONke66WW50OoTVH1BEnFbReWXrxmVHWma3PPrOptFeaBDQt421epKgvTWWLt00PPYNdd1x"
      );
      const redirectToStripePayment = async () => {
        try {
          setLoader(true);
          const response = await axios.post(`${api}/checkout`);
          if (response.data.success) {
            let stripe = await stripePromise;
            await stripe?.redirectToCheckout({
              sessionId: response.data.id,
            });
            console.log({ stripe });
          }
        } catch (err) {
          console.error({ err });
        } finally {
            setLoader(false);
        }
      };

    return { loader, addAddress, removeAddress, redirectToStripePayment }
 
}