import * as React from "react"
import Link from 'next/link'

const SchoolSelect = ({ data, onClick, selectedIndex }) => {
    
    const { name, id, type, address, grades } = data || {}

    return <button className={`w-full border rounded ${selectedIndex == id ? 'bg-green-50' : 'hover:bg-slate-50'}`} onClick={() => { onClick(data) }}>
        <div className="relative flex flex-col justify-start items-start content-start p-2">
            <span className="absolute right-2 top-2 text-sm font-black">{type.toUpperCase()}, {grades}</span>
            <p className="font-bold text-lg">{name}</p>
            <p>{address}</p>
        </div>
    </button>

}

export default SchoolSelect
