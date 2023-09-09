import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";


console.log(await Vote.findAll())


await db.close()