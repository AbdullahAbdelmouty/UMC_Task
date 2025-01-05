import { createContext,useReducer } from "react";

export const UserContext = createContext();
export const userReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
        return {
            users: action.payload,
        };
        case "ADD_USER":
        return {
            users: [...state.users, action.payload],
        };
        case "DELETE_USER":
        return {
            users: state.users.filter((user) => user._id !== action.payload),
        };
        case "EDIT_USER":
        return {
            users: state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
            ),
        };
        default:
        return state;
    }
};

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { users: [] });
    console.log(state);
    return (
        <UserContext.Provider value={{...state,dispatch}}>
        {children}
        </UserContext.Provider>
    );
}

