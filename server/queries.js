import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";



await db.close()