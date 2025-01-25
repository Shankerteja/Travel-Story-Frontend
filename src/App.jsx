import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Authorization/Login'
import Signup from './pages/Authorization/Signup'
import Home from './pages/Home'
import ProtectedRoute from './utils/ProtectedRoute'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={
        <ProtectedRoute>
          <Login/>
        </ProtectedRoute>
      }/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    
    
    </>
  )
}

export default App