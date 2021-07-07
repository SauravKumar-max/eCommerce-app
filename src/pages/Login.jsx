import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context"

export function Login(){
    const { loginUserWithCredentials } = useAuth();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ checkForm, setCheckForm ] = useState(false);
    const navigate = useNavigate();


    function loginHandler(){
        loginUserWithCredentials( username, password );
    }

    useEffect(() => {
        if(username !== "" && password !== ""){
            return setCheckForm(true);
        } return setCheckForm(false);
    }, [ username, password])


    return(
        <div className="login-container">

            <h2>LogIn</h2>

            <input 
                className="text-input"
                value={username} 
                type="text" 
                placeholder="UserName" 
                onChange={(e) => setUsername(e.target.value)} 
            />

            <input 
                className="text-input" 
                value={password}
                type="password" 
                placeholder="Password"
                onChange={(e) => setPassword( e.target.value)} 
            />

            <button 
                className={ checkForm ? "primary-btn" : "primary-btn disabled-btn" } 
                disabled={ !checkForm }
                onClick={ loginHandler }
            > 
                Login 
            </button>
             <small>Don't have an account. <span onClick={() => navigate('/signup')}> SignUp </span> </small>
        </div>

    )
}

