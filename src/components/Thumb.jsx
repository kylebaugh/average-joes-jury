import thumbUp from "../assets/hand-thumbs-up.svg"
import thumbDown from "../assets/hand-thumbs-down.svg"
import thumbUpFill from "../assets/hand-thumbs-up-fill.svg"
import thumbDownFill from "../assets/hand-thumbs-down-fill.svg"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"

const Thumb = ({ review, userReview }) => {

    const userId = useSelector(state => state.userId)

    const [userVote, setUserVote] = useState(null)
    const [rating, setRating] = useState(review)
    const [userRating, setUserRating] = useState(userReview)
    const [upVotes, setUpVotes] = useState(review ? review.upVotes : userReview.upVotes)
    const [downVotes, setDownVotes] = useState(review ? review.downVotes : userReview.downVotes)



    const handleThumbClick = async (dir) => {

        let ratingId;
        if (rating) {
            ratingId = rating.ratingId
        } else {
            ratingId = userRating.ratingId
        }

        if (!userId) {
            return
        }


        if (dir === "up") {

            if (userVote === "down") {
                const { data } = await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: true
                })
                
                setUserVote("up")
                setDownVotes(data.downVotes)
                setUpVotes(data.upVotes)
                rating ? setRating(data) : setUserRating(data)
                
            } else if (userVote === "up") {
                const { data } = await axios.delete('/vote', { data: {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: false
                }})

                setUserVote(null)
                setUpVotes(data.upVotes)
                rating ? setRating(data) : setUserRating(data)
                
            } else if (userVote === null) {
                const { data } = await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: false
                })

                setUserVote("up")
                setUpVotes(data.upVotes)
                rating ? setRating(data) : setUserRating(data)
            }

        } else if (dir === "down") {

            if (userVote === "up") {
                const { data } = await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: false,
                    decrementOther: true
                })

                setUserVote("down")
                setDownVotes(data.downVotes)
                setUpVotes(data.upVotes)
                rating ? setRating(data) : setUserRating(data)

            } else if (userVote === "down") {
                const { data } = await axios.delete('/vote', { data: {
                    userId,
                    ratingId,
                    upvote: false,
                    decrementOther: false
                }})

                setUserVote(null)
                setDownVotes(data.downVotes)
                rating ? setRating(data) : setUserRating(data)

            } else if (userVote === null) {
                const { data } = await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: false,
                    decrementOther: false
                })

                setUserVote("down")
                setDownVotes(data.downVotes)
                rating ? setRating(data) : setUserRating(data)

            }
        }
    }

    useEffect(() => {
        if (rating) {
            for (let vote of rating.votes) {
                if (vote.userId === userId) {
                    if (vote.upVote) {
                        setUserVote("up")
                    } else {
                        setUserVote("down")
                    }
                }
            }
        }
    
        if (userRating) {
            for (let vote of userRating.votes) {
                if (vote.userId === userId) {
                    if (vote.upVote) {
                        setUserVote("up")
                    } else {
                        setUserVote("down")
                    }
                }
            }
        }
    }, [setUserVote]) 

    return (
        <span>
        {rating && 
            <>
            {userVote === "up" &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUpFill} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDownFill} /> ({downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({downVotes})
                </button>
                </>
            }
            </>
        }

        {userRating && 
            <>
            {userVote === "up" &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUpFill} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDownFill} /> ({downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({upVotes})
                </button>
                <button
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({downVotes})
                </button>
                </>
            }
            </>
        }
        </span>
    )
}

export default Thumb