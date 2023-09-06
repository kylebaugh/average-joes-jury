import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, db } from "./db/model.js";

const ratings = await Rating.findAll({
    where: {
        userId: 2
    },
    include: {
        model: Item
    }
})

let ress = [] 

const itemRatings = async () => {
    for (let rating of ratings) {
        let itemRatings = await rating.item.getRatings()
        let totalStars = itemRatings.reduce((a, c) => a + c.stars, 0)
        ress.push({
            rating: rating,
            item: rating.item,
            totalStars: totalStars,
            totalRatings: itemRatings.length
        })
    }
}

await itemRatings()


console.log(ress)