import { useProduct } from "../context/product-context";
import { useEffect } from "react"

export function Toast(){
const { state, dispatch } = useProduct();

useEffect(() => {
    let toastTimer;
    if(state.toast.toShow){
      toastTimer = setTimeout(() => {
        dispatch({type: "HIDE_TOAST"});
      }, 3000)
    }

    return () => {
      clearTimeout(toastTimer);
    }
  })

    return(
        <div className="toast-container">
            <div className="alert success">
                <i className="fas fa-check-circle"></i>
                <p>{ state.toast.message }</p>
            </div>
        </div>
    )
}