import { useEffect, useState } from "react"
import leftArrow from '../assets/left.png'
import rightArrow from '../assets/right.png'
import personIcon from "../assets/person.png"
import questionIcon from "../assets/questionmark.png"
import minus from "../assets/minus.png"
import plus from "../assets/plus.png"
import { useEmployeeContext } from "../hook/useEmployeeContext"
import { useErrorContext } from "../hook/useErrorContext"

export default function InterviewPagination ({interviewsList, setInterviewsList}) {
    const [currentPage, setCurrentPage] = useState (1)
    const candidateStatus = {id: 3, name: "Ongoing"}
    const { employee, employeeDispatch } = useEmployeeContext ()
    const { errorDispatch } = useErrorContext ()
    const [changeIndex, setChangeIndex] = useState (1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage (pageNumber)
    }

    const insertInterview = () => {
        const newInterviewsList = [...interviewsList]
        newInterviewsList.splice (currentPage, 0, {interviewStatus: candidateStatus, firstInterviewer: null, secondInterviewer: null, thirdInterviewer: null, plannedDateForInterview: null})
        setInterviewsList (newInterviewsList)
        setCurrentPage (currentPage + 1)
    }

    const deleteInterview = () => {
        const newInterviewsList = [...interviewsList]
        newInterviewsList.splice (currentPage-1, 1)
        setInterviewsList (newInterviewsList)
        if (currentPage-1 !== 0)
            setCurrentPage (currentPage-1)
    }

    const handleAssign = (e, index) => {
        e.preventDefault ()
        setChangeIndex (index)
        employeeDispatch ({ type: 'OPEN' })
    }

    useEffect (() => {
        if (employee) {
            const updatedInterviewsList = [...interviewsList]
            switch (changeIndex) {
                case 1:
                    if ((updatedInterviewsList[currentPage-1].secondInterviewer && updatedInterviewsList[currentPage-1].secondInterviewer.id === employee.id) || (updatedInterviewsList[currentPage-1].thirdInterviewer && updatedInterviewsList[currentPage-1].thirdInterviewer.id === employee.id)) {
                        errorDispatch ({ type: 'ERROR', payload: "Employee already assigned" })
                        break;
                    }
                    updatedInterviewsList[currentPage-1].firstInterviewer = employee
                    break;
                case 2:
                    if ((updatedInterviewsList[currentPage-1].firstInterviewer && updatedInterviewsList[currentPage-1].firstInterviewer.id === employee.id) || (updatedInterviewsList[currentPage-1].thirdInterviewer && updatedInterviewsList[currentPage-1].thirdInterviewer.id === employee.id)) {
                        errorDispatch ({ type: 'ERROR', payload: "Employee already assigned" })
                        break;
                    }
                    updatedInterviewsList[currentPage-1].secondInterviewer = employee
                    break;
                case 3:
                    if ((updatedInterviewsList[currentPage-1].secondInterviewer && updatedInterviewsList[currentPage-1].secondInterviewer.id === employee.id) || (updatedInterviewsList[currentPage-1].firstInterviewer && updatedInterviewsList[currentPage-1].firstInterviewer.id === employee.id)) {
                        errorDispatch ({ type: 'ERROR', payload: "Employee already assigned" })
                        break;
                    }
                    updatedInterviewsList[currentPage-1].thirdInterviewer = employee
                    break;
                default:
                    break;
            }
            setInterviewsList (updatedInterviewsList)
        }
    }, [employee])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center text-center">
                <div className="w-4">
                    {(currentPage > 1) &&
                    <img src={leftArrow} className="cursor-pointer" onClick={() => { handlePageChange (currentPage-1) }} />}
                </div>
                <div className="font-semibold">
                    Round {currentPage}
                </div>
                <div className="w-4">
                    {(currentPage < interviewsList.length) &&
                    <img src={rightArrow} className="cursor-pointer" onClick={() => { handlePageChange (currentPage+1) }} />}
                </div>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="flex flex-shrink-0 justify-start items-center w-5">
                    {(interviewsList.length > 1) &&
                        <img src={minus} className="cursor-pointer h-4" onClick={deleteInterview} />}
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex w-full justify-between px-3 items-center">
                        <div className="flex justify-center items-center">
                            <div className="mr-2">
                                1.
                            </div>
                            <img src={interviewsList[currentPage-1].firstInterviewer ? personIcon : questionIcon} className="h-5 mr-2" />
                            {interviewsList[currentPage-1].firstInterviewer ? interviewsList[currentPage-1].firstInterviewer.employeeDetails.name : "Unassigned"}
                        </div>
                        <button onClick={(e) => { handleAssign (e, 1) }}
                            className="w-1/4 font-bold bg-primary text-black py-1 rounded">
                            {interviewsList[currentPage-1].firstInterviewer ? "Reassign" : "Assign"}
                        </button>
                    </div>
                    <div className="flex w-full justify-between px-3 items-center mt-1">
                        <div className="flex justify-center items-center">
                            <div className="mr-2">
                                2.
                            </div>
                            <img src={interviewsList[currentPage-1].secondInterviewer ? personIcon : questionIcon} className="h-5 mr-2" />
                            {interviewsList[currentPage-1].secondInterviewer ? interviewsList[currentPage-1].secondInterviewer.employeeDetails.name : "Unassigned"}
                        </div>
                        <button onClick={(e) => { handleAssign (e, 2) }}
                            className="w-1/4 font-bold bg-primary text-black py-1 rounded">
                            {interviewsList[currentPage-1].secondInterviewer ? "Reassign" : "Assign"}
                        </button>
                    </div>
                    <div className="flex w-full justify-between px-3 items-center mt-1">
                        <div className="flex justify-center items-center">
                            <div className="mr-2">
                                3.
                            </div>
                            <img src={interviewsList[currentPage-1].thirdInterviewer ? personIcon : questionIcon} className="h-5 mr-2" />
                            {interviewsList[currentPage-1].thirdInterviewer ? interviewsList[currentPage-1].thirdInterviewer.employeeDetails.name : "Unassigned"}
                        </div>
                        <button onClick={(e) => { handleAssign (e, 3) }}
                            className="w-1/4 font-bold bg-primary text-black py-1 rounded">
                            {interviewsList[currentPage-1].thirdInterviewer ? "Reassign" : "Assign"}
                        </button>
                    </div>
                </div>
                <div className="flex flex-shrink-0 justify-end items-center w-5">
                    <img src={plus} className="cursor-pointer h-4" onClick={insertInterview} />
                </div>
            </div>
        </div>
    )
}