import React, { useEffect } from 'react'
import Navbar from '../Inputs.js/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axoisInstance from '../utils/axiosInstance'
import StoryViewCard from '../Inputs.js/StoryViewCard'
import axios from 'axios'
import {MdAdd} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import StoryCard from '../components/Cards/StoryCard'
import AddEditModal from './AddEditModal'
import { DayPicker } from 'react-day-picker'
import moment from 'moment'
import FilterTitleInfo from '../Inputs.js/FilterTitleInfo'
import EmptyResult from '../components/Cards/EmptyResult'
import {getEmptyCardMessage} from '../utils/helper.js'
const Home=()=> {

    const [userInfo,setUserInfo]=useState(null);
    const [searchQuery, setsearchQuery] = useState('')
    const [filterType, setfilterType] = useState('')
    const [error,setError]=useState('')
     const [dateRange, setdateRange] = useState({form:null,to:null})
    const [allStories,SetAllStories]=useState([])
    const [openAddEditModal,setOpenAddEditModal]=useState({
      isShow:false,
      data:null,
      type:'add'
    })
    const [storyView,setStoryView]=useState({
      isShow:false,
      data:null,
      type:'edit'
    })
    const navigate=useNavigate()

    const getUserInfo=async()=>{
      try {
        const response= await axoisInstance.get('/get-user')
      if(response.data && response.data.user){
   
        setUserInfo(response.data.user)
        
      }
      } catch (error) {
        if(error.response.status===401){
          localStorage.clear()
          navigate('/login')

        }       
      }
    }

    const getAllStories=async()=>{
     try {
      const response=await axoisInstance.get('/get-all-stories')
      if(response.data && response.data.stories){
        SetAllStories(response.data.stories)
      }
      
     } catch (error) {
      console.log("UnExpected Error occured")
      
     }
    }
//handle Edit View
const handleEditView=(data)=>{
  setOpenAddEditModal({isShow:true,data:data,type:'edit'})
}

//handle Story vierw
const handleStoryView=(item)=>{
  setStoryView({isShow:true,data:item,type:'edit'})

}
//delete travel story
const deleteTravelStory=async (data)=>{
  const storyId=data._id;
  try {
    const response=await axoisInstance.delete("/delete-story/"+storyId);
  if(response.data && !response.data.error){
    toast.error("Story Deleted SuccessFully")
    setStoryView((prev)=>({...prev,isShow:false}));
    getAllStories()
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
//search story 
const searchStory=async(query)=>{
  try {
    const response=await axoisInstance.get("/search",{
      params:{
        query
      }
    })
    if(response.data && response.data.stories){
      setfilterType("search");
      SetAllStories(response.data.stories)
      
    } 
  } catch (error) {
    console.log("An unexpected Error occurred. Please Try Again")
    
  }

}
const filterStoriesByDateRange=async(day)=>{
  try {
    const startDate=day.from ? moment(day.from).valueOf() : null;
    const endDate=day.to ? moment(day.to).valueOf() :null;
    if(startDate && endDate){
      const response=await axoisInstance.get('/filter-by-date',{
        params:{
          startDate:startDate,
          endDate:endDate
        }

      })
  
      if(response.data && response.data.stories){
        setfilterType('date')
        SetAllStories(response.data.stories)
      }
    }
   
    
  } catch (error) {
    console.log(error)
    console.log("An unexpected error occurred. Please Try Again.")
    
  }

}

const handelDayClick=(day)=>{

  setdateRange(day)
  filterStoriesByDateRange(day)
}

const handleClearSearch=()=>{
  setfilterType('')
  getAllStories()
}
//favourite update
const updateFavourite=async (item)=>{
  const storyId=item._id 
  try {
    const response=await axoisInstance.post(`/update-favourite/${storyId}`,
      {
        isFavourite:!item.isFavourite
      }
    )
   if(response.data && response.data.story){
   toast.success("Story Updated Successfully")
   if(filterType==='search' && searchQuery){
    setSearchQuery(searchQuery)
   }else if(filterType==='date'){
    filterStoriesByDateRange(dateRange)
   }else{
    getAllStories()

   }

   }
      
  } catch (error) {
    console.log("UnExpected Error Occured")
    
  }
}

useEffect(()=>{
  getAllStories()
  getUserInfo()
  
},[])
const resetFilter=()=>{
  setdateRange({from:null,to:null})
  setfilterType('')
  getAllStories()
}

  return (
   <>
   <Navbar userInfo={userInfo} 
   searchQuery={searchQuery} 
   setSearchQuery={setsearchQuery} 
   onSearchNote={searchStory}
   handleClearSearch={handleClearSearch}
   />
   <div className='container mx-auto py-10'>
    <FilterTitleInfo
    filterType={filterType}
    filterDates={dateRange}
    onClear={()=>{
      resetFilter();
    }}
    />
    <div className='flex flex-col-reverse gap-7 md:flex-col-reverse lg:flex-row'>
      <div className='flex-1'>
        {allStories.length>0 ? (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3 sm:grid-cols-1'>
            {
              allStories.map((EachItem)=>{
                return (
                  <StoryCard
                  key={EachItem._id}
                  title={EachItem.title}
                  story={EachItem.story}
                  imgUrl={EachItem.imageUrl}
                  isFavourite={EachItem.isFavourite}
                  visitedLocations={EachItem.visitedLocations}
                  visitedDate={EachItem.visitedDate}
                  onEdit={()=>handleEditView(EachItem)}
                  onClick={()=>handleStoryView(EachItem)}
                  onFavouriteClick={()=>updateFavourite(EachItem)}
                  
                  />
                )
                
              })
            }

          </div>

        ):<EmptyResult filterType={filterType} message={getEmptyCardMessage(filterType)}/> }
      </div>
<div className='w-[350px]'>
 <div className='bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg'>
 <div className='p-3'>
  <DayPicker
  mode='range'
  captionLayout='dropdown-buttons'
  selected={dateRange}
  onSelect={handelDayClick}
  pageNavigation
  />
    
    </div>
 </div>
</div>
    </div>

   </div>
   <Modal
   isOpen={openAddEditModal.isShow}
   onRequestClose={()=>{}}
   style={{
    overlay:{
      backgroundColor:"rgba(0,0,0,0.2)",
      zIndex:999
    }
   }}
   appElement={document.getElementById("root")}
   className="modal-box"
   >

<AddEditModal 
type={openAddEditModal.type}
  storyInfo={openAddEditModal.data}
  getAllStories={getAllStories}

onClose={()=>setOpenAddEditModal({isShow:false,data:null,type:'add'})}
/>
   </Modal>
   <button onClick={()=>setOpenAddEditModal({isShow:true,data:null,type:'add'})} className='w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white hover:bg-cyan-400 fixed bottom-10 right-10' >
    <MdAdd className='text-[32px] text-white'/>
   </button>
   
   <Modal
   isOpen={storyView.isShow}
   onRequestClose={()=>{}}
   style={{
    overlay:{
      backgroundColor:"rgba(0,0,0,0.2)",
      zIndex:999
    }
   }}
   appElement={document.getElementById("root")}
   className="modal-box"
   
>
<StoryViewCard 
onClose={()=>{
  setStoryView((prev)=>({...prev,isShow:false}))
}}
onEditClick={()=>{
  setStoryView((prev)=>({...prev,isShow:false}))
  handleEditView(storyView.data || null)
  
}}
onDeleteClick={()=>{
  deleteTravelStory(storyView.data || null)
}}
storyInfo={storyView ? storyView.data : null }

/>
</Modal>
   <ToastContainer/>
   </>
  )
}

export default Home