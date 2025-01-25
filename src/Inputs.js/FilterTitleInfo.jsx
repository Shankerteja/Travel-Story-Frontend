import moment from 'moment'
import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
const FilterTitleInfo = ({filterType,filterDates,onClear}) => {


    const DateRangeChip=({date})=>{
        const startDate=date.from ? moment(date.from).format("Do MMM YYYY") : "N/A";
        const endDate=date.to ? moment(date.to).format("Do MMM YYYY") : "N/A";

        return(
            <div className='flex items-center gap-2 px-3 py-2 rounded bg-slate-100'>
                <p className='text-sm text-slate-950 font-medium'>{startDate}-{endDate}</p>
                <button className='' onClick={onClear}>
                    <MdOutlineClose
/>                </button>
            </div>
        )

    }
  return (
   filterType && <div className='mb-3'>
        {
            filterType==='search'? <h1 className='text-xl font-medium text-slate-950'>Search Results</h1> :
            <div className='flex items-center gap-4'>
                <h3 className='text-lg font-medium'>Travel Stories from</h3>
         <DateRangeChip date={filterDates}/>

            </div>
        }


    </div>
  )
}

export default FilterTitleInfo