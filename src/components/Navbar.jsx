import { useProduct } from "../context/product-context"
import { useCart } from "../context/cart-context";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlist-context";
import { useLocation } from "react-router-dom";


export function Navbar(){
    const {state, dispatch} = useProduct();
    const { cartState } = useCart();
    const { wishlistState } = useWishlist();
    const { wishlist } = wishlistState;
    const { cart } = cartState;
    const location = useLocation();
    
    return(
        <div>
            <nav className="navbar">
                <Link to="/" className="home-link"> MyMart </Link>

                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <ul className="navbar-lists">
                    {location.pathname === "/products" ? <li>
                        <input onChange={(e)=> dispatch({type: "SEARCH", payload: e.target.value})} 
                            value={ state.searchInputValue }
                            className="search-box" 
                            type="text" 
                            placeholder="Search"/>
                    </li> 
                    : 
                    null 
                    }
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
                            WishList 
                            { wishlist.length > 0 && <span className="items-count">{ wishlist.length }</span> }
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}