import { useCart } from "../context/cart-context"
import { useProduct } from "../context/product-context";
import axios from "axios";
import { useWishlist } from "../context/wishlist-context";


export function ConfirmRemoveModal({from}){
    const { dispatch } = useProduct();
    const { dispatchCart, cartState } = useCart();
    const { dispatchWishlist } = useWishlist();

    const deleteCartItem = async (product) => {
        dispatchCart({ type: "HIDE_CONFIRM_MODAL" });
        dispatch({type: "LOAD_LOADER"});
        try {
            const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
            await axios.delete(`${api}/${product._id}`);
            dispatchCart({ type: "DELETE_FROM_CART", payload: product._id });
            dispatch({type: "SHOW_TOAST", payload: `${product.name} successfully removed from Cart `});
            dispatch({type: "HIDE_LOADER"});
        } catch (error) {
            console.log(error);
        }
    }


    const deleteWishlistItem = async (product) => {
        dispatchCart({ type: "HIDE_CONFIRM_MODAL" });
        dispatch({type: "LOAD_LOADER"});
        try {
            const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
            const response = await axios.delete(`${api}/${product._id}`);
            if(response) {
                dispatch({type: "HIDE_LOADER"});
                dispatchWishlist({type: "DELETE_FROM_WISHLIST", payload: product._id});
                dispatch({type: "SHOW_TOAST", payload: `${product.name} successfully removed from Wishlist`});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="confirm-container">
            <div 
                onClick={() => dispatchCart({ type: "HIDE_CONFIRM_MODAL" })} 
                className="confirm-backdrop">
            </div>
            <div className="confirm-modal">
                <div className="modal-text">
                    <p>Are you sure you want to remove this item</p>
                    <button 
                        onClick={() => dispatchCart({ type: "HIDE_CONFIRM_MODAL" })}
                        className="close-btn"
                    >
                        X
                    </button>
                </div>
                <div className="confirm-modal-btns">
                    <button 
                        onClick={() => dispatchCart({ type: "HIDE_CONFIRM_MODAL" })}
                        className="secondary-btn"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={from === "cart" ? 
                            () => deleteCartItem(cartState.itemToRemove) : 
                            () => deleteWishlistItem(cartState.itemToRemove) }
                        style={{background: "#e61111"}}  
                        className="primary-btn"
                    > 
                        Remove 
                    </button>
                </div>
            </div>
        </div>
    )
}