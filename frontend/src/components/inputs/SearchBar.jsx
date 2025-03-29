import { useState } from 'react'
import searchIcon from '../..//assets/search.png'

export default function SearchBar ({ onSearch }) {
    const [query, setQuery] = useState ("")

    const handleChange = (e) => {
        const value = e.target.value
        setQuery (value)
        if (onSearch)
            onSearch (value)
    }

    return (
        <div className="w-full rounded-sm flex">
            <input type="search" placeholder="Search or filter results..." className=" bg-theme_gray border px-3 py-1 focus:outline-none focus:border-primary border-theme_dark h-9 rounded-l-md w-11/12" value={query} onChange={handleChange} />
            <button type="search" className="bg-theme_dark w-1/12 h-9 flex justify-center items-center rounded-r-md"><img src={searchIcon} className='h-5' /></button>
        </div>
    )
}