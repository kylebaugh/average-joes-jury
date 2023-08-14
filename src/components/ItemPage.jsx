import ItemFeed from "./ItemFeed.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import lodash from 'lodash'

const ItemPage = () => {

    const [item, setItem] = useState(0)
    const [totalStars, setTotalStars] = useState(0)
    const [avg, setAvg] = useState(0)
    const [randomReviews, setRandomReviews] = useState('')

    const getRandomItem = async () => {
        await axios.get(`/item/Item${lodash.random(10)}`)
            .then((res) => {
                // console.log(`res.data: ${res.data.item.user.imgUrl}`)
                setItem(res.data.item)
                setTotalStars(res.data.totalStars)
                setAvg(res.data.avg)
                setRandomReviews(res.data.randomReviews)
            })
    }

    useEffect(() => {
        getRandomItem()
    }, [])

    return (
        <div>
            <ItemFeed 
                item={item} 
                totalStars={totalStars}
                avg={avg}
                randomReviews={randomReviews}
            />
        </div>
    )
}

export default ItemPage