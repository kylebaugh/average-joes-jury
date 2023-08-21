
const ItemFeed = ({ item, totalStars, avg, randomReviews, feedItem }) => {
    avg = +avg

    return (
        <div className='feedItem'>Item on Feed

            <section>
                <img src={item.user.imgUrl} alt="item creator img" />
                <p>{item.name}</p>
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

export default ItemFeed