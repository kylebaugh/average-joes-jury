import { Link } from "react-router-dom"


const FeedItem = ({ item, totalStars, avg, randomReviews, feedItem }) => {
    avg = +avg

    return (
        <div className='feedItem'>

            <section>
                <img src={item.user.imgUrl} alt="item creator img" />
                <br />
                <Link to={`/item/${item.itemId}`}
                >{item.name}
                </Link>
            </section>
            <section>
                <img src={item.imgUrl} alt="item img" />
                <p>{item.description}</p>
            </section>
            {feedItem && <section>
                Average Rating: {+avg.toFixed(2)}
                <br />
                Total Ratings: {+totalStars}
                <br></br>
                <br></br>
            </section>}
            {feedItem &&  <section>
                Top Comments:
                <br></br>
                - {randomReviews[0].review}<br></br>
                - {randomReviews[1].review}
            </section>}

        </div>

    )
}

export default FeedItem