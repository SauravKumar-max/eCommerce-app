import { useCart } from "../context/cart-context";
import { Navbar } from "./index";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlist-context";
import axios from "axios";


export function Cart(){
    
    const { cartState, dispatchCart } = useCart();
    const { cart } = cartState;
    const { wishlistState, dispatchWishlist } = useWishlist();
    const { wishlist } = wishlistState;
    const reducer = ( acc, val ) => acc + parseInt(val.price, 10) * parseInt(val.quantity, 10); 
    const totalPrice = cart.reduce(reducer, 0);

    console.log({wishlist})

    const api = "https://ecommerce-backend.sauravkumar007.repl.co/carts";
    const deleteCartItem = async (id) => {
        try {
            await axios.delete(`${api}/${id}`);
            dispatchCart({ type: "DELETE_FROM_CART", payload: id });
        } catch (error) {
            console.log(error);
        }

    }

    const increaseQty = async (product) => {
        try {
            await axios.post(`${api}/${product._id}` , { quantity: product.quantity + 1 });
            dispatchCart({type: "INCREASE_QUANTITY", payload: product._id});
        } catch (error) {
            console.log(error);
        }
    }

    const decreaseQty = async (product) => {
        try {
            await axios.post(`${api}/${product._id}`, { quantity: product.quantity - 1 });
            dispatchCart({type: "DECREASE_QUANTITY", payload: product._id});
        } catch (error) {
            console.log(error);
        }
    }

    const addToWishlist = async (product) => {
        const wishApi = 'https://ecommerce-backend.sauravkumar007.repl.co/wishlists';
        try {
            axios.post(wishApi, {_id: product._id});
            dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: product });
        } catch (error) {
            console.log(error)
        }
    }



    function EmptyCart(){
        return (
            <div className="empty-cart">
                <h2 className="empty-message">Your Cart Is Empty!</h2>
                <p><i className="far fa-frown"></i></p>
                <Link to="/wishlist" className="secondary-link "> Add Items From Wishlist </Link>
            </div>
        )
    }

    function CartItems(){
        return(
            <>
            <h2 style={{textAlign: "center", margin: "5.5rem 1rem 0rem 1rem", fontSize: "2rem", color: "rgb(68, 69, 74)"}}>My Cart</h2>
            <div className="cart-container">
                <div className="cart-items">
                {cart.map((item) => {
                    return(
                        <div className="cart" key={item._id}>
                            <img className="cart-image" src={item.image} alt={item.name} />
                            <div className="cart-details">
                                <div>
                                    <p className="cart-name">{item.name}</p>
                                    <p className="cart-brand">{item.brand}</p>
                                </div>
                                
                                <div className="cart-pricing">
                                    <p className="cart-price">Rs. {item.price}</p>
                                    <p className="cart-offer">({item.offer})</p>
                                </div>
                                <div>
                                    <div className="cart-quantity">
                                        <p className="text-quantity">quantity: </p>
                                        {
                                            item.quantity === 1 ? 
                                            <button className="minus-btn" onClick={() => deleteCartItem(item._id)}><i className="far fa-trash-alt"></i></button> : 
                                            <button className="minus-btn" onClick={ () => decreaseQty(item)}><i className="fas fa-minus"></i></button>

                                        }
                                        <p className="quantity">{item.quantity}</p>
                                        <button className="plus-btn" onClick={() => increaseQty(item)}><i className="fas fa-plus"></i></button>

                                    </div>
                                    <div className="cart-btns">
                                        {
                                            wishlist.find(element => element._id === item._id) ? 
                                            <Link to="/wishlist" className="secondary-link">
                                                <i className="fas fa-arrow-right"></i> 
                                                Go to Wishlist
                                            </Link>
                                            : 
                                            <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                                disabled={!item.inStock} 
                                                onClick={ () => addToWishlist(item)}>
                                                <i className="far fa-shopping-heart"></i>
                                                Add To Wishlist
                                            </button>
                                        }
                                        <button className="secondary-btn" onClick={() => deleteCartItem(item._id)}><i className="far fa-trash-alt"></i>Remove From Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    )
                })}
                </div>

                <div className="receipt-box">
                    <p className="receipt-details"> Price Details({cart.length} items)</p>
                    <div className="total-mrp">
                        <p> Total MRP </p>
                        <p className="total-price"> Rs. {totalPrice}</p>
                    </div>
                    <div className="discount">
                        <p> Discount on MRP </p>
                        <p className="total-discount">{totalPrice > 200 ? "- Rs.100" : "Not Avilable"}</p>
                    </div>

                    <div className="total-amount">
                        <p>Total Amount</p>
                        <p>{ totalPrice > 200 ? totalPrice - 100 : totalPrice}</p>
                    </div>

                    <button className="primary-btn place-order-btn">Place Order</button>
                    
                </div>
            </div>
        </>
        )
    }

    return (
            <>
                <Navbar/>
                {cart.length === 0 ? <EmptyCart/> : <CartItems/>}
            </>
            
    )
}
