import { createContext, useReducer } from "react";

export const EmployeeContext = createContext ()

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, isOpen: true }
        case 'CLOSE':
            return { ...state, isOpen: false }
        case 'ASSIGN':
            return { ...state, employee: action.payload, isOpen: false }
        case 'RESET':
            return { ...state, employee: null}
        default:
            return state
    }
}

export const EmployeeContextProvider = ({ children }) => {
    const [state, employeeDispatch] = useReducer (employeeReducer, {
        employee: null,
        isOpen: false
    })

    return (
        <EmployeeContext.Provider value={{...state, employeeDispatch}}>
            { children }
        </EmployeeContext.Provider>
    )
}