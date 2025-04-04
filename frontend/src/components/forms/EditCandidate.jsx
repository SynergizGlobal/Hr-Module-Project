import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

import TextInput from "../inputs/TextInput"
import FloatInput from "../inputs/FloatInput"
import SelectInput from "../inputs/SelectInput";
import TextAreaInput from "../inputs/TextAreaInput";
import QuestionAnswerInput from "../inputs/QuestionAnswerInput";

import addImage from "../../assets/plus.png"
import uploadIcon from '../../assets/upload.png'
import OverlayInput from "../inputs/OverlayInput";
import { useErrorContext } from "../../hook/useErrorContext"
import Loading from "../Loading"
import { useAuthContext } from "../../hook/useAuthContext"
import OverlayQuestionInput from "../inputs/OverlayQuestionInput"
import AssignEmployee from "../AssignEmployee"
import { useEmployeeContext } from "../../hook/useEmployeeContext"
import InterviewPagination from "../InterviewPagination"
import { cloneDeep } from "lodash"

export default function EditCandidate() {
	const navigate = useNavigate()
	const navLocation = useLocation()
	const [isLoading, setIsLoading] = useState(true)
	const { user, dispatch } = useAuthContext()
	const { errorDispatch } = useErrorContext()
	const [trigger, setTrigger] = useState(false)
	const { candidate } = navLocation.state || null
	const fileInputRef = useRef(null);

	/* Form data */
	const [firstName, setFirstName] = useState(candidate.firstName)
	const [lastName, setLastName] = useState(candidate.lastName)
	const [email, setEmail] = useState(candidate.email)
	const [mobileNumber, setMobileNumber] = useState(candidate.phoneNo)
	const [workExp, setWorkExp] = useState(candidate.totalWorkExperience)
	const [job, setJob] = useState(candidate.job)
	const [gradEduQuals, setGradEduQuals] = useState(candidate.graduationQualification)
	const [gradYearOfPassing, setGradYearOfPassing] = useState(candidate.graduationYearOfPassing)
	const [gradDiscipline, setGradDiscipline] = useState(candidate.graduationDiscipline)
	const [gradModeOfEducation, setGradModeOfEducation] = useState(candidate.graduationModeOfEducation)
	const [postGradEduQuals, setPostGradEduQuals] = useState(candidate.postGraduationQualification)
	const [postGradYearOfPassing, setPostGradYearOfPassing] = useState(candidate.postGraduationYearOfPassing)
	const [postGradDiscipline, setPostGradDiscipline] = useState(candidate.postGraduationDiscipline)
	const [postGradModeOfEducation, setPostGradModeOfEducation] = useState(candidate.postGraduationModeOfEducation)
	const [skills, setSkills] = useState(candidate.skills)
	const [expCTC, setExpCTC] = useState(candidate.expectedCTC)
	const [currCTC, setCurrCTC] = useState(candidate.currentCTC)
	const [location, setLocation] = useState(candidate.location)
	const [remarks, setRemarks] = useState(candidate.remarks)
	const ongoingStatus = { id: 3, name: "Ongoing" }
	const [candidateStatus, setCandidateStatus] = useState(candidate.candidateStatus)
	const [fileName, setFileName] = useState(candidate.resumeFilename)
	const [technicalScreeningTime, setTechnicalScreeningTime] = useState(candidate.technicalScreeningTime)
	const [technicalScreeningStatus, setTechnicalScreeningStatus] = useState(candidate.technicalScreeningStatus)
	const [technicalScreeningRemarks, setTechnicalScreeningRemarks] = useState(candidate.technicalScreeningRemarks)
	const [technicalInterviewRemarks, setTechnicalInterviewRemarks] = useState(candidate.technicalInterviewRemarks)
	const [ctcApprovalStatus, setCtcApprovalStatus] = useState(candidate.ctcApprovalStatus)
	const [ctcNegotiationRemarks, setCtcNegotiationRemarks] = useState(candidate.ctcNegotiationRemarks)
	const [ctcUpdateDate, setCtcUpdateDate] = useState(candidate.ctcUpdateDate)
	const [ctcFinal, setCtcFinal] = useState(candidate.ctcFinal)
	const [clientInterviewStatus, setClientInterviewStatus] = useState(candidate.clientInterviewStatus)
	const [clientInterviewRemarks, setClientInterviewRemarks] = useState(candidate.clientInterviewRemarks)
	const [cvFormattingStatus, setCvFormattingStatus] = useState(candidate.cvFormattingStatus)
	const [cvFormattingRemarks, setCvFormattingRemarks] = useState(candidate.cvFormattingRemarks)
	const [cvSubmissionDate, setCvSubmissionDate] = useState(candidate.cvSubmissionDate)
	const [cvSubmissionTime, setCvSubmissionTime] = useState(candidate.cvSubmissionTime)
	const [questionnaireError, setQuestionnaireError] = useState("");
	const [showPostGraduation, setShowPostGraduation] = useState(
		candidate.postGraduationQualification || candidate.postGraduationYearOfPassing ||
			candidate.postGraduationDiscipline || candidate.postGraduationModeOfEducation ? true : false
	);

	/* Fetched data from database */
	const [locationsList, setLocationsList] = useState(null)
	const [qualsList, setQualsList] = useState(null)
	const [disciplineList, setDisciplineList] = useState(null)
	const [modesOfEducationList, setModesOfEducationList] = useState(null)
	const [jobsList, setJobsList] = useState(null)
	const [selectedQuestions, setSelectedQuestions] = useState([])
	const [answersList, setAnswersList] = useState([])
	const [initialInterviewsList, setInitialInterviewsList] = useState([])
	const [interviewsList, setInterviewsList] = useState([])
	const { isOpen, employeeDispatch } = useEmployeeContext();


	// Overlay Data
	const [showOverlay, setShowOverlay] = useState(null)
	const [overlayId, setOverlayId] = useState(null)
	const [overlayLabel, setOverlayLabel] = useState(null)
	const [overlayUrl, setOverlayUrl] = useState(null)
	const [maxLen, setMaxLen] = useState(0)

	// Question Overlay Data
	const [showQuestionOverlay, setShowQuestionOverlay] = useState(false)
	// Reset Function to Clear All Fields
	const resetFields = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setMobileNumber("");
		setJob(null); // Reset job selection
		setWorkExp("");
		setPostGradEduQuals("");
		setPostGradYearOfPassing("");
		setPostGradDiscipline("");
		setPostGradModeOfEducation("");
	};

	useEffect(() => {
		console.log(candidate)
		const fetchQuestions = async () => {
			if (!user || !user.email) {
				errorDispatch({ type: 'ERROR', payload: "You must login again" })
				dispatch({ type: 'LOGOUT' })
				navigate("/login")
			}
			if (candidate.job.id === job.id) {
				await axios.get(import.meta.env.VITE_BACKEND_URL + "candidate-questionnaire/get?candidateId=" + candidate.id, { withCredentials: true })
					.then(response => {
						if (response.data) {
							handleQuestionChange(response.data)
						}
						else {
							setSelectedQuestions([])
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Error fetching questions" })
					})
			}
			else {
				await axios.get(import.meta.env.VITE_BACKEND_URL + "default-questionnaire/get?jobId=" + job.id, { withCredentials: true })
					.then(response => {
						if (response.data) {
							{ job && fetchAnswers() }
							handleQuestionChange(response.data)
						}
						else {
							setSelectedQuestions([])
							setAnswersList([])
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Error fetching questions" })
					})
			}
		}

		const fetchAnswers = async () => {
			if (candidate.job.id === job.id) {
				await axios.get(import.meta.env.VITE_BACKEND_URL + "answer/get?candidateId=" + candidate.id, { withCredentials: true })
					.then(response => {
						if (response.data) {
							setAnswersList(response.data)
						}
					})
			}
		}
		{ job && fetchQuestions() }
		{ job && fetchAnswers() }
	}, [job, trigger])

	useEffect(() => {
		const fetchData = async () => {
			if (!user || !user.email) {
				errorDispatch({ type: 'ERROR', payload: "You must login again" })
				dispatch({ type: 'LOGOUT' })
				navigate("/login")
			}


			try {
				await axios.get(import.meta.env.VITE_BACKEND_URL + "job/getAll", { withCredentials: true })
					.then(response => {
						if (response.data) {
							setJobsList(response.data)
						}
						else {
							errorDispatch({ type: 'ERROR', payload: "Error fetching jobs" })
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Error fetching jobs" })
					})
					.catch(() => [
						errorDispatch({ type: 'ERROR', payload: "Error fetching jobs" })
					])
				await axios.get(import.meta.env.VITE_BACKEND_URL + "location/getAll", { withCredentials: true })
					.then(response => {
						if (response.data)
							setLocationsList(response.data)
						else {
							errorDispatch({ type: 'ERROR', payload: "Error fetching locations" })
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error fetching locations" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + "qualification/getAll", { withCredentials: true })
					.then(response => {
						if (response.data)
							setQualsList(response.data)
						else
							errorDispatch({ type: 'ERROR', payload: "Error getting qualification" })
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error getting qualification" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + "discipline/getAll", { withCredentials: true })
					.then(response => {
						if (response.data)
							setDisciplineList(response.data)
						else {
							errorDispatch({ type: 'ERROR', payload: "Error getting discipline" })
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error getting discipline" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + "modeOfEducation/getAll", { withCredentials: true })
					.then(response => {
						if (response.data)
							setModesOfEducationList(response.data)
						else {
							errorDispatch({ type: 'ERROR', payload: "Error getting modes of education" })
						}
					})
					.catch(() => { errorDispatch({ type: 'ERROR', payload: "Error getting modes of education" }) })

				await axios.get(import.meta.env.VITE_BACKEND_URL + `interview/${candidate.id}`, { withCredentials: true })
					.then(response => {
						if (response.data) {
							setInterviewsList(response.data)
							setInitialInterviewsList(cloneDeep(response.data))
						}
						else {
							errorDispatch({ type: 'ERROR', payload: "Error getting interviews" })
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Error getting interviews" })
					})

				setIsLoading(false)
			}
			catch (error) {
				errorDispatch({ type: 'ERROR', payload: "There was a server error" })
			}
		}
		fetchData();
	}, [])

	const validateForm = async (e) => {
		e.preventDefault();
		if (!user || !user.email) {
			errorDispatch({ type: 'ERROR', payload: "You must login again" })
			dispatch({ type: 'LOGOUT' })
			navigate("/login")
		}
		setIsLoading(true);
		// Check if the Questionnaire is empty
		if (selectedQuestions.length === 0) {
			setQuestionnaireError("Please add at least one question before submitting.");
			setIsLoading(false);
			return;
		} else {
			setQuestionnaireError(""); // Clear error when valid
		}

		if (firstName === "") {
			errorDispatch({ type: 'ERROR', payload: "First name is empty" })
			setIsLoading(false);
			return;
		}

		const nameRegex = /^[a-zA-Z\u00C0-\u00FF\s]+$/

		if (firstName.length > 50) {
			errorDispatch({ type: 'ERROR', payload: "First name is too long" })
			setIsLoading(false);
			return;
		}

		if (!nameRegex.test(firstName)) {
			errorDispatch({ type: 'ERROR', payload: "Invalid characters in first name" })
			setIsLoading(false);
			return;
		}

		if (lastName.length > 50) {
			errorDispatch({ type: 'ERROR', payload: "Last name is too long" })
			setIsLoading(false);
			return;
		}

		if (!nameRegex.test(lastName)) {
			errorDispatch({ type: 'ERROR', payload: "Invalid characters in first name" })
			setIsLoading(false);
			return;
		}
		if (mobileNumber.length !== 10) {
			errorDispatch({ type: 'ERROR', payload: "Mobile number must be exactly 10 digits." });
			setIsLoading(false);
			return;
		}

		const phoneRegex = /^\+?([0-9]{1,3})?[-.●\s]?(\(?([0-9]{1,4})\)?[-.●\s]?)?([0-9]{1,4})[-.●\s]?([0-9]{1,4})[-.●\s]?([0-9]{1,9})$/;

		if (!phoneRegex.test(mobileNumber)) {
			errorDispatch({ type: 'ERROR', payload: "Phone number is invalid" })
			setIsLoading(false);
			return;
		}

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

		if (!emailRegex.test(email)) {
			errorDispatch({ type: 'ERROR', payload: "Email is invalid" })
			setIsLoading(false);
			return;
		}

		if (workExp < 0) {
			errorDispatch({ type: 'ERROR', payload: "Work Experience cannot be < 0" })
			setIsLoading(false);
			return;
		}

		if (remarks.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "Remarks is way too long (limit: 500 characters)" })
			setIsLoading(false);
			return;
		}

		if (skills.length > 500) {
			errorDispatch({ type: 'ERROR', payload: "Skills is way too long (limit: 500 characters)" })
			setIsLoading(false);
			return;
		}

		if (!location) {
			errorDispatch({ type: 'ERROR', payload: "Please select Location" })
			setIsLoading(false);
			return;
		}

		if (!gradEduQuals) {
			errorDispatch({ type: 'ERROR', payload: "Please select Graduation Qualification" })
			setIsLoading(false);
			return;
		}

		if (!job) {
			errorDispatch({ type: 'ERROR', payload: "Please select Job" })
			setIsLoading(false);
			return;
		}

		if (!gradDiscipline) {
			errorDispatch({ type: 'ERROR', payload: "Please select Discipline" })
			setIsLoading(false);
			return;
		}

		if (!gradModeOfEducation) {
			errorDispatch({ type: 'ERROR', payload: "Please select Mode of Education" })
			setIsLoading(false)
			return
		}

		if (!gradYearOfPassing) {
			errorDispatch({ type: 'ERROR', payload: "Please set Year of Passing" })
			setIsLoading(false)
			return
		}

		if (!candidateStatus) {
			errorDispatch({ type: 'ERROR', payload: "Please select Status" })
			setIsLoading(false);
			return;
		}

		const file = fileInputRef.current.files[0];
		if (file) {
			setFileName(file.name)
		}

		try {
			const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "candidate/add",
				{
					id: candidate.id,
					firstName: firstName,
					lastName: lastName,
					location: location,
					totalWorkExperience: workExp,
					graduationQualification: gradEduQuals,
					postGraduationQualification: postGradEduQuals,
					graduationDiscipline: gradDiscipline,
					postGraduationDiscipline: postGradDiscipline,
					graduationYearOfPassing: gradYearOfPassing,
					postGraduationYearOfPassing: postGradYearOfPassing,
					graduationModeOfEducation: gradModeOfEducation,
					postGraduationModeOfEducation: postGradModeOfEducation,
					phoneNo: mobileNumber,
					email: email,
					currentCTC: currCTC,
					expectedCTC: expCTC,
					job: job,
					category: job.category,
					candidateUploadDate: candidate.candidateUploadDate,
					remarks: remarks,
					skills: skills,
					candidateStatus: candidateStatus,
					employee: job.interviewer,
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

			if (!response.data) {
				errorDispatch({ type: 'ERROR', payload: "Error creating candidate" })
				setIsLoading(false);
			}

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

			if (selectedQuestions) {
				try {
					await axios.delete(import.meta.env.VITE_BACKEND_URL + "candidate-questionnaire/delete?id=" + candidate.id, { withCredentials: true })

					for (const item of selectedQuestions) {
						await axios.post(import.meta.env.VITE_BACKEND_URL + "candidate-questionnaire/add",
							{
								question: item,
								candidate: response.data
							},
							{ withCredentials: true });
					}
				}
				catch {
					errorDispatch({ type: 'ERROR', payload: "Error submitting questionnaire" })
				}
			}

			if (answersList) {
				try {
					for (const item of answersList) {
						await axios.delete(import.meta.env.VITE_BACKEND_URL + "answer/delete?questionId=" + item.question.questionId + "&candidateId=" + response.data.id, { withCredentials: true })

						await axios.post(import.meta.env.VITE_BACKEND_URL + "answer/add",
							{
								candidate: response.data,
								answer: item.answer,
								question: item.question
							},
							{ withCredentials: true })
					}
				}
				catch (error) {
					errorDispatch({ type: 'ERROR', payload: "Failed to add answers" });
				}
			}

			if (interviewsList) {
				try {
					await axios.delete(`${import.meta.env.VITE_BACKEND_URL}interview/delete?candidateId=${candidate.id}`, { withCredentials: true });

					for (const item of interviewsList) {
						try {
							const interviewResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}interview/add`, {
								...item,
								candidate: response.data
							}, { withCredentials: true });

							if (interviewResponse.data) {
								const requests = []

								if (interviewResponse.data.firstInterviewer) {
									requests.push(axios.post(`${import.meta.env.VITE_BACKEND_URL}mail/send`, {
										toEmail: interviewResponse.data.firstInterviewer.employeeDetails.email,
										subject: "New Interview Assignment",
										body: `
        <html>
          <body>
            <div style="border: 2px solid #FA7A4F; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px;">
              <h3 style="font-size: 18px; margin-top: 0; color: #000;">Dear ${interviewResponse.data.firstInterviewer.employeeDetails.name},</h3>
              <p>
                You have been assigned a new candidate for an interview. 
                Please visit the link below for details:
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${import.meta.env.VITE_FRONTEND_URL}candidates/${response.data.id}" 
                   style="display: inline-block; width: 200px; background-color: #FA7A4F; color: white; font-weight: bold; text-decoration: none; border-radius: 5px; text-align: center; padding: 10px 0; line-height: 24px;">
                  View Candidate Details
                </a>
              </div>
              <br><br>
              <p>Thank you for your time and support.</p>
              <p>Best regards,</p>
              <p><strong>HR Department</strong></p>
            </div>
          </body>
        </html>
      `
									}, { withCredentials: true }))
								}

								if (interviewResponse.data.secondInterviewer) {
									requests.push(axios.post(`${import.meta.env.VITE_BACKEND_URL}mail/send`, {
										toEmail: interviewResponse.data.secondInterviewer.employeeDetails.email,
										subject: "New Interview Assignment",
										body: `
        <html>
          <body>
            <div style="border: 2px solid #FA7A4F; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px;">
              <h3 style="font-size: 18px; margin-top: 0; color: #000;">Dear ${interviewResponse.data.secondInterviewer.employeeDetails.name},</h3>
              <p>
                You have been assigned a new candidate for an interview. 
                Please visit the link below for details:
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${import.meta.env.VITE_FRONTEND_URL}candidates/${response.data.id}" 
                   style="display: inline-block; width: 200px; background-color: #FA7A4F; color: white; font-weight: bold; text-decoration: none; border-radius: 5px; text-align: center; padding: 10px 0; line-height: 24px;">
                  View Candidate Details
                </a>
              </div>
              <br><br>
              <p>Thank you for your time and support.</p>
              <p>Best regards,</p>
              <p><strong>HR Department</strong></p>
            </div>
          </body>
        </html>
      `
									}, { withCredentials: true }))
								}

								if (interviewResponse.data.thirdInterviewer) {
									requests.push(axios.post(`${import.meta.env.VITE_BACKEND_URL}mail/send`, {
										toEmail: interviewResponse.data.thirdInterviewer.employeeDetails.email,
										subject: "New Interview Assignment",
										body: `
        <html>
          <body>
            <div style="border: 2px solid #FA7A4F; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px;">
              <h3 style="font-size: 18px; margin-top: 0; color: #000;">Dear ${interviewResponse.data.thirdInterviewer.employeeDetails.name},</h3>
              <p>
                You have been assigned a new candidate for an interview.
                Please visit the link below for details:
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${import.meta.env.VITE_FRONTEND_URL}candidates/${response.data.id}"
                   style="display: inline-block; width: 200px; background-color: #FA7A4F; color: white; font-weight: bold; text-decoration: none; border-radius: 5px; text-align: center; padding: 10px 0; line-height: 24px;">
                  View Candidate Details
                </a>
              </div>
              <br><br>
              <p>Thank you for your time and support.</p>
              <p>Best regards,</p>
              <p><strong>HR Department</strong></p>
            </div>
          </body>
        </html>
      `
									}, { withCredentials: true }))
								}

								axios.all(requests)
									.catch(() => {
										errorDispatch({ type: 'ERROR', payload: "Failed to send emails" })
									})
							}
						} catch (error) {
							console.log(error)
							errorDispatch({ type: 'ERROR', payload: "Error adding interview" });
							setIsLoading(false);
							return;
						}
					}
				} catch (error) {
					errorDispatch({ type: 'ERROR', payload: "Error adding interviews." });
					setIsLoading(false);
				}
			}
			employeeDispatch({ type: 'RESET' })
			navigate("/candidates")
		}
		catch {
			errorDispatch({ type: 'ERROR', payload: "Error editing candidate" })
		}
	}

	const addQual = () => {
		setOverlayId("addEduQual")
		setOverlayLabel("Add Qualification")
		setOverlayUrl("qualification/add")
		setShowOverlay(true)
		setMaxLen(100)
	}

	const addDiscipline = () => {
		setOverlayId("addDiscipline")
		setOverlayLabel("Add Discipline")
		setOverlayUrl("discipline/add")
		setShowOverlay(true)
		setMaxLen(100)
	}

	const addLocation = () => {
		setOverlayId("addLocation")
		setOverlayLabel("Add Location")
		setOverlayUrl("location/add")
		setShowOverlay(true)
		setMaxLen(50)
	}

	const addQuestion = () => {
		if (job) {
			setShowQuestionOverlay(true)
		}
		else {
			errorDispatch({ type: 'ERROR', payload: "Job not selected." })
		}
	}

	const handleQuestionChange = (questionsList) => {
		setSelectedQuestions(questionsList)
		const updatedAnswersList = [...answersList]

		questionsList.forEach((question) => {
			const existingAnswer = updatedAnswersList.find(
				(answer) => answer.question.questionId === question.questionId
			)

			if (!existingAnswer) {
				updatedAnswersList.push({
					question: question,
					candidate: candidate,
					answer: ""
				})
			}
		})

		setAnswersList(updatedAnswersList);
	}

	const handleAnswerChange = (e, id) => {
		const updatedAnswersList = answersList.map((item) =>
			item.question.questionId === id ? { ...item, answer: e.target.value } : item)
		setAnswersList(updatedAnswersList)
	}

	const handleButtonClick = () => {
		fileInputRef.current.click();
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileSizeInMB = file.size / (1024 * 1024);

			const allowedMimeTypes = [
				'application/pdf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			]

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

	const handleJobChange = (job) => {
		setJob(job)
		if (job.id !== candidate.job.id) {
			setTechnicalScreeningTime(null)
			setTechnicalScreeningStatus(ongoingStatus)
			setTechnicalScreeningRemarks("")
			setTechnicalInterviewRemarks("")
			setCtcApprovalStatus(ongoingStatus)
			setCtcNegotiationRemarks("")
			setCtcUpdateDate(null)
			setCtcFinal(0)
			setClientInterviewStatus(ongoingStatus)
			setClientInterviewRemarks("")
			setCvFormattingStatus(ongoingStatus)
			setCvFormattingRemarks("")
			setCvSubmissionDate(null)
			setCvSubmissionTime(null)
			setInterviewsList([{ interviewStatus: candidateStatus, firstInterviewer: null, secondInterviewer: null, thirdInterviewer: null, plannedDateForInterview: null }])
		}
		else if (job.id === candidate.job.id) {
			setTechnicalScreeningTime(candidate.technicalScreeningTime)
			setTechnicalScreeningStatus(candidate.technicalScreeningStatus)
			setTechnicalScreeningRemarks(candidate.technicalScreeningRemarks)
			setTechnicalInterviewRemarks(candidate.technicalInterviewRemarks)
			setCtcApprovalStatus(candidate.ctcApprovalStatus)
			setCtcNegotiationRemarks(candidate.ctcNegotiationRemarks)
			setCtcUpdateDate(candidate.ctcUpdateDate)
			setCtcFinal(candidate.ctcFinal)
			setClientInterviewStatus(candidate.clientInterviewStatus)
			setClientInterviewRemarks(candidate.clientInterviewRemarks)
			setCvFormattingStatus(candidate.cvFormattingStatus)
			setCvFormattingRemarks(candidate.cvFormattingRemarks)
			setCvSubmissionDate(candidate.cvSubmissionDate)
			setCvSubmissionTime(candidate.cvSubmissionTime)
			setInterviewsList(initialInterviewsList)
		}
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<AnimatePresence>
		
			{showOverlay &&
				<motion.div key={overlayId ? overlayId : "addOverlay"} className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<OverlayInput id={overlayId} label={overlayLabel} overlayUrl={overlayUrl} setShowOverlay={setShowOverlay} trigger={trigger} setTrigger={setTrigger} maxLen={maxLen} />
				</motion.div>}
			{showQuestionOverlay &&
				<motion.div key="addOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<OverlayQuestionInput setShowOverlay={setShowQuestionOverlay} trigger={trigger} setTrigger={setTrigger} jobTitle={job.jobTitle} selectedQuestions={selectedQuestions} setSelectedQuestions={handleQuestionChange} />
				</motion.div>
			}
			{isOpen &&
				<motion.div key="assignOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<AssignEmployee />
				</motion.div>
			}
			<form className="w-3/4 h-full flex justify-center items-start py-3" id="candidateDetails" onSubmit={validateForm}>
				<div className="flex flex-col justify-start items-start w-1/2 min-h-full max-h-full pb-10">
					<div className="font-bold">
						Enter the candidate's details
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-1/2"><TextInput id="firstName" label="First Name" setFunction={setFirstName} value={firstName} /></div>
						<div className="w-1/2 mx-2"><TextInput id="lastName" label="Last Name" setFunction={setLastName} value={lastName} /></div>
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-1/2">
							<TextInput id="Email" type="email" label="Email" setFunction={setEmail} value={email} />
						</div>
						<div className="w-1/2 mx-2">
							<TextInput id="mobileNumber" label="Mobile Number" setFunction={setMobileNumber} value={mobileNumber} />
						</div>
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-2/3">
							<SelectInput id="job" label="Select Job" form="candidateDetails" setFunction={handleJobChange} list={jobsList} value={job} />
						</div>
						<div className="w-1/3 mx-2">
							<FloatInput id="workExp" label="Work Exp" setFunction={setWorkExp} value={workExp} />
						</div>
					</div>
					<div className="font-bold">
						Graduation
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-2/3">
							<SelectInput id="gradEduQuals" label="Educational Qualifications" form="candidateDetails" setFunction={setGradEduQuals} list={qualsList} addFunction={addQual} value={gradEduQuals} />
						</div>
						<div className="w-1/3 mx-2">
							<TextInput id="gradYearOfPassing" label="Year of Passing" form="candidateDetails" setFunction={setGradYearOfPassing} value={gradYearOfPassing} />
						</div>
					</div>
					<div className="flex w-full justify-between items-end">
						<div className="w-2/3">
							<SelectInput id="gradDiscipline" form="candidateDetails" label="Discipline" setFunction={setGradDiscipline} list={disciplineList} addFunction={addDiscipline} value={gradDiscipline} />
						</div>
						<div className="w=1/3 mx-2">
							<SelectInput id="gradModeOfEducation" form="candidateDetails" label="Mode of Education" setFunction={setGradModeOfEducation} list={modesOfEducationList} value={gradModeOfEducation} />
						</div>
					</div>

					{ /*<div className="font-bold">
                        Post Graduation
                    </div>

                    <div className="flex w-full justify-between items-end">
                        <div className="w-2/3">
                            <SelectInput id="postGradEduQuals" label="Educational Qualifications" form="candidateDetails" setFunction={setPostGradEduQuals} list={qualsList} addFunction={addQual} value={postGradEduQuals} />
                        </div>
                        <div className="w-1/3 mx-2">
                            <TextInput id="postGradYearOfPassing" label="Year of Passing" form="candidateDetails" setFunction={setPostGradYearOfPassing} value={postGradYearOfPassing} />
                        </div>
                    </div> 
                    <div className="flex w-full justify-between items-end">
                        <div className="w-2/3">
                            <SelectInput id="postGradDiscipline" form="candidateDetails" label="Discipline" setFunction={setPostGradDiscipline} list={disciplineList} addFunction={addDiscipline} value={postGradDiscipline} />
                        </div>
                        <div className="w=1/3 mx-2">
                            <SelectInput id="postGradModeOfEducation" form="candidateDetails" label="Mode of Education" setFunction={setPostGradModeOfEducation} list={modesOfEducationList} value={postGradModeOfEducation} />
                        </div>
                    </div>*/}
					{/* + Button to Show Post Graduation Section */}
					<div className="flex w-full items-center mb-2">
						<div className="font-bold mt-4">Post Graduation</div>
						<button
							className="text-lg font-bold mt-4 text-primary cursor-pointer post-grad-plus"
							onClick={(e) => {
								e.preventDefault();
								setShowPostGraduation(!showPostGraduation);
							}}
						>
							{showPostGraduation ? "−" : "+"}
						</button>
					</div>

					{/* Conditionally Render Post Graduation Section */}
					{showPostGraduation && (
						<>


							<div className="flex w-full justify-between items-end">
								<div className="w-2/3">
									<SelectInput
										id="postGradEduQuals"
										label="Educational Qualifications"
										form="candidateDetails"
										setFunction={setPostGradEduQuals}
										list={qualsList}
										addFunction={addQual}
										value={postGradEduQuals}
									/>
								</div>
								<div className="w-1/3 mx-2">
									<TextInput
										id="postGradYearOfPassing"
										label="Year of Passing"
										form="candidateDetails"
										setFunction={setPostGradYearOfPassing}
										value={postGradYearOfPassing}
									/>
								</div>
							</div>

							<div className="flex w-full justify-between items-end">
								<div className="w-2/3">
									<SelectInput
										id="postGradDiscipline"
										form="candidateDetails"
										label="Discipline"
										setFunction={setPostGradDiscipline}
										list={disciplineList}
										addFunction={addDiscipline}
										value={postGradDiscipline}
									/>
								</div>
								<div className="w-1/3 mx-2">
									<SelectInput
										id="postGradModeOfEducation"
										form="candidateDetails"
										label="Mode of Education"
										setFunction={setPostGradModeOfEducation}
										list={modesOfEducationList}
										value={postGradModeOfEducation}
									/>
								</div>
							</div>
						</>
					)}


					<div className="flex w-full justify-between items-end">
						<div className="w-full mr-2">
							<TextInput id="skills" label="Skills" setFunction={setSkills} value={skills} />
						</div>
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-1/2 flex justify-between items-end">
							<div className="w-1/2">
								<FloatInput id="expCTC" label="Expected CTC" setFunction={setExpCTC} value={expCTC} />
							</div>
							<div className="w-1/2 mx-2">
								<FloatInput id="currCTC" label="Current CTC" setFunction={setCurrCTC} value={currCTC} />
							</div>
						</div>
						<div className="w-1/2 mr-2">
							<SelectInput id="location" label="Preferred Location" form="candidateDetails" setFunction={setLocation} list={locationsList} addFunction={addLocation} value={location} />
						</div>
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-full mr-2">
							<TextAreaInput id="remarks" label="Remarks" setFunction={setRemarks} value={remarks} />
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-start items-start w-1/2 min-h-full max-h-full pb-10">
					<div className="w-full flex flex-col justify-around items-start">
						<InterviewPagination interviewsList={interviewsList} setInterviewsList={setInterviewsList} />
					</div>

					<div className="flex flex-col mt-3 h-128 w-full justify-start items-start overflow-x-hidden">
						<div className="font-bold">
							Questionnaire
						</div>
						{/* Display error message if no questions are added */}
						{Array.isArray(selectedQuestions) && selectedQuestions.length > 0 ? (
							selectedQuestions.map((item, i) => {
								if (!item || !item.questionId) return null;  // <-- Prevents errors
								return (
									<div className="w-full mr-2" key={item.questionId}>
										<QuestionAnswerInput
											question={item}
											index={i}
											selectedQuestions={selectedQuestions}
											setSelectedQuestions={setSelectedQuestions}
											setFunction={handleAnswerChange}
											answersList={answersList}
											setAnswersList={setAnswersList}
										/>
									</div>
								);
							})
						) : (
							<div className="text-red-500 text-sm">No questions selected.</div>
						)}
						<div className="w-full flex justify-center items-center">
							<img src={addImage} className="h-5 cursor-pointer" onClick={addQuestion} />
						</div>
					</div>

					<div className="flex flex-col w-full justify-between items-start">
						<label className="font-medium">Upload CV</label>
						<div className="flex justify-between items-center w-full">
							<div className="w-1/2 flex justify-start items-center">
								<input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
								<img src={uploadIcon} className="h-8 cursor-pointer" onClick={handleButtonClick} />
								<div className="flex flex-col justify-around items-start m-2 h-8">
									<div className="w-90 word-wrap">
										{fileName}
									</div>
									<div className="w-full h/1-2">
										Maximum File Size: 20MB
									</div>
								</div>
							</div>
							<div className="w-1/2 flex justify-around items-center">
								<button
									type="button"
									onClick={() => window.history.back()}
									className="w-30 bg-gray-500 hover:bg-gray-600 text-white font-semibold pdtb-5 rounded-md shadow-md transition duration-300 flex justify-center items-center"
								>
									Back
								</button>
								<button type="reset" onClick={resetFields} className="w-30 pdtb-5 rounded-md flex justify-center items-center cursor-pointer bg-theme_red">
									Reset
								</button>

								<button type="submit" className="w-30 pdtb-5 rounded-md flex justify-center items-center cursor-pointer bg-theme_green">
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</AnimatePresence>
	)
}
