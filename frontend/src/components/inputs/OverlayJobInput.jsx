import { useEffect, useState } from "react";
import { useAuthContext } from "../../hook/useAuthContext";
import { useErrorContext } from "../../hook/useErrorContext";
import Loading from "../Loading";

import axios from "axios";

import editIcon from '../../assets/edit.png'
import TextInput from "./TextInput";

export default function OverlayJobInput ({ setShowOverlay, trigger, setTrigger, jobTitle, setJobTitle }) {
    const { user, dispatch } = useAuthContext();
    const { errorDispatch } = useErrorContext();
    const [addData, setAddData] = useState("");
    const [jobTitleList, setJobTitleList] = useState([]);
    const [filteredJobTitleList, setFilteredJobTitleList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [editedName, setEditedName] = useState("");
    const [editItemId, setEditItemId] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    // Filter job titles based on search input
    useEffect(() => {
        const filtered = jobTitleList.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobTitleList(filtered);
    }, [searchTerm, jobTitleList]);

    useEffect(() => {
        setIsLoading(true);

        if (!user || !user.email) {
            errorDispatch({ type: 'ERROR', payload: "You must login again" });
            dispatch({ type: 'LOGOUT' });
            navigate("/login");
        }

        const fetchData = async () => {
            await axios.get(import.meta.env.VITE_BACKEND_URL + "job-title/getAll", { withCredentials: true })
                .then(response => {
                    if (response.data) {
                        setJobTitleList(response.data);
                        setFilteredJobTitleList(response.data); // Initialize the filtered list
                        setIsLoading(false);
                    } else {
                        errorDispatch({ type: 'ERROR', payload: "Error fetching job titles." });
                    }
                })
                .catch(() => {
                    errorDispatch({ type: 'ERROR', payload: "Error fetching job titles." });
                });
        };

        fetchData();
    }, [trigger]);

    const handleClick = async (e) => {
        e.preventDefault();

        if (e.target.id === "overlayBg" || e.target.id === "cancel") {
            setShowOverlay(false);
        } else if (e.target.id === "add") {
            if (addData == null || addData === "") {
                errorDispatch({ type: 'ERROR', payload: "Add Job Title cannot be empty" });
            } else {
                setIsLoading(true);
                if (!user || !user.email) {
                    errorDispatch({ type: 'ERROR', payload: "You must login again" });
                    dispatch({ type: 'LOGOUT' });
                    navigate("/login");
                }
                await axios.post(import.meta.env.VITE_BACKEND_URL + "job-title/add", { name: addData }, { withCredentials: true })
                    .then(response => {
                        if (!response.data)
                            errorDispatch({ type: 'ERROR', payload: `Error adding data` });
                        else {
                            setTrigger(trigger => !trigger);
                        }
                    })
                    .catch(() => { errorDispatch({ type: 'ERROR', payload: `Job already exists` }) });

                setIsLoading(false);
            }
        }
    };

    const handleEdit = (id, name) => {
        setEditItemId(id);
        setEditedName(name);
    };

    const handleSelect = (jobTitle) => {
        console.log(jobTitle);
        setJobTitle(jobTitle);
        setShowOverlay(false);
    };

    const handleSave = async (id) => {
        if (editedName.length > 50) {
            errorDispatch({ type: 'ERROR', payload: "Job Title must be less than 100 characters." });
            setEditItemId(null);
            setEditedName('');
            return;
        }
        await axios.post(import.meta.env.VITE_BACKEND_URL + "job-title/update", { name: editedName, id: id }, { withCredentials: true })
            .then(response => {
                if (!response.data) {
                    errorDispatch({ type: 'ERROR', payload: "Couldn't edit Job Title" });
                } else {
                    setTrigger(trigger => !trigger);
                }
            })
            .catch(() => {
                errorDispatch({ type: 'ERROR', payload: "Couldn't edit Job Title" });
            });

        setEditItemId(null);
        setEditedName('');
    };

    const handleInputChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
     

    return (
        <div id="overlayBg" className="w-full h-full flex justify-center items-center" onClick={handleClick}>
            <div id="overlayMain" className="bg-white flex w-1/2 justify-center items-center flex-col p-10 rounded-lg drop-shadow-2xl max-h-128">
             <button onClick={handleSelect} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
                    ✖
                </button>
            
                <div className="flex flex-col w-full overflow-y-scroll justify-start items-center">
                    <div className="flex w-full justify-between items-center search-bar-btn">
                        <div className="w-full font-semibold text-base ">
                            Select Job Title
                        </div>
                       <div className="relative w-full">
							<input
								type="text"
								placeholder="Search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="border border-gray-300 rounded-md p-2 w-full pr-10"
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									✖
								</button>
							)}
						</div>
                    </div>
                    <div className="flex w-full justify-between items-end">
                        <TextInput id="addJob" label="Add Job Title" setFunction={setAddData} maxLen={50} />
                        <button id="add" type="submit" className="w-1/4 h-8 rounded-md flex justify-center items-center cursor-pointer bg-theme_green ml-4 my-4">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col w-full items-center">
                        {isLoading ? <Loading /> :
                            filteredJobTitleList && filteredJobTitleList.map((item) => (  // Use filteredJobTitleList instead of jobTitleList
                                <div key={item.id} className="flex w-full justify-between items-center">
                                    <div className="w-full flex justify-between items-center">
                                        {editItemId === item.id ? (
                                            <input
                                                type="text"
                                                value={editedName}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-md p-1"
                                            />
                                        ) : (
                                            item.name
                                        )}
                                        {editItemId === item.id ? (
                                            <button
                                                onClick={() => handleSave(item.id)}
                                                className="h-4 ml-3 text-blue-500 cursor-pointer"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <img
                                                src={editIcon}
                                                className="h-4 ml-3 cursor-pointer"
                                                onClick={() => handleEdit(item.id, item.name)}
                                                alt="Edit"
                                            />
                                        )}
                                    </div>
                                    <button type="submit" className="w-1/4 h-8 rounded-md flex justify-center items-center cursor-pointer bg-theme_green ml-4 my-4" onClick={() => handleSelect(item)}>
                                        Select
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
