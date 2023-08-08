import { User, Item, Rating } from "../db/model.js";
import bcryptjs from 'bcryptjs';

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
                }
            ]
        })

        if (!user) {
            return res.json("No username found")        
        } 

        const authenticated = bcryptjs.compareSync(password, user.password)

        if (!authenticated) {
            return res.json("Password incorrect")
        }

        req.session.userId = user.userId
        req.session.user = user
        res.json("Login successful")
    },

    logout: async (req, res) => {

        req.session.destroy
        res.json("Logged out")
    },
}

export default authFunctions