import { useProductDetails } from "../context/productpage-context";
import { Link } from "react-router-dom";
 
export function ProductPage(){
    const { cartState, dispatchCart } = useProductDetails();
    const {id, name, brand, image, price, ratings, offer, fastDelivery, inStock} = cartState.items;
    console.log(cartState.itemInCart);
    return(
            <div className="product-container">
                <div className="product-modal">

                    <img className="product-img" src={image} alt={name} />
                    <button onClick={ () => dispatchCart({type: "HIDE_PRODUCT", payload: null})} className="close-btn">X</button>

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
                                cartState.itemsInWishList.find(element => element.id === id) ?
                                    <Link to="/wishlist" className="primary-link">Go To Wishlist <i className="fas fa-arrow-right"></i></Link>
                                    :
                                    <button onClick={() => dispatchCart({type: "ADD_TO_WISHLIST", payload: cartState.items}) }
                                        className="secondary-btn">
                                        <i className="far fa-heart"></i>
                                        Add To Wishlist
                                    </button>
                            }
                            
                            
                            { 
                                cartState.itemsInCart.find(element => element.id === id) ? 
                                    <Link to="/cart"  onClick={() => dispatchCart({type: "HIDE_PRODUCT", payload: null})} className="secondary-link"><i className="fas fa-arrow-right"></i> Go to Cart</Link>
                                    : 
                                    <button className={ inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                        disabled={!inStock} 
                                        onClick={ () => dispatchCart({type: "ADD_TO_CART", payload: cartState.items})}>
                                        <i className="fas fa-shopping-cart"></i>
                                        Add To Cart
                                    </button>
                                    
                            }                            
                        </div>

                    </div>

                </div>
            </div>
    )
}

