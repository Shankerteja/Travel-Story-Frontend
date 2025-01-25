import React from 'react'
import { useState } from 'react'
import {MdAdd,MdClose} from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'
const InputTags = ({tags,setTag}) => {
    const [inputTag,setInputTag]=useState('')


    const addNewTag=()=>{
        if(inputTag.trim()!==""){
            setTag([...tags,inputTag.trim()])
            setInputTag("")
        }
    }
    const keyDownFun=(event)=>{
        if(event.key==='Enter'){
            addNewTag()
        }
    }
    const removeTag=(tagRemov)=>{
        setTag(tags.filter((tag)=>tag!==tagRemov))

    }
  return (
    <div>
        {tags.length>0 && (
            <div className='flex items-center flex-wrap gap-2 mt-2'>
                {tags.map((tag,index)=>(
                    <span className='inline-flex px-2 py-2 rounded bg-cyan-100 text-cyan-500 gap-2' key={index}>
                        <GrMapLocation className='text-xl'/>{tag}
                        <button onClick={()=>removeTag(tag)}>
                            <MdClose />
                        </button>
                    </span>
                ))}
                </div>
        )}
        <div className='flex items-center gap-2 pt-4'>
            <input
            type='text'
            placeholder='Add Location'
            value={inputTag}
            onChange={(e)=>setInputTag(e.target.value)}
            onKeyDown={keyDownFun}
            className='px-3 py-2 rounded text-sm border outline-none bg-transparent'/>
            <button className='w-8 h-8 flex items-center justify-center rounded border border-cyan-500 text-cyan-500 hover:bg-cyan-400 hover:text-white'
            onClick={addNewTag}>

                <MdAdd className='text-xl'/>

            </button>
        </div>
    </div>
  )
}

export default InputTags