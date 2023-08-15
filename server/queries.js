import { User, Item, Rating, db } from "./db/model.js";


const tenItems = await Item.findAll({
    order: [ ['item_id', 'DESC'] ],
    limit: 10
})

console.log(tenItems)