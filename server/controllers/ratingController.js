import { User, Item, Rating } from "../db/model.js";


const ratingFunctions = {
    addRating: async (req, res) => {
        const {stars, review, imgUrl} = req.body

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        let myItem = await Item.findByPk(req.session.item.itemId)

        req.session.item = myItem

        const user = await User.findByPk(req.session.user.userId)


        const newRating = await user.createRating({
            stars,
            review,
            imgUrl,
            itemId: myItem.itemId,
            userId: user.userId
        })

        res.json({
            message: 'rating added',
            newRating
        })
    },

    deleteRating: async (req, res) => {

        const {ratingId} = req.params

        const rating = await Rating.findByPk(ratingId)

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        if(req.session.user.userId === rating.userId){
            await rating.destroy()
            res.json(`Rating ID ${ratingId} has been deleted`)
        }else{
            res.json("You don't have permission to delete this item")
        }

    },

    updateRating: async (req, res) => {
        const {ratingId} = req.params
        const {stars, review, imgUrl} = req.body

        const rating = await Rating.findByPk(ratingId)

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        if(req.session.user.userId === rating.userId){
            rating.stars = +stars ?? rating.stars
            rating.review = review
            rating.imgUrl = imgUrl

            await rating.save()
            res.json({description: `Rating ID ${ratingId} has been updated`, rating: rating})
        }else{
            res.json("You don't have permission to delete this item")
        }
    }
}

export default ratingFunctions