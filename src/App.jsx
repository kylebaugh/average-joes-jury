import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import ItemPage from './components/ItemPage.jsx'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <div>App stuff goes here</div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
