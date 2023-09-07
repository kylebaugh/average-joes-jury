import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, db } from "./db/model.js";

const user = await User.findByPk(2)

const newR = await user.createRating({
    
})


console.log(newR)