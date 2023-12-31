import { User, Item, Rating, Vote } from "../db/model.js";
import { Op } from "sequelize";

const ratingFunctions = {
    addRating: async (req, res) => {
        const { stars, review, imgUrl } = req.body

        if(!req.session.user){
            res.send('You must be logged in')
            return
        }

        let myItem = await Item.findByPk(req.session.item.itemId)

        req.session.item = myItem

        const user = await User.findByPk(req.session.userId)

        await user.createRating({
            stars,
            review,
            imgUrl,
            itemId: myItem.itemId,
            userId: user.userId
        })

        const newRating = await Rating.findOne({
            where: {
                [Op.and]: [
                    { itemId: myItem.itemId },
                    { userId: user.userId }
                ]
            },
            include: {
                model: Vote
            }
        })

        res.send({
            message: 'rating added',
            newRating
        })
    },

    deleteRating: async (req, res) => {

        const { ratingId } = req.params

        const rating = await Rating.findByPk(ratingId)

        if(!req.session.userId) {
            res.send('You must be logged in')
            return
        }

        if(req.session.userId === rating.userId){
            await rating.destroy()
            res.send(`Rating ID ${ratingId} has been deleted`)
        }else{
            res.send("You don't have permission to delete this item")
        }

    },

    updateRating: async (req, res) => {
        const { ratingId } = req.params
        const { stars, review, imgUrl } = req.body

        console.log(req.body)
        console.log(req.session)

        const rating = await Rating.findByPk(ratingId)

        if(!req.session.userId) {
            res.send('You must be logged in')
            return
        }

        if(req.session.userId === rating.userId){
            rating.stars = +stars ?? rating.stars
            rating.review = review
            rating.imgUrl = imgUrl

            await rating.save()
            res.send({
                description: `Rating ID ${ratingId} has been updated`, 
                rating: rating
            })
        }else{
            res.send("You don't have permission to delete this item")
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

        res.send(ratings)
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

        res.send(ratingsAndInfo)
    }
}

export default ratingFunctions