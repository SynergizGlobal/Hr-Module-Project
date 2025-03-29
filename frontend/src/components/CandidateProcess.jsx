import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useErrorContext } from "../hook/useErrorContext"
import { useAuthContext } from "../hook/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"
import cloneDeep from 'lodash/cloneDeep';
import Loading from "./Loading"
import mailIcon from "../assets/email.png"
import phoneIcon from "../assets/phone.png"
import timeIcon from "../assets/time.png"
import downloadIcon from "../assets/download.png"
import locationIcon from "../assets/locatoon.png"
import techScreeningIcon from "../assets/doc.png"
import interviewIcon from "../assets/interview.png"
import personIcon from "../assets/person.png"
import ctcIcon from "../assets/ctc.png"
import uploadIcon from "../assets/upload.png"
import { downloadFile } from "../utils/FileUtils"
import QuestionAnswerPagination from "./QuestionAnswerPagination"
import StageButton from "./StageButton"
import InputRadio from "./inputs/InputRadio"
import TextAreaInput from "./inputs/TextAreaInput"
import FloatInput from "./inputs/FloatInput"
import TimeInput from "./inputs/TimeInput"
// Candidate Process
export default function CandidateProcess() {
	const [candidate, setCandidate] = useState(null)
	const { errorDispatch } = useErrorContext()
	const { user, employee, dispatch } = useAuthContext()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()

	const [questionsList, setQuestionsList] = useState([])
	const [answersList, setAnswersList] = useState([])
	const [interviewsList, setInterviewsList] = useState([])
	const [initialInterviewsList, setInitialInterviewsList] = useState([])
	const [statusList, setStatusList] = useState([])
	const [loaded, setLoaded] = useState(false);
	const [expanded, setExpanded] = useState(false);



	const fileInputRef = useRef(null)
	const [fileName, setFileName] = useState("")

	// Stage Manager
	const [stage, setStage] = useState(1)
	const [initialStage, setInitialStage] = useState(1)
	const [stagesList, setStagesList] = useState([])

	//Form Data
	const [technicalScreeningTime, setTechnicalScreeningTime] = useState()
	const [technicalScreeningStatus, setTechnicalScreeningStatus] = useState(null)
	const [technicalScreeningRemarks, setTechnicalScreeningRemarks] = useState("")

	const [technicalInterviewRemarks, setTechnicalInterviewRemarks] = useState("")

	const [ctcNegotiationRemarks, setCtcNegotiationRemarks] = useState("")
	const [ctcApprovalStatus, setCtcApprovalStatus] = useState(null)
	const [ctcFinal, setCtcFinal] = useState(0.0)
	const [ctcUpdateDate, setCtcUpdateDate] = useState(null)

	const [cvFormattingRemarks, setCvFormattingRemarks] = useState("")
	const [cvFormattingStatus, setCvFormattingStatus] = useState(null)
	const [cvSubmissionDate, setCvSubmissionDate] = useState(null)
	const [cvSubmissionTime, setCvSubmissionTime] = useState(null)
	const [graduationQualification, setGraduationQualification] = useState('');


	const [clientInterviewStatus, setClientInterviewStatus] = useState(null)
	const [clientInterviewRemarks, setClientInterviewRemarks] = useState("")

	const maxChars = 100; // Set character limit

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	const handleInterviewStatusChange = (status) => {
		const updatedInterviewsList = [...interviewsList]
		updatedInterviewsList[stage - 2].interviewStatus = status
		setInterviewsList(updatedInterviewsList)
	}

	const handleInterviewActualDateChange = (e) => {
		const updatedInterviewsList = [...interviewsList]
		updatedInterviewsList[stage - 2].actualDateForInterview = e.target.value
		setInterviewsList(updatedInterviewsList)
	}

	const handleInterviewPlannedDateChange = (e) => {
		const updatedInterviewsList = [...interviewsList]
		updatedInterviewsList[stage - 2].plannedDateForInterview = e.target.value
		setInterviewsList(updatedInterviewsList)
	}

	const handleButtonClick = () => {
		fileInputRef.current.click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileSizeInMB = file.size / (1024 * 1024);

			const allowedMimeTypes = [
				'application/pdf', // PDF files
				'application/msword', // .doc files
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx files
			]

			// Check if file type is allowed
			if (!allowedMimeTypes.includes(file.type)) {
				errorDispatch({ type: 'ERROR', payload: 'Only PDF and Word files are allowed.' });
				setFileName('');
			} else if (fileSizeInMB > 20) {
				errorDispatch({ type: 'ERROR', payload: 'File size must be less than 20MB.' });
				setFileName('');
			} else {
				setFileName(file.name);
			}
		}
	}

	const disabilityCheck = (index) => {
		// Only disable for users with userType.id === 2
		if (employee.userType.id === 2) {
			const { firstInterviewer, secondInterviewer, thirdInterviewer } = interviewsList[index];
			const isInterviewer =
				(firstInterviewer && firstInterviewer.id === employee.id) ||
				(secondInterviewer && secondInterviewer.id === employee.id) ||
				(thirdInterviewer && thirdInterviewer.id === employee.id);

			// If the employee is NOT an interviewer, disable the inputs
			return !isInterviewer;
		}

		return false;
	}

	const handleReset = () => {
		setStage(1)
		setTechnicalInterviewRemarks(candidate.technicalInterviewRemarks)
		setTechnicalScreeningRemarks(candidate.technicalScreeningRemarks)
		setTechnicalScreeningStatus(candidate.technicalScreeningStatus)
		setTechnicalScreeningTime(candidate.technicalScreeningTime)
		setCtcApprovalStatus(candidate.ctcApprovalStatus)
		setCtcFinal(candidate.ctcFinal)
		setCtcUpdateDate(candidate.ctcUpdateDate)
		setCtcNegotiationRemarks(candidate.ctcNegotiationRemarks)
		setCvFormattingStatus(candidate.cvFormattingStatus)
		setCvSubmissionDate(candidate.cvSubmissionDate)
		setCvSubmissionTime(candidate.cvSubmissionTime)
		setCvFormattingRemarks(candidate.cvFormattingRemarks)
		setClientInterviewStatus(candidate.clientInterviewStatus)
		setClientInterviewRemarks(candidate.clientInterviewRemarks)
		setFileName(candidate.resumeFilename)
		setInterviewsList(initialInterviewsList)
		setGraduationQualification(candidate.gradEduQuals || "");
	}

	useEffect(() => {
		const getCandidate = async () => {
			if (!user || !user.email) {
				errorDispatch({ type: 'ERROR', payload: "Please login again" })
				dispatch({ type: 'LOGOUT' })
				navigate("/login")
				return
			}
			if (candidate) {
				setGraduationQualification(candidate.gradEduQuals || graduationQualification);
			}

			try {
				const candidateResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "candidate/" + id, { withCredentials: true })

				if (candidateResponse.data) {
					setCandidate(candidateResponse.data)
					setTechnicalInterviewRemarks(candidateResponse.data.technicalInterviewRemarks)
					setTechnicalScreeningRemarks(candidateResponse.data.technicalScreeningRemarks)
					setTechnicalScreeningStatus(candidateResponse.data.technicalScreeningStatus)
					setTechnicalScreeningTime(candidateResponse.data.technicalScreeningTime)
					setCtcApprovalStatus(candidateResponse.data.ctcApprovalStatus)
					setCtcFinal(candidateResponse.data.ctcFinal)
					setCtcUpdateDate(candidateResponse.data.ctcUpdateDate)
					setCtcNegotiationRemarks(candidateResponse.data.ctcNegotiationRemarks)
					setCvFormattingStatus(candidateResponse.data.cvFormattingStatus)
					setCvSubmissionDate(candidateResponse.data.cvSubmissionDate)
					setCvSubmissionTime(candidateResponse.data.cvSubmissionTime)
					setCvFormattingRemarks(candidateResponse.data.cvFormattingRemarks)
					setClientInterviewStatus(candidateResponse.data.clientInterviewStatus)
					setClientInterviewRemarks(candidateResponse.data.clientInterviewRemarks)
					setFileName(candidateResponse.data.resumeFilename)
					setGraduationQualification(candidateResponse.data.gradEduQuals || "");
				}
				else {
					errorDispatch({ type: 'ERROR', payload: "Error getting candidate's details" })
					navigate("/candidates")
					return
				}

				await axios.get(import.meta.env.VITE_BACKEND_URL + `candidate-questionnaire/get?candidateId=${id}`, { withCredentials: true })
					.then(response => {
						if (response.data) {
							setQuestionsList(response.data);  // Ensure state is updated
							console.log("Questionnaire API Response:", response.data);


						}

						else {
							setQuestionsList([])
							setAnswersList([])
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error fetching questions list" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + `answer/get?candidateId=${id}`, { withCredentials: true })
					.then(response => {
						if (response.data)
							setAnswersList(response.data)
						else {
							setAnswersList([])
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error fetching answers list" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + `interview/${id}`, { withCredentials: true })
					.then(response => {
						if (response.data) {
							setInterviewsList(response.data)
							setInitialInterviewsList(cloneDeep(response.data))
							const updatedStagesList = ["Technical Screening"]
							response.data.forEach((interview, index) => {
								updatedStagesList.push(`Technical Interview ${index + 1}`)
							})

							for (const [index, interview] of response.data.entries()) {
								// Check if userType.id is 2 and if any of the interviewers match the employee
								if (employee.userType.id === 2) {
									if (candidateResponse.data.employee && candidateResponse.data.employee.id === employee.id) {
										setStage(1)
										setInitialStage(1)
										break;
									}

									const { firstInterviewer, secondInterviewer, thirdInterviewer } = interview;
									const isInterviewer =
										(firstInterviewer && firstInterviewer.id === employee.id) ||
										(secondInterviewer && secondInterviewer.id === employee.id) ||
										(thirdInterviewer && thirdInterviewer.id === employee.id);

									// If the employee is an interviewer, set the stage and exit the loop
									if (isInterviewer) {
										setStage(index + 2);
										setInitialStage(index + 2);
										break;
									}
								}
							}

							setStagesList([...updatedStagesList, "CTC Negotiation", "CV Formatting & Submission"])
						}
						else {
							errorDispatch({ type: 'ERROR', payload: "Error fetching interviews data" })
						}
					})
					.catch((error) => {
						console.log(error)
						errorDispatch({ type: 'ERROR', payload: "Error fetching interviews data" })
					})

				await axios.get(import.meta.env.VITE_BACKEND_URL + "candidate-status/getAll", { withCredentials: true })
					.then(response => {
						if (response.data) {
							setStatusList(response.data)
						}
						else {
							errorDispatch({ type: 'ERROR', payload: "Error fetching status" })
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Error fetching status" })
					})

				setIsLoading(false)
			}
			catch {
				errorDispatch({ type: 'ERROR', payload: "Error getting candidate's details" })
				navigate("/candidates")
				return
			}
		}

		getCandidate()

	}, [])

	const validateForm = async (e) => {
		e.preventDefault()

		if (technicalScreeningRemarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "Screening Remarks are too long" })
			return
		}

		if (technicalInterviewRemarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "Interview Remarks are too long" })
			return
		}

		if (ctcNegotiationRemarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "CTC Negotitation Remarks are too long" })
			return
		}

		if (cvFormattingRemarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "CV Formatting are too long" })
			return
		}

		if (clientInterviewRemarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "Client Interview Remarks are too long" })
			return
		}

		let candidateStatus = null;
		if (cvFormattingStatus.id === 1) {
			candidateStatus = { id: 1, name: "Passed" }
		}
		else if (cvFormattingStatus.id === 3) {
			candidateStatus = { id: 3, name: "Ongoing" }
		}

		if (candidate.job.requiredClientInterview && clientInterviewStatus.id === 1) {
			candidateStatus = { id: 1, name: "Passed" }
		}
		else if (candidate.job.requiredClientInterview && clientInterviewStatus.id === 3) {
			candidateStatus = { id: 3, name: "Ongoing" }
		}

		if (technicalScreeningStatus.id === 2 || ctcApprovalStatus.id === 2 || cvFormattingStatus.id === 2) {
			candidateStatus = { id: 2, name: "Rejected" }
		}
		else if (technicalScreeningStatus.id === 4 || ctcApprovalStatus.id === 4 || cvFormattingStatus.id === 4) {
			candidateStatus = { id: 4, name: "On Hold" }
		}

		if (candidate.job.requiredClientInterview && clientInterviewStatus.id === 2) {
			candidateStatus = { id: 2, name: "Rejected" }
		}
		else if (candidate.job.requiredClientInterview && clientInterviewStatus.id === 4) {
			candidateStatus = { id: 4, name: "On Hold" }
		}

		for (const interview of interviewsList) {
			if (interview.interviewStatus.id === 2) {
				candidateStatus = { id: 2, name: "Rejected" }
			}
			else if (interview.interviewStatus.id === 4) {
				candidateStatus = { id: 4, name: "On Hold" }
			}
		}

		let file = null
		if (fileInputRef.current)
			file = fileInputRef.current.files[0];
		if (file) {
			setFileName(file.name)
		}

		try {
			const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "candidate/add",
				{
					id: candidate.id,
					firstName: candidate.firstName,
					lastName: candidate.lastName,
					location: candidate.location,
					totalWorkExperience: candidate.totalWorkExperience,
					graduationQualification: candidate.gradEduQuals,
					postGraduationQualification: candidate.postGradEduQuals,
					graduationDiscipline: candidate.gradDiscipline,
					postGraduationDiscipline: candidate.postGradDiscipline,
					graduationYearOfPassing: candidate.gradYearOfPassing,
					postGraduationYearOfPassing: candidate.postGradYearOfPassing,
					graduationModeOfEducation: candidate.gradModeOfEducation,
					postGraduationModeOfEducation: candidate.postGradModeOfEducation,
					phoneNo: candidate.phoneNo,
					email: candidate.email,
					currentCTC: candidate.currentCTC,
					expectedCTC: candidate.expectedCTC,
					job: candidate.job,
					category: candidate.category,
					candidateUploadDate: candidate.candidateUploadDate,
					remarks: candidate.remarks,
					skills: candidate.skills,
					candidateStatus: candidateStatus,
					employee: candidate.employee ? candidate.employee : null,
					resumeFilename: fileName,
					technicalScreeningTime: technicalScreeningTime,
					technicalScreeningStatus: technicalScreeningStatus,
					technicalScreeningRemarks: technicalScreeningRemarks,
					technicalInterviewRemarks: technicalInterviewRemarks,
					ctcApprovalStatus: ctcApprovalStatus,
					ctcNegotiationRemarks: ctcNegotiationRemarks,
					ctcUpdateDate: ctcUpdateDate,
					ctcFinal: ctcFinal,
					clientInterviewStatus: clientInterviewStatus,
					clientInterviewRemarks: clientInterviewRemarks,
					cvFormattingStatus: cvFormattingStatus,
					cvFormattingRemarks: cvFormattingRemarks,
					cvSubmissionDate: cvSubmissionDate,
					cvSubmissionTime: cvSubmissionTime
				},
				{ withCredentials: true })

			if (file) {
				if (candidate.resumeFilename !== '')
					await axios.delete(import.meta.env.VITE_BACKEND_URL + `resume/delete/${candidate.id.toString() + candidate.resumeFilename}`, { withCredentials: true })

				const renamedFile = new File([file], candidate.id.toString() + file.name, {
					type: file.type,
					lastModified: file.lastModified
				})
				const formData = new FormData();
				formData.append('file', renamedFile);

				await axios.post(import.meta.env.VITE_BACKEND_URL + "resume/upload", formData, {
					withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }
				})
					.then(response => {
						if (!response.data) {
							errorDispatch({ type: 'ERROR', payload: "Couldn't upload resume" })
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Couldn't upload resume" })
					})
			}

			for (const interview of interviewsList) {
				await axios.post(import.meta.env.VITE_BACKEND_URL + "interview/add", interview, { withCredentials: true })
					.then(response => {
						if (!response.data) {
							errorDispatch({ type: 'ERROR', payload: "Error adding interview data" })
						}
						else {
							navigate("/candidates")
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error adding interview data" }) })
			}
		}
		catch {
			errorDispatch({ type: 'ERROR', payload: "Error saving candidate data" })
		}
	}

	if (isLoading)
		return <Loading />

	return (

		<div className="flex flex-col w-3/4 h-11/12 justify-start overflow-y-scroll items-center bg-theme_gray drop-shadow-lg rounded-xl my-2 p-3">
			<div className="w-full flex items-start py-3">
				<button
					type="button"
					onClick={() => window.history.back()}
					className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
				>
					Back
				</button>
			</div>
			<div className="flex w-full justify-between items-center">
				<div className="w-7/12 flex flex-col justify-center items-center">
					<div className="font-bold w-full text-lg">
						{candidate.firstName + " " + candidate.lastName}
					</div>
					<div className="w-full">
						{candidate.postGraduationQualification && candidate.postGraduationYearOfPassing && candidate.postGraduationQualification.name + ", " + candidate.postGraduationYearOfPassing}
					</div>
					<div className="w-full">
						{candidate?.graduationQualification?.name
							? candidate.graduationQualification.name + ", " + candidate.graduationYearOfPassing
							: "No Graduation Details"}
					</div>


					<div className="w-full flex justify-between items-center my-1">
						<div className="flex items-center w-1/2">
							<img src={mailIcon} className="h-5 mr-2" />
							{candidate.email}
						</div>
						<div className="flex items-center w-1/2">
							<img src={phoneIcon} className="h-5 mr-2" />
							{candidate.phoneNo}
						</div>
					</div>
					<div className="w-full flex justify-between items-center">
						<div className="flex items-center w-1/2">
							<img src={timeIcon} className="h-5 mr-2" />
							{candidate.totalWorkExperience} years of experience
						</div>
						<div className="flex items-center w-1/2">
							<img src={downloadIcon} className="h-5 mr-2 cursor-pointer" onClick={() => { downloadFile(candidate.resumeFilename, candidate.id, errorDispatch) }} />
							Download CV
						</div>
					</div>
				</div>
				<div className="w-5/12 flex flex-col justify-center items-end">
					<div className="flex justify-end items-center w-1/2">
						{candidate.job.jobTitle.name}
					</div>
					<div className="flex justify-end items-center w-1/2">
						{candidate.job.project.name}
					</div>
					<div className="flex justify-end items-center w-1/2">
						<img src={locationIcon} className="h-5 mr-2 cursor-pointer" />
						{candidate.location.name}
					</div>
				</div>
			</div>


			<div className="flex w-full justify-between items-center my-2">
				<div>
					<span className="font-bold">Skills: </span>
					{expanded ? candidate.skills : `${candidate.skills.slice(0, maxChars)}...`}
					{candidate.skills.length > maxChars && (
						<button
							onClick={toggleExpanded}
							className="text-blue-500 ml-2 underline"
						>
							{expanded ? "See Less" : "See More"}
						</button>
					)}
				</div>
				<div>
					<span className="font-bold">Skill Match:</span> 84%
				</div>
			</div>

			{questionsList && <QuestionAnswerPagination questionsList={questionsList} answersList={answersList} />}

			<div className="w-full flex flex-col justify-center items-start mt-4">
				<div className="flex justify-center items-center w-full">
					{(employee.userType.id !== 2 || (candidate.employee && candidate.employee.id === employee.id)) && <StageButton icon={techScreeningIcon} highlighted={stage === 1} status={technicalScreeningStatus} onClick={() => { setStage(1) }} />}
					{interviewsList.map((interview, index) => {
						if (interview.interviewStatus && !disabilityCheck(index))
							return (
								<StageButton key={interview.interviewId} highlighted={stage === index + 2} icon={interviewIcon} status={interview.interviewStatus} onClick={() => {
									if (index === 0) {
										if (technicalScreeningStatus.id === 1) {
											setStage(2 + index)
										}
									}
									else {
										if (interviewsList[index - 1].interviewStatus.id === 1) {
											setStage(2 + index)
										}
									}
								}} />
							)
					})}
					{employee.userType.id !== 2 && (
						<>
							<StageButton
								icon={ctcIcon}
								highlighted={stage === (stagesList.length - 1)}
								status={ctcApprovalStatus}
								onClick={() => {
									if (interviewsList[interviewsList.length - 1].interviewStatus.id === 1) {
										setStage(stagesList.length - 1);
									}
								}}
							/>
							<StageButton
								icon={techScreeningIcon}
								highlighted={stage === stagesList.length}
								status={cvFormattingStatus}
								onClick={() => {
									if (ctcApprovalStatus.id === 1) {
										setStage(stagesList.length);
									}
								}}
							/>
							{candidate.job.requiredClientInterview && (
								<StageButton
									icon={interviewIcon}
									highlighted={stage === (stagesList.length + 1)}
									status={clientInterviewStatus}
									onClick={() => {
										if (cvFormattingStatus.id === 1) {
											setStage(stagesList.length + 1);
										}
									}}
								/>
							)}
						</>
					)}
				</div>

				{stage === 1 && <>
					<div className="flex w-full justify-between items-center">
						<div className="flex justify-start items-center text-lg">
							Technical Screening
						</div>
						<div className="flex justify-around items-center mt-1">
							<InputRadio id="candidateStatus" label="Status: " list={statusList} wrap={true} setFunction={setTechnicalScreeningStatus} value={technicalScreeningStatus} disabled={interviewsList[0]?.interviewStatus?.id !== 3 &&
								(employee?.userType?.id === 2 && employee?.id !== candidate?.employee?.id)} />
						</div>
					</div>
					<div className="flex flex-col justify-center items-start w-full">
						<label className="font-medium">
							Screening Time:
						</label>
						<TimeInput value={technicalScreeningTime} setFunction={setTechnicalScreeningTime} />
					</div>
					<div className="w-full flex justify-center items-center">
						<TextAreaInput label={technicalScreeningStatus.id !== 2 ? "Technical Screening Remarks: " : "Reason for Rejection: "} value={technicalScreeningRemarks} bg="bg-gray-200" setFunction={setTechnicalScreeningRemarks} maxLen={500} />
					</div>
				</>}

				{(stage > 1 && stage < stagesList.length - 1 && !disabilityCheck(stage - 2)) && (
					<>
						<div className="flex w-full justify-between items-center">
							<div className="flex justify-start items-center text-lg">
								Round {stage - 1}
							</div>
							<div className="flex justify-around items-center mt-1">
								<InputRadio
									id="candidateStatus"
									label="Status: "
									list={statusList}
									wrap={true}
									value={interviewsList[stage - 2].interviewStatus}
									setFunction={handleInterviewStatusChange}
									disabled={() => {
										return (stage === 2
											? technicalScreeningStatus?.id !== 1
											: stage > 2
												? (interviewsList[stage - 1]?.interviewStatus?.id !== 3)
												: disabilityCheck(stage - 2)) ||
											(stage - 2 === interviewsList.length
												? ctcApprovalStatus.id !== 3
												: interviewsList[stage - 1]?.interviewStatus?.id !== 3)
									}
									}
								/>
							</div>
						</div>
						<div className="flex w-full justify-between items-center">
							<div className="flex justify-start items-center text-base">
								<img src={personIcon} className="h-5" alt="Person Icon" />
								<div className="ml-4">
									{!(
										interviewsList[stage - 2].firstInterviewer ||
										interviewsList[stage - 2].secondInterviewer ||
										interviewsList[stage - 2].thirdInterviewer
									) && "Unassigned"}
									{interviewsList[stage - 2].firstInterviewer &&
										interviewsList[stage - 2].firstInterviewer.employeeDetails.name}
									{interviewsList[stage - 2].firstInterviewer && interviewsList[stage - 2].secondInterviewer && ", "}
									{interviewsList[stage - 2].secondInterviewer &&
										interviewsList[stage - 2].secondInterviewer.employeeDetails.name}
									{interviewsList[stage - 2].secondInterviewer && interviewsList[stage - 2].thirdInterviewer && ", "}
									{interviewsList[stage - 2].thirdInterviewer &&
										interviewsList[stage - 2].thirdInterviewer.employeeDetails.name}
								</div>
							</div>
						</div>
						<div className="w-full flex justify-between items-center mt-2">
							<div className="flex flex-col">
								<label htmlFor="PlannedDate" className="font-medium">
									Planned Date of Interview
								</label>
								<input
									id="PlannedDate"
									type="date"
									disabled={() => {
										return (stage === 2
											? technicalScreeningStatus?.id !== 1
											: stage > 2
												? (interviewsList[stage - 1]?.interviewStatus?.id !== 3)
												: disabilityCheck(stage - 2)) ||
											(stage - 2 === interviewsList.length
												? ctcApprovalStatus.id !== 3
												: interviewsList[stage - 1]?.interviewStatus?.id !== 3)
									}
									}
									className="py-1 px-3 rounded-sm bg-gray-200"
									value={interviewsList[stage - 2].plannedDateForInterview || ""}
									onChange={(e) => handleInterviewPlannedDateChange(e, stage - 2)}
								/>
							</div>
							<div className="flex flex-col mr-1">
								<label htmlFor="ActualDate" className="font-medium">
									Actual Date of Interview
								</label>
								<input
									id="ActualDate"
									type="date"
									disabled={() => {
										return (stage === 2
											? technicalScreeningStatus?.id !== 1
											: stage > 2
												? (interviewsList[stage - 1]?.interviewStatus?.id !== 3)
												: disabilityCheck(stage - 2)) ||
											(stage - 2 === interviewsList.length
												? ctcApprovalStatus.id !== 3
												: interviewsList[stage - 1]?.interviewStatus?.id !== 3)
									}
									}
									className="py-1 px-3 rounded-sm bg-gray-200"
									value={interviewsList[stage - 2].actualDateForInterview || ""}
									onChange={(e) => handleInterviewActualDateChange(e, stage - 2)}
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center">
							<TextAreaInput
								label={
									interviewsList[stage - 2].interviewStatus.id !== 2
										? "Technical Interview Remarks: "
										: "Reason for Rejection: "
								}
								value={technicalInterviewRemarks}
								bg="bg-gray-200"
								setFunction={setTechnicalInterviewRemarks}
								maxLen={500}
								disabled={() => {
									return (stage === 2
										? technicalScreeningStatus?.id !== 1
										: stage > 2
											? (interviewsList[stage - 1]?.interviewStatus?.id !== 3)
											: disabilityCheck(stage - 2)) ||
										(stage - 2 === interviewsList.length
											? ctcApprovalStatus.id !== 3
											: interviewsList[stage - 1]?.interviewStatus?.id !== 3)
								}
								}
							/>
						</div>
					</>
				)}

				{stage === (stagesList.length - 1) && employee.userType.id !== 2 && <>
					<div className="flex w-full justify-between items-center">
						<div className="flex justify-start items-center text-lg">
							CTC Negotiation
						</div>
						<div className="flex justify-around items-center mt-1">
							<InputRadio id="candidateStatus" label="Status: " list={statusList} wrap={true} setFunction={setCtcApprovalStatus} value={ctcApprovalStatus} disabled={cvFormattingStatus.id !== 3} />
						</div>
					</div>
					<div className="flex w-full justify-between items-center">
						<div className="flex items-end">
							<FloatInput id="ctcFinal" label="Final CTC" value={ctcFinal} setFunction={setCtcFinal} />
						</div>
						<div className="flex flex-col justify-start">
							<label htmlFor="cvDate" className="font-medium">CTC Update Date</label>
							<input id="cvDate" type="date" value={ctcUpdateDate} className="py-1 px-3 rounded-sm bg-gray-200" onChange={(e) => setCtcUpdateDate(e.target.value)} />
						</div>
					</div>
					<div className="w-full flex justify-center items-center">
						<TextAreaInput label={ctcApprovalStatus.id !== 2 ? "CTC Negotiation Remarks: " : "Reason for Rejection: "} value={ctcNegotiationRemarks} bg="bg-gray-200" setFunction={setCtcNegotiationRemarks} maxLen={500} />
					</div>
				</>}

				{stage === stagesList.length && employee.userType.id !== 2 && <>
					<div className="flex w-full justify-between items-center">
						<div className="flex justify-start items-center text-lg">
							CV Formatting & Submission
						</div>
						<div className="flex justify-around items-center mt-1">
							<InputRadio id="candidateStatus" label="Status: " list={statusList} wrap={true} setFunction={setCvFormattingStatus} value={cvFormattingStatus} disabled={candidate.job.requiredClientInterview ? clientInterviewStatus.id !== 3 : false} />
						</div>
					</div>
					<div className="w-full flex flex-col justify-center items-start">
						<div className="w-full flex justify-between items-center">
							<div className="flex items-center">
								<input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
								<img src={uploadIcon} className="h-8 cursor-pointer" onClick={handleButtonClick} />
								<div className="flex flex-col justify-around items-start m-2 h-8">
									<div className="w-full h-1/2">
										{fileName}
									</div>
									<div className="w-full h/1-2">
										Maximum File Size: 20MB
									</div>
								</div>
							</div>

							<div className="mb-4 flex flex-col justify-center items-start my-2">
								<label className="font-medium">
									CV Submission Time:
								</label>
								<TimeInput value={cvSubmissionTime} setFunction={setCvSubmissionTime} />
							</div>

							<div className="flex flex-col">
								<label htmlFor="cvDate" className="font-medium">CV Submission Date</label>
								<input id="cvDate" type="date" value={cvSubmissionDate} className="py-1 px-3 rounded-sm bg-gray-200" onChange={e => setCvSubmissionDate(e.target.value)} />
							</div>
						</div>
						<TextAreaInput label={cvFormattingStatus.id !== 2 ? "CV Formatting Remarks: " : "Reason for Rejection: "} value={cvFormattingRemarks} bg="bg-gray-200" setFunction={setCvFormattingRemarks} maxLen={500} />
					</div>
				</>}

				{stage === (stagesList.length + 1) && employee.userType.id !== 2 && <>
					<div className="flex w-full justify-between items-center">
						<div className="flex justify-start items-center text-lg">
							Client Interview
						</div>
						<div className="flex justify-around items-center mt-1">
							<InputRadio id="candidateStatus" label="Status: " list={statusList} wrap={true} setFunction={setClientInterviewStatus} value={clientInterviewStatus} />
						</div>
					</div>
					<div className="w-full flex justify-center items-center">
						<TextAreaInput label={clientInterviewStatus.id !== 2 ? "Client Interview Remarks: " : "Reason for Rejection: "} value={clientInterviewRemarks} bg="bg-gray-200" setFunction={setClientInterviewRemarks} maxLen={500} />
					</div>
				</>}

				<div className="flex justify-between items-center w-full">
					{employee.userType.id !== 2 && <button onClick={() => navigate(`/candidates/${candidate.id}/edit`, { state: { candidate } })} className="h-10 w-32 rounded-md flex justify-center items-center cursor-pointer bg-blue-300">
						Reassign
					</button>}
					<div className="flex justify-end items-center">
						<button type="reset" onClick={handleReset} className="h-10 w-32 rounded-md flex justify-center items-center cursor-pointer bg-theme_red">
							Reset
						</button>
						<button type="submit" className="h-10 w-32 rounded-md flex justify-center items-center cursor-pointer bg-theme_green ml-5" onClick={validateForm}>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>

	)
}