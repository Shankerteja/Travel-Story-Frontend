import React from 'react'
import moment from 'moment/moment'
import {FaHeart} from 'react-icons/fa'
import {GrMapLocation} from 'react-icons/gr'
const StoryCard = ({title,imgUrl,story,visitedDate,visitedLocations,isFavourite,onFavouriteClick,onClick}) => {

  return (

    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer' >
    <img 
    src={imgUrl}
    alt={title}
    className='w-full h-46 object-cover rounded-lg'
    />
    <button onClick={onFavouriteClick} className='w-12 h-12 flex items-center justify-center rounded-lg bg-white/40 border border-white/30 absolute top-4 right-5'>
        <FaHeart 
        className={`icon-btn ${isFavourite ? `text-red-600` : `text-white`}`}

        />
    </button>
    <div className='p-4' onClick={onClick}>
        <div className='flex items-center g-4'>
            <div className='flex-1'>
                <h6 className='text-sm font-medium'>
                    {title}
                </h6>
                <span className='text-sm text-slate-500'>
                    {
                        visitedDate ? moment(visitedDate).format("Do MMM YYYY") : '-'
                    }

                </span>
            </div>
        </div>
        <p className='text-sm text-slate-700 mb-3'>{story ? story.slice(0,60) : ""}</p>
        <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1 mt-4'>
            <GrMapLocation className='text-sm'/>
            {
                visitedLocations.map((item,index)=>{
                  return  visitedLocations.length==index+1 ? `${item}` : `${item}, `
                })
            }
        </div>
    </div>
    </div>
  )
}

export default StoryCard
