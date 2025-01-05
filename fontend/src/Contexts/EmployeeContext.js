import { createContext,useReducer } from "react";

export const EmployeeContext = createContext();
export const categoryReducer = (state, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES":
        return {
            employees: action.payload,
        };
        case "ADD_EMPLOYEE":
        return {
            employees: [...state.employees, action.payload],
        };
        case "DELETE_EMPLOYEE":
        return {
            employees: state.employees.filter((Employee) => Employee._id !== action.payload),
        };
        case "EDIT_EMPLOYEE":
        return {
            employees: state.employees.map((Employee) =>
            Employee._id === action.payload._id ? action.payload : Employee
            ),
        };
        default:
        return state;
    }
};
export const EmployeeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, { employees: [] });
    console.log(state);
    return (
        <EmployeeContext.Provider value={{...state,dispatch}}>
        {children}
        </EmployeeContext.Provider>
    );
};