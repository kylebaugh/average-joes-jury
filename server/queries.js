import { User, Item, Rating, db } from "./db/model.js";

const i5 = await Item.findByPk(5)

console.log(await i5.getRatings())


