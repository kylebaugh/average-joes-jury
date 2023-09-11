import thumbUp from "../assets/hand-thumbs-up.svg"
import thumbDown from "../assets/hand-thumbs-down.svg"
import thumbUpFill from "../assets/hand-thumbs-up-fill.svg"
import thumbDownFill from "../assets/hand-thumbs-down-fill.svg"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from "axios"

const Thumb = ({ review, userReview, scotty }) => {

    const userId = useSelector(state => state.userId)

    const [userVote, setUserVote] = useState(null)

    const handleThumbClick = async (dir) => {

        let ratingId;
        if (review) {
            ratingId = review.ratingId
        } else {
            ratingId = userReview.ratingId
        }

        if (!userId) {
            return
        }

        if (dir === "up") {

            if (userVote === "down") {
                await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: true
                })

                await scotty()
                setUserVote("up")
                
            } else if (userVote === "up") {
                await axios.delete('/vote', { data: {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: false
                }})

                await scotty()
                setUserVote(null)
                
            } else if (userVote === null) {
                await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: true,
                    decrementOther: false
                })

                await scotty()
                setUserVote("up")
            }
            
        } else if (dir === "down") {
            
            if (userVote === "up") {
                await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: false,
                    decrementOther: true
                })
                
                await scotty()
                setUserVote("down")

            } else if (userVote === "down") {
                await axios.delete('/vote', { data: {
                    userId,
                    ratingId,
                    upvote: false,
                    decrementOther: false
                }})
                
                await scotty()
                setUserVote(null)

            } else if (userVote === null) {
                await axios.post(`/vote`, {
                    userId,
                    ratingId,
                    upVote: false,
                    decrementOther: false
                })
                
                await scotty()
                setUserVote("down")

            }
        }
    }

    useEffect(() => {
        if (review) {
            for (let vote of review.votes) {
                if (vote.userId === userId) {
                    if (vote.upVote) {
                        setUserVote("up")
                    } else {
                        setUserVote("down")
                    }
                }
            }
        }
    
        if (userReview) {
            for (let vote of userReview.votes) {
                if (vote.userId === userId) {
                    if (vote.upVote) {
                        setUserVote("up")
                    } else {
                        setUserVote("down")
                    }
                }
            }
        }

    }, [userVote])
    

    return (
        <span>
        {review && 
            <>
            {userVote === "up" &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUpFill} /> ({review.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({review.downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({review.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDownFill} /> ({review.downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({review.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({review.downVotes})
                </button>
                </>
            }
            </>
        }
        {userReview && 
            <>
            {userVote === "up" &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUpFill} /> ({userReview.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({userReview.downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({userReview.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDownFill} /> ({userReview.downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button 
                    onClick={(e) => handleThumbClick("up")}
                >
                    <img src={thumbUp} /> ({userReview.upVotes})
                </button>
                <button 
                    onClick={(e) => handleThumbClick("down")}
                >
                    <img src={thumbDown} /> ({userReview.downVotes})
                </button>
                </>
            }
            </>
        }
        </span>
    )
}

export default Thumb