import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, Category, db } from "./db/model.js";

let item1 = await Item.findByPk(1, {
  include: [
    {
      model: Category,
      // through: { attributes: [] },
    },
  ],
});

console.log(item1);

await db.close();
