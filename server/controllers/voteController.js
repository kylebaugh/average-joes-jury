import { User, Item, Rating, Vote } from "../db/model.js";
import { Op, Sequelize } from "sequelize";

const voteFunctions = {

    createVote: async (req, res) => {

        try {
            await Vote.destroy({
                where: {
                    [Op.and]: [
                        { userId: req.body.userId },
                        { ratingId: req.body.ratingId }
                    ]
                }
            })
        } catch (err) {
            console.warn(err)
        } finally {
            await Vote.create({
                userId: req.body.userId,
                ratingId: req.body.ratingId,
                upVote: req.body.upVote
            })
        }
  
        const rating = await Rating.findByPk(req.body.ratingId)
        
        if (req.body.upVote === true) {
            rating.upVotes += 1
        } else {
            rating.downVotes += 1
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