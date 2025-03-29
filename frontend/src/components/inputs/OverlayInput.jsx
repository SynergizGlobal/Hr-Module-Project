import { useState } from "react"
import TextInput from "./TextInput"
import axios from "axios"
import { useErrorContext } from "../../hook/useErrorContext"
import { useAuthContext } from "../../hook/useAuthContext"

export default function OverlayInput ({ label, overlayUrl, setShowOverlay, trigger, setTrigger, maxLen }) {
    const { user, dispatch } = useAuthContext ()
    const { errorDispatch } = useErrorContext ()
    const [addData, setAddData] = useState (null)

    const handleClick = async (e) => {
        if (e.target.id === "overlayBg" || e.target.id === "cancel")
        {
            setAddData (null)
            setShowOverlay (false)
        }
        else if (e.target.id === "add")
        {
            if (addData == null || addData === "") {
                errorDispatch ({ type: 'ERROR', payload: `${label} cannot be empty` })
            }
            else {
                if (!user || !user.email) {
                    errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                    dispatch ({type: 'LOGOUT'})
                    navigate ("/login")
                }
                await axios.post(import.meta.env.VITE_BACKEND_URL+overlayUrl, {name: addData}, {withCredentials: true})
                    .then (response=>{
                        if (response.data)
                        {
                            setTrigger (trigger => !trigger)
                            setShowOverlay (false)
                        }
                        else
                        errorDispatch ({ type: 'ERROR', payload: `Error adding data` })
                    })
                    .catch (() => {errorDispatch ({ type: 'ERROR', payload: `Category already exists` })})
            }
        }
    }

    return (
        <div id="overlayBg" className="w-full h-full flex justify-center items-center" onClick={handleClick}>
            <div id="overlayMain" className="bg-white flex w-1/2 justify-center items-center flex-col p-10 rounded-lg drop-shadow-2xl">
                <TextInput label={label} setFunction={setAddData} maxLen={maxLen} />
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