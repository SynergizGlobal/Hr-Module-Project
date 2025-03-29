import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/navbars/Navbar'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Candidates from './components/Candidates'
import AddCandidate from './components/forms/AddCandidate'
import Jobs from "./components/Jobs"
import AddJob from './components/forms/AddJob'
import EditJob from './components/forms/EditJob'
import EditCandidate from './components/forms/EditCandidate'
import ResourceDatabase from './components/ResourceDatabase'
import NotFound from './components/NotFound'
import axios from 'axios'
import { useAuthContext } from './hook/useAuthContext'
import { useErrorContext } from './hook/useErrorContext'
import { AnimatePresence, motion } from 'framer-motion'
import errorIcon from './assets/errorIcon.png'
import Loading from './components/Loading'
import Layout from './components/Layout'
import CandidateProcess from './components/CandidateProcess'
import useAxiosInterceptor from './hook/useAxiosInterceptor'


function App() {
  useAxiosInterceptor ();

  const { user, employee, dispatch } = useAuthContext()
  const { error, errorDispatch } = useErrorContext()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate ()

  useEffect(() => {
    let timeoutId;

    if (error) {
        timeoutId = setTimeout(() => {
            errorDispatch ({ type: 'NOERROR' });
        }, 3000);
    } else {
        errorDispatch ({ type: 'NOERROR' });
    }

    return () => clearTimeout(timeoutId);
}, [error]);

  useEffect (()=>{
    const getUser = async () => {
      try {
        const userResponse = await axios.get (import.meta.env.VITE_BACKEND_URL+"user-info", {withCredentials: true})
        if (userResponse.data && userResponse.data.email) {
          try {
            const employeeResponse = await axios.get (import.meta.env.VITE_BACKEND_URL + `employee/email/${userResponse.data.email}`, {withCredentials: true})
            if (employeeResponse.data) {
              dispatch ({ type: 'LOGIN', userPayload: userResponse.data, employeePayload: employeeResponse.data });
            }
            else
              logoutOnError ("You are not authorised to access this application")
          }
          catch {
            logoutOnError ("You are not authorised to access this application")
          }
        }
        else
          logoutOnError ("Error fetching user")
      }
      catch {
        logoutOnError ("Error fetching user")
      }
      finally {
        setLoading (false)
      }
    }
    getUser();
  },[]);

  const logoutOnError = (error) => {
    errorDispatch ({ type: 'ERROR', payload: error })
    axios.post (import.meta.env.VITE_BACKEND_URL+"logout")
    dispatch({ type: 'LOGOUT' });
    navigate ("/login")
  }

  if (loading)
    return <Loading />

  return (
    <AnimatePresence>
      {error &&
        <motion.div key="errorOverlay" className="absolute z-20 top-20 right-5 flex items-center bg-white rounded-md px-3 py-3 border border-theme_red" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <img src={errorIcon} className='h-5 w-5'  />
          <div className='ml-4'>
            {error}
          </div>
        </motion.div>}
      <div className="w-screen h-screen min-h-screen max-h-screen bg-secondary font-raleway text-sm">
        <Navbar user={user} />
        <div className="w-full h-full max-h-full flex flex-col justify-start py-2 items-center">
          {/* Routes */}
          <Routes>
            <Route path="/" element={user? (employee.userType.id != 2? <Navigate to="/dashboard" /> : <Navigate to="/candidates" />) : <Navigate to="/login" />} />
            <Route path="login" element={!user? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="dashboard" element={user? (employee.userType.id != 2? <Dashboard /> : <Navigate to="/candidates" />) : <Navigate to="/login" />} />
            <Route path="candidates" element={<Layout />}>
              <Route path='' element={user? <Candidates /> : <Navigate to="/login" />} />
              <Route path=':id' element={user? <CandidateProcess /> : <Navigate to="/login" />} />
              <Route path='add' element={user? (employee.userType.id != 2?  <AddCandidate /> : <Candidates />) : <Navigate to="/login" />} />
              <Route path=':id/edit' element={user? (employee.userType.id != 2? <EditCandidate /> : <Candidates />) : <Navigate to="/login" />} />
            </Route>
              <Route path="jobs" element={<Layout />}>
                <Route path='' element={user? (employee.userType.id != 2? <Jobs /> : <Navigate to="/candidates" />) : <Navigate to="/" />} />
                <Route path='add_job' element={user? (employee.userType.id != 2? <AddJob /> : <Navigate to="/candidates" />) : <Navigate to="/" />} />
                <Route path='edit_job/:id' element={user? (employee.userType.id != 2? <EditJob /> : <Navigate to="/candidates" />) : <Navigate to="/" />} />
              </Route>
            <Route path="resource_database" element={user? <ResourceDatabase /> : <Navigate to="/" />} />
            <Route path="*" element={user? <NotFound /> : <Navigate to="/" />}/>
          </Routes>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
