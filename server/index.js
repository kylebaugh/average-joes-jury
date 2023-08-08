import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import ViteExpress from 'vite-express'
import authFunctions from './controllers/authController.js'
import userFunctions from './controllers/userController.js'
import itemFunctions from './controllers/itemController.js'
import ratingFunctions from './controllers/ratingController.js'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ 
    secret: 'geronimo', 
    saveUninitialized: false, 
    resave: false 
}))

const { 
    login, 
    logout 
} = authFunctions

const {
    getAllUsers,
    getUserByUsername,
    createUser,
    editUser,
    deleteUser, 
    changePassword,
} = userFunctions

const {  
    getAllItems, 
    getItemByName,
    getUserItems,
    searchItem,
    addItem,
    deleteItem,
    editItem,
} = itemFunctions

const {
    addRating,
} = ratingFunctions

// ROUTES //
// auth
app.post('/login', login)
app.get('/logout', logout)

// users
app.get('/users', getAllUsers)
app.get('/user/:username', getUserByUsername)
app.post('/adduser', createUser)
app.put('/edituser', editUser)
app.delete('/deleteuser', deleteUser)
app.put('/changepassword', changePassword)

// items
app.get('/items/all', getAllItems)
app.get('/item/:itemName', getItemByName)
app.get('/items', getUserItems)
app.get('/search/:name', searchItem)
app.post('/item', addItem)
app.delete('/deleteitem', deleteItem)
app.put('/edititem', editItem)

// ratings
app.post('/addrating', addRating)

ViteExpress.listen(app, '8008', () => console.log('Now THIS is http://localhost:8008'))
