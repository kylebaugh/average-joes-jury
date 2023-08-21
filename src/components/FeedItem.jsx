import lodash from 'lodash'

const FeedItem = ({ item, randomReviews, feedItem }) => {

    let totalRatings = item.ratings.length
    let totalStars = item.ratings.reduce((a, c) => a + c.stars, 0)
    let avgStars = totalStars / totalRatings

    return (

        <div className="feed-item"><em>Item on Feed</em>

            <section>
                <img src={item.user.imgUrl} alt="item creator img" />
                <h3>{item.name}</h3>
            </section>
            <section>
                <img src={item.imgUrl} alt="item img" />
                <p>{item.description}</p>
            </section>
            {!feedItem &&
            <section>
                Average Rating: {avgStars.toFixed(2)}
                Total Ratings: {totalRatings}
            </section>
            }
            {!feedItem &&
                <section>
                <b>Top Comments:</b> <br></br>
                - {randomReviews[0].review}<br></br>
                - {randomReviews[1].review}
            </section>
            }
            
        </div>

    )
}

export default FeedItem