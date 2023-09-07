
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Feed from './components/Feed'
import PageItem from './components/PageItem'
import './App.css'


function App() {



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/feed' element={<Feed />} />
        <Route path='/item/:itemId' element={<PageItem />}

        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
