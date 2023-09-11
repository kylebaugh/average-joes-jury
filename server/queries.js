import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

const theItem = await Item.findByPk(9, {
    include: [
        {
            model: Rating,
            attributes: [
                // 'ratingId',
                // 'stars',
                // 'review',
                // 'imgUrl',
                // 'upVotes',
                // 'downVotes',
                [Sequelize.cast(Sequelize.literal('SUM(up_votes + down_votes)'), 'int'), 'totalVotes']
            ],
            // order: ['totalVotes', 'DESC'],
            include: {
                model: Vote
            },
        },
        {
            model: User
        },
    ],
    group: ['item.item_id', 'ratings.rating_id', 'ratings.votes.vote_id', 'user.user_id'],
    // order: Sequelize.col('ratings.total_votes')
})

// console.log(theItem)
const rats = [...theItem.ratings]
// console.log(rats)
// const asdf = {rats}
// console.log(asdf)

theItem.ratings.sort((a, b) => {
    console.log(typeof a)

    for(let prop in a){
        console.log(a[prop].totalVotes)
        return b[prop].totalVotes - a[prop].totalVotes 
    }

})

// console.log(rats)

// theItem.ratings = [...rats]

console.log(theItem.ratings)

await db.close()