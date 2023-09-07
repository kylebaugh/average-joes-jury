import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeedReview from "./FeedReview";

const MyReviews = () => {

    const [myReviews, setMyReviews] = useState([])
    const userId = useSelector(state => state.userId)

    const getReviews = async () => {
        await axios.get(`/allRatings/${userId}`)
        .then(res => {
            console.log(res.data)
            setMyReviews(res.data)
        })
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <div>
            <h2>Items you have reviewed:</h2>
            {myReviews && 
                <div id='allReviews'>
                    {myReviews.map(review => {
                        return <FeedReview 
                                    key={review.rating.ratingId}
                                    review={review}
                                />
                    })}
                </div>
            }
        </div>
    )
}

export default MyReviews