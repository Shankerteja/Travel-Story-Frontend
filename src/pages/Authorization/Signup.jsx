import React from 'react'
import PasswordInput from '../../components/PasswordInput'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { validateEmail } from '../../utils/helper'
import axoisInstance from '../../utils/axiosInstance'
function Signup() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(null)
  const [name,setName]=useState("")
  const navigate=useNavigate()

  const handleSumbit=async (event)=>{
    event.preventDefault()
   
    if(!name){
      setError("Please enter your name")
      return
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    
    if(!password){
      setError("Please enter the password")
      return
    }
    setError("")
    try {
      const response=await axoisInstance.post('/create-user',{
        fullName:name,
        email:email,
        password:password

      })
      if(response.data && response.data.accessToken){
        localStorage.setItem('token',response.data.accessToken)
        navigate('/')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Un Expected error accoured. Please try again")
      }
      
    }

  }
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10'/>
      <div className='login-ui-box -bottom-40 right-30 bg-cyan-200'/>
      <div className='h-screen flex items-center justify-center w-full lg:mx-auto relative lg:container lg:px-20'>
        <div className='bg-signup-image w-2/4 h-[90vh] bg-cover flex items-start p-6 pt-[100px] bg-center rounded-xl xs:hidden lg:flex' >
          <div className=''>
              <h4 className='text-5xl text-white font-bold leading-[60px]'>
                Capture Your <br/> Journeys
              </h4>
              <p className='text-white font-medium leading-6 pr-7 mt-4 text-lg'>
                Record Your Travel exprerience and memories in Your Personal travel journal.
              </p>
          </div>
        </div>
        <div className='xs:w-90 xs:p-10 lg:w-2/4 lg:h-[75vh] relative lg:p-16 shadow-lg shadow-cyan-200/50 bg-white rounded'>
          <form onSubmit={handleSumbit}>
            <h1 className='text-5xl font-medium text-slate-700 text-center mb-5'>SignUp</h1>
            <input type='text' className='input-box' placeholder='full Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type='text' className='input-box' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
              {error && <p className='text-sm text-red-400 pb-2'>{error}</p>}
            <button className='btn-primary'  type='submit'>CREATE ACCOUNT</button>
            <p className='text-sm text-center text-slate-500'>Or</p>
            <button  className='btn-primary btn-light' onClick={()=>navigate("/login")}>LOGIN</button>
          </form>
        </div>
      </div>
      <div>

      </div>

    </div>
  )
}

export default Signup
