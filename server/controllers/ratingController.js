import { Rating } from "../db/model.js";

const ratingFunctions = {

    addRating: async (req, res) => {

        const { stars, review, imgUrl } = req.body

        const user = req.session.user
        const item = req.session.item

        const newRating = await Rating.create({
            stars,
            review, 
            imgUrl,
            userId: user.userId,
            itemId: item.itemId,
        })

        res.json(newRating)
    },
}

export default ratingFunctions