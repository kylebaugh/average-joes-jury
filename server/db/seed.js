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
        imgUrl: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
    })

    await newUser.createItem({
        name: `Item${i}`,
        description: `User${i}'s Description for Item #${i}`,
        imgUrl: 'https://w7.pngwing.com/pngs/427/467/png-transparent-gold-crown-treasure-box-cartoon-gold-crown-treasure-thumbnail.png',
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
            review: `User${user.userId} thinks this item is ${lodash.sample(WORDS)}`,
            imgUrl: 'https://w7.pngwing.com/pngs/602/11/png-transparent-computer-icons-notepad-notebook-notepad-icons-no-attribution-miscellaneous-angle-text-thumbnail.png'
        })
    }
}

const user5 = await User.findByPk(5)
console.log(await user5.getItems())
console.log(await user5.getRatings())


console.log('Finished seeding database')

await db.close()