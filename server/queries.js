import { User, Item, Rating, db } from "./db/model.js";
import { Op, Sequelize } from 'sequelize'


const items = await Rating.findAll({
    
    where: { userId: 5 }
})

const itemRatings = await Rating.findAll({
    where: { itemId: 1 },
    attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("rating.rating_id")), "totalRatings"],
        [Sequelize.fn("AVG", Sequelize.col("rating.stars")), "avgStars"]]
    },
    include: [
        {
            model: Item, attributes: {
                include: [
                "itemId",
                "name",
                "description",
                "imgUrl",
                // [Sequelize.fn("COUNT", Sequelize.col("rating.rating_id")), "totalRatings"],
                // [Sequelize.fn("AVG", Sequelize.col("rating.stars")), "avgStars"],
            ],
        }
        }
    ],
    group: ['item.item_id', 'rating.rating_id']
})

const searchItemIgnoreCase = await Item.findAll({
    where: {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%m4%')
    },
    include: [
        {
            model: Rating
        },
        {
            model: User
        }
    ]
})

console.log(searchItemIgnoreCase)