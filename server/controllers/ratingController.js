import { Rating } from "../db/model.js";

const ratingFunctions = {

    addRating: async (req, res) => {

        if (!req.session.user) {
            return res.json("You must be logged in to do that")
        }

        const { stars, review, imgUrl } = req.body

        const user = req.session.user
        const item = req.session.item

        const newRating = await Rating.create({
            stars,
            review, 
            imgUrl,
            userId: user.userId,
            itemId: item.itemId,
        })

        return res.json({ message: "Rating created successfully", rating: newRating })
    },

    deleteRating: async (req, res) => {

        if (!req.session.user) {
            return res.json("You must be logged in to do that")
        }

        const { ratingId } = req.params
        const rating = await Rating.findByPk(ratingId)
        
        if (rating.userId === req.session.user.userId) {
            
            await rating.destroy()
            return res.json("Rating deleted")
            
        } else {
            
            return res.json("You can't delete a rating that you did not create.")
            
        }
    },
    
    updateRating: async (req, res) => {

        if (!req.session.user) {
            return res.json("You must be logged in to do that")
        }
        
        const { ratingId } = req.params
        const { stars, review, imgUrl } = req.body
        const rating = await Rating.findByPk(ratingId)

        if (rating.userId === req.session.user.userId) {

            rating.stars = +stars ?? rating.stars
            rating.review = review
            rating.imgUrl = imgUrl 
            await rating.save()

            return res.json({ message: "Rating successfully updated", rating: rating })

        } else {

            return res.json({ message: "You can't edit a rating that you did not create", rating: rating})

        }
        
    }
}

export default ratingFunctions
