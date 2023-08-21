import FeedItem from "./FeedItem.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import lodash from 'lodash'

const Feed = () => {

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

    const [tenItems, setTenItems] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    // searchValue will return results which will just replace 'tenItems'

    const getTenItems = async () => {
        await axios.get('/items/ten')
            .then((res) => {
                setTenItems(res.data)
            })
    }

    const searchItems = async () => {
        await axios.get(`/search/${searchValue.trim()}`)
            .then((res) => {
                setTenItems(res.data)
            })
    }

    useEffect(() => {
        if (searchValue.trim()) {
            searchItems()
        } else{
            getTenItems()
        }
    }, [searchValue])

    return (
        <div>
            {/* {item && 
                <FeedItem 
                    item={item} 
                    totalStars={totalStars}
                    avg={avg}
                    randomReviews={randomReviews}
                />
            } */}
            <input 
                id="searchBar"
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {tenItems &&
                <div id="mapped">
                    {tenItems.map((item) => {
                        
                        return <FeedItem 
                            key={item.itemId}
                            item={item}
                            feedItem={false}
                            randomReviews={
                                lodash.sampleSize(item.ratings, 2)
                            }
                        />
                    })}
                </div>
            }
        </div>
    )
}

export default Feed