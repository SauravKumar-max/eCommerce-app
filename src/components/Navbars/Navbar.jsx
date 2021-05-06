import { Link } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

export function Navbar(){
    const { cartState } = useCart();
    const { cart } = cartState;
    const { wishlistState } = useWishlist()
    const { wishlist } = wishlistState;
    return(
        <div>
            <nav className="navbar">
                <Link to="/" className="home-link">MyMart</Link>
                                
                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                                
                <ul className="navbar-lists">
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="nav-link">
                            Cart
                            { cart.length > 0 && <span className="items-count">{ cart.length }</span> }
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="nav-link">
                            Wishlist
                            { wishlist.length > 0 && <span className="items-count">{ wishlist.length }</span> }
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}