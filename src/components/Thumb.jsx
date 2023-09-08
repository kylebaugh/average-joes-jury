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
            console.log(review.votes)
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
            console.log(userReview.votes)
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
                <img src={thumbUpFill} /> ({review.upVotes})
                <img src={thumbDown} /> ({review.downVotes})
                </>
            }
            {userVote === "down" &&
                <>
                <img src={thumbUp} /> ({review.upVotes})
                <img src={thumbDownFill} /> ({review.downVotes})
                </>
            }
            {!userVote &&
                <>
                <img src={thumbUp} /> ({review.upVotes})
                <img src={thumbDown} /> ({review.downVotes})
                </>
            }
            </>
        }
        {userReview && 
            <>
            {userVote === "up" &&
                <>
                <img src={thumbUpFill} /> ({userReview.upVotes})
                <img src={thumbDown} /> ({userReview.downVotes})
                </>
            }
            {userVote === "down" &&
                <>
                <img src={thumbUp} /> ({userReview.upVotes})
                <img src={thumbDownFill} /> ({userReview.downVotes})
                </>
            }
            {!userVote &&
                <>
                <img src={thumbUp} /> ({userReview.upVotes})
                <img src={thumbDown} /> ({userReview.downVotes})
                </>
            }
            </>
        }
        </span>
    )
}

export default Thumb