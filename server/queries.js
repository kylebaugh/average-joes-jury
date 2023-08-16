import { User, Item, Rating, db } from "./db/model.js";
import { Op, Sequelize } from 'sequelize'


const items = await Item.findAll({
    attributes:  [[Sequelize.fn("SUM", Sequelize.col("rating.stars")), "totalStars"]],
    include: [
        {
            model: Rating, attributes: []
        }
    ]
})

console.log(items)