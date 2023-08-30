import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ReviewForm = ({itemId, userRating}) => {

    const [stars, setStars] = useState(0)
    const [review, setReview] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [editMode, setEditMode] = useState(false)
    const userId = useSelector(state => state.userId)

    const submitHandler = async (e) => {
        e.preventDefault()
        let body = {
            stars,
            review,
            imgUrl,
            userId,
            itemId
        }
        await axios.post('/rating', body)

    }

    useEffect(() => {
        if(userRating){
            setStars(userRating.stars)
            setReview(userRating.review)
            setImgUrl(userRating.imgUrl)
        }
    }, [editMode])

    const toggleEdit = () => {
        setEditMode(!editMode)
    }


    return (
        <div>

            {userId && !editMode && <section>
                <button onClick={toggleEdit}>Edit</button>
                    <p>User: {userId}</p>
                    <p>Stars: {stars}</p>
                    <p>Review: {review}</p>
                    <img src={imgUrl} />
                </section>}

            {userId && editMode &&
                <section>
                    <button onClick={toggleEdit}>Cancel</button>
                    <form>
                        <section>
                            <p>Stars</p>
                            <select
                                name="starForm"
                                id="starForm"
                                onChange={(e) => setStars(e.target.value)}
                                defaultValue={stars}
                                >
                                <option value='1'>⭐️</option>
                                <option value='2'>⭐️⭐️</option>
                                <option value='3'>⭐️⭐️⭐️</option>
                                <option value='4'>⭐️⭐️⭐️⭐️</option>
                                <option value='5'>⭐️⭐️⭐️⭐️⭐️</option>
                            </select>
                        </section>
                        <section>
                            <p>Review</p>
                            <input placeholder='Enter Review' onChange={(e) => setReview(e.target.value)} value={review}/>
                        </section>
                        <section>
                            <p></p>
                            <input placeholder='Enter Image URL' onChange={(e) => setImgUrl(e.target.value)} value={imgUrl}/>
                        </section>
                        <button onClick={submitHandler}>Submit</button>
                    </form>
                </section>}

            {!userId && <form>
                <section>
                    <p>Stars</p>
                    <select name="starForm" id="starForm" onChange={(e) => setStars(e.target.value)}>
                        <option value={stars}>⭐️</option>
                        <option value={stars}>⭐️⭐️</option>
                        <option value={stars}>⭐️⭐️⭐️</option>
                        <option value={stars}>⭐️⭐️⭐️⭐️</option>
                        <option value={stars}>⭐️⭐️⭐️⭐️⭐️</option>
                    </select>
                </section>
                <section>
                    <p>Review</p>
                    <input placeholder='Enter Review' onChange={(e) => setReview(e.target.value)} value={review}/>
                </section>
                <section>
                    <p></p>
                    <input placeholder='Enter Image URL' onChange={(e) => setImgUrl(e.target.value)} value={imgUrl}/>
                </section>
                <button onClick={submitHandler}>Submit</button>
            </form>}


        </div>
    )
}

export default ReviewForm