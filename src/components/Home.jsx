import Feed from './Feed'
import MyReviews from './MyReviews'
import { useDispatch, useSelector } from 'react-redux'
import AddForm from './AddForm.jsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const userId = useSelector(state => state.userId)
  const show = useSelector(state => state.show)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  return (
    <div id="homepage">

      <section id="navButtons">

        <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'search'})}
        >Search
        </section>

        {userId && 
        <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'items'})}
        >My Items
        </section>
        }
        {userId && 
        <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'reviews'})}
        >My Reviews
        </section>
        }
        {userId && 
        <section onClick={() => dispatch({type: 'SET_SHOW', payload: 'addItem'})}
        >Add Item
        </section>
        }
        {userId &&
        <section onClick={() => navigate(`/profile/${userId}`)}
        >Profile
        </section>
        }

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