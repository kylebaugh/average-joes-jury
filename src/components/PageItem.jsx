import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const PageItem = () => {

    const [item, setItem] = useState(null)
    const [ratings, setRatings] = useState([])

    const { itemId } = useParams()


    useEffect(() => async () => {
        const newItem = await axios.get(`/itemapi/${itemId}`)
        setItem(newItem.data)
        setRatings(newItem.data.item.ratings)
    }, [])

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
            <section> Top Comments:
                {reviews}     
            </section>
            </div>
            }

        </div>

    )
}

export default PageItem