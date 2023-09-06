import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ReviewForm } from "./ReviewForm"
import { useSelector } from "react-redux"

const PageItem = () => {

    const [item, setItem] = useState(null)
    const [ratings, setRatings] = useState([])
    const [userRating, setUserRating] = useState([])

    const { itemId } = useParams()
    const userId = useSelector(state => state.userId)
    
    const scotty = async () => {
        if (userId) {
            const { data } = await axios.get(`/itemapi/${itemId}?userId=${userId}`)
            setItem(data)
            setRatings(data.item.ratings)
            setUserRating(data.userRating)
        } else {
            const { data } = await axios.get(`/itemapi/${itemId}`)
            setItem(data)
            setRatings(data.item.ratings)
        }
    }
    
    useEffect(() => {
        scotty()
    }, [userId])

    let reviews = ratings.map((review) => {
        return (
            <section 
                key={review.ratingId}
                className="fullReview"
            >
                <p>User: {review.userId}</p>
                <p>Stars: {review.stars}</p>
                <p>Review: {review.review}</p>
                <img src={review.imgUrl} />

            </section>
        )
    })

    return (
        <div className='pageItem'>Full Page Item

            {item && 
            <div>
                {userId && 
                    <section>
                    {userRating &&
                        <ReviewForm 
                            itemId={itemId} 
                            userRating={userRating}
                        /> 
                    }
                    {!userRating && 
                        <ReviewForm 
                        /> 
                    }
                    </section>
                }
            <section>
                <img src={item.item.user.imgUrl} alt="item creator img" />
                <p>{item.item.name}</p>
            </section>
            <section>
                <img src={item.item.imgUrl} alt="item img" />
                <p>{item.item.description}</p>
            </section>
            <section>
                Average Rating: {+(item.avg).toFixed(2)}
                <br />
                Total Ratings: {+item.totalStars}
                <br></br>
                <br></br>
            </section>
            <section className="topComments"> Top Comments:
                {reviews}     
            </section>
            </div>
            }

        </div>
    )
}

export default PageItem