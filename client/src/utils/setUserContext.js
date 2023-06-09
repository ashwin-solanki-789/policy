import React, { useContext, useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import setToken from "./setToken";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = null;
const token = localStorage.getItem("token");

if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if (new Date() > expiresAt) {
        localStorage.removeItem("token");
    } else {
        user = decodedToken;
    }
} else {
    console.log("No Token Found");
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            setToken(action.payload.token);
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                user: action.payload.user,
            };
        case "LOGOUT":
            setToken();
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
            };
        default:
            throw new Error(`Unknow action type: ${action.type}`);
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user });

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
