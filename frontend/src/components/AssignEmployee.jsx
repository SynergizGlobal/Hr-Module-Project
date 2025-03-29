import { useEffect, useState } from "react";
import SearchBar from "./inputs/SearchBar";
import axios from "axios";
import { useErrorContext } from "../hook/useErrorContext";
import EmployeeElement from "./EmployeeElement";
import { useEmployeeContext } from "../hook/useEmployeeContext";
import Loading from "./Loading";
import { useAuthContext } from "../hook/useAuthContext";

export default function AssignEmployee ({ setShowOverlay }) {

    const [employeeList, setEmployeeList] = useState (null)
    const [filteredEmployees, setFilteredEmployees] = useState (null)
    const [isLoading, setIsLoading] = useState (true)
    const { errorDispatch } = useErrorContext ()
    const { user, dispatch } = useAuthContext ()
    const { employeeDispatch, navigate } = useEmployeeContext ()

    const handleClick = (e) => {
        if (e.target.id === "overlayBg")
            employeeDispatch ({ type: 'CLOSE' });
    }
    const handleClose = () => {
    employeeDispatch({ type: 'CLOSE' });
    setShowOverlay(false);
};

    useEffect (()=>{
        if (!user || !user.email) {
            errorDispatch ({ type: 'ERROR', payload: "You must login again" })
            dispatch ({type: 'LOGOUT'})
            navigate ("/login")
        }
        const fetchData = async () => {
            await axios.get (import.meta.env.VITE_BACKEND_URL+"employee/getAll", {withCredentials: true})
            .then (response=>{
                if (response.data) {
                    setEmployeeList (response.data)
                    setFilteredEmployees (response.data)
                    setIsLoading (false)
                }
                else {
                    errorDispatch ({ type: 'ERROR', payload: 'Error fetching employee list' })
                }
            })
            .catch (()=>{ errorDispatch ({ type: 'ERROR', payload: 'Error fetching employee list' }) })
        }
        fetchData();
    },[])

    const handleSearch = (value) => {
        const filteredEmployees = employeeList.filter (employee =>
            employee.employeeDetails.name.toLowerCase().includes (value.toLowerCase())
        )
        setFilteredEmployees (filteredEmployees)
    }
    

    if (isLoading)
        return <Loading />

    return (
        <div id="overlayBg" className="w-full h-full flex justify-center items-center" onClick={handleClick} >
            <div id="overlayMain" className="bg-white h-11/12 w-3/4 flex justify-start items-center flex-col p-10 rounded-lg drop-shadow-2xl overflow-y-scroll">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
                    ✖
                </button>
                <SearchBar onSearch={handleSearch} />
                <div className="flex flex-col w-full justify-center items-center px-3 mb-5">
                    {filteredEmployees && filteredEmployees.map (employee => {
                        return <EmployeeElement key={employee.id} employee={employee} />
                    })}
                </div>
            </div>
        </div>
    )
}