import {User, Item, Rating, db} from './model.js'
import lodash from 'lodash'

console.log('syncing database...?')

await db.sync({force:true})

console.log('seeding database')

let i = 1
while( i < 11){
    const user = await User.create({
        username: `user${i}`,
        password: 'test',
        firstName: `fname${i}`,
        lastName: `lname${i}`
    })

    await user.createItem({
        name: `item${i}`,
        description: `item${i} is really cool`
    })

    i++
}



console.log('seed complete')

const users = await User.findAll()
// for(const user of users) {
//     console.log(user)
// }

const items = await Item.findAll()
// for(const item of items){
//     console.log(item)
// }

// console.log(randoms)

for(const user of users){
    const randoms = lodash.sampleSize(items, 5)
    for(let rand of randoms){
        await Rating.create({
            userId: user.userId,
            itemId: rand.itemId,
            stars: lodash.random(5),
            review: `User ${user.userId} thinks this is an okay item`
        })
    }
}

let user3 = await User.findByPk(3)
console.log(await user3.getItems())
console.log(await user3.getRatings())

await db.close()