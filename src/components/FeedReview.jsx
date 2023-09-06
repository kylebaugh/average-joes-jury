

const FeedReview = ({ review }) => {

    return (
        <div>
            <h2>{review.item.name}</h2>
            <img 
                src={review.item.imgUrl} 
                alt="item img" 
            />
            <p>Average Rating: {(review.totalStars / review.totalRatings).toFixed(2)}</p>
            <p>({review.totalStars} Reviews)</p>
            <h5>Your rating:</h5>
            <p>{review.stars} stars</p>
            <h5>Your review:</h5>
            <p>{review.review}</p>
            
        </div>
    )
}

export default FeedReview