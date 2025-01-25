import React from 'react'
import ProfileInfo from '../components/Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput'
const Navbar = ({userInfo,searchQuery,setSearchQuery,onSearchNote,handleClearSearch}) => {
        const navigate=useNavigate()
    const Logout=()=>{
        localStorage.clear("")
        navigate("/login")

    }
    const handleSearch=()=>{
      if(searchQuery){
        onSearchNote(searchQuery)
      }

    }
    const onClearSearch=()=>{
      handleClearSearch()
      setSearchQuery('')

    }
  return (
    <div className='flex items-center justify-between xs:px-3 sm:px-10 py-6 drop-shadow bg-white'>
        {/* <img src={'/logo.jpg'} className='w-[150px] h-[60px] xs:w-[90px]'/> */}
        <h1 className='font-bold md:text-xl'>Travel</h1>
        <SearchInput
        value={searchQuery}
        onChange={(event)=>setSearchQuery(event.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} Logout={Logout}/>
       
    </div>
  )
}

export default Navbar
