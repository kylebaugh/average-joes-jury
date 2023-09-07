import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const FeedReview = ({ review }) => {

    const editMode = useSelector(state => state.editMode)
    const dispatch = useDispatch()

    const editBtnHandler = () => {

        dispatch({
            type: 'SET_EDIT_MODE',
            payload: !editMode,
        })
    }

    return (
        <div className="feedReview">
            <Link to={`/item/${review.item.itemId}`}>
                <h2>{review.item.name}</h2>
            </Link>
            <img 
                src={review.item.imgUrl} 
                alt="item img" 
            />
            <p>Average Rating: {(review.totalStars / review.totalRatings).toFixed(2)}</p>
            <p>({review.totalStars} Reviews)</p>
            <h5>Your rating:</h5>
            <p>{review.rating.stars} stars</p>
            <h5>Your review:</h5>
            <p>{review.rating.review}</p>
            
            <Link to={`/item/${review.item.itemId}`}>
                <button onClick={editBtnHandler}>Edit Review?</button>
            </Link>
            
        </div>
    )
}

export default FeedReview