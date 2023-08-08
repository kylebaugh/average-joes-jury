import { User, Item, Rating } from "../db/model.js";
import { Op } from "sequelize";

const itemFunctions = {
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
        // console.log(req.session)
        const user = await User.findOne({
            where: {
                userId: req.session.currentProfile.userId
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

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        const { name, description, imgUrl } = req.body

        const user = await User.findByPk(req.session.user.userId)

        const newItem = await user.createItem({
            name,
            description,
            imgUrl,
        })

        res.json(newItem)
    },

    deleteItem: async (req, res) => {

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        if(req.session.user.userId === req.session.item.userId){

            let myItem = await Item.findByPk(req.session.item.itemId)

            await Rating.destroy({
                where: {
                    itemId: myItem.itemId
                }
            })

            myItem.destroy()

            delete req.session.item

            res.json('item has been deleted')
        } else {
            res.json("Your user ID doesn't match the ID of this item!")
        }
    },

    editItem: async (req, res) => {

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        if(req.session.user.userId === req.session.item.userId){
            let item = await Item.findByPk(req.session.item.itemId)

            const {name, description, imgUrl} = req.body

            item.name = name ?? item.name
            item.description = description ?? item.description
            item.imgUrl = imgUrl

            await item.save()

            req.session.item = item

            res.json({message: 'update complete', item: item})
        } else {
            res.json("Your user ID doesn't match the ID of this item!")
        }

    }

}

export default itemFunctions