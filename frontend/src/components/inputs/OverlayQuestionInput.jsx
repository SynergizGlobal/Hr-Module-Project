import { useEffect, useState } from "react"
import { useErrorContext } from "../../hook/useErrorContext"
import axios from "axios"
import TextInput from "./TextInput"
import Loading from "../Loading"
import deleteIcon from "../../assets/delete.png"
import { useAuthContext } from "../../hook/useAuthContext"
import { useNavigate } from "react-router-dom"

export default function OverlayQuestionInput ({ setShowOverlay, trigger, setTrigger, jobTitle, selectedQuestions, setSelectedQuestions }) {
    const { user, dispatch } = useAuthContext ()
    const { errorDispatch } = useErrorContext ()
    const [addData, setAddData] = useState (null)
    const [questions, setQuestions] = useState (null)
    const [isLoading, setIsLoading] = useState (true)

    const navigate = useNavigate ()

    useEffect (() => {
        if (!user || !user.email) {
            errorDispatch ({ type: 'ERROR', payload: "You must login again" })
            dispatch ({type: 'LOGOUT'})
            navigate ("/login")
        }

        const fetchQuestions = async () => {
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            await axios.get (import.meta.env.VITE_BACKEND_URL+"question/get?jobTitleId="+jobTitle.id, { withCredentials: true})
            .then (response => {
                if (response.data) {
                    setQuestions (response.data)
                    setIsLoading (false)
                }
            })
            .catch (()=> { errorDispatch({ type: 'ERROR', payload: "Failed to load questions" }) })
        }
        fetchQuestions ();
    }, [isLoading, trigger])

    const handleSelect = (item) => {
        const exists = selectedQuestions.some (question => question.questionId === item.questionId)

        if (!exists) {
            setSelectedQuestions ([...selectedQuestions, item])
            setShowOverlay (false)
        }
        else {
            errorDispatch ({ type: 'ERROR', payload: "This question already exists" })
        }
    }

    const handleDelete = async (id) => {
        setIsLoading (true)
        if (!user || !user.email) {
            errorDispatch ({ type: 'ERROR', payload: "You must login again" })
            dispatch ({type: 'LOGOUT'})
            navigate ("/login")
        }
        await axios.delete (import.meta.env.VITE_BACKEND_URL+"question/delete?id="+id, {withCredentials: true})
        .then (response=> {
            if (response.data) {
                setTrigger (trigger => !trigger)
            }
        })
        .catch (()=> {
            errorDispatch ({ type: 'ERROR', payload: "Error deleting question. (Remove all occurences of this question)" })
        })

        setIsLoading (false)
    }

    const handleClick = async (e) => {
        if (e.target.id === "overlayBg")
        {
            setAddData (null)
            setShowOverlay (false)
        }
        else if (e.target.id === "add")
        {
            if (addData == null || addData === "") {
                errorDispatch ({ type: 'ERROR', payload: "Add Question cannot be empty" })
            }
            else {
                setIsLoading (true)
                if (!user || !user.email) {
                    errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                    dispatch ({type: 'LOGOUT'})
                    navigate ("/login")
                }
                await axios.post(import.meta.env.VITE_BACKEND_URL+"question/add", {question: addData, jobTitle: jobTitle }, {withCredentials: true})
                    .then (response=>{
                        if (!response.data)
                            errorDispatch ({ type: 'ERROR', payload: `Error adding data` })
                        else {
                            setTrigger (trigger => !trigger)
                        }
                    })
                    .catch (() => {errorDispatch ({ type: 'ERROR', payload: `Error adding data` })})

                setIsLoading (false)
            }
        }
    }

    return (
        <div id="overlayBg" className="w-full h-full flex justify-center items-center my-5" onClick={handleClick}>
            <div id="overlayMain" className="bg-white max-h-full overflow-y-scroll flex w-1/2 justify-center items-center flex-col p-10 rounded-lg drop-shadow-2xl">
                 <button 
                className="absolute top-2 right-4 text-lg font-bold text-gray-600 hover:text-red-500"
                onClick={() => setShowOverlay(false)}
            >
                ✖
            </button>
                <div className="flex w-full justify-between items-end">
                    <TextInput id="AddQuestionId" label="Add Question" setFunction={setAddData} maxLen={1000} />
                    <button id="add" type="submit" className="w-1/4 h-8 rounded-md flex justify-center items-center cursor-pointer bg-theme_green ml-4 my-4">
                        Add
                    </button>
                </div>
                <div className="flex flex-col w-full justify-around items-center">
                    <div className="w-full font-semibold text-base ">
                        Questions for {jobTitle.name}
                    </div>
                    <div className="flex flex-col w-full items-center">
                        {isLoading ? <Loading /> :
                        questions && questions.map ((item)=> {
                            return (
                                <div key={item.questionId} className="flex w-full justify-between items-center">
                                    <div className="w-full flex justify-between items-center">
                                        {item.question}
                                        <img src={deleteIcon} className="h-4 ml-3 cursor-pointer" onClick={()=> handleDelete(item.questionId)} />
                                    </div>
                                    <button type="submit" className="w-1/4 h-8 rounded-md flex justify-center items-center cursor-pointer bg-theme_green ml-4 my-4" onClick={()=> handleSelect (item)}>
                                        Select
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )


}