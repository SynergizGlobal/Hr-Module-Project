import { useContext } from "react"
import { EmployeeContext } from "../context/EmployeeContext"

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)

    if (!context) {
        throw Error ('useContext must be used inside the provider')
    }

    return context
}