import { User, Item, Rating } from "../db/model.js";
import { Op } from "sequelize";
import bcryptjs from 'bcryptjs'

const ratingFunctions = {
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
}

export default ratingFunctions