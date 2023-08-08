import { User, Item, Rating } from "../db/model.js";
import { Op } from "sequelize";
import bcryptjs from 'bcryptjs'

const userFunctions = {
    getAllUsers: async (req, res) => {

        res.json(await User.findAll())
    },

    getUserByUsername: async (req, res) => {

        const profile = await User.findOne({
            where: { username: req.params.username },
            include: [
                {model: Item},
                {model: Rating}
            ]
        })

        req.session.currentProfile = profile

        res.json(profile.rating)
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

    deleteUser: async (req, res) => {

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        await User.destroy({
            where: {
                userId: req.session.user.userId
            }
        })

        res.json(`User ${req.session.user.username} has been deleted`)

        req.session.destroy
    },

    updateUser: async (req, res) => {

        if(!req.session.user){
            res.json('You must be logged in')
            return
        }

        const user = await User.findByPk(req.session.user.userId)

        const {username,firstName, lastName, imgUrl} = req.body


        user.username = username
        user.firstName = firstName
        user.lastName = lastName
        user.imgUrl = imgUrl

        await user.save()

        req.session.user = user

        res.json(`User ${user.username} has been updated`)
    }
}

export default userFunctions