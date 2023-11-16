import { User, Item, Rating } from "../db/model.js";
import bcryptjs from 'bcryptjs'

const authFunctions = {
    login: async (req, res) => {

        const { username, password } = req.body

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
            res.send('No username found')
            return
        }

        if(!bcryptjs.compareSync(password, user.password)){
            res.send('Password incorrect')
            return
        }

        req.session.userId = user.userId

        res.send({  
            message: 'Login successful', 
            userId: user.userId,
        })
    },

    logout: async (req, res) => {
        req.session.destroy()
        res.send('Session terminated')
    },

    sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.send({ userId: req.session.userId })
        } else {
            res.send("No user logged in")
        }
    },

}

export default authFunctions