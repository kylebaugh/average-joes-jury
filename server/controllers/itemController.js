import { User, Item, Rating } from "../db/model.js";
import { Op, Sequelize } from "sequelize";

const itemFunctions = {


    getTenItems: async (req, res) => {

        const ten = await Item.findAll({
            include: [
                {model: User},
                {model: Rating}
            ],
            order: [['itemId', 'DESC']],
            limit: 10
        })

        res.json(ten)
    },

    getItemById: async (req, res) => {
        let myItem;
        let userRating;

        if (req.query.userId) {

            myItem = await Item.findByPk(req.params.itemId, {
                include: [
                    {
                        model: Rating,
                        where: {
                            [Op.not]: { userId: req.query.userId }
                        },
                        required: false
                    },
                    {
                        model: User
                    },
                ]
            })

            userRating = await Rating.findOne({
                where: {
                    [Op.and]: [
                        { userId: req.query.userId },
                        { itemId: req.params.itemId}
                    ]
                }
            })

        }

        const theItem = await Item.findByPk(req.params.itemId, {
            include: [
                {
                    model: Rating,
                },
                {
                    model: User
                },
            ]
        })

        req.session.item = myItem || theItem

        let totalStars = 0

        if (theItem.ratings.length > 0) {
            totalStars = theItem.ratings.reduce((a, c) => a + c.stars, 0)
        }

        res.json({
            item: myItem || theItem,
            totalStars: totalStars,
            avg: totalStars / theItem.ratings.length,
            userRating: userRating,
         })

    },

    getUserItems: async (req, res) => {

        const userItems = await Item.findAll({
            where: {
                userId: req.session.user.userId
            }
            , include: [
                {
                    model: Rating,
                },
                {
                    model: User
                },
            ]
        })

        res.json(userItems)
    },

    searchItem: async (req, res) => {

        const items = await Item.findAll({
            where: {
                [Op.or]: [
                    {name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.params.name.toLowerCase()}%`)},
                    {description: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${req.params.name.toLowerCase()}%`)},
                ]
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

        const items = await Item.findAll({
            where: {
                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`)
            },
        })

        if(items.length > 0){
            res.send({
                code: 400,
                message: 'Duplicate name!'})
            return

        } else{
            console.log(imgUrl)

            const user = await User.findByPk(req.session.user.userId)

            const newItem = await user.createItem({
                name,
                description,
                imgUrl: imgUrl || 'https://w7.pngwing.com/pngs/427/467/png-transparent-gold-crown-treasure-box-cartoon-gold-crown-treasure-thumbnail.png',
            })

            res.json({
                code: 200,
                newItem})
        }
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

    },

    // getItemsWithRatings: async (req, res) => {

    //     const items = await Item.findAll({
    //         attributes:  [
    //             'itemId',
    //             'name',
    //             'description',
    //             'imgUrl',
    //             [Sequelize.fn("COUNT", Sequelize.col("ratings.rating_id")), "totalRatings"],
    //             [Sequelize.fn("AVG", Sequelize.col("ratings.stars")), "avgStars"]
    //         ],
    //         include: [
    //             {
    //                 model: Rating, attributes: ['rating_id']
    //             },
    //             {
    //                 model: User, attributes: ["username"]
    //             },
    //         ],
    //         // limit: 1,
    //         group: ['item.item_id',  'ratings.rating_id', 'user.user_id'],
    //     })

    //     res.json(items)
    // },

}

export default itemFunctions