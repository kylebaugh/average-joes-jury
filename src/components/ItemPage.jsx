import FeedItem from "./FeedItem.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import lodash from 'lodash'

const ItemPage = () => {

    const [item, setItem] = useState(null)
    const [tenItems, setTenItems] = useState(null)
    const [feedItem, setFeed] = useState(true)
    const [totalStars, setTotalStars] = useState(0)
    const [avg, setAvg] = useState(0)
    const [randomReviews, setRandomReviews] = useState('')

    // const getRandomItem = async () => {
    //     await axios.get(`/item/Item${lodash.random(1, 10)}`)
    //         .then((res) => {
    //             // console.log(`res.data: ${res.data.item.user.imgUrl}`)
    //             setItem(res.data.item)
    //             setTotalStars(res.data.totalStars)
    //             setAvg(res.data.avg)
    //             setRandomReviews(res.data.randomReviews)
    //         })
    // }

    const getTenItems = async () => {
        await axios.get('/items/ten')
            .then(res => {
                setTenItems(res.data)
            })
    }

    useEffect(() => {
        // getRandomItem()
        getTenItems()
    }, [])



    return (
        <div>
            {/* {item && <FeedItem
                item={item}
                totalStars={totalStars}
                avg={avg}
                randomReviews={randomReviews}
            />} */}
            {tenItems &&
                <div id='mapped'>
                    {tenItems.map(item => {
                        console.log(item)
                        let totalStars = item.ratings.reduce((a, c) => a + c.stars, 0)
                        let avg = totalStars / item.ratings.length
                        let randomReviews = lodash.sampleSize(item.ratings, 2)
                        return <FeedItem
                            key={item.itemId}
                            item={item}
                            feedItem={false}
                            totalStars={totalStars}
                            avg={avg}
                            randomReviews={randomReviews}
                        />
                    })}
                </div>
            }

        </div>
    )
}

export default ItemPage