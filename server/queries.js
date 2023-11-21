import { Sequelize, Op } from "sequelize";
import { User, Item, Rating, Vote, db } from "./db/model.js";

await User.create({
    username: "hookuser",
    password: "test",
    firstName: "Hook",
    lastName: "User Test",
    imgUrl: "nada"
})

const user = await User.findOne({ where: { username: "hookuser" } })

console.log(user) 

const userPw = await User.scope('withPassword').findOne({ where: { username: "hookuser" } })

console.log(userPw)

await db.close()