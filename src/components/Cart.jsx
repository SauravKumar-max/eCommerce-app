import { useProductDetails } from "../context/productpage-context";
import { Navbar } from "./index";

export function Cart(){
    const { cartState, dispatchCart, setRoutes } = useProductDetails();
    const { itemsInCart } = cartState;
    const reducer = ( acc, val ) => acc + parseInt(val.price) * val.quantity; 
    const totalPrice = itemsInCart.reduce(reducer, 0);
    console.log(totalPrice)

    function EmptyCart(){
        return (
            <div className="empty-cart">
                <h2 className="empty-message">Your Cart Is Empty!</h2>
                <p><i className="far fa-frown"></i></p>
                <button className="secondary-btn "> Add Items From Wishlist </button>
            </div>
        )
    }

    function CartItems(){
        return(
            <>
            <h2 style={{textAlign: "center", margin: "5.5rem 1rem 0rem 1rem", fontSize: "2rem", color: "rgb(68, 69, 74)"}}>My Cart</h2>
            <div className="cart-container">
                <div className="cart-items">
                {itemsInCart.map((item) => {
                    return(
                        <div className="cart" key={item.id}>
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
                                        <p className="text-quantity">quantiy: </p>
                                        {
                                            item.quantity === 1 ? 
                                            <button className="minus-btn" onClick={() => dispatchCart({type: "REMOVE_FROM_CART", payload: item.id})}><i className="far fa-trash-alt"></i></button> : 
                                            <button className="minus-btn" onClick={ () => dispatchCart({type: "DECREASE_QUANTITY", payload: item.id})}><i className="fas fa-minus"></i></button>

                                        }
                                        <p className="quantity">{item.quantity}</p>
                                        <button className="plus-btn" onClick={() => dispatchCart({type: "INCREASE_QUANTITY", payload: item.id})}><i className="fas fa-plus"></i></button>
                                    </div>
                                    <div className="cart-btns">
                                        {
                                            cartState.itemsInWishList.find(element => element.id === item.id) ? 
                                            <button onClick={() => setRoutes("wishlist")}
                                                className="secondary-btn">
                                                <i className="fas fa-arrow-right"></i>
                                                Go to Wishlist
                                            </button>
                                            : 
                                            <button className={ item.inStock ? "text-icon-btn" : "text-icon-btn out-of-stock"}
                                                disabled={!item.inStock} 
                                                onClick={ () => dispatchCart({type: "ADD_TO_WISHLIST", payload: item})}>
                                                <i className="far fa-shopping-heart"></i>
                                                Add To Wishlist
                                            </button>
                                        }
                                        <button className="secondary-btn" onClick={() => dispatchCart({type: "REMOVE_FROM_CART", payload: item.id})}><i className="far fa-trash-alt"></i>Remove From Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    )
                })}
                </div>

                <div className="receipt-box">
                    <p className="receipt-details"> Price Details({itemsInCart.length} items)</p>
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
                {itemsInCart.length === 0 ? <EmptyCart/> : <CartItems/>}
            </>
            
    )
}