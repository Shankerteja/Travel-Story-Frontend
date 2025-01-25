import React from 'react'
import { useState } from 'react'
import {DayPicker} from 'react-day-picker'
import momemt from 'moment'
import { MdOutlineDateRange,MdClose } from 'react-icons/md'
const DateSelector = ({date,setDate}) => {
        const [openDayPacker,setOpenDayPicker]=useState(false)
    const setOpenDateSelector=()=>{};
  return (
    <div>
        <button className='inline-flex items-center gap-2 bg-sky-50 text-sky-400 font-medium px-2  py-1 text-[13px] rounded hover:bg-sky-400 hover:text-white cursor-pointer'
        onClick={()=>setOpenDayPicker(true)}
        >
            <MdOutlineDateRange />
            {
                date ? momemt(date).format("Do MMM YYYY") : momemt().format("Do MMM YYYY")
            }
        </button>

        {
            openDayPacker && <div>
            <div className='overflow-y-auto bg-sky-50/80 p-5 rounded mt-2 relative pt-9'>
                <button className='w-10 h-10 flex items-center justify-center rounded-full bg-sky-50 border border-sky-100 p-2 absolute top-2 right-4'
                onClick={()=>setOpenDayPicker(false)}
                >
                    <MdClose className='text-xl text-sky-500 '/>
                </button>
            <DayPicker
                mode='single'
                captionLayout='dropdown-buttons'
                selected={date}
                onSelect={setDate}
                PageNavigation
                />
            
            </div>
        </div>
        }
    </div>
  )
}

export default DateSelector