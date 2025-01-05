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
    const [state,dispatch] = useReducer(authReducer,{user:null});
    const [user,setUser] = useState(null);
    // useEffect(() => {
    //     // get user from local storage
    //     const user = localStorage.getItem('user');
    //     if(user){
    //         dispatch({type:'LOGIN',payload:JSON.parse(user)});
    //     }
    // },[])
    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};