import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context"
import { Loader } from "../components";

export function Login(){
    const { loginUserWithCredentials, spinner } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ checkForm, setCheckForm ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    

    function loginHandler(){
        loginUserWithCredentials( email, password );
    }

    useEffect(() => {
        if(email !== "" && password !== ""){
            return setCheckForm(true);
        } return setCheckForm(false);
    }, [ email, password])


    return(
        <div className="login-container">

            <h2>LogIn</h2>

            <input 
                className="text-input"
                value={email} 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />

            <div className="password-field">

                <input 
                    className="text-input" 
                    value={ password }
                    type={ showPassword ? "text" : "password" } 
                    placeholder="Password"
                    onChange={(e) => setPassword( e.target.value)} 
                />

                { showPassword && <i className="fas fa-eye" onClick={() => setShowPassword(false)}></i> }
                { !showPassword && <i className="fas fa-eye-slash" onClick={() => setShowPassword(true)}></i> }

            </div>

            <button 
                className={ checkForm ? "primary-btn" : "primary-btn disabled-btn" } 
                disabled={ !checkForm }
                onClick={ loginHandler }
            > 
                {spinner ? <Loader color={"#fff"}/> : "Login" }
            </button>
             <small>Don't have an account. <span onClick={() => navigate('/signup')}> SignUp </span> </small>
        </div>

    )
}

