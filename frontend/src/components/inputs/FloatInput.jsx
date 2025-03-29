import { useEffect, useState } from "react"

export default function FloatInput ({id, label, setFunction, value = 0.0 }) {
    const [inputValue, setInputValue] = useState(value ? value : 0.0);

    useEffect(() => {
        setInputValue(value ? value : 0.0);
    }, [value]);

    const handleChange = (e) => {
        setInputValue (e.target.value)
        setFunction (e.target.value)
    }

    return (
        <div className="mb-4 flex flex-col justify-center items-start w-full">
            <label htmlFor={id} className="font-medium">{label}</label>
            <input type="number" step="0.1" min="0.0" id={id} className="w-full bg-theme_gray font-medium px-3 py-1 border rounded-sm focus:outline-none focus:border-primary" value={inputValue} onChange={handleChange} />
        </div>
    )
}