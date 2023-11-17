import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

const item = await Item.findOne({
    include: Rating
})

let numFavs = item.ratings.length

await db.close()