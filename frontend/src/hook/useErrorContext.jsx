import { useContext } from "react"
import { ErrorContext } from "../context/ErrorContext"

export const useErrorContext = () => {
    const context = useContext(ErrorContext)

    if (!context) {
        throw Error ('useContext must be used inside the provider')
    }

    return context
}