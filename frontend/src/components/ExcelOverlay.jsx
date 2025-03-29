import axios from "axios"
import { useErrorContext } from "../hook/useErrorContext"
import { useAuthContext } from "../hook/useAuthContext"
import { useEffect, useRef, useState } from "react"
import uploadIcon from "../assets/upload.png"
import SelectInput from "./inputs/SelectInput"
import Loading from "./Loading"

export default function ExcelOverlay ({ trigger, setTrigger, setShowExcelOverlay }) {
    const { user, dispatch } = useAuthContext ()
    const { errorDispatch } = useErrorContext ()
    const [isLoading, setIsLoading] = useState (true)

    const fileInputRef = useRef (null)
    const [fileName, setFileName] = useState ("")
    const [job, setJob] = useState (null)
    const [jobsList, setJobsList] = useState (null)

    useEffect (() => {
        const fetchData = async () => {
            setIsLoading (true)
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            try {
                const response = await axios.get (import.meta.env.VITE_BACKEND_URL + "job/getAll", {withCredentials: true})
                if (response.data) {
                    setJobsList (response.data)
                    setIsLoading (false)
                }
                else {
                    errorDispatch ({type: 'ERROR', payload: "Error fetching Jobs"})
                }
            }
            catch {
                errorDispatch ({type: 'ERROR', payload: "Error fetching Jobs"})
            }
        }

        fetchData ()
    }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);

            const allowedMimeTypes = [
                'application/vnd.ms-excel', // .xls files
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx files
            ];

            // Check if file type is allowed
            if (!allowedMimeTypes.includes(file.type)) {
                errorDispatch({ type: 'ERROR', payload: 'Only Excel files are allowed.' });
                e.target.value = null;
                setFileName ("")
            } else if (fileSizeInMB > 20) {
                errorDispatch({ type: 'ERROR', payload: 'File size must be less than 20MB.' });
                e.target.value = null;
                setFileName ("")
            } else {
                setFileName (file.name)
            }
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleClick = async (e) => {
        if (e.target.id === "overlayBg" || e.target.id === "cancel")
        {
            setShowExcelOverlay (false)
        }
        else if (e.target.id === "add")
        {
            const file = fileInputRef.current.files[0]
            if (!file) {
                errorDispatch ({ type: 'ERROR', payload: "No file uploaded" })
            }
            else {
                if (!user || !user.email) {
                    errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                    dispatch ({type: 'LOGOUT'})
                    navigate ("/login")
                    return;
                }
                const formData = new FormData()
                formData.append ("file", file)
                if (job) {
                    formData.append ("jobId", job.id)
                } else {
                    formData.append ("jobId", -1)
                }
                await axios.post(import.meta.env.VITE_BACKEND_URL+"candidate/process-excel", formData, {withCredentials: true})
                    .then (response=>{
                        setTrigger (trigger => !trigger)
                        setShowExcelOverlay (false)
                    })
                    .catch (() => { errorDispatch ({ type: 'ERROR', payload: `Error adding data` })})
            }
        }
    }

    if (isLoading)
        return <Loading />

    return (
        <div id="overlayBg" className="w-full h-full flex justify-center items-center" onClick={handleClick}>
            <div id="overlayMain" className="bg-white flex w-1/2 justify-center items-center flex-col p-10 rounded-lg drop-shadow-2xl">
                <div className="w-full">
                    <span className="text-red-500">Warning: This function is permanent.</span><br />
                    Please follow the correct excel format as described here:<br />
                    <div className="flex flex-wrap justify-start items-center">
                        <div className="mx-2">First Name, </div>
                        <div className="mx-2">Last Name, </div>
                        <div className="mx-2">Phone No, </div>
                        <div className="mx-2">Email, </div>
                        <div className="mx-2">Preferred Location, </div>
                        <div className="mx-2">Qualification, </div>
                        <div className="mx-2">Discipline, </div>
                        <div className="mx-2">Work Experience, </div>
                        <div className="mx-2">Current CTC, </div>
                        <div className="mx-2">Expected CTC</div>
                    </div>
                </div>

                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                <form id="excelUploadForm" className="flex justify-center items-center m-4">
                    <img src={uploadIcon} className="h-8 cursor-pointer" onClick={handleButtonClick} />
                    <div className="flex flex-col justify-around items-start m-2 h-8">
                        <div className="w-full h-1/2">
                            {fileName}
                        </div>
                        <div className="w-full h/1-2">
                            Maximum File Size: 20MB
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <SelectInput id="jobSelect" label="Job" setFunction={setJob} list={jobsList} form="excelUploadForm" />
                    </div>
                </form>
                <div className="w-full flex justify-around items-center">
                    <button id="cancel" type="reset" className="w-1/4 h-10 rounded-md flex justify-center items-center cursor-pointer bg-theme_red">
                        Cancel
                    </button>
                    <button id="add" type="submit" className="w-1/4 h-10 rounded-md flex justify-center items-center cursor-pointer bg-theme_green">
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}