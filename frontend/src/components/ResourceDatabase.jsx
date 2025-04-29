import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./inputs/SearchBar";
import { useEffect, useState } from "react";
import ResourceElement from "./ResourceElement";
import asc from "../assets/ascending.png";
import desc from "../assets/descending.png";
import { useErrorContext } from "../hook/useErrorContext";
import axios from "axios";
import Loading from "./Loading";
import { useAuthContext } from "../hook/useAuthContext";

export default function ResourceDatabase() {
    const navigate = useNavigate();
    const { errorDispatch } = useErrorContext();
    const { user, employee, dispatch } = useAuthContext();

    const [searchParams, setSearchParams] = useSearchParams();
    const sortOptions = new Set(["uploadDate", "TDC", "name", "location"]);
    const sortOrderOptions = new Set(["asc", "desc"]);

    const [isLoading, setIsLoading] = useState(true);
    const [nResults, setNResults] = useState(0);
    const [candidates, setCandidates] = useState([]);
    const [sortedCandidates, setSortedCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const [sortKey, setSortKey] = useState("uploadDate");   // ✅ Set default sortKey
    const [sortOrder, setSortOrder] = useState("asc");       // ✅ Set default sortOrder

    const [searchValue, setSearchValue] = useState("");      // ✅ Add state to store search input

    const setURLParams = () => {
        let params = { ...Object.fromEntries(searchParams.entries()) };

        if (!searchParams.get('sort') || !sortOptions.has(searchParams.get('sort')))
            params.sort = 'uploadDate';

        if (!searchParams.get('sortOrder') || !sortOrderOptions.has(searchParams.get('sortOrder')))
            params.sortOrder = 'asc';

        setSearchParams(params);
    };

    const setSearchParamsFunc = (key, val) => {
        const params = { ...Object.fromEntries(searchParams.entries()) };
        params[key] = val;
        setSearchParams(params);
    };

    useEffect(() => {
        setURLParams();
    }, [searchParams]);

    useEffect(() => {
        if (!user || !user.email) {
            errorDispatch({ type: 'ERROR', payload: "You must login again" });
            dispatch({ type: 'LOGOUT' });
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                let url = employee.userType.id !== 2
                    ? import.meta.env.VITE_BACKEND_URL + "candidate/getAll"
                    : import.meta.env.VITE_BACKEND_URL + `candidate/getByEmployee/${employee.synergizId}`;

                const response = await axios.get(url, { withCredentials: true });

                if (response.data) {
                    setCandidates(response.data);
                } else {
                    errorDispatch({ type: 'ERROR', payload: "Error fetching candidates" });
                }
            } catch (error) {
                errorDispatch({ type: 'ERROR', payload: "Error fetching candidates" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const sortCandidates = () => {
            if (candidates.length > 0) {
                let sorted = [...candidates];

                // Apply sorting
                sorted.sort((a, b) => {
                    const aValue = a[sortKey]?.toString().toLowerCase() || "";
                    const bValue = b[sortKey]?.toString().toLowerCase() || "";

                    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
                    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
                    return 0;
                });

                setSortedCandidates(sorted);
                setFilteredCandidates(sorted); // Always reset filtered list after sort
                setNResults(sorted.length);
            } else {
                setSortedCandidates([]);
                setFilteredCandidates([]);
                setNResults(0);
            }
        };

        sortCandidates();
    }, [candidates, sortKey, sortOrder]);

    useEffect(() => {
        // Whenever searchValue changes, apply search
        const filtered = sortedCandidates.filter(candidate => {
            const fullName = (candidate.firstName + " " + candidate.lastName).toLowerCase();
            return fullName.includes(searchValue.toLowerCase());
        });
        setFilteredCandidates(filtered);
        setNResults(filtered.length);
    }, [searchValue, sortedCandidates]); // ✅ Search based on updated sortedCandidates

    const handleSearch = (value) => {
        setSearchValue(value); // ✅ Update search value state
    };

    if (isLoading)
        return <Loading />;

    return (
        <div className="w-3/4 flex flex-col justify-start items-start min-h-full max-h-full pb-10">
            <div className="flex w-full justify-between items-center my-2">
                <div className="w-5/6 flex justify-center items-center mr-1">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="w-1/6 h-9 flex ml-1">
                    <div
                        className="w-1/4 border-theme_dark border-l border-t border-b rounded-l-md focus:outline-none focus:border-primary h-9 flex justify-center items-center bg-theme_gray cursor-pointer"
                        onClick={() => {
                            const newOrder = sortOrder === "asc" ? "desc" : "asc";
                            setSortOrder(newOrder);
                            setSearchParamsFunc('sortOrder', newOrder);
                        }}
                    >
                        {sortOrder === "asc" ? (
                            <img src={asc} className="h-6" />
                        ) : (
                            <img src={desc} className="h-6" />
                        )}
                    </div>
                    <select
                        className="w-3/4 bg-theme_gray font-medium px-3 py-1 border-theme_dark border rounded-r-md focus:outline-none focus:border-primary h-9"
                        value={sortKey}
                        onChange={(e) => {
                            const selectedSortKey = e.target.value;
                            setSortKey(selectedSortKey);
                            setSearchParamsFunc('sort', selectedSortKey);
                        }}
                    >
                        <option value="uploadDate">Upload Date</option>
                        <option value="TDC">TDC</option>
                        <option value="name">Name</option>
                        <option value="location">Location</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col w-full justify-between items-start bg-theme_gray drop-shadow-lg rounded-xl my-2">
                <div className="flex justify-center items-center">
                    <div className="w-full flex justify-start items-center mx-3 mt-2">Total Candidates: </div>
                    <div className="bg-theme_dark rounded-full text-white h-6 w-6 flex justify-center items-center mt-2">{nResults}</div>
                </div>

                <div className="flex flex-col w-full justify-center items-center px-3 mb-5">
                    <div className="w-full flex justify-between items-center font-semibold">
                        <div className="w-1/16">Sr No.</div>
                        <div className="w-2/16 text-center">Name</div>
                        <div className="w-2/16 text-center">Category</div>
                        <div className="w-2/16 text-center">Phone Number</div>
                        <div className="w-2/16 text-center">Status</div>
                        <div className="w-4/16 text-center">Final Remarks</div>
                        <div className="w-2/16 text-center">Final CTC</div>
                        <div className="w-1/16 text-center">CV</div>
                    </div>

                    {filteredCandidates.map((item, index) => (
                        <ResourceElement candidate={item} key={item.id} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
