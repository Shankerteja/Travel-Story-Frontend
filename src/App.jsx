import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Authorization/Login'
import Signup from './pages/Authorization/Signup'
import Home from './pages/Home'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  const token=localStorage.getItem('token')
  return (
    <>
    <Routes>
      <Route path='/' element={
       <ProtectedRoute>
        <Home/>
       </ProtectedRoute>
  }/>
      <Route path='/login' element={<Login/>}
      />
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    
    
    </>
  )
}

export default App