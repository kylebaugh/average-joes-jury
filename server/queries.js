import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

const myItem = await Item.findByPk(2, {
    include: [
        {
            model: Rating,
            where: {
                [Op.not]: { userId: 1 }
            },
            attributes: [
                'ratingId',
                'stars',
                'review',
                'imgUrl',
                'upVotes',
                'downVotes',
                [Sequelize.cast(Sequelize.literal('SUM(up_votes + down_votes)'), 'int'), 'totalVotes']
            ],
            required: false,
            include: {
                model: Vote
            }
        },
        {
            model: User
        },
    ],
    group: ['item.item_id', 'ratings.rating_id', 'ratings.votes.vote_id', 'user.user_id']
})

console.log(myItem)

await db.close()