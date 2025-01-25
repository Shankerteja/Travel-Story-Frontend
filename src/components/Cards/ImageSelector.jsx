import React from 'react'
import {useState,useRef,useEffect} from 'react'
import { FaRegFileImage } from 'react-icons/fa'
import {MdDeleteOutline} from 'react-icons/md'

const ImageSelector = ({image,setImage,handleDeleteImage}) => {
    const inputRef=useRef(null)
    const [imagePreview,setImagePreview]=useState(null)

    const chooseFileImage=()=>{
        inputRef.current.click()
    }
const handleImageOnchange=(event)=>{
    const file=event.target.files[0]
    if(file){
        setImage(file)
    }

}
useEffect(()=>{
    if(typeof image==='string'){
        setImagePreview(image)
    }else if(image){
        setImagePreview(URL.createObjectURL(image))
    }else{
        setImagePreview(null)
    }

    return(()=>{
        if(imagePreview && !image && typeof image==='string'){
            URL.revokeObjectURL(imagePreview)
        }
    })

},[image])
const removeImage=()=>{
    handleDeleteImage()
    setImage(null)

}

  return (
    <div>
        <input 
        type='file'
        accept='image/*'
        className='hidden'
        ref={inputRef}
        onChange={handleImageOnchange}
        />
      {
        !image ?   <button className='w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50'
        onClick={chooseFileImage}>
          <div className='w-14 h-14 flex items-center justify-center rounded-full bg-cyan-50 border border-cyan-100'>
          <FaRegFileImage className='text-xl text-cyan-500'/>
          </div>
            <p className='text-sm text-slate-500'>
                Browse images files to upload
            </p>
        </button> : (
             <div className='w-full relative'>
             <img src={imagePreview} className='h-[300px] rounded w-full object-cover'/>
             <button className='btn-small btn-delete absolute top-2 right-2' onClick={removeImage}>
<MdDeleteOutline className="text-xl"/>
             </button>
           </div>

        )
      }
     
    </div>
  )
}

export default ImageSelector