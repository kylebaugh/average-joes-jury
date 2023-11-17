import Feed from './Feed'
import MyReviews from './MyReviews'
import { useDispatch, useSelector } from 'react-redux'
import AddForm from './AddForm.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    const [initialData, setInitialData] = useState(null)

    const serverCall = async () => {
        const response = await axios.get("/")
        setInitialData(response.data)
    }

    useEffect(() => {
        serverCall()
    }, [])

    const userId = useSelector(state => state.userId)
    const show = useSelector(state => state.show)

    const dispatch = useDispatch()

    return (
        <div id="homepage">

            <section id="navButtons">
                <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'search'})}
                >Search</section>
                {userId && 
                <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'items'})}
                >My Items</section>}
                {userId && <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'reviews'})}
                >My Reviews</section>}
                {userId && <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'addItem'})}
                >Add Item</section>}
            </section>

            <section id="mainComponents">
                {show === "search" && <Feed />}
                {show === "items" && <Feed userId={userId} />}
                {show === "reviews" && <MyReviews />}
                {show === "addItem" && <AddForm/>}
            </section>

        </div>
    )
}

export default Home