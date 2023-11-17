
import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Feed from './components/Feed'
import PageItem from './components/PageItem'
import './App.css'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />} >
      <Route index element={<Home />} />
      <Route path='feed' element={<Feed />} />
      <Route path='item/:itemId' element={<PageItem />} />

      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {


  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Header />
    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/feed' element={<Feed />} />
    //     <Route path='/item/:itemId' element={<PageItem />} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
