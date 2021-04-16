import { useProductDetails } from "../context/productpage-context";
import { Navbar } from "./index"
import { Link } from "react-router-dom";

export function WishList(){
    const { cartState, dispatchCart } = useProductDetails();
    const { itemsInWishList } = cartState;

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
                {itemsInWishList.map(item => {
                return(
                    <div className="wishlist" key={item.id}>
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
                                            cartState.itemsInCart.find(element => element.id === item.id) ? 
                                            null
                                            : 
                                            <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                                disabled={!item.inStock} 
                                                onClick={ () => {
                                                    dispatchCart({type: "ADD_TO_CART", payload: item});
                                                    dispatchCart({type: "REMOVE_FROM_WISHLIST", payload: item.id});
                                                    }}>
                                                <i className="fas fa-shopping-cart"></i>
                                                Move To Cart
                                            </button>
                                        }
                                    <button className="secondary-btn" onClick={() => dispatchCart({type: "REMOVE_FROM_WISHLIST", payload: item.id})}>Remove From Wishlist</button>
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
            { itemsInWishList.length === 0 ? <EmptyWishlist/> : <WishlistItem/> }
        </div>
    </>
    )    
            
}