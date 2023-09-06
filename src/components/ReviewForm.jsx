import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

export const ReviewForm = ({ itemId, userRating }) => {

    const [stars, setStars] = useState("")
    const [review, setReview] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [editMode, setEditMode] = useState(false)
    const userId = useSelector(state => state.userId)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (userRating === undefined) {
            let { data } = await axios.post("/rating", {
                stars,
                review,
                imgUrl,
                userId,
            })
            console.log("new post")
        } else {
            let { data } = await axios.put(`/rating/${userRating.ratingId}`, {
                stars,
                review,
                imgUrl,
            })
            console.log("edit put")
        }

        toggleEdit()
    }

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    useEffect(() => {
        if (userRating) {
            setStars(userRating.stars)
            setReview(userRating.review)
            setImgUrl(userRating.imgUrl)
        }
    }, [userRating])

    return (
        <div className="pageItem">
            {userId && !editMode && 
                <section>
                    {userRating && 
                    <>
                        <button
                            onClick={toggleEdit}
                        >Edit Rating
                        </button>
                        <p>User: {userId}</p>
                        <p>Stars: {stars}</p>
                        <p>Review: {review}</p>
                        <img src={imgUrl}></img>
                    </>
                    }
                    {!userRating && 
                        <button
                            onClick={toggleEdit}
                        >Add A Review
                        </button>
                    }
                </section>
            }
            {userId && editMode &&
                <section>
                    <button
                        onClick={toggleEdit}
                    >Cancel
                    </button>
                    <form onSubmit={submitHandler}>
                        <section>Stars
                            <select 
                                name="stars" 
                                id="stars"
                                onChange={(e) => setStars(e.target.value)}
                                defaultValue={stars}
                            >
                                <option value="1">⭐️</option>
                                <option value="2">⭐️⭐️</option>
                                <option value="3">⭐️⭐️⭐️</option>
                                <option value="4">⭐️⭐️⭐️⭐️</option>
                                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                            </select>
                        </section>
                        <section>Review
                            <input 
                                type="text-field" 
                                onChange={(e) => setReview(e.target.value)}
                                defaultValue={review}
                                />
                        </section>
                        <section>Image URL
                            <input 
                                type="text" 
                                onChange={(e) => setImgUrl(e.target.value)}
                                defaultValue={imgUrl}
                                />
                        </section>
                        <section>
                            <input type="submit" />
                        </section>
                    </form>
                </section>
            }
            {!userId && 
                <form onSubmit={submitHandler}>
                    <section>Stars
                        <select 
                            name="stars" 
                            id="stars"
                            onChange={(e) => setStars(e.target.value)}
                            >
                            <option value="1">⭐️</option>
                            <option value="2">⭐️⭐️</option>
                            <option value="3">⭐️⭐️⭐️</option>
                            <option value="4">⭐️⭐️⭐️⭐️</option>
                            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                        </select>
                    </section>
                    <section>Review
                        <input 
                            type="text-field" 
                            onChange={(e) => setReview(e.target.value)}
                            />
                    </section>
                    <section>Image URL
                        <input 
                            type="text" 
                            onChange={(e) => setImgUrl(e.target.value)}
                            />
                    </section>
                    <section>
                        <input type="submit" />
                    </section>
                </form>
            }
        </div>
    )
}
