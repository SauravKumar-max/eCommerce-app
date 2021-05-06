import { useCart } from "../context/cart-context";
import { Link } from "react-router-dom";
import { useProduct } from "../context/product-context";
import { useWishlist } from "../context/wishlist-context";
import { AddToCartBtn } from "./index";
import axios from "axios";
 
export function ProductPage(){
    const { state, dispatch } = useProduct();
    const { item } = state;
    const { cartState } = useCart();
    const { cart } = cartState;
    const { wishlistState, dispatchWishlist } = useWishlist();
    const { wishlist } = wishlistState;
    const {_id, name, brand, image, price, ratings, offer, fastDelivery, inStock} = item;

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/wishlists";
    const addToWishlist = async (product) => {
        try {
            await axios.post(api, { _id: product._id});
            dispatchWishlist({type: "ADD_TO_WISHLIST", payload: product})
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
            <div className="product-container">
                <div className="product-modal">

                    <img className="product-img" src={image} alt={name} />
                    <button onClick={ () => dispatch({type: "HIDE_PRODUCT", payload: null})} className="close-btn">X</button>

                    <div className="product-details">
                        <p className="product-name">{name}</p>
                        <div className="value">
                            <p className="product-brand">{brand}</p>
                            <p className="product-rating">{ratings} <i className="fas fa-star"></i> | Rating</p>
                        </div>
                            
                        <div className="pricing">
                            <p className="product-price">Rs. {price}</p>
                            <p className="product-offer">({offer})</p>
                        </div>

                        <div className="other-details">
                            <ul>
                                <li>
                                    {
                                        inStock ? <p style={{color: "green"}}>In Stock</p> 
                                        : <p style={{color: "red"}}>Out of Stock</p>
                                    }
                                </li>

                                <li>
                                    {
                                        fastDelivery ? <p style={{color: "green"}}>Fast Delivery Avilable</p> 
                                        : <p style={{color: "orange"}}>Fast Delivery Not Avilable</p>
                                    }
                                </li>
                                
                            </ul>
                        </div>

                        <div className="product-btns">
                            
                            {
                                wishlist.find(element => element._id === _id) ?
                                    <Link to="/wishlist" className="primary-link">Go To Wishlist <i className="fas fa-arrow-right"></i></Link>
                                    :
                                    <button onClick={() => addToWishlist(item) }
                                        className="secondary-btn">
                                        <i className="far fa-heart"></i>
                                        Add To Wishlist
                                    </button>
                            }
                            
                            
                            { 
                                cart.find(element => element._id === _id) ? 
                                    <Link to="/cart"  onClick={() => dispatch({type: "HIDE_PRODUCT", payload: null})} className="secondary-link"><i className="fas fa-arrow-right"></i> Go to Cart</Link>
                                    : 
                                    <AddToCartBtn item={state.item}/>
                            }                            
                        </div>

                    </div>

                </div>
            </div>
    )
}

