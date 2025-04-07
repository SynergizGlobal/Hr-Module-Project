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
import tick from '../assets/tick.png'
import pending from '../assets/pending.png'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function JobElement({ job }) {
	const [datePassed, setDatePassed] = useState(false)
	const [statusCount, setStatusCount] = useState([])
	const navigate = useNavigate();

	useEffect(() => {
		const getStatusCount = async () => {
			await axios.get(import.meta.env.VITE_BACKEND_URL + `candidate/getCandidateStatusCount/${job.id}`, { withCredentials: true })
				.then(response => {
					if (response.data) {
						setStatusCount(response.data)
					}
				})
		}

		getStatusCount()
	}, [])

	useEffect(() => {
		let tdc = new Date(job.tdc).getTime()
		let currentTime = new Date().getTime()
		if (tdc < currentTime)
			setDatePassed(true)
	}, [job.tdc])

	const handleEdit = (job) => {
		navigate(`/jobs/edit_job/${job.id}`, { state: { job } })
	}

	return (
		<div className="flex justify-center items-center bg-white w-full rounded-md p-3 mt-2">
			<div className="w-1/4 flex flex-col justify-center items-start">

				<div className="flex w-full justify-center items-center text-xs">
					<div className='w-1/6'>
						<img src={edit} className='h-4 w-4 cursor-pointer' onClick={() => { handleEdit(job) }} />
					</div>
					<div className='w-5/6'>
						{job.jobTitle.name}                    
						</div>
				</div>
				<div className="flex justify-center items-center">
					<img src={calendar} className='h-5' />
					<div className='ml-9' style={datePassed ? { color: 'red' } : { color: 'inherit' }}>
						{job.uploadDate} - {job.tdc}
					</div>
				</div>
			</div>

			<div className='w-1/4 min-h-10 flex flex-col justify-between items-center'>
				<div className='w-1/2 flex justify-start items-center font-medium text-base'>
					{job.jobTitle.name}
				</div>
				<div className='w-1/2 flex justify-start items-center'>
					{job.project.name}
				</div>
			</div>

			<div className='w-1/4 min-h-10 flex flex-col justify-between items-center'>
				<div className='w-1/2 flex justify-start items-center text-xs'>
					<img src={tick} className='h-4' />
					<div className='ml-2'>Accepted: {statusCount.find(status => status[0].id === 1)?.[1] || 0}</div>
				</div>
				<div className='w-1/2 flex justify-start items-center text-xs'>
					<img src={pending} className='h-4' />
					<div className='ml-2'>Ongoing: {statusCount.find(status => status[0].id === 3)?.[1] || 0}</div>
				</div>
			</div>

			<div className='w-1/4 min-h-10 flex flex-col justify-between items-start'>
				<div className='w-full flex justify-center items-center'>
					<img src={location} className='h-4' />
					<div className='ml-3'>
						{job.location.name}
					</div>
				</div>
				<div className='w-full flex justify-center items-center'>
					{job.interviewer ? "Assigned to: " + job.interviewer.employeeDetails.name : "Unassigned"}
				</div>
			</div>
		</div>
	)
}
