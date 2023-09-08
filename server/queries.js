import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

const user = await User.findByPk(1, {
    include: { model: Rating }
})

const user2 = await User.findByPk(2, {
    include: { model: Rating }
})

// const vote1 = await user.createVote({
//     upVote: true,
//     ratingId: 6
// })

// console.log(vote1)

const votes = await Vote.findAll()
// const rating6 = await Rating.findByPk(6)

// if there is a vote that has the userId and ratingId
// then determine how to alter the table
// if no vote found, add vote to table + find rating and update upVote/downVote col.

// queries we need:
// get all upvotes/downvotes for a rating
// determine the vote (if vote) of a user on that rating

// get all ratings sent to front end, 

const userVote = await Vote.findOne({
    where: {
        [Op.and]: [
            { userId: 1 },
            { ratingId: 6 }
        ]
    }
})

// const userVotes = await Vote.findAll({
//     attributes: ['ratingId', 'upVote'],
//     where: {
//         userId: 1
//     }
// })

const myItem = await Item.findByPk(2, {
    include: [
        {
            model: Rating,
            where: {
                [Op.not]: { userId: 3 }
            },
            required: false,
            include: [
                { model: Vote }
            ]
        },
        {
            model: User
        },
    ]
})

// console.log(myItem)

for (let rating of myItem.ratings) {
    console.log(rating.votes)
}

// console.log(await Rating.findByPk(6))

await db.close()