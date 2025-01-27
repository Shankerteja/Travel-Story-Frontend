import React from 'react'
import { FaNotesMedical } from "react-icons/fa6";

const EmptyResult = ({message,filterType}) => {
  
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4 w-full'>
        <div className='md:w-[80px] md:h-[80px] flex items-center justify-center bg-cyan-100 rounded-full xs:w-[40px] xs:h-[40px]'>
            <FaNotesMedical className='text-2xl text-cyan-500 xs:text-sm'/>

        </div>
      
        <p className='md:text-lg text-slate-950 xs:text-[10px] w-[300px]'>
           {message}
        </p>

    </div>
  )
}

export default EmptyResult