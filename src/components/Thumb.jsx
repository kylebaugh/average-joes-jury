import thumbUp from "../assets/hand-thumbs-up.svg"
import thumbDown from "../assets/hand-thumbs-down.svg"
import thumbUpFill from "../assets/hand-thumbs-up-fill.svg"
import thumbDownFill from "../assets/hand-thumbs-down-fill.svg"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const Thumb = ({ review, userReview }) => {

    const userId = useSelector(state => state.userId)

    const [userVote, setUserVote] = useState(null)

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
                <button>
                    <img src={thumbUpFill} /> ({review.upVotes})
                </button>
                <button>
                    <img src={thumbDown} /> ({review.downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button>
                    <img src={thumbUp} /> ({review.upVotes})
                </button>
                <button>
                    <img src={thumbDownFill} /> ({review.downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button>
                    <img src={thumbUp} /> ({review.upVotes})
                </button>
                <button>
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
                <button>
                    <img src={thumbUpFill} /> ({userReview.upVotes})
                </button>
                <button>
                    <img src={thumbDown} /> ({userReview.downVotes})
                </button>
                </>
            }
            {userVote === "down" &&
                <>
                <button>
                    <img src={thumbUp} /> ({userReview.upVotes})
                </button>
                <button>
                    <img src={thumbDownFill} /> ({userReview.downVotes})
                </button>
                </>
            }
            {!userVote &&
                <>
                <button>
                    <img src={thumbUp} /> ({userReview.upVotes})
                </button>
                <button>
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