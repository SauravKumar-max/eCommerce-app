import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth-context";
import { useProduct } from "../context/product-context";
import { Loader } from "./Loader";
import { useNavigate } from "react-router";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";

export function ProfileCard(){
    const { dispatch } = useProduct();
    const { login, token, logout } = useAuth();
    const { dispatchCart } = useCart();
    const { dispatchWishlist } = useWishlist();
    const [ userData, setUserData ] = useState({});
    const [ spinner, setSpinner ] = useState(false);
    const navigate = useNavigate();

    function logoutAndClearDataInFrontend(){
        logout();
        navigate('/');
        dispatch({ type: "TOGGLEPROFILE"})
        dispatchCart({ type: "CART_DATA", payload: [] });
        dispatchWishlist({ type: "WISHLIST_DATA", payload: [] });
    }


    useEffect(() => {
        (async () => {
            setSpinner(true);
            if(token){
                try {
                    const api = "https://ecommerce-backend.sauravkumar007.repl.co/user";
                    const response = await axios.get(api);
                    const user = response.data.user;
                    setUserData( user );
                    setSpinner(false);
                } catch (error) {
                    console.log(error);
                }
            } 
        })()

        return () => setUserData({});
    }, [token])


    function UserInfo(){
        return(
            <>
            {
                spinner ? <div style={{ transform: "translateY(150%)" }}> <Loader color={"#3d41d7"} /> </div> : 
                <div className="user-info">
                    <h3> Hi, <span> { userData.name } </span></h3>
                    <p> { userData.email } </p>
                    <button 
                        className="secondary-btn" 
                        onClick={ logoutAndClearDataInFrontend }
                    > 
                        Logout 
                    </button>
                </div>
            }
            </>
        )
    }

    function AskUserLogin(){
        return(
            <div className="user-info">
                <h3>To access account</h3>
                <h3> Please LogIn.</h3>
                <button 
                        className="secondary-btn"
                        onClick={() => {
                            navigate('/login');
                            dispatch({ type: "TOGGLEPROFILE"});
                        }}
                    > 
                        Login or SignUp 
                    </button>
            </div>
        )
    }

    return(
        <div className="profile-container">
            <div 
                className="profile-backdrop" 
                onClick={() => dispatch({ type: "TOGGLEPROFILE"})}>
            </div>
            <div className="profile-card">
                { login ? <UserInfo/> : <AskUserLogin/> }
            </div>
        </div>
    )
}