import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./inputs/SearchBar";
import JobElement from "./JobElement";
import asc from '../assets/ascending.png';
import desc from '../assets/descending.png';
import axios from "axios";
import { useErrorContext } from "../hook/useErrorContext";
import Loading from "./Loading";
import { useAuthContext } from "../hook/useAuthContext";

export default function Jobs() {
    const navigate = useNavigate()
    const { user, dispatch } = useAuthContext()
    const { errorDispatch } = useErrorContext()

    const [searchParams, setSearchParams] = useSearchParams()
    const sortOptions = new Set(["uploadDate", "tdc", "location"])
    const sortOrderOptions = new Set(["asc", "desc"])
    const filterStatusOptions = new Set([1, 2, 3, 4])

    const setURLParams = () => {
        let params = { ...Object.fromEntries(searchParams.entries()) }

        if (!searchParams.get('sort') || !sortOptions.has(searchParams.get('sort')))
            params.sort = 'uploadDate'

        if (!searchParams.get('sortOrder') || !sortOrderOptions.has(searchParams.get('sortOrder')))
            params.sortOrder = 'asc'

        const jobStatus = parseInt(searchParams.get('jobStatus'), 10);
        if (!jobStatus || !filterStatusOptions.has(jobStatus))
            params.jobStatus = 1

        setSearchParams(params);
    };

    const [isLoading, setIsLoading] = useState(true);

    const [openCount, setOpenCount] = useState(0)
    const [closedCount, setClosedCount] = useState(0)
    const [holdCount, setHoldCount] = useState(0)
    const [filledCount, setFilledCount] = useState(0)

    const [jobs, setJobs] = useState([]);
    const [sortedJobs, setSortedJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])

    const [sortKey, setSortKey] = useState("uploadDate");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        setURLParams();
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.email) {
                errorDispatch({ type: 'ERROR', payload: "You must login again" })
                dispatch({ type: 'LOGOUT' })
                navigate("/login")
            }
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "job/getAll", { withCredentials: true });
                if (response.data) {
                    setJobs(response.data);
                    setIsLoading(false)
                } else {
                    errorDispatch({ type: 'ERROR', payload: "Error fetching jobs" });
                }
            } catch {
                errorDispatch({ type: 'ERROR', payload: "Error fetching jobs" });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const sortJobs = () => {
            if (jobs.length > 0 && sortKey) {
                const sorted = [...jobs].sort((a, b) => {
                    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
                    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });

                setSortedJobs(sorted);
                setFilteredJobs(sorted);
            }
        };

        sortJobs();
    }, [jobs, sortKey, sortOrder]);

    useEffect(() => {
        const countJobStatus = (jobs) => {
            return jobs.reduce((acc, job) => {
                const status = job.jobStatus?.id;
                if (status) {
                    acc[status] = (acc[status] || 0) + 1;
                }
                return acc;
            }, { 1: 0, 2: 0, 3: 0, 4: 0 });
        };

        const jobStatusCounts = countJobStatus(jobs);
        setOpenCount(jobStatusCounts[1]);
        setClosedCount(jobStatusCounts[2]);
        setHoldCount(jobStatusCounts[3]);
        setFilledCount(jobStatusCounts[4]);
    }, [jobs]);

    const setSearchParamsFunc = (key, val) => {
        const params = { ...Object.fromEntries(searchParams.entries()) };
        params[key] = val;
        setSearchParams(params);
    };

    const handleSearch = (value) => {
        const filteredJobs = sortedJobs.filter(job =>
            job.jobTitle.name.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredJobs(filteredJobs)
    }

    if (isLoading)
        return <Loading />

    return (
        <div className="w-3/4 flex flex-col justify-start items-start min-h-full max-h-full pb-10 ">
            <div className="flex w-full justify-between items-center font-bold my-2">
                <div className="text-lg">Jobs List</div>
                <button onClick={() => { navigate("/jobs/add_job") }}
                    type="submit"
                    className="w-1/6 font-bold bg-primary text-black py-2 rounded">
                    Add Job
                </button>
            </div>

            <div className="flex w-full justify-between items-center my-2">
                <div className="w-5/6 flex justify-center items-center mr-1">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="w-1/6 h-9 flex ml-1">
                    <div className="w-1/4 border-theme_dark border-l border-t border-b rounded-l-md focus:outline-none focus:border-primary h-9 flex justify-center items-center bg-theme_gray cursor-pointer" onClick={() => {
                        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
                        setSearchParamsFunc('sortOrder', newSortOrder);
                        setSortOrder(newSortOrder);
                    }}>
                        {sortOrder === "asc" ? <img src={asc} className="h-6" /> : <img src={desc} className="h-6" />}
                    </div>
                    <select className="w-3/4 bg-theme_gray font-medium px-3 py-1 border-theme_dark border rounded-r-md focus:outline-none focus:border-primary h-9" onChange={(e) => {
                        const newSortKey = e.target.value;
                        setSearchParamsFunc('sort', newSortKey);
                        setSortKey(newSortKey);
                    }}>
                        <option value="uploadDate">Upload Date</option>
                        <option value="tdc">TDC</option>
                        <option value="location">Location</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col w-full justify-between items-start bg-theme_gray drop-shadow-lg rounded-xl my-2">
                <div className="flex w-full justify-center items-center">
                    <div className="flex w-1/3 justify-center items-center cursor-pointer" style={parseInt(searchParams.get("jobStatus"), 10) === 1 ? { fontWeight: "bold" } : { fontWeight: "inherit" }} onClick={() => { setSearchParamsFunc("jobStatus", 1) }}>
                        <div className="flex justify-center items-center mx-3 mt-2">Open</div>
                        <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{openCount}</div>
                    </div>
                    <div id="Closed" className="flex w-1/3 justify-center items-center cursor-pointer" style={parseInt(searchParams.get("jobStatus"), 10) === 2 ? { fontWeight: "bold" } : { fontWeight: "inherit" }} onClick={() => { setSearchParamsFunc("jobStatus", 2) }}>
                        <div className="flex justify-center items-center mx-3 mt-2">Closed By Client</div>
                        <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{closedCount}</div>
                    </div>
                    <div id="Hold" className="flex w-1/3 justify-center items-center cursor-pointer" style={parseInt(searchParams.get("jobStatus"), 10) === 3 ? { fontWeight: "bold" } : { fontWeight: "inherit" }} onClick={() => { setSearchParamsFunc("jobStatus", 3) }}>
                        <div className="flex justify-center items-center mx-3 mt-2">Hold</div>
                        <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{holdCount}</div>
                    </div>
                    <div id="Hold" className="flex w-1/3 justify-center items-center cursor-pointer" style={parseInt(searchParams.get("jobStatus"), 10) === 4 ? { fontWeight: "bold" } : { fontWeight: "inherit" }} onClick={() => { setSearchParamsFunc("jobStatus", 4) }}>
                        <div className="flex justify-center items-center mx-3 mt-2">Filled by SG</div>
                        <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{filledCount}</div>
                    </div>
                </div>

                <div className="flex flex-col w-full justify-center items-center px-3 mb-5">
                    {filteredJobs.filter(job => job.jobStatus?.id === parseInt(searchParams.get('jobStatus'), 10)).map((item) => {
                        return (
                            <JobElement job={item} key={item.id} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
