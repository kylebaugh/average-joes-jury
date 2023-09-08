import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

console.log(await Vote.findAll())

const rating = await Rating.findByPk(6, { include: Vote})
// rating.upVotes += 2
// rating.downVotes += 1
// await rating.save()

// console.log(rating)

for (let vote of rating.votes) {
    if (vote.userId === 1) {
        if (vote.upVote) {
            console.log("booya")
        } else {
            console.log("boono")
        }
    }
}


await db.close()