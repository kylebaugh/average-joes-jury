import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";


const rating = await Rating.findByPk(10)

console.log(rating)

rating.downVotes -= 1

console.log(rating)

await rating.save() 

console.log(rating)

await db.close()