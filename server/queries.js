import { User, Item, Rating, db } from "./db/model.js";

const u = await Rating.findAll({
    where: {
        userId: 2,
        itemId: 10,
    }
})


console.log(u)