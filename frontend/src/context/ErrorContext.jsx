import { createContext, useReducer } from "react";

export const ErrorContext = createContext ()

export const errorReducer = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return { error: action.payload }
        case 'NOERROR':
            return { error: null }
        default:
            return state
    }
}

export const ErrorContextProvider = ({ children }) => {
    const [state, errorDispatch] = useReducer (errorReducer, {
        error: null,
    })

    return (
        <ErrorContext.Provider value={{...state, errorDispatch}}>
            { children }
        </ErrorContext.Provider>
    )
}