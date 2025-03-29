import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../hook/useAuthContext"

export default function NavbarButtons () {
    const { employee } = useAuthContext ()

    return (
        <>
            {employee.userType.id !=2 && <NavLink to={"/dashboard"} className="flex justify-center items-center rounded-t-lg w-1/4 h-12 bg-tertiary font-medium">Dashboard</NavLink>}
            <NavLink to={"/candidates"} className="flex justify-center items-center rounded-t-lg w-1/4 h-12 bg-tertiary font-medium">Candidates</NavLink>
            {employee.userType.id !=2 && <NavLink to={"/jobs"} className="flex justify-center items-center rounded-t-lg w-1/4 h-12 bg-tertiary font-medium">Jobs</NavLink>}
            {<NavLink to={"/resource_database"} className="flex justify-center items-center rounded-t-lg w-1/4 h-12 bg-tertiary font-medium">Resource Database</NavLink>}
        </>
    )
}