import { useNavigate, useSearchParams } from "react-router-dom"
import SearchBar from "./inputs/SearchBar";
import { useEffect, useState } from "react";
import CandidateElement from "./CandidateElement";
import asc from '../assets/ascending.png'
import desc from '../assets/descending.png'
import excel from '../assets/excel.png'
import { useErrorContext } from "../hook/useErrorContext";
import axios from "axios";
import Loading from "./Loading";
import { useAuthContext } from "../hook/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ExcelOverlay from "./ExcelOverlay";

export default function Candidates() {
    const navigate = useNavigate ()
    const { errorDispatch } = useErrorContext ()
    const { user, employee, dispatch } = useAuthContext ()

    const [searchParams, setSearchParams] = useSearchParams ()
    const sortOptions = new Set(["candidateUploadDate", "TDC", "firstName", "location"])
    const sortOrderOptions = new Set(["asc", "desc"])

    const setURLParams = () => {
        let params = { ...Object.fromEntries(searchParams.entries()) };

        if (!searchParams.get ('sort') || !sortOptions.has(searchParams.get('sort')))
            params.sort = 'candidateUploadDate';

        if (!searchParams.get ('sortOrder') || !sortOrderOptions.has (searchParams.get('sortOrder')))
            params.sortOrder = 'asc';

        setSearchParams (params)
    }

    const [isLoading, setIsLoading] = useState (true)
    const [trigger, setTrigger] = useState (false)

    const [nResults, setNResults] = useState (0)
    const [candidates, setCandidates] = useState ([])
    const [sortedCandidates, setSortedCandidates] = useState ([])
    const [filteredCandidates, setFilteredCandidates] = useState ([])

    const [sortKey, setSortKey] = useState ("")
    const [sortOrder, setSortOrder] = useState ("")

    //Excel Overlay
    const [showExcelOverlay, setShowExcelOverlay] = useState (false)

    useEffect (()=> {
        setURLParams ()
    }, [searchParams, trigger])

    useEffect (
        ()=>{
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            const fetchData = async () => {
                try {
                    if (employee.userType.id != 2) {
                        await axios.get (import.meta.env.VITE_BACKEND_URL+"candidate/getByStatus/3", {withCredentials: true})
                        .then (response => {
                            if (response.data) {
                                setCandidates (response.data)
                                setIsLoading (false)
                            }
                            else {
                                errorDispatch ({ type: 'ERROR', payload: "Error fetching candidates" })
                            }
                        })
                        .catch (()=> { errorDispatch ({ type: 'ERROR', payload: "Error fetching candidates" }) })
                    }
                    else {
                        await axios.get (import.meta.env.VITE_BACKEND_URL+`candidate/getByStatusAndEmployee/${employee.synergizId}/3`, {withCredentials: true})
                        .then (response => {
                            if (response.data) {
                                setCandidates (response.data)
                                setIsLoading (false)
                            }
                            else {
                                errorDispatch ({ type: 'ERROR', payload: "Error fetching candidates" })
                            }
                        })
                        .catch (()=> { errorDispatch ({ type: 'ERROR', payload: "Error fetching candidates" }) })
                    }
                }
                catch (error) {
                    errorDispatch ({ type: 'ERROR', payload: "Error fetching candidates" })
                }
            }

            fetchData();
    }, [trigger])

    useEffect (()=>{
        const sortCandidates = () => {
            if (candidates.length > 0 && sortKey) {
                const sorted = [...candidates].sort ((a, b) => {
                    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
                    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                })
                setSortedCandidates (sorted)
                setFilteredCandidates (sorted)
            }
            else {
                setSortedCandidates (candidates)
                setFilteredCandidates (candidates)
            }

        }

        sortCandidates ();
        setNResults (candidates.length);
    }, [candidates, sortKey, sortOrder])


    const setSearchParamsFunc = (key, val) => {
        const params = { ...Object.fromEntries(searchParams.entries()) }
        params[key] = val
        setSearchParams(params)
    }

    const handleSearch = (value) => {
        const filteredCandidates = sortedCandidates.filter (candidate =>
            (candidate.firstName.toLowerCase()+" "+candidate.lastName.toLowerCase()).includes (value.toLowerCase())
        )
        setFilteredCandidates (filteredCandidates)
    }

    const handleExcelImport = () => {
        setShowExcelOverlay ((showExcelOverlay) => !showExcelOverlay)
    }

    if (isLoading)
        return <Loading />

    return (
            <AnimatePresence>
                {showExcelOverlay &&
                    <motion.div key="addOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ExcelOverlay setShowExcelOverlay={setShowExcelOverlay} trigger={trigger} setTrigger={setTrigger} />
                    </motion.div>
                }
                <div className="w-3/4 flex flex-col justify-start items-start min-h-full max-h-full pb-10 ">
                    <div className="flex w-full justify-between items-center font-bold my-2">
                        <div className="text-lg">Candidates List</div>
                        {employee.userType.id != 2 && <div className="flex justify-between items-center">
                        <button onClick={()=>{navigate("/candidates/add")}}
                            type="submit"
                            className="font-bold bg-primary text-black p-3 rounded">
                            Add Candidate
                        </button>
                        {/* <button className="p-2 ml-2 rounded-md bg-transparent border border-theme_passed">
                            <img src={excel} className="w-6 h-6" onClick={handleExcelImport} />
                        </button> */}
                        </div>}
                    </div>
                    <div className="flex w-full justify-between items-center my-2">
                        <div className="w-5/6 flex justify-center items-center mr-1">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <div className="w-1/6 h-9 flex ml-1">
                            <div className="w-1/4 border-theme_dark border-l border-t border-b rounded-l-md focus:outline-none focus:border-primary h-9 flex justify-center items-center bg-theme_gray cursor-pointer" onClick={()=>{
                                if (sortOrder === "asc")
                                {
                                    setSearchParamsFunc ('sortOrder','desc')
                                    setSortOrder("desc")
                                }
                                else
                                {
                                    setSearchParamsFunc ('sortOrder','asc')
                                    setSortOrder("asc")
                                }
                            }}>
                                {sortOrder === "asc" ? <img src={asc} className="h-6" /> : <img src={desc} className="h-6" />}
                            </div>
                            <select className="w-3/4 bg-theme_gray font-medium px-3 py-1 border-theme_dark border rounded-r-md focus:outline-none focus:border-primary h-9" onChange={(e)=>{
                                setSearchParamsFunc ('sort', e.target.value);
                                setSortKey (e.target.value)
                            }}>
                                <option value="candidateUploadDate">Upload Date</option>
                                <option value="TDC">TDC</option>
                                <option value="firstName">Name</option>
                                <option value="location">Location</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-between items-start bg-theme_gray drop-shadow-lg rounded-xl my-2">
                        <div className="flex justify-center items-center">
                            <div className="w-full flex justify-start items-center mx-3 mt-2">Open Applications: </div>
                            <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{nResults}</div>
                        </div>
                        <div className="flex flex-col w-full justify-center items-center px-3 mb-5">
                            {filteredCandidates.map ((item)=>{
                                return (
                                    <CandidateElement candidate={item} key={item.id} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </AnimatePresence>
    )
}
