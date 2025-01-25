import React from 'react'
import { FaSearch } from "react-icons/fa";
import {IoMdClose} from 'react-icons/io'
const SearchInput = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='w-80 flex items-center py-4 rounded-md bg-slate-100 px-5 xs:hidden sm:flex'>
        <input
        type='text'
        className='w-full text-sm outline-none bg-transparent py-[3px] px-[8px] '
        placeholder='Search Notes'
        value={value}
        onChange={onChange}
        />
        {
            value && 
         <IoMdClose className='text-xl cursor-pointer text-slate-400 hover:text-black mr-3' onClick={onClearSearch}/>
        }
 
        <FaSearch className="text-xl cursor-pointer text-slate-400 hover:text-black " onClick={handleSearch} />
    </div>
  )
}

export default SearchInput