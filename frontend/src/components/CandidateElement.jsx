import person from '../assets/person.png'
import download from '../assets/download.png'
import edit from '../assets/edit.png'
import location from '../assets/locatoon.png'
import email from '../assets/email.png'
import phone from '../assets/phone.png'
import ongoing from '../assets/ongoing.png'
import rejected from '../assets/rejected.png'
import accepted from '../assets/selected.png'
import calendar from '../assets/calendar.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useErrorContext } from '../hook/useErrorContext'
import { downloadFile } from '../utils/FileUtils'
import { useAuthContext } from '../hook/useAuthContext'

export default function CandidateElement ({ candidate }) {
    const navigate = useNavigate ();
    const [datePassed, setDatePassed] = useState (false)
    const [isLoading, setIsLoading] = useState (true)
    const { errorDispatch } = useErrorContext ()
    const { employee } = useAuthContext ()

    const [interviewList, setInterviewList] = useState ([])
    const [byEmployee, setByEmployee] = useState (null)
    const [status, setStatus] = useState (null)

    useEffect (() => {
        const fetchInterviews = async () => {
            try {
                const interviewResponse = await axios.get (import.meta.env.VITE_BACKEND_URL + `interview/${candidate.id}`, {withCredentials: true})
                if (interviewResponse.data) {
                    setInterviewList (interviewResponse.data)

                    let currentStatus = candidate.technicalScreeningStatus
                    let currentEmployee = candidate.employee

                    if (candidate.technicalScreeningStatus.id === 1 || candidate.technicalScreeningStatus.id === 2) {
                        currentStatus = candidate.technicalScreeningStatus
                        currentEmployee = candidate.employee
                    }

                    for (const interview of interviewResponse.data) {
                        if (interview.interviewStatus.id === 1 || interview.interviewStatus.id === 2) {
                            currentStatus = interview.interviewStatus
                            currentEmployee = interview.firstInterviewer
                        }
                    }

                    setStatus (currentStatus)
                    setByEmployee (currentEmployee)
                    setIsLoading (false)
                }
                else {
                    errorDispatch ({ type: 'ERROR', payload: "Error fetching interviews list" })
                }
            }
            catch (error) {
                console.log (error)
                errorDispatch ({ type: 'ERROR', payload: "Error fetching interviews list" })
            }
        }

        fetchInterviews ()
    }, [])

    useEffect (()=>{
        let TDC = new Date (candidate.TDC).getTime()
        let currentTime = new Date().getTime()
        if (TDC < currentTime)
            setDatePassed (true)
    }, [candidate.TDC])

    const handleEdit = (candidate) => {
        navigate (`/candidates/${candidate.id}/edit`, {state: {candidate}})
    }

    if (isLoading)
        return <></>

    return (
        <div className="flex justify-center items-center bg-white w-full rounded-md p-3 mt-2">
            <div className="w-1/4 flex flex-col justify-center items-start">
                <div className="flex justify-center items-center">
                    <img src={person} className='h-5' />
                    <div className='ml-10 font-bold text-base cursor-pointer' onClick={() => { navigate (`/candidates/${candidate.id}`) }}>
                        {candidate.firstName +" "+ candidate.lastName}
                    </div>
                </div>
                <div className="flex items-center w-full">
                    <div className='flex items-start w-15'>
                        <button className='flex justify-center items-center' onClick={() => { downloadFile (candidate.resumeFilename, candidate.id, errorDispatch) }}>
                            <img src={download} className='flex-shrink-0 cursor-pointer w-4 h-4' />
                        </button>
                        {employee.userType.id !== 2 && <button className='flex justify-center items-center' onClick={()=>{handleEdit(candidate)}}>
                            <img src={edit} className='flex-shrink-0 ml-1 cursor-pointer w-4 h-4' />
                        </button>}
                    </div>
                    <div className='mx-2 w-4/5'>
                        { candidate.skills ? (candidate.skills.length > 60 ? (candidate.skills.substr (0, 60) + "...") : candidate.skills.substr (0, 60)) : "" }
                    </div>
                </div>
            </div>

            <div className="w-1/4 h-full flex flex-col justify-between items-center">
                <div className='w-1/2 flex justify-start items-center'>
                    <img src={location} className='h-4' />
                    <div className='mx-5'>
                        { candidate.location ? candidate.location.name : "" }
                    </div>
                </div>
                <div className='w-1/2 flex justify-start items-center'>
                    <img src={email} className='h-4' />
                    <div className='mx-5'>
                        {candidate.email ? candidate.email : ""}
                    </div>
                </div>
                <div className='w-1/2 flex justify-start items-center'>
                    <img src={phone} className='h-4' />
                    <div className='mx-5 text-blue-600'>
                        {candidate.phoneNo ? candidate.phoneNo : ""}
                    </div>
                </div>
            </div>

            <div className='w-1/4 flex flex-col justify-between items-center'>
                <div className='w-1/2 flex justify-start items-center font-medium text-base'>
                    {candidate.job ? candidate.job.name : ""}
                </div>
                <div className='w-1/2 flex justify-start items-center'>
                    {candidate.job ? candidate.job.project.name : ""}
                </div>
            </div>

            <div className='w-1/4 h-full flex flex-col justify-between items-start text-xs'>
                <div className='w-full flex justify-center items-center'>
                    {status.id===2 && <img src={rejected} className='h-5' />}
                    {status.id===1 && <img src={accepted} className='h-5' />}
                    {status.id===3 && <img src={ongoing} className='h-5' />}
                </div>
                <div className='w-full flex justify-center items-center mt-2'>
                    {status.id===2 && <>Rejected By: {byEmployee ? byEmployee.employeeDetails.name : "Unassigned"}</>}
                    {status.id===1 && <>Accepted By: {byEmployee ? byEmployee.employeeDetails.name : "Unassigned"}</>}
                    {status.id===3 && <>Assigned to: {byEmployee ? byEmployee.employeeDetails.name : "Unassigned"}</>}
                </div>
                <div className='w-full flex justify-center items-center mt-2'>
                    <img src={calendar} className='h-4' />
                    <div className='ml-3' style={datePassed ? {color: 'red'} : {color: 'inherit'}}>
                        {candidate.job ? candidate.job.tdc : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}