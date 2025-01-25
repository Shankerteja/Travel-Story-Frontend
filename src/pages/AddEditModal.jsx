import React from 'react'
import {useState} from 'react'
import DateSelector from '../components/Cards/DateSelector'
import ImageSelector from '../components/Cards/ImageSelector'
import InputTags from '../components/Cards/InputTags'
import {MdAdd,MdDelete,MdUpdate,MdClose} from 'react-icons/md'
import ImageUpload from '../Inputs.js/ImageUpload'
import axoisInstance from '../utils/axiosInstance'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
const AddEditModal = ({type,storyInfo,onClose,getAllStories}) => {
   
    const [visitedDate,setVisitedDate]=useState(storyInfo?.visitedDate || null)
    const [title,setTitle]=useState(storyInfo?.title || "")
    const [story,setStory]=useState(storyInfo?.story || '')
    const [image,setImage]=useState(storyInfo?.imageUrl || null)
    const [visitedLocations,setVisitedLocations]=useState(storyInfo?.visitedLocations || [])
    const [error,setError]=useState('')



    const handleDeleteImage=async()=>{
        const deleteImageRes=await axoisInstance.delete('/image-delete/',{
            params:{
                imageUrl:storyInfo.imageUrl
            }
        });
        if(deleteImageRes.data){
            const storyId=storyInfo._id;
            const postData={
                title,
                story,
                imageUrl:'',
                vistedDate:moment(visitedDate).valueOf(),
                visitedLocations
            }
            const response=await axoisInstance.put('/edit-post/'+storyId,postData)
            setImage(null)

        }

    }
    const addNewStory=async ()=>{
        try {
            let imageUrl=''
            if(image){
                const imageRes=await ImageUpload(image)
                  imageUrl=imageRes.imageUrl || ""
            }
          

            const response=await axoisInstance.post('/add-story',{
            title,
            imageUrl:imageUrl || "",
            story,
            vistedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            visitedLocations,

            })
            if(response.data && response.data.story){
        
                toast.success("story Added Successfully")
                getAllStories()
                onClose()
            }
            
        } catch (error) {
            if(error.response &&
                error.response.data && 
                error.response.data.message
            ){
                setError(error.response.data.message)

            }else{
                setError("Un Expected Error occured Please Try Again.")
            }
            
            
        }
    }
    const updateStory=async()=>{
        const storyId=storyInfo._id
        console.log(storyId)
         
        try {
         let imageUrl=''
         let postData={
            title,
            imageUrl:storyInfo.imageUrl || "",
            story,
            vistedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            visitedLocations,

            }

          if(typeof image==='object'){
            console.log(typeof image)
            const imageRes=await ImageUpload(image)
            imageUrl=imageRes.imageUrl || ''
            postData={
                ...postData,
                imageUrl
            }

          }

            const response=await axoisInstance.put("/edit-post/"+storyId,postData)
            if(response.data && response.data.story){
                console.log("Updated ")
                toast.success("story Updated Successfully")
                getAllStories()
                onClose()
            }
            
        } catch (error) {
            if(error.response &&
                error.response.data && 
                error.response.data.message
            ){
                setError(error.response.data.message)

            }else{
                console.log(error)
                setError("Un Expected Error occured Please Try Again.")
            }
    }
}

    const handleAddOrUpdate=()=>{
        console.log({title,story,image,visitedLocations,visitedDate})
        if(!title){
            setError("Please Provide Title")
            return
        }
        if(!story){
            setError("Please Provide Story")
            return
        }
        setError("")

        if(type==='add'){
            addNewStory()
        }else{
            updateStory()
        }

    }
  return (

   <div>
    <div className='flex items-center justify-between'>
        <h5 className='text-xl font-medium text-slate-700'>
            {type==="add" ? "Add Story ":" Update Story"}
        </h5>
        <div>
            <div className='flex items-center gap-3 bg-cyan-50 rounded p-2'>
                {
                    type==="add" ? 
                     <button className='btn-small' onClick={handleAddOrUpdate}>
                    <MdAdd className='text-lg'/> ADD STORY
                </button> : (
               <>
                <button className='btn-small'onClick={handleAddOrUpdate}>
                    <MdUpdate className='text-lg'/> UPDATE STORY
                </button>
              
               </>
                )
                }
                <button onClick={onClose}>
                    <MdClose /> 

                </button>
              
            </div>
            {error && <p className='text-rose-500'>{error}</p>}
        </div>

    </div>
    <div>
        <div className='flex-1 flex flex-col gap-4 p-4'>
            <label className='text-sm text-slate-450'>TITLE</label>
            <input 
            type='text'
            className='text-2xl outline-none text-slate-950'
            placeholder='A Day at Goa'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <div className='my-3'>
                <DateSelector date={visitedDate} setDate={setVisitedDate}/>
            </div>
            <ImageSelector image={image} setImage={setImage} handleDeleteImage={handleDeleteImage} type={type}/>
            <div className='flex flex-col gap-4'>
                <label className='text-sm text-slate-500'>
                    STORY
                </label>
                <textarea
                type="text"
                rows={10}
                className='text-sm text-slate-950 outline-none bg-slate-50 rounded p-2'
                placeholder='YOUR STORY'
                value={story}
                onChange={(e)=>setStory(e.target.value)}
                >

                </textarea>
            </div>
            <div className='pt-4'>
                <label className='text-sm text-slate-500'>VISITED LOCATIONS</label>
             <InputTags tags={visitedLocations} setTag={setVisitedLocations}/>
            </div>
        </div>
    </div>
    <ToastContainer/>
   </div>
  )
}

export default AddEditModal