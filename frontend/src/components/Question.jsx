import deleteIcon from '../assets/delete.png'
import { useErrorContext } from '../hook/useErrorContext'

export default function Question ({question, index, trigger, setTrigger, selectedQuestions, setSelectedQuestions}) {

    const { errorDispatch } = useErrorContext ()

    const handleDelete = (id) => {
        const indexToRemove = selectedQuestions.map (item => item.questionId).lastIndexOf (id);

        if (indexToRemove !== -1) {
            const newArray = [
                ...selectedQuestions.slice (0, indexToRemove),
                ...selectedQuestions.slice (indexToRemove+1)
            ];
            setSelectedQuestions (newArray);
        }
        else {
            errorDispatch ({ type: 'ERROR', payload: "Error removing question" })
        }

    }

    return (
        <div className="flex w-full justify-between items-center bg-theme_gray rounded-md p-3">
            <label htmlFor={question.questionId}>Q.{index+1} {question.question}</label>
            <img src={deleteIcon} className='h-4 ml-3 cursor-pointer' onClick={()=> handleDelete(question.questionId)} />
        </div>
    )
}