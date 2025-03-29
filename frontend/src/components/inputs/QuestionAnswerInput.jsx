import axios from 'axios';
import deleteIcon from '../../assets/delete.png';
import { useErrorContext } from '../../hook/useErrorContext';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

export default function QuestionAnswerInput ({
    question,
    candidate = null,
    index,
    value = "",
    setFunction,
    selectedQuestions,
    setSelectedQuestions,
    answersList,
    setAnswersList,
    handleAnswerChange,  // ✅ Accept this as a prop
    answerErrors // ✅ Accept this as a prop
}) {
    const { errorDispatch } = useErrorContext();
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setFunction(e, question.questionId);
    };

    const handleDelete = async (id) => {
        const indexToRemove = selectedQuestions.map(item => item.questionId).lastIndexOf(id);

        if (indexToRemove !== -1) {
            const newArray = [
                ...selectedQuestions.slice(0, indexToRemove),
                ...selectedQuestions.slice(indexToRemove + 1)
            ];
            const newAnswerArray = [
                ...answersList.slice(0, indexToRemove),
                ...answersList.slice(indexToRemove + 1)
            ];
            if (candidate) {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}answer/delete?questionId=${id}&candidateId=${candidate.id}`, { withCredentials: true })
                    .catch(() => { errorDispatch({ type: 'ERROR', payload: "Failed to delete answer" }); });
            }
            setAnswersList(newAnswerArray);
            setSelectedQuestions(newArray);
        } else {
            errorDispatch({ type: 'ERROR', payload: "Error removing question" });
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full justify-between items-center">
                <label htmlFor={question?.questionId}>Q.{index + 1} {question?.question}</label>
                <img src={deleteIcon} alt="delete" className='h-4 ml-3 cursor-pointer' onClick={() => handleDelete(question.questionId)} />
            </div>
            <textarea
                value={inputValue}
                className={`w-full bg-theme_gray px-3 py-1 border rounded-sm focus:outline-none focus:border-primary h-full focus:delay-100 resize-none ${answerErrors?.[question.questionId] ? 'border-red-500' : ''}`}
                onChange={(e) => handleAnswerChange(e, question.questionId)} // ✅ Use the function passed as a prop
            />
            {answerErrors?.[question.questionId] && (
                <p className="text-red-500 text-sm">{answerErrors[question.questionId]}</p>
            )}
        </div>
    );
}

// ✅ Add PropTypes for validation
QuestionAnswerInput.propTypes = {
    question: PropTypes.object.isRequired,
    candidate: PropTypes.object,
    index: PropTypes.number.isRequired,
    value: PropTypes.string,
    setFunction: PropTypes.func.isRequired,
    selectedQuestions: PropTypes.array.isRequired,
    setSelectedQuestions: PropTypes.func.isRequired,
    answersList: PropTypes.array.isRequired,
    setAnswersList: PropTypes.func.isRequired,
    handleAnswerChange: PropTypes.func.isRequired, // ✅ Ensure this is passed
    answerErrors: PropTypes.object.isRequired, // ✅ Ensure this is passed
};
