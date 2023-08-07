import { User, Item, Rating } from "./db/model.js";
import { Op } from "sequelize";

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

        res.json(await Item.findOne({
            where: { name: req.params.itemName }
        }))
    },

    getUserItems: async (req, res) => {

        const user = await User.findOne({
            where: {
                userId: +req.query.userId
            }, include: {
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

        const user = await User.findByPk(2)

        const newItem = await user.createItem({
            name,
            description,
            imgUrl,
        })

        res.json(newItem)
    },

    createUser: async (req, res) => {

        const { username, password, firstName, lastName, imgUrl } = req.body

        const newUser = await User.create({
            username,
            password,
            firstName,
            lastName,
            imgUrl,
        })

        res.json(newUser)
    },

    login: async (req, res) => {

    }
}

export default handlerFunctions