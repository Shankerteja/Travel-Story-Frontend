import React from 'react'
import { GrMapLocation } from 'react-icons/gr'
import moment from 'moment'
import {MdUpdate,MdDelete,MdClose} from 'react-icons/md'
const StoryViewCard = ({storyInfo,onDeleteClick,onEditClick,onClose}) => {
  return (
    <div>
        <div className='relative flex items-center justify-end'>
        <div className='flex items-center gap-3 bg-cyan-50/40 rounded-lg'>
           <button className='btn-small' onClick={onEditClick}>
            <MdUpdate className='text-lg'/> UPDATE STORY
             </button>
        <button className='btn-small btn-delete' onClick={onDeleteClick}>
            <MdDelete className='text-lg'/> DELETE
         </button>
   <button onClick={onClose}>
                    <MdClose /> 

                </button>
              
        
        </div>
            
        </div>
        <div>
            <div className='flex-1 flex flex-col py-4'>
                <h5 className='text-2xl text-slate-950'>
                    {storyInfo && storyInfo.title}
                </h5>
                <div className='flex items-center justify-between '>
                    <span className='text-sm text-slate-500'>
                        {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                    </span>
                    <div className='inline-flex items-center px-2 py-1 rounded bg-cyan-100 gap-2'>
                        <GrMapLocation className='text-sm text-cyan-400'/>
                        {
                            storyInfo && storyInfo.visitedLocations.map((item,index)=>(
                         storyInfo.visitedLocations.length===index+1 ? `${item}` : `${item},`
                
                            ))
                        }
                        
                    </div>
                </div>
              
            </div>
            <img
                src={storyInfo && storyInfo.imageUrl}
                alt='selected'
                className='w-full h-[300px] rounded-lg object-cover'/>
                <div className='mt-4'>
                    <p className='text-sm text-slate-950 text-justify leading-6 whitespace-pre-line'>
                        {
                            storyInfo && storyInfo.story
                        }
                    </p>
                </div>
        </div>
    </div>
  )
}

export default StoryViewCard