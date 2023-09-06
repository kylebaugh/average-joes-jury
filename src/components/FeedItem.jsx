import { Link } from "react-router-dom"


const FeedItem = ({ item, totalStars, avg }) => {
    avg = +avg

    return (
        <div className='feedItem'>

            <section>
                <img src={item.user.imgUrl} alt="item creator img" />
                <h2>
                    <Link to={`/item/${item.itemId}`}
                    >{item.name}
                    </Link>
                </h2>
            </section>

            <section>
                <img src={item.imgUrl} alt="item img" />
                <p>{item.description}</p>
            </section>

            <section>
                Average Rating: {+avg.toFixed(2)}
                <br />
                Total Ratings: {+totalStars}
                <br></br>
                <br></br>
            </section>

        </div>

    )
}

export default FeedItem