import {User, Item, Rating} from './db/model.js'
import {Op} from 'sequelize'

const handlerFunctions = {
    getAllUsers: async (req, res) => {
        let users = await User.findAll()

        res.json(users)
    },

    getOneUser: async (req, res) => {
        const {username} = await req.params

        const user = await User.findOne({
            where: {
                username: username
            }
        })

        res.json(user)
    },

    getAllItems: async (req, res) => {
        const items = await Item.findAll()

        res.json(items)
    },

    getUserItems: async (req, res) => {
        console.log('hit')
        const {userId} = await req.params

        let user = await User.findOne({
            where: {
                userId: +userId
            },
            include: {
                model: Item
            }
        })

        res.json(user.items)
    },

    searchItem: async (req, res) => {

        const {name} = await req.params

        let items = await Item.findAll({
            where: {
                name: {
                    [Op.like] : `%${name}%`
                }
            },
            include: [
                {
                    model: User
                },
                {
                    model: Rating
                }
            ]
        })

        res.json(items)
    },

    addItem: async (req, res) => {
        const {name, description, imgUrl} = req.body
        console.log(req.session)

        req.session.userId = 4
        const user = await User.findByPk(req.session.userId)

        const item = await user.createItem({
            name,
            description,
            imgUrl
        })

        res.json(item)
    }
}

export default handlerFunctions