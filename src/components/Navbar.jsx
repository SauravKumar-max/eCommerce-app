import { useProduct } from "../context/product-context"
import { useCart } from "../context/cart-context";
import { Link, NavLink } from "react-router-dom";
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
                <Link to="/" className="home-link" onClick={() => dispatch({type: "HIDE_TOAST", payload: "Hide after route changed!"})}> MyMart </Link>

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
                        <NavLink to="/products"
                            onClick={() => dispatch({type: "HIDE_TOAST", payload: "Hide after route changed!"})}>
                                Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className="nav-link" onClick={() => dispatch({type: "HIDE_TOAST", payload: "Hide after route changed!"})}>
                            Cart 
                            { cart.length > 0 && <span className="items-count">{ cart.length }</span> } 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/wishlist" className="nav-link" onClick={() => dispatch({type: "HIDE_TOAST", payload: "Hide after route changed!"})}>
                            WishList 
                            { wishlist.length > 0 && <span className="items-count">{ wishlist.length }</span> }
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}