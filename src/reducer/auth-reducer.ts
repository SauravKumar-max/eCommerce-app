import { AuthInitialState } from "../context/context.types";
import { AUTH_ACTIONTYPE } from "./reducer.types";

export const authReducer = (authState: AuthInitialState, action: AUTH_ACTIONTYPE ) => {
      
    switch (action.type) {
        case "SET_TOKEN": 
            return { ...authState, token: action.payload };
        
        case "IS_LOGIN": 
            return { ...authState, login: action.payload };

        case "LOGIN_ERRORMESSAGE": 
            return { ...authState, errorMesage: action.payload };

        case "FETCH_USERINFO":
            return { ...authState, userInfo: action.payload };

        case "ADD_ADDRESS":
            return { ...authState, userInfo: {...authState.userInfo, address: [ ...authState.userInfo.address, action.payload ]}};

        case "REMOVE_ADDRESS": 
            return { ...authState, userInfo: { ...authState.userInfo, address: authState.userInfo?.address.filter(address => address._id !== action.payload )}};
        
        case "SET_ACTIVE_ADDRESS": 
            return { ...authState, activeAddress: action.payload }
        default:
            return authState;
    }

} 