import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const AuthContext = createContext();

export function AuthProvider({ children }){
    const { isUserLoggedIn, token: savedToken } = JSON.parse(localStorage?.getItem('login')) || { isUserLoggedIn: false, token: null };
    const [ login, setLogin ] = useState(isUserLoggedIn);
    const [ token, setToken ] = useState(savedToken);
    const [ spinner, setSpinner ] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();
   
    
    async function loginUserWithCredentials(email, password){
        setSpinner(true);
        try {
            const api = "https://ecommerce-backend.sauravkumar007.repl.co/user/login";
            const response = await axios.post(api, { user: { email, password }});
            if(response.status === 200){
                loginUser(response.data);
                setSpinner(false);
            }
        } catch (error) {
            console.log(error, "Incorrect username or password")
        }
    }

    function setupAuthHeaderForServiceCalls(token) {
        if (token) {
          return (axios.defaults.headers.common["Authorization"] = token);
        }
        delete axios.defaults.headers.common["Authorization"];
      }
    

    function loginUser({token}) {
        setToken(token);
        setLogin(true);
        localStorage?.setItem('login', JSON.stringify({ isUserLoggedIn: true, token }));
        navigate(state?.from ? state.from : "/");
    }

    function logout(){
        setLogin(false);
        setToken(null);
        localStorage?.removeItem('login');
    }

    setupAuthHeaderForServiceCalls(token);


    return(
        <AuthContext.Provider value={{ token, login, spinner, setLogin, setToken, loginUserWithCredentials, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext);
} 