import FeedItem from "./FeedItem.jsx";
import axios from "axios";
import { useState, useEffect } from "react";

const Feed = ({ userId }) => {

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
                        return <FeedItem
                                    key={item.itemId}
                                    item={item}
                                    totalStars={item.ratings.length}
                                    avg={avg}
                                />
                    })}
                </div>
            }

        </div>
    )
}

export default Feed