import { useCart } from "../../context/cart-context";
import { Navbar } from "../../components/index"
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/wishlist-context";
// import { useEffect } from "react";
import axios from "axios";
import { useProduct } from "../../context/product-context";

export function WishList(){
    const { dispatch } = useProduct();
    const { cartState, dispatchCart } = useCart();
    const { wishlistState, dispatchWishlist } = useWishlist();
    const { cart } = cartState;
    const { wishlist } = wishlistState;

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
    const deleteWishlistItem = async (product) => {
        dispatch({type: "LOAD_LOADER"});
        try {
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

    const moveAndDelete = async (product) => {
        dispatch({type: "LOAD_LOADER"});
        const cartApi = 'https://ecommerce-backend.sauravkumar007.repl.co/carts';
        try {
            deleteWishlistItem(product);
            await axios.post(cartApi, { _id: product._id, quantity: 1 });
            dispatchCart({ type: "ADD_TO_CART", payload: product});
            dispatch({type: "SHOW_TOAST", payload: `${product.name} Moved to Cart`});
            dispatch({type: "HIDE_LOADER"});
        } catch (error) {
            console.log(error)
        }
    }

    function EmptyWishlist(){
        return(
            <div className="empty">
                <h2 className="empty-message">Your Wishlist Is Empty!</h2>
                <p><i className="fas fa-heart-broken"></i></p>
                <Link to="/products" className="secondary-link"> Continue Shopping</Link>
            </div>
        )
    }

    function WishlistItem(){
        return(
            <>
                <h2 style={{color: "rgb(68, 69, 74)", fontSize: "2rem", margin: "0 1rem 1rem 1rem"}}>My Wishlist</h2>
                {wishlist.map(item => {
                return(
                    <div className="wishlist" key={item._id}>
                        <img src={item.image} alt={item.name}/>
                        <div className="cart-details">
                                <div>
                                    <p className="cart-name">{item.name}</p>
                                    <p className="cart-brand">{item.brand}</p>
                                </div>
                                {item.inStock ? null : <p style={{color: "red"}}> Out of Stock </p>}
                                <div className="cart-pricing">
                                    <p className="cart-price">Rs. {item.price}</p>
                                    <p className="cart-offer">({item.offer})</p>
                                </div>
                                <div className="cart-btns">
                                {
                                    cart.find(element => element._id === item._id) ? 
                                        <button className={ "text-icon-btn out-of-stock"}
                                            disabled={true} >
                                            <i className="fas fa-shopping-cart"></i>
                                            Already In Cart
                                        </button>
                                            : 
                                        <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                            disabled={!item.inStock} 
                                            onClick={ () => moveAndDelete(item)}>
                                            <i className="fas fa-shopping-cart"></i>
                                            {item.inStock ? "Move To Cart" : "Out of Stock"}
                                        </button>
                                }
                                    <button className="secondary-btn" 
                                        onClick={ () => deleteWishlistItem(item) }>
                                            Remove From Wishlist
                                    </button>
                                </div>
                                
                        </div>
                    </div>
                )
            })}
            </>
        )
    }

    
    return(
        <>
        <Navbar/>
        <div className="wishlist-container">
            { wishlist.length === 0 ? <EmptyWishlist/> : <WishlistItem/> }
        </div>
    </>
    )    
            
}