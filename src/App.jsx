import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <div>App Stuff Goes Here</div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
