import { User } from "../db/model.js";
import bcryptjs from 'bcryptjs';

const userFunctions = {

    getAllUsers: async (req, res) => {

        res.json(await User.findAll())
    },

    getUserByUsername: async (req, res) => {

        res.json(await User.findOne({
            where: { username: req.params.username }
        }))
    },

    createUser: async (req, res) => {

        const { username, password, firstName, lastName, imgUrl } = req.body

        const salt = bcryptjs.genSaltSync(5)
        const hashedPassword = bcryptjs.hashSync(password, salt)

        const newUser = await User.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            imgUrl,
        })

        res.json(newUser)
    },

    deleteUser: async (req, res) => {

        const user = await User.findByPk(req.session.user.userId)
        
        await user.destroy()
        req.session.destroy()

        res.json("User all gone")
    },

    editUser: async (req, res) => {

        const user = await User.findByPk(req.session.user.userId)

        const { username, firstName, lastName, imgUrl } = req.body

        user.username = username
        user.firstName = firstName
        user.lastName = lastName
        user.imgUrl = imgUrl ?? user.imgUrl

        await user.save()
        req.session.user = user

        res.json({ message: "User successfully updated", user: user })
    },

    changePassword: async (req, res) => {

        const user = await User.findByPk(req.session.user.userId)

        const { oldPassword, newPassword } = req.body

        if (!bcryptjs.compareSync(oldPassword, user.password)) {
            return res.json("Current password does not match")
        }

        const salt = bcryptjs.genSaltSync(5)
        const hashedPassword = bcryptjs.hashSync(newPassword, salt)

        user.password = hashedPassword
        await user.save()
        req.session.user = user
        
        res.json("Password successfully changed")
    },
    
}

export default userFunctions