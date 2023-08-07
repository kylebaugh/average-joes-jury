import { User, Item, Rating } from "./db/model.js";
import { Op } from "sequelize";
import bcryptjs from 'bcryptjs'

const handlerFunctions = {
    getAllUsers: async (req, res) => {

        res.json(await User.findAll())
    },

    getUserByUsername: async (req, res) => {

        res.json(await User.findOne({
            where: { username: req.params.username }
        }))
    },

    getAllItems: async (req, res) => {

        res.json(await Item.findAll())
    },

    getItemByName: async (req, res) => {

        let myItem = await Item.findOne({
            where: { name: req.params.itemName },
            include: {
                model: Rating
            }
        })

        req.session.item = myItem

        console.log(req.session.item)

        res.json(myItem)
    },

    getUserItems: async (req, res) => {
        console.log(req.session)
        const user = await User.findOne({
            where: {
                userId: req.session.userId
            }
            , include: {
                model: Item
            }
        })

        res.json(user.items)
    },

    searchItem: async (req, res) => {

        const items = await Item.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            },
            include: [
                {
                    model: Rating
                },
                {
                    model: User
                }
            ]
        })

        res.json(items)
    },

    addItem: async (req, res) => {

        const { name, description, imgUrl } = req.body

        // const user = await User.findByPk(2)

        const user = await req.session.user

        const newItem = await user.createItem({
            name,
            description,
            imgUrl,
        })


        res.json(newItem)
    },

    addRating: async (req, res) => {
        const {stars, review, imgUrl} = req.body


        let myItem = await Item.findByPk(req.session.item.itemId)

        req.session.item = myItem

        const user = await User.findByPk(req.session.user.userId)


        const newRating = await user.createRating({
            stars,
            review,
            imgUrl,
            itemId: myItem.itemId,
        })

        res.json(newRating)
    },

    createUser: async (req, res) => {

        const { username, password, firstName, lastName, imgUrl } = req.body

        const salt = bcryptjs.genSaltSync(5)
        const hash = bcryptjs.hashSync(password, salt)


        const newUser = await User.create({
            username,
            password: hash,
            firstName,
            lastName,
            imgUrl,
        })

        res.json(newUser)
    },

    login: async (req, res) => {

        const {username, password} = req.body

        const user = await User.findOne({
            where: {
                username: username
            },
            include: [
                {model: Rating},
                {model: Item}
            ]
        })

        console.log(user)

        if(!user){
            res.json('No username found')
            return
        }

        const authenticated = bcryptjs.compareSync(password, user.password)

        if(!authenticated){
            res.json('Password incorrect')
            return
        }

        req.session.user = user

        console.log(req.session.user)

        res.json('Login successful')

    },

    logout: async (req, res) => {
        req.session.destroy
        res.json('Session terminated')
    },

}

export default handlerFunctions