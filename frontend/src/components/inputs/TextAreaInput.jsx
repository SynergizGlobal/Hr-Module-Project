import { useEffect, useState } from "react"

export default function TextAreaInput ({id, label, setFunction, value="", bg="bg-theme_gray", maxLen, disabled = false }) {
    const [inputValue, setInputValue] = useState (value ? value : "")
    const [len, setLen] = useState (value ? value.length : 0)

    useEffect (()=> {
        setInputValue (value)
        setLen (value ? value.length : 0)
    }, [value])

    const handleChange = (e) => {
        setInputValue (e.target.value)
        setLen (e.target.value.length)
        setFunction (e.target.value)
    }

    return (
        <div className="mb-4 flex flex-col justify-center items-start w-full h-36 my-2">
            <div className="flex justify-between items-center w-full">
                <label htmlFor={id} className="font-medium">{label}</label>
                {maxLen && (
                    <div className={len <= maxLen ? "text-gray-400" : "text-red-400"}>
                        {len}/{maxLen}
                    </div>
                )}
            </div>
            <textarea
                id={id}
                className={`w-full ${bg} px-3 py-1 border rounded-md focus:outline-none focus:border-primary h-full focus:delay-100 resize-none`}
                value={inputValue}
                onChange={handleChange}
                disabled = {disabled}
            />
        </div>
    )
}