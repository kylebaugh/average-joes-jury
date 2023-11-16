import { User, Item, Rating } from "../db/model.js";
import bcryptjs from 'bcryptjs'

const authFunctions = {
    login: async (req, res) => {

        const {username, password} = req.body

        const user = await User.findOne({
            where: {
                username: username
            },
            include: [
                { 
                    model: Rating 
                },
                { 
                    model: Item 
                },
            ]
        })

        if(!user){
            res.json('No username found')
            return
        }

        const authenticated = bcryptjs.compareSync(password, user.password)

        if(!authenticated){
            res.json('Password incorrect')
            return
        }

        req.session.userId = user.userId

        res.send({  
            message: 'Login successful', 
            userId: user.userId,
            username: user.username 
        })
    },

    logout: async (req, res) => {
        req.session.destroy()
        res.json('Session terminated')
    },

    sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.json({ userId: req.session.userId })
        } else {
            res.json("no user logged in")
        }
    },

}

export default authFunctions