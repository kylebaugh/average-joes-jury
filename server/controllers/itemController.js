import { User, Item, Rating } from "../db/model.js";
import { Op } from "sequelize";

const itemFunctions = {
    
    getAllItems: async (req, res) => {

        res.json(await Item.findAll())
    },

    getItemByName: async (req, res) => {

        const item = await Item.findOne({
            where: { 
                name: req.params.itemName 
            },
            include: {
                model: Rating,
            }
        })
        
        req.session.item = item
        res.json(item)
    },

    getUserItems: async (req, res) => {
        
        const user = await User.findOne({
            where: { 
                userId: +req.session.userId 
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
        console.log(`User: ${user}, type: ${typeof(user)}`)
        const userr = req.session.user
        console.log(`Session User: ${userr}, type: ${typeof(userr)}`)

        const newItem = await user.createItem({
            name,
            description,
            imgUrl,
        })

        res.json(newItem)
    },

    deleteItem: async (req, res) => {

        const item = await Item.findByPk(req.session.item.itemId)

        await Rating.destroy({
            where: {
                itemId: item.itemId,
            }
        })

        await item.destroy()
        delete req.session.item

        res.json("Item deleted")
    },

    editItem: async (req, res) => {

        const item = await Item.findByPk(req.session.item.itemId)

        const { name, description, imgUrl } = req.body

        item.name = name ?? item.name
        item.description = description ?? item.description
        item.imgUrl = imgUrl
        
        await item.save()
        req.session.item = item

        res.json({ message: "Item updated successfully", item: item})
    },
}

export default itemFunctions