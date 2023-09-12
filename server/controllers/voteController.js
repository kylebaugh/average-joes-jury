import { User, Item, Rating, Vote } from "../db/model.js";
import { Op, Sequelize } from "sequelize";

const voteFunctions = {

    createVote: async (req, res) => {
        
        const rating = await Rating.findByPk(req.body.ratingId)
        const vote = await Vote.findOne({
            where: {
                [Op.and]: [
                    { userId: req.body.userId },
                    { ratingId: req.body.ratingId }
                ]
            }
        })

        if (vote) {
            vote.upVote = req.body.upVote
            await vote.save()
        } else {
            await Vote.create({
                userId: req.body.userId,
                ratingId: req.body.ratingId,
                upVote: req.body.upVote
            })
        }
        
        if (req.body.upVote === true) {
            rating.upVotes += 1
            if (req.body.decrementOther === true) {
                rating.downVotes -= 1
            }
        } else if (req.body.upVote === false) {
            rating.downVotes += 1
            if (req.body.decrementOther === true) {
                rating.upVotes -= 1
            }
        }
        await rating.save()
        
        res.send(rating)
    },

    deleteVote: async (req, res) => {

        console.warn(req.body.userId)
        console.warn(req.body.ratingId)

        await Vote.destroy({
            where: {
                [Op.and]: [
                    { userId: req.body.userId },
                    { ratingId: req.body.ratingId }
                ]
            }
        })

        const rating = await Rating.findByPk(req.body.ratingId)
        
        if (req.body.upVote === true) {
            rating.upVotes -= 1
        } else {
            rating.downVotes -= 1
        }
        await rating.save()
        
        res.send(rating)
    }
}

export default voteFunctions