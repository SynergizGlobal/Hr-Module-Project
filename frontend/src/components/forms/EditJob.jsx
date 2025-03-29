import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import TextInput from "../inputs/TextInput"
import SelectInput from "../inputs/SelectInput"
import FloatInput from "../inputs/FloatInput"
import TextAreaInput from "../inputs/TextAreaInput"
import personIcon from "../../assets/personIcon(1).png"
import InputRadio from "../inputs/InputRadio"
import OverlayInput from "../inputs/OverlayInput"
import { motion, AnimatePresence } from "framer-motion"
import addImage from '../../assets/plus.png'
import Question from "../Question"
import axios from "axios"
import { useErrorContext } from "../../hook/useErrorContext"
import { useEmployeeContext } from "../../hook/useEmployeeContext"
import Loading from "../Loading"
import AssignEmployee from "../AssignEmployee"
import OverlayQuestionInput from "../inputs/OverlayQuestionInput"
import { useAuthContext } from "../../hook/useAuthContext"
import OverlayJobInput from "../inputs/OverlayJobInput"

export default function EditJob () {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState (true)
    const { user, dispatch } = useAuthContext ()
    const { errorDispatch } = useErrorContext ()
    const [trigger, setTrigger] = useState (false)
    const { job } = location.state || null

    /* Form data */
    const [jobTitle, setJobTitle] = useState (job.jobTitle)
    const [jobLocation, setJobLocation] = useState (job.location)
    const [eduQuals, setEduQuals] = useState (job.qualification)
    const [discipline, setDiscipline] = useState (job.discipline)
    const [minWorkExp, setMinWorkExp] = useState (job.minimumWorkExperience)
    const [maxWorkExp, setMaxWorkExp] = useState (job.maximumWorkExperience)
    const [jobDesc, setJobDesc] = useState (job.detailedJobDescription)
    const [skills, setSkills] = useState (job.requiredSkillSets)
    const { employee, isOpen, employeeDispatch } = useEmployeeContext ();
    const [reqClientInterview, setReqClientInterview] = useState (job.requiredClientInterview)
    const [project, setProject] = useState (job.project)
    const [category, setCategory] = useState (job.category)
    const [TDC, setTDC] = useState (job.tdc)
    const [jobStatus, setJobStatus] = useState (job.jobStatus)
    const [selectedQuestions, setSelectedQuestions] = useState ([])

    /* Fetched data from database */
    const [locationsList, setLocationsList] = useState (null)
    const [qualsList, setQualsList] = useState (null)
    const [disciplineList, setDisciplineList] = useState (null)
    const [projectList, setProjectList] = useState (null)
    const [categoryList, setCategoryList] = useState (null)
    const [statusList, setStatusList] = useState (null)

    // Overlay Data
    const [showOverlay, setShowOverlay] = useState (false)
    const [overlayLabel, setOverlayLabel] = useState (null)
    const [overlayUrl, setOverlayUrl] = useState (null)
    const [maxLen, setMaxLen] = useState (0)

    // Question Overlay Data
    const [showQuestionOverlay, setShowQuestionOverlay] = useState (false)

    // Job Overlay Data
    const [showJobOverlay, setShowJobOverlay] = useState (false)

    // Assign Data
    const handleAssign = (e) => {
        e.preventDefault ();

        employeeDispatch ({ type: 'OPEN' })
    }

    useEffect (()=>{
        const fetchQuestions = async () =>{
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            await axios.get (import.meta.env.VITE_BACKEND_URL+"default-questionnaire/get?jobId="+job.id, { withCredentials: true })
            .then (response=>{
                if (response.data) {
                    if (job.jobTitle.id == jobTitle.id)
                        setSelectedQuestions (response.data)
                    else
                        setSelectedQuestions ([])
                }
            })
            .catch (()=> {
                errorDispatch ({ type: 'ERROR', payload: "Error fetching questions" })
            })
        }

        {jobTitle && fetchQuestions()};
    }, [jobTitle, trigger])

    useEffect (()=> {
        const fetchData = async () => {
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            try {
                await axios.get(import.meta.env.VITE_BACKEND_URL+"location/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setLocationsList(response.data)
                       else{
                           errorDispatch ({ type: 'ERROR', payload: "Error fetching locations." })
                       }
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error fetching locations." })})

                await axios.get(import.meta.env.VITE_BACKEND_URL+"qualification/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setQualsList(response.data)
                       else
                           errorDispatch ({ type: 'ERROR', payload: "Error getting qualification." })
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error getting qualification." })})

                await axios.get(import.meta.env.VITE_BACKEND_URL+"discipline/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setDisciplineList(response.data)
                       else{
                           errorDispatch ({ type: 'ERROR', payload: "Error getting discipline." })
                       }
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error getting discipline." })})

                await axios.get(import.meta.env.VITE_BACKEND_URL+"project/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setProjectList(response.data)
                       else{
                           errorDispatch ({ type: 'ERROR', payload: "Error getting projects." })
                       }
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error getting projects." })})

                await axios.get(import.meta.env.VITE_BACKEND_URL+"category/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setCategoryList(response.data)
                       else{
                           errorDispatch ({ type: 'ERROR', payload: "Error getting categories" })
                       }
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error getting categories" })})

                await axios.get(import.meta.env.VITE_BACKEND_URL+"job-status/getAll", {withCredentials: true})
                    .then (response => {
                       if (response.data)
                           setStatusList(response.data)
                       else{
                           errorDispatch ({ type: 'ERROR', payload: "Error getting job status" })
                       }
                    })
                    .catch(() => {errorDispatch ({ type: 'ERROR', payload: "Error getting job status" })})

                setIsLoading (false)
            }
            catch (error) {
                errorDispatch ({ type: 'ERROR', payload: "There was a server error." })
            }

            employeeDispatch ({ type: 'ASSIGN', payload: job.interviewer })

        }
        fetchData();
    }, [trigger])

    const validateForm = async (e) => {
        e.preventDefault();

        setIsLoading (true)
        if (jobDesc.length > 2000){
            errorDispatch ({ type: 'ERROR', payload: "Job Description is way too long. (Limit: 2000 characters)" })
            setIsLoading (false);
            return;
        }

        if (parseFloat(minWorkExp) < 0 || parseFloat (maxWorkExp) < 0){
            errorDispatch ({ type: 'ERROR', payload: "Work Experience cannot be < 0" })
            setIsLoading (false);
            return;
        }

        if (parseFloat (maxWorkExp) < parseFloat(minWorkExp)) {
            errorDispatch ({ type: 'ERROR', payload: "Min Work Experience cannot exceed Max Work Experience" })
            setIsLoading (false);
            return;
        }

        if (skills.length > 500){
            errorDispatch ({type: 'ERROR', payload: "Skills is way too long. (Limit: 500 characters)" })
            setIsLoading (false);
            return;
        }

        if (!jobTitle) {
            errorDispatch ({type: 'ERROR', payload: "Job Title not selected" })
            setIsLoading (false);
            return;
        }

        if (!jobLocation) {
            errorDispatch ({type: 'ERROR', payload: "Job Location not selected" })
            setIsLoading (false);
            return;
        }

        if (!eduQuals) {
            errorDispatch ({type: 'ERROR', payload: "Qualification not selected" })
            setIsLoading (false);
            return;
        }

        if (!discipline) {
            errorDispatch ({type: 'ERROR', payload: "Discipline not selected" })
            setIsLoading (false);
            return;
        }

        if (!project) {
            errorDispatch ({type: 'ERROR', payload: "Project not selected" })
            setIsLoading (false);
            return;
        }

        if (!category) {
            errorDispatch ({type: 'ERROR', payload: "Category not selected" })
            setIsLoading (false);
            return;
        }

        if (!jobStatus) {
            errorDispatch ({type: 'ERROR', payload: "Job Status not selected" })
            setIsLoading (false);
            return;
        }

        try {
            if (!user || !user.email) {
                errorDispatch ({ type: 'ERROR', payload: "You must login again" })
                dispatch ({type: 'LOGOUT'})
                navigate ("/login")
            }
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "job/add",
            {
                id: job.id,
                jobTitle: jobTitle,
                project: project,
                location: jobLocation,
                minimumWorkExperience: minWorkExp,
                maximumWorkExperience: maxWorkExp,
                qualification: eduQuals,
                discipline: discipline,
                category: category,
                detailedJobDescription: jobDesc,
                requiredSkillSets: skills,
                requiredClientInterview: reqClientInterview,
                tdc: TDC,
                uploadDate: job.uploadDate,
                jobStatus: jobStatus,
                interviewer: employee
            },
            { withCredentials: true });

            if (!response.data) {
                errorDispatch({ type: 'ERROR', payload: "Error creating job" });
                setIsLoading(false);
                return;
            }

            if (selectedQuestions) {
                try {
                    await axios.delete(import.meta.env.VITE_BACKEND_URL + "default-questionnaire/delete?id=" + job.id, { withCredentials: true });

                    for (const item of selectedQuestions) {
                        await axios.post(import.meta.env.VITE_BACKEND_URL + "default-questionnaire/add",
                        {
                            question: item,
                            job: response.data
                        },
                        { withCredentials: true });
                    }
                } catch {
                    errorDispatch({ type: 'ERROR', payload: "Failed to clean or add questionnaire" });
            }
        }

        if (employee) {
            try {
                const emailResponse = await axios.post(import.meta.env.VITE_BACKEND_URL + "mail/send",
                {
                    toEmail: employee.employeeDetails.email,
                    subject: "New Job Assignment",
                    body: `
        <html>
          <body>
            <div style="border: 2px solid #FA7A4F; padding: 20px; max-width: 600px; margin: auto; border-radius: 10px;">
              <h3 style="font-size: 18px; margin-top: 0; color: #000;">Dear ${employee.employeeDetails.name},</h3>
              <p>
                You have been assigned a new job for screening.
                Please visit the link below for details:
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${import.meta.env.VITE_FRONTEND_URL}candidates"
                   style="display: inline-block; width: 200px; background-color: #FA7A4F; color: white; font-weight: bold; text-decoration: none; border-radius: 5px; text-align: center; padding: 10px 0; line-height: 24px;">
                  View Candidates
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
                },
                { withCredentials: true });

                if (!emailResponse.data) {
                    errorDispatch({ type: 'ERROR', payload: "Failed to send email" });
                    setIsLoading(false);
                    return;
                }
            } catch {
                errorDispatch({ type: 'ERROR', payload: "Failed to send email" });
                setIsLoading(false);
                return;
            }
        }
        employeeDispatch ({ type: 'RESET' })
        navigate("/jobs");

        } catch {
            errorDispatch({ type: 'ERROR', payload: "Error creating job" });
            setIsLoading(false);
        }
    }

    const addJobTitle = () => {
        setOverlayLabel ("Add Job Title")
        setOverlayUrl ("job-title/add")
        setShowOverlay (true)
        setMaxLen (50)
    }

    const addQual = () => {
        setOverlayLabel ("Add Qualification")
        setOverlayUrl ("qualification/add")
        setShowOverlay (true)
        setMaxLen (100)
    }

    const addDiscipline = () => {
        setOverlayLabel ("Add Discipline")
        setOverlayUrl ("discipline/add")
        setShowOverlay (true)
        setMaxLen (100)
    }

    const addProject = () => {
        setOverlayLabel ("Add Project")
        setOverlayUrl ("project/add")
        setShowOverlay (true)
        setMaxLen (50)
    }

    const addCategory = () => {
        setOverlayLabel ("Add Category")
        setOverlayUrl ("category/add")
        setShowOverlay (true)
        setMaxLen (100)
    }

    const addLocation = () => {
        setOverlayLabel ("Add Location")
        setOverlayUrl ("location/add")
        setShowOverlay (true)
        setMaxLen (50)
    }

    const addQuestion = () => {
        if (jobTitle) {
            setShowQuestionOverlay (true)
        }
        else {
            errorDispatch ({ type: 'ERROR', payload: "Job Title not selected." })
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <AnimatePresence>
            {showOverlay &&
                <motion.div key="addOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <OverlayInput id={overlayId} label={overlayLabel} overlayUrl={overlayUrl} setShowOverlay={setShowOverlay} trigger={trigger} setTrigger={setTrigger} maxLen={maxLen} />
                </motion.div>
            }
            {showQuestionOverlay &&
                <motion.div key="addOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <OverlayQuestionInput setShowOverlay={setShowQuestionOverlay} trigger={trigger} setTrigger={setTrigger} jobTitle={jobTitle} selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions} />
                </motion.div>
            }
            {isOpen &&
                <motion.div key="assignOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <AssignEmployee />
                </motion.div>
            }
            {showJobOverlay &&
                <motion.div key="jobOverlay" className="absolute z-10 top-0 left-0 w-full h-full backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <OverlayJobInput setShowOverlay={setShowJobOverlay} trigger={trigger} setTrigger={setTrigger} jobTitle={jobTitle} setJobTitle = {setJobTitle} />
                </motion.div>
            }
            <form className="w-3/4 h-full flex justify-center items-start" id="jobDetails" onSubmit={validateForm}>
                <div className="flex flex-col justify-start items-start w-2/3 min-h-full max-h-full pb-10 overflow-y-scroll">
                    <div className="font-bold">
                        Enter the job details
                    </div>

                    <div className="flex w-full justify-between items-end">
                        <div className="w-1/2">
                            <div className="font-medium"> Job Title</div>
                            <div className="w-full flex justify-between items-center">
                                <div>
                                    {jobTitle ? jobTitle.name : "No job title selected"}
                                </div>
                                <button className="ml-4 px-3 mr-4 font-semibold text-black bg-primary py-2 rounded" onClick={(e) => { e.preventDefault(); setShowJobOverlay (true) }}> Set </button>
                            </div>
                        </div>
                        <div className="w-1/2 mx-2"><SelectInput id="jobLocation" label="Job Location" form="jobDetails" setFunction={setJobLocation} list={locationsList} addFunction={addLocation} value={jobLocation} /></div>
                    </div>

                    <div className="flex w-full justify-between items-end">
                        <div className="w-5/12"><SelectInput id="eduQuals" label="Educational Qualifications" form="jobDetails" setFunction={setEduQuals} list={qualsList} addFunction={addQual} value={eduQuals} /></div>
                        <div className="w-5/12 mx-2"><SelectInput id="discipline" form="jobDetails" label="Discipline" setFunction={setDiscipline} list={disciplineList} addFunction={addDiscipline} value={discipline} /></div>
                        <div className="w-2/12 flex flex-col mr-2">
                            <div className="w-full font-medium">
                                Work Experience
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="w-5/12">
                                    <FloatInput id="minWorkExp" label="" value={minWorkExp} setFunction={setMinWorkExp} />
                                </div>
                                <span className="mb-4">to</span>
                                <div className="w-5/12">
                                    <FloatInput id="maxWorkExp" label="" value={maxWorkExp} setFunction={setMaxWorkExp} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-between items-end">
                        <div className="w-full mr-2">
                            <TextAreaInput id="jobDesc" label="Job Description" setFunction={setJobDesc} value={jobDesc} />
                        </div>
                    </div>

                    <div className="flex w-full justify-between items-start">
                        <div className="w-full mr-2">
                            <TextInput id="skills" label="Skills" setFunction={setSkills} value={skills} />
                        </div>
                    </div>

                    <div className="flex flex-col h-128 w-full justify-start items-start overflow-y-scroll overflow-x-hidden">
                        <div className="font-bold">
                            Questionnaire
                        </div>
                        {selectedQuestions
                        .map ((item, i)=>{
                            return (
                                <div className="w-full my-1 mr-4" key={item.questionId}>
                                    <Question question={item} index={i} trigger={trigger} setTrigger={setTrigger} setSelectedQuestions={setSelectedQuestions} selectedQuestions={selectedQuestions} />
                                </div>
                            )
                        })}
                        <div className="w-full flex justify-center items-center my-4">
                            <img src={addImage} className="h-5 cursor-pointer" onClick={addQuestion} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-evenly items-center w-1/3 min-h-full max-h-full pb-10 overflow-y-scroll">
                    <div className="flex w-full justify-center items-start">
                        <img src={personIcon} className="w-5/12 p-1" />
                    </div>

                    <div className="flex w-full justify-center items-start">
                        {employee ? employee.employeeDetails.name : "Unassigned"}
                    </div>

                    <div className="flex w-full justify-center items-start">
                        <button onClick={handleAssign}
                            className="w-1/2 font-bold bg-primary text-black py-2 rounded">
                            {employee ? "Reassign" : "Assign"}
                        </button>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <input id="clientReq" type="checkbox" onChange={(e)=>{ setReqClientInterview(e.target.checked) }} checked={reqClientInterview} />
                        <label htmlFor="clientReq" className="mx-2 font-medium">Client interview required</label>
                    </div>

                    <div className="flex w-full justify-center items-center">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="TDC" className="font-medium">TDC</label>
                            <input id="TDC" type="date" className="py-1 px-3 rounded-sm bg-theme_gray" value={TDC} onChange={(e)=>setTDC(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex w-3/4 justify-center items-center">
                        <SelectInput id="project" label="Project" form="jobDetails" setFunction={setProject} list={projectList} addFunction={addProject} value={project} />
                    </div>

                    <div className="flex w-3/4 justify-center items-center">
                        <SelectInput id="category" label="Category" form="jobDetails" setFunction={setCategory} list={categoryList} addFunction={addCategory} value={category} />
                    </div>

                    <div className="flex w-3/4 justify-center items-center">
                        <InputRadio id="jobStatus" label="Job Status" setFunction={setJobStatus} list={statusList} wrap={false} value={jobStatus} />
                    </div>

                    <div className="w-full flex justify-around items-center">
                        <button type="reset" className="w-1/3 h-10 rounded-md flex justify-center items-center cursor-pointer bg-theme_red">
                            Reset
                        </button>
                        <button type="submit" className="w-1/3 h-10 rounded-md flex justify-center items-center cursor-pointer bg-theme_green">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </AnimatePresence>
    )
}