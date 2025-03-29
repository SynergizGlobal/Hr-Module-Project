import { useEffect, useState } from "react"

export default function TextInput ({id, type="text", label, setFunction, value="", maxLen }) {
    const [inputValue, setInputValue] = useState(value)
    const [len, setLen] = useState (value ? value.length : 0)

    useEffect(() => {
        if (value === null) {
            value = ""
        }
        setInputValue(value);
        setLen(value.length);
    }, [value]);

    const handleChange = (e) => {
        setInputValue(e.target.value)
        setLen (e.target.value.length)
        setFunction (e.target.value)
    }

    return (
        <div className="mb-4 flex flex-col justify-center items-start w-full my-2">
            <div className="flex justify-between items-center w-full">
                <label htmlFor={id} className="font-medium">{label}</label>
                {maxLen && (
                    <div className={len <= maxLen ? "text-gray-400" : "text-red-400"}>
                        {len}/{maxLen}
                    </div>
                )}
            </div>
            <input
                type={type}
                id={id}
                className="w-full bg-theme_gray px-3 py-1 border rounded-sm focus:outline-none focus:border-primary"
                onChange={handleChange}
                value={inputValue}
            />
        </div>
    )
}