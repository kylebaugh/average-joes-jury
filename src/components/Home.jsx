import Feed from './Feed.jsx'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

    const user = useSelector(state => state.userId)
    const show = useSelector(state => state.show)

    const dispatch = useDispatch()

    return (
        <div id="homepage">

            <section id="navButtons">
                <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'search'})}
                >Search</section>
                {user && 
                <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'items'})}
                >My Items</section>}
                {user && <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'reviews'})}
                >My Reviews</section>}
                {user && <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'addItem'})}
                >Add Item</section>}
            </section>

            <section id="mainComponents">
                {show === "search" && <Feed />}
                {show === "items" && <Feed userId={user} />}
                {show === "reviews" && <h3>User reviews will go here</h3>}
                {show === "addItem" && <h3>Add item form will go here</h3>}
            </section>

        </div>
    )
}

export default Home