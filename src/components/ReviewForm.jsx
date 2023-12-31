import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import Thumb from "./Thumb"

const ReviewForm = ({ itemId, userRating, setUserRating }) => {

    const editMode = useSelector(state => state.editMode)
    const dispatch = useDispatch()

    const [stars, setStars] = useState("1")
    const [review, setReview] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const [deleteRequest, setDeleteRequest] = useState(false)


    const userId = useSelector(state => state.userId)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (userRating === undefined) {
            let { data } = await axios.post("/rating", {
                stars,
                review,
                imgUrl,
                userId,
                itemId
            })
            console.log("new post")
            setUserRating(data.newRating)

        } else {
            let { data } = await axios.put(`/rating/${userRating.ratingId}`, 
                {
                    stars,
                    review,
                    imgUrl,
                }
            )
            console.log("edit put")
            console.log(data)
            setUserRating(data.rating)
        }

        toggleEdit()
    }

    const toggleEdit = () => {
        dispatch({
            type: 'SET_EDIT_MODE',
            payload: !editMode,
        })
    }

    const deleteHandler = async () => {
        console.log('hit')
        const { data } = await axios.delete(`/rating/${userRating.ratingId}`)
        console.log(data)
        setDeleteRequest(false)
        setUserRating(null)
    }


    useEffect(() => {
        if(userRating) {
            setStars(userRating.stars)
            setReview(userRating.review)
            setImgUrl(userRating.imgUrl)
        }
        // for(let prop in userRating){
        //     console.log(prop)
        // }
    }, [userRating, editMode, setUserRating])

    return (
        <div className="pageItem">
            {userId && editMode &&
                <section>

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
                            <textarea
                                rows={5}
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
                    <button
                        onClick={toggleEdit}
                    >Cancel
                    </button>

                    {userRating && <section>
                            {!deleteRequest && <button onClick={() => setDeleteRequest(true)}>Delete Review?</button>}
                            {deleteRequest && <section>
                                Are you sure?
                                <button onClick={() => setDeleteRequest(false)}>Nevermind</button>
                                <button onClick={deleteHandler}>Yes, I'm sure</button>
                            </section>
                            }
                    </section>
                    }
            </section>
            }

            {userId && !editMode &&
                <section>
                    {userRating &&
                    <>
                    <section>
                        <h4>Your Rating:</h4>
                        <p>User: {userId}</p>
                        <p>Stars: {stars}</p>
                        <p>Review: {review}</p>
                        <img src={imgUrl}></img>
                        <div>
                            <Thumb 
                                userReview={userRating} 
                            />
                        </div>
                    </section>
                    <section>

                        <button
                            onClick={toggleEdit}
                        >Edit Rating
                        </button>
                    </section>
                    </>
                    }
                    {!userRating &&
                        <button
                            onClick={toggleEdit}
                        >Add A Review
                        </button>


                    }
                    {userRating && <section>
                        {!deleteRequest && <button onClick={() => setDeleteRequest(true)}>Delete Review?</button>}
                        {deleteRequest && <section>
                            Are you sure?
                            <button onClick={() => setDeleteRequest(false)}>Nevermind</button>
                            <button onClick={deleteHandler}>Yes, I'm sure</button>
                        </section>
                        }
                    </section>}
                </section>
            }


        </div>
    )
}

export default ReviewForm