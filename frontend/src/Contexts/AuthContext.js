import { createContext, useEffect } from "react";
import  { useReducer,useState } from "react";
// create context
export const AuthContext = createContext();
// create reducer function
export const authReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user:action.payload
            }
        case 'LOGOUT':
            return {
                user:null
            }
        default:
            return state
    }
}
// export context
export const AuthContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(authReducer,{user:JSON.parse(localStorage.getItem('user'))});
    console.log(state,"state");
    // save user to local storage
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(state.user));
    },[state.user])
    // if user refreshes the page, get the user from local storage
    useEffect(() => {
        const user = localStorage.getItem('user');        
        if(user){
            dispatch({type:'LOGIN',payload:JSON.parse(user)});
        }
    },[])
    
    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};