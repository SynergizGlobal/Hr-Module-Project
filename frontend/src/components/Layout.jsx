// Used to wrap the job route with Employee Context :)

import { Outlet } from "react-router-dom"
import { EmployeeContextProvider } from "../context/EmployeeContext"

const Layout = () => {
    return <EmployeeContextProvider>
        <Outlet />
    </EmployeeContextProvider>
}

export default Layout;