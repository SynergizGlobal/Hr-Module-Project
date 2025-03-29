import { useState } from "react";

export default function SelectInput ({ id, label, form, setFunction, addFunction, list, value }) {
    const handleChange = (e) => {
        const item = list.find (item => item.id === parseInt (e.target.value))
        setFunction (item);
    }

    return (
        <div className="mb-4 flex flex-col justify-center items-start w-full">
            <div className="flex justify-between items-center w-full">
                <label htmlFor={id} className="font-medium">{label}</label>
                {addFunction ? <div className="text-primary cursor-pointer text-xs" onClick={addFunction}>
                    Add new
                </div> : <></>}
            </div>
            {value && <select id={id} form={form} value={value.id} className="w-full bg-theme_gray font-medium px-3 py-1 border rounded-sm focus:outline-none focus:border-primary text-captalize" onChange={handleChange}>
                <option disabled value="" className="hidden"> </option> 
                {list && list.map ((item) => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </select>}
            {value==null && <select id={id} form={form} className="w-full bg-theme_gray font-medium px-3 py-1 border rounded-sm focus:outline-none focus:border-primary text-captalize" onChange={handleChange}>
                <option disabled selected value="" className="hidden"> </option>
                {list && list.map ((item) => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </select>}
        </div>
    )
}