import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import authFunctions from './controllers/authController.js'
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
    getAllUsers,
    getUserByUsername,
    createUser,
    deleteUser,
    updateUser
} = userFunctions

const {
    getItemsWithRatings,
    getTenItems,
    getItemById,
    getUserItems,
    searchItem,
    addItem,
    deleteItem,
    editItem,
    getItemRatingsSansUser,
} = itemFunctions

const {
    addRating,
    updateRating,
    deleteRating,
    getRatingsSansUser,
} = ratingFunctions

const {
    login,
    logout,
    sessionCheck,
} = authFunctions

/// Routes ///
// Users
app.get('/users', getAllUsers)
app.get('/user/:username', getUserByUsername)
app.post('/adduser', createUser)
app.delete('/user', deleteUser)
app.put('/user', updateUser)

// Items
app.get('/items/ten', getTenItems)
app.get('/itemapi/:itemId', getItemById) // get one item by name
app.get('/itemsByUser', getUserItems) // get all user items
app.post('/item', addItem) // add one item
app.get('/search/:name', searchItem)
app.put('/item', editItem)
app.delete('/item', deleteItem)
app.get('/item/ratings/:userId/:itemId', getItemRatingsSansUser)

// Ratings
app.post('/rating', addRating)
app.put('/rating/:ratingId', updateRating)
app.delete('/rating/:ratingId', deleteRating)
app.get('/ratings/:userId', getRatingsSansUser)

// Authentication
app.post('/login', login)
app.get('/logout', logout)
app.get('/sessionCheck', sessionCheck)

ViteExpress.listen(app, 8008, () => console.log('Now THIS is http://localhost:8008'))
