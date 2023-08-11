import { User, Item, Rating, db } from "./model.js";

console.log(await User.findByPk(1))