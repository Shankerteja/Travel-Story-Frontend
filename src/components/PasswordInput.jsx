import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
const PasswordInput = ({value,onChange}) => {

    const [isPasswordShow,setPasswordShow]=useState(false)
    const tooglePsaswordShow=()=>{
        setPasswordShow(!isPasswordShow)
    }
  return (
    <div className='flex items-center  bg-cyan-600/5 px-5 mb-3 rounded'>
        <input
        type={isPasswordShow ? 'text' : 'password'}
        placeholder='Password'
        value={value}
        onChange={onChange}
        className='bg-transparent outline-none w-full py-3 mr-3 focus:outline-none'/>

      {
        isPasswordShow ?  <FaRegEye
        className="text-primary cursor-pointer"
        onClick={tooglePsaswordShow}
        size={30}
        />
      :   <FaRegEyeSlash
      className="text-slate cursor-pointer"
      onClick={tooglePsaswordShow}
      size={30}
      />
    
      }
    </div>
  )
}

export default PasswordInput
