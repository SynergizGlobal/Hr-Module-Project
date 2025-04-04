import SyntrackLogo from "../../assets/syntrack.png"
import logoutButton from "../../assets/logout.png"
import NavbarButtons from "./NavbarButtons"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuthContext } from "../../hook/useAuthContext"
import { useErrorContext } from "../../hook/useErrorContext"
import { useEffect } from "react"

export default function Navbar ()
{
    const navigate = useNavigate ()
    const { user, employee, dispatch } = useAuthContext ()
    const { errorDispatch } = useErrorContext ()

    useEffect (() => {
        if (!user || !user.email) {
            dispatch ({type: 'LOGOUT'})
            navigate ("/login")
        }
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL+'logout');
            dispatch ({type: 'LOGOUT'})
            navigate ("/login")
        }
        catch {
            errorDispatch ({ type: 'ERROR', payload: "Error logging out" })
        }
    }

    return (
        <div className="flex w-full justify-center items-end bg-primary h-16 position-fixed">
            <div className="flex justify-between items-end w-3/4">
                <img src={SyntrackLogo}></img>

                {user && user.email && employee &&
                    <>
                        <div className="w-2/3 flex justify-center items-end">
                            <NavbarButtons />
                        </div>

                        <div className="flex justify-between items-end w-28">
                            <div className="flex flex-col justify-center items-start">
                                <div className="italic">
                                    Welcome,
                                </div>
                                <div id="hrName" className="font-bold">
                                    {employee.employeeDetails.name}
                                </div>
                            </div>
                            <div className="flex justify-start items-center w-7 h-7">
                                <img src={logoutButton} onClick={handleLogout} className="cursor-pointer" />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
