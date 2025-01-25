import React from 'react'
import { getInitails } from '../../utils/helper'
const ProfileInfo = ({userInfo,Logout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className=' text-cyan-950 sm:w-12 sm:h-12 xs:w-8 xs:h-8 bg-slate-100 rounded-full flex items-center justify-center'>
            {getInitails(userInfo ? userInfo.fullName : "")}
             </div>
        <div>
            <p className='text-sm font-medium'>
                {userInfo ? userInfo.fullName : ""}
            </p>
            <button className='text-slate-700 font-medium underline ' onClick={Logout} >
                Logout
            </button>
        </div>
      
    </div>
  )
}

export default ProfileInfo
