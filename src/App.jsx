import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route 
} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Profile, { profileLoader } from './components/Profile'
import PageItem from './components/PageItem'
import './App.css'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header />} >
      <Route index element={<Home />} />
      <Route path='item/:itemId' element={<PageItem />} />
      <Route 
        path='profile/:userId' 
        element={<Profile />} 
        loader={profileLoader}
      />

      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
