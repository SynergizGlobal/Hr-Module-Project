import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
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
import OverlayQuestionInput from "../inputs/OverlayQuestionInput"
import { useAuthContext } from "../../hook/useAuthContext"
import InterviewPagination from "../InterviewPagination"
import AssignEmployee from "../AssignEmployee"
import { useEmployeeContext } from "../../hook/useEmployeeContext"


export default function AddCandidate() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const { user, dispatch } = useAuthContext()
	const { errorDispatch } = useErrorContext()
	const [trigger, setTrigger] = useState(false)
	const fileInputRef = useRef(null);
	const [successMessage, setSuccessMessage] = useState('');



	/* Form data */
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [mobileNumber, setMobileNumber] = useState("")
	const [workExp, setWorkExp] = useState(0.0)
	const [job, setJob] = useState(null)
	const [gradEduQuals, setGradEduQuals] = useState(null)
	const [gradYearOfPassing, setGradYearOfPassing] = useState(null)
	const [gradDiscipline, setGradDiscipline] = useState(null)
	const [gradModeOfEducation, setGradModeOfEducation] = useState(null)
	const [postGradEduQuals, setPostGradEduQuals] = useState(null)
	const [postGradYearOfPassing, setPostGradYearOfPassing] = useState(null)
	const [postGradDiscipline, setPostGradDiscipline] = useState(null)
	const [postGradModeOfEducation, setPostGradModeOfEducation] = useState(null)
	const [skills, setSkills] = useState("")
	const [expCTC, setExpCTC] = useState(0.0)
	const [currCTC, setCurrCTC] = useState(0.0)
	const [location, setLocation] = useState(null)
	const [remarks, setRemarks] = useState("")
	const ongoingStatus = { id: 3, name: "Ongoing" }
	const [candidateStatus, setCandidateStatus] = useState(ongoingStatus)
	const [fileName, setFileName] = useState("")
	const [interviewsList, setInterviewsList] = useState([])
	const { isOpen, employeeDispatch } = useEmployeeContext();
	const [showPostGradFields, setShowPostGradFields] = useState(false);
	const [answerErrors, setAnswerErrors] = useState({});




	/* Fetched data from database */
	const [locationsList, setLocationsList] = useState(null)
	const [qualsList, setQualsList] = useState(null)
	const [disciplineList, setDisciplineList] = useState(null)
	const [modesOfEducationList, setModesOfEducationList] = useState(null)
	const [jobsList, setJobsList] = useState(null)
	const [selectedQuestions, setSelectedQuestions] = useState([])
	const [answersList, setAnswersList] = useState([])
	const [questionnaireError, setQuestionnaireError] = useState("");



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
		setPostGradEduQuals(null);
		setPostGradYearOfPassing("");
		setPostGradDiscipline("");
		setPostGradModeOfEducation("");
		setSkills("");
		setExpCTC("");
		setCurrCTC("");
		setFileName("");
		setRemarks("");
		setLocation(null);
		setGradYearOfPassing("");
		setSuccessMessage(""); // Clear success message when resetting
	};

	const handleAnswerChange = (e, id) => {
		setAnswersList(prevAnswersList =>
			prevAnswersList.map((item) =>
				item.question.questionId === id ? { ...item, answer: e.target.value } : item
			)
		);

		// Also clear errors dynamically when user types
		setAnswerErrors(prevErrors => {
			const updatedErrors = { ...prevErrors };
			if (e.target.value.trim() !== "") {
				delete updatedErrors[id]; // Remove error if user provides an answer
			}
			return updatedErrors;
		});
	};



	useEffect(() => {
		const fetchQuestions = async () => {
			if (!user || !user.email) {
				errorDispatch({ type: 'ERROR', payload: "You must login again" })
				dispatch({ type: 'LOGOUT' })
				navigate("/login")
			}
			await axios.get(import.meta.env.VITE_BACKEND_URL + "default-questionnaire/get?jobId=" + job.id, { withCredentials: true })
				.then(response => {
					if (response.data) {
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

		{ job && fetchQuestions() };
	}, [job])

	useEffect(() => {
		if (!user || !user.email) {
			errorDispatch({ type: 'ERROR', payload: "You must login again" })
			dispatch({ type: 'LOGOUT' })
			navigate("/login")
		}
		const fetchData = async () => {
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
						else {
							errorDispatch({ type: 'ERROR', payload: "Error getting qualification" })
						}
					})
					.catch((error) => { console.log(error); errorDispatch({ type: 'ERROR', payload: "Error getting qualification" }) })

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

				setInterviewsList([...interviewsList, { interviewStatus: candidateStatus, firstInterviewer: null, secondInterviewer: null, thirdInterviewer: null, plannedDateForInterview: null }])

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

		if (interviewsList.length === 0 || !interviewsList.some(item => item.firstInterviewer || item.secondInterviewer || item.thirdInterviewer)) {
			errorDispatch({ type: 'ERROR', payload: "At least one interviewer must be assigned before submission!" });
			setIsLoading(false);
			return; // Prevent submission
		}

		if (firstName === "") {
			errorDispatch({ type: 'ERROR', payload: "First name is empty" })
			setIsLoading(false);
			return;
		}
		let errors = {};
		let isValid = true;

		answersList.forEach((item) => {
			if (!item.answer || item.answer.trim() === "") {
				errors[item.question.questionId] = "Answer is required";
				isValid = false;
			}
		});

		setAnswerErrors(errors); // Update error state dynamically

		if (!isValid) {
			errorDispatch({ type: 'ERROR', payload: "Answer is mandatory for all questions" });
			setIsLoading(false);
			return;
		}

		if (mobileNumber.length !== 10) {
			errorDispatch({ type: 'ERROR', payload: "Mobile number must be exactly 10 digits." });
			setIsLoading(false);
			return;
		}


		// Proceed with form submission if valid
		console.log("Form submitted successfully!");

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

		const workExpValue = Number(workExp); // Convert to number

		if (!workExp || isNaN(workExpValue)) {
			errorDispatch({ type: 'ERROR', payload: "Work Experience is required" });
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
		
		if (!fileName) {
			errorDispatch({ type: 'ERROR', payload: "CV upload is mandatory." })
			setIsLoading(false);
			return;
		}



		if (!gradEduQuals) {
			errorDispatch({ type: 'ERROR', payload: "Please select Qualification" })
			setIsLoading(false);
			return;
		}

		if (!job) {
			errorDispatch({ type: 'ERROR', payload: "Please select Job" })
			setIsLoading(false);
			return;
		}

		if (!gradDiscipline) {
			errorDispatch({ type: 'ERROR', payload: "Please select graduation Discipline" })
			setIsLoading(false)
			return
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
			if (!user || !user.email) {
				errorDispatch({ type: 'ERROR', payload: "You must login again" })
				dispatch({ type: 'LOGOUT' })
				navigate("/login")
			}

			const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "candidate/add",
				{
					firstName: firstName,
					lastName: lastName,
					location: location,
					totalWorkExperience: workExp,
					graduationQualification: gradEduQuals,
					postGraduationQualification: postGradEduQuals || null,
					graduationDiscipline: gradDiscipline,
					postGraduationDiscipline: postGradDiscipline || null,
					graduationYearOfPassing: gradYearOfPassing,
					postGraduationYearOfPassing: postGradYearOfPassing || null,
					graduationModeOfEducation: gradModeOfEducation,
					postGraduationModeOfEducation: postGradModeOfEducation || null,
					phoneNo: mobileNumber,
					email: email,
					currentCTC: currCTC,
					expectedCTC: expCTC,
					job: job,
					category: job.category,
					candidateUploadDate: new Date(),
					remarks: remarks,
					skills: skills,
					candidateStatus: candidateStatus,
					employee: job.interviewer,
					resumeFilename: fileName,
					technicalScreeningStatus: ongoingStatus,
					technicalScreeningRemarks: "",
					technicalInterviewRemarks: "",
					ctcApprovalStatus: ongoingStatus,
					ctcNegotiationRemarks: "",
					clientInterviewStatus: ongoingStatus,
					clientInterviewRemarks: "",
					cvFormattingStatus: ongoingStatus,
					cvFormattingRemarks: ""
				},
				{ withCredentials: true })

			if (!response.data) {
				errorDispatch({ type: 'ERROR', payload: "Error creating job" });
				setIsLoading(false);
				return;
			}




			if (file) {
				const renamedFile = new File([file], response.data.id.toString() + file.name, {
					type: file.type,
					lastModified: file.lastModified
				})

				const formData = new FormData();
				formData.append('file', renamedFile);

				await axios.post(import.meta.env.VITE_BACKEND_URL + "resume/upload", formData, {
					withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }
				})
					.then(fileResponse => {
						if (!fileResponse.data) {
							errorDispatch({ type: 'ERROR', payload: "Couldn't upload resume" })
						}
					})
					.catch(() => {
						errorDispatch({ type: 'ERROR', payload: "Couldn't upload resume" })
					})
			}

			if (selectedQuestions) {
				try {
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
					errorDispatch({ type: 'ERROR', payload: "Failed to add questionnaire" });
				}
			}

			if (answersList) {
				try {
					for (const item of answersList) {
						await axios.post(import.meta.env.VITE_BACKEND_URL + "answer/add",
							{
								candidate: response.data,
								answer: item.answer,
								question: item.question
							},
							{ withCredentials: true })
					}
				}
				catch {
					errorDispatch({ type: 'ERROR', payload: "Failed to add answers" });
				}
			}

			if (interviewsList) {
				try {
					for (const item of interviewsList) {
						try {
							const interviewResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}interview/add`, {
								...item,
								candidate: response.data
							}, { withCredentials: true });

							if (interviewResponse.data) {
								const requests = [];

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
									});
							}
						} catch {
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
			employeeDispatch({ type: 'RESET' });
			alert("Candidate Added Successfull");
			navigate("/candidates");
		}

		catch {
			errorDispatch({ type: 'ERROR', payload: "Failed to add candidate" });

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
					candidate: null,
					answer: ""
				})
			}
		})

		setAnswersList(updatedAnswersList);
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

			if (!allowedMimeTypes.includes(file.type)) {
				errorDispatch({ type: 'ERROR', payload: 'Only PDF and Word files are allowed.' });
				setFileName('');
				setSuccessMessage('');
			} else if (fileSizeInMB > 20) {
				errorDispatch({ type: 'ERROR', payload: 'File size must be less than 20MB.' });
				setFileName('');
				setSuccessMessage('');
			} else {
				setFileName(file.name);
				setSuccessMessage('CV Uploaded successfully!'); // Set success message
			}
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
				</motion.div>
			}
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


			<form className="w-3/4 h-full flex justify-center items-start py-8" id="candidateDetails" onSubmit={validateForm}>
				<div className="flex flex-col justify-start items-start w-1/2 min-h-full max-h-full">
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
							<TextInput id="mobileNumber" label="Mobile Number" setFunction={setMobileNumber} min="10" max="10" value={mobileNumber} />
						</div>
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-2/3">
							<SelectInput id="job" label="Select Job" form="candidateDetails" setFunction={setJob} list={jobsList} />
						</div>
						<div className="w-1/3 mx-2">
							<FloatInput id="workExp" label="Work Exp" setFunction={setWorkExp} value={workExp} />
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
                    </div> */}
					{    /*   <div className="flex w-full justify-between items-end">
                        <div className="w-2/3">
                            <SelectInput id="postGradDiscipline" form="candidateDetails" label="Discipline" setFunction={setPostGradDiscipline} list={disciplineList} addFunction={addDiscipline} />
                        </div>
                        <div className="w=1/3 mx-2">
                            <SelectInput id="postGradModeOfEducation" form="candidateDetails" label="Mode of Education" setFunction={setPostGradModeOfEducation} list={modesOfEducationList} />
                        </div>
                    </div>*/}

					<div className="font-bold">
						Graduation
					</div>

					<div className="flex w-full justify-between items-end">
						<div className="w-2/3 ">
							<SelectInput className="text-captalize" id="gradEduQuals" label="Educational Qualifications" form="candidateDetails" setFunction={setGradEduQuals} list={qualsList} addFunction={addQual} />
						</div>
						<div className="w-1/3 mx-2">
							<TextInput id="gradYearOfPassing" label="Year of Passing" form="candidateDetails" setFunction={setGradYearOfPassing} value={gradYearOfPassing} />
						</div>
					</div>
					<div className="flex w-full justify-between items-end">
						<div className="w-2/3">
							<SelectInput id="gradDiscipline" form="candidateDetails" label="Discipline" setFunction={setGradDiscipline} list={disciplineList} addFunction={addDiscipline} />
						</div>
						<div className="w=1/3 mx-2">
							<SelectInput id="gradModeOfEducation" form="candidateDetails" label="Mode of Education" setFunction={setGradModeOfEducation} list={modesOfEducationList} />
						</div>
					</div>


					<div className="flex w-full items-center mb-2">
						<div className="font-bold mt-4">Post Graduation</div>
						<button
							onClick={() => setShowPostGradFields(!showPostGradFields)}
							className="text-lg font-bold mt-4 text-primary cursor-pointer post-grad-plus"
						>
							{showPostGradFields ? "-" : "+"}
						</button>
					</div>

					{showPostGradFields && (
						<div>
							<div className="flex w-full justify-between items-end">
								<div className="w-2/3">
									<SelectInput id="postGradEduQuals" label="Educational Qualifications" form="candidateDetails" setFunction={setPostGradEduQuals} list={qualsList} addFunction={addQual} value={postGradEduQuals} />
								</div>
								<div className="w-1/3 mx-2">
									<TextInput id="postGradYearOfPassing" label="Year of Passing" form="candidateDetails" setFunction={setPostGradYearOfPassing} value={postGradYearOfPassing} />
								</div>
							</div>

							<div className="flex w-full justify-between items-end mt-2">
								<div className="w-2/3">
									<SelectInput id="postGradDiscipline" form="candidateDetails" label="Discipline" setFunction={setPostGradDiscipline} list={disciplineList} addFunction={addDiscipline} />
								</div>
								<div className="w-1/3 mx-2">
									<SelectInput id="postGradModeOfEducation" form="candidateDetails" label="Mode of Education" setFunction={setPostGradModeOfEducation} list={modesOfEducationList} />
								</div>
							</div>
						</div>
					)}



					<div className="flex w-full justify-between items-end">
						<div className="w-full mr-2">
							<TextInput id="skills" label="Skills" setFunction={setSkills} />
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
						{questionnaireError && (
							<div className="text-red-500 text-sm">{questionnaireError}</div>
						)}
						{selectedQuestions && selectedQuestions.map((item, i) => {
							return (
								<div className="w-full mr-2" key={item.questionId}>
									<QuestionAnswerInput
										key={item.questionId}
										question={item}
										index={i}
										value={answersList.find(a => a.question.questionId === item.questionId)?.answer || ""}
										setFunction={handleAnswerChange}
										selectedQuestions={selectedQuestions}
										setSelectedQuestions={setSelectedQuestions}
										answersList={answersList}
										setAnswersList={setAnswersList}
										handleAnswerChange={handleAnswerChange} // ✅ Pass function
										answerErrors={answerErrors} // ✅ Pass validation errors
									/>
								</div>
							)
						})}
						<div className="w-full flex justify-center items-center">
							<img src={addImage} className="h-5 cursor-pointer" onClick={addQuestion} />
						</div>
					</div>

					<div className="flex flex-col w-full justify-between items-start">
						{successMessage && (
							<div className="text-green-600 font-medium">{successMessage}</div>
						)}
						<label className="font-medium">Upload CV</label>
						<div className="flex justify-between items-center w-full">
							<div className="w-1/2 flex justify-start items-center">
								<input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
								<img src={uploadIcon} className="h-8 cursor-pointer" onClick={handleButtonClick} />
								<div className="flex flex-col justify-around items-start m-2 h-8">
									<div className="w-full">
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
