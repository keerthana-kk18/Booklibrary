import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Viewbooks from './pages/Viewbooks'
import Viewdetails from './pages/Viewdetails'
import Dashboard from './pages/Dashboard'
import { Managebooks } from './pages/Managebooks'
import Addbooks from './pages/Addbooks'
import { Editbook } from './pages/Editbook'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/viewbooks' element={<Viewbooks/>}></Route>
        <Route path='/viewdetails/:id' element={<Viewdetails/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/managebooks' element={<Managebooks/>}></Route>
        <Route path='/addbooks' element={<Addbooks/>}></Route>
        <Route path='/editbook' element={<Editbook/>}></Route>








      </Routes>
    </BrowserRouter>
   
  )
}

export default App
