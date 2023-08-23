import FeedItem from "./FeedItem.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import lodash from 'lodash'

const Feed = ({userId}) => {

    const [tenItems, setTenItems] = useState(null)
    const [searchValue, setSearchValue] = useState('')

    const getTenItems = async () => {
        await axios.get('/items/ten')
            .then(res => {
                setTenItems(res.data)
            })
    }

    const searchItems = async () => {
        await axios.get(`/search/${searchValue.trim()}`)
            .then(res => {
                setTenItems(res.data)
            })
    }

    const getUserItems = async () => {
        await axios.get('/itemsByUser')
            .then(res => {
                setTenItems(res.data)
            })
    }

    useEffect(() => {
        if (userId) {
            getUserItems()
        } else if (searchValue.trim()){
            searchItems()
        } else {
            getTenItems()
        }
    }, [searchValue])

    return (
        <div>
            <input id='searchBar' placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>

            {tenItems &&
                <div id='mapped'>
                    {tenItems.map(item => {
                        let totalStars = item.ratings.reduce((a, c) => a + c.stars, 0)
                        let avg = totalStars / item.ratings.length
                        let randomReviews = lodash.sampleSize(item.ratings, 2)
                        return <FeedItem
                                    key={item.itemId}
                                    item={item}
                                    feedItem={false}
                                    totalStars={item.ratings.length}
                                    avg={avg}
                                    randomReviews={randomReviews}
                                />
                    })}
                </div>
            }

        </div>
    )
}

export default Feed





    // const [item, setItem] = useState(null)
    // const [feedItem, setFeed] = useState(true)
    // const [totalStars, setTotalStars] = useState(0)
    // const [avg, setAvg] = useState(0)
    // const [randomReviews, setRandomReviews] = useState('')

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


                {/* {item && <FeedItem
                item={item}
                totalStars={totalStars}
                avg={avg}
                randomReviews={randomReviews}
            />} */}