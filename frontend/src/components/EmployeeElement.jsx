import person from '../assets/person.png'
import hr from '../assets/hr.png'
import admin from '../assets/admin.png'
import email from '../assets/email.png'
import { useEmployeeContext } from '../hook/useEmployeeContext'

export default function EmployeeElement ({ employee }) {

    const { employeeDispatch } = useEmployeeContext ()

    const handleAssign = async (e) => {
        e.preventDefault ();

        employeeDispatch ({ type: 'ASSIGN', payload: employee })
    }

    return (
        <div className="flex justify-center items-center bg-white w-full rounded-md p-3 mt-2">
            <div className="w-1/3 flex flex-col justify-center items-start">
                <div className="flex justify-center items-center">
                    <img src={employee.userType.id === 1 ? hr : (employee.userType.id === 4 ? admin : person)} className='h-5' />
                    <div className='ml-6 font-bold text-base'>
                        {employee.employeeDetails.name}
                    </div>
                </div>
            </div>

            <div className="w-1/3 flex flex-col justify-center items-start">
                <div className='w-full flex justify-start items-center'>
                    <img src={email} className='h-4' />
                    <div className='mx-5'>
                        {employee.employeeDetails.email}
                    </div>
            </div>
        </div>

        <div className="w-1/3 flex flex-col justify-center items-center">
            <button onClick={handleAssign}
                className="w-1/2 font-bold bg-primary text-black py-2 rounded">
                Assign
            </button>
        </div>
    </div>
    )
}