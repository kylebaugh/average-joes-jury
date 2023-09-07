import { User, Item, Rating } from "../db/model.js";
import { Op } from "sequelize";

const ratingFunctions = {
    addRating: async (req, res) => {
        const {stars, review, imgUrl} = req.body
        console.log(stars)

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
        const { ratingId } = req.params
        const { stars, review, imgUrl } = req.body

        const rating = await Rating.findByPk(ratingId)

        if(!req.session.user) {
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
    },

    getRatingsSansUser: async (req, res) => {

        let ratings = await Rating.findAll({
            where: {
                [Op.not]: {
                    userId: req.params.userId
                }
            }
        })

        res.json(ratings)
    },

    getAllUserRatings: async (req, res) => {

        let ratings = await Rating.findAll({
            where: {
                userId: req.params.userId
            },
            include: {
                model: Item
            }
        })

        let ratingsAndInfo = []

        const itemRatings = async () => {
            for (let rating of ratings) {
                let itemRatings = await rating.item.getRatings()
                let totalStars = itemRatings.reduce((a, c) => a + c.stars, 0)
                ratingsAndInfo.push({
                    rating: rating,
                    item: rating.item,
                    totalStars: totalStars,
                    totalRatings: itemRatings.length
                })
            }
        }

        await itemRatings()

        res.json(ratingsAndInfo)
    }
}

export default ratingFunctions