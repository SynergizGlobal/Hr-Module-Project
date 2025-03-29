import { useState } from "react"

export default function QuestionAnswerPagination ({ questionsList, answersList }) {
    const [currentPage, setCurrentPage] = useState (1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage (pageNumber)
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center">
                <div className="w-1/3 flex-shrink-0">
                    Questionnaire:
                </div>
                <div className="bg-gray-200 flex justify-start items-center rounded-lg">
                    {
                        Array.from ({ length: questionsList.length }, (_, index) => (
                            <button key={index + 1} className={`px-3 w-9 text-base rounded-full ${currentPage === index + 1 ? "bg-theme_dark text-white" : "bg-transparent"}`} onClick={() => { handlePageChange (index + 1) }}>
                                {index + 1}
                            </button>
                        ))
                    }
                </div>
                <div className="w-1/3 flex-shrink-0">
                </div>
            </div>

            <div className="flex flex-col items-start bg-gray-200 w-3/4 rounded-lg px-3">
                <div className="w-full my-2 font-medium">
                    Q. {questionsList[currentPage-1].question}
                </div>
                <div className="w-full mb-2">
                    Ans. {answersList[currentPage-1].answer}
                </div>
            </div>
        </div>
    )

}