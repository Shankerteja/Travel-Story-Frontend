import React from 'react'
import { FaNotesMedical } from "react-icons/fa6";

const EmptyResult = ({message,filterType}) => {
    console.log(filterType)
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
        <div className='w-[80px] h-[80px] flex items-center justify-center bg-cyan-100 rounded-full'>
            <FaNotesMedical className='text-2xl text-cyan-500'/>

        </div>
      
        <p className='text-lg font-medium text-slate-950'>
           {message}
        </p>

    </div>
  )
}

export default EmptyResult