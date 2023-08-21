import { User, Item, Rating, db } from "./model.js";
import lodash from 'lodash'
import bcryptjs from 'bcryptjs'

console.log("Syncing database ...")

await db.sync({ force: true })

console.log("Seeding database ...")

const WORDS = ["the tits", "bootaylicious", "duh sheeyit", "top notch", "gnarly bro"]

let i = 1
while (i < 11) {

    const salt = bcryptjs.genSaltSync(5)
    const hash = bcryptjs.hashSync('test', salt)

    const newUser = await User.create({
        username: `user${i}`,
        password: hash,
        firstName: `Fname${i}`,
        lastName: `Lname${i}`,
        imgUrl: 'image'
    })

    await newUser.createItem({
        name: `Item${i}`,
        description: `Item${i}'s Description for is Item #${i}`,
        imgUrl: 'itemImage',
    })

    i ++
}

const users = await User.findAll()
const items = await Item.findAll()

for (const user of users) {
    const randomItems = lodash.sampleSize(items, 5)
    for (const item of randomItems) {
        await Rating.create({
            userId: user.userId,
            itemId: item.itemId,
            stars: lodash.random(1, 5),
            review: `User${user.userId} thinks this item is ${lodash.sample(WORDS)}`
        })
    }
}

const user5 = await User.findByPk(5)
console.log(await user5.getItems())
console.log(await user5.getRatings())


console.log('Finished seeding database')

await db.close()