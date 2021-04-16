import { Link } from "react-router-dom";
import { useProductDetails } from "../../context/productpage-context";

export function Navbar(){
    const { cartState } = useProductDetails();
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
                            { cartState.itemsInCart.length > 0 && <span className="items-count">{ cartState.itemsInCart.length }</span> }
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="nav-link">
                            Wishlist
                            { cartState.itemsInWishList.length > 0 && <span className="items-count">{ cartState.itemsInWishList.length }</span> }
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}