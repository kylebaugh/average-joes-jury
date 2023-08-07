import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import ViteExpress from 'vite-express'
import handlerFunctions from './controller.js'

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.unsubscribe(session({ 
    secret: 'geronimo', 
    saveUninitialized: false, 
    resave: false 
}))

const { 
    getAllUsers, 
    getUserByUsername, 
    getAllItems, 
    getItemByName,
    getUserItems,
    searchItem,
    addItem,
    createUser
} = handlerFunctions

// Routes
app.get('/users', getAllUsers)
app.get('/user/:username', getUserByUsername)
app.get('/items/all', getAllItems)
app.get('/item/:itemName', getItemByName)
app.get('/items', getUserItems)
app.get('/search/:name', searchItem)
app.post('/item', addItem)
app.post('/adduser', createUser)


ViteExpress.listen(app, '8008', () => console.log('Now THIS is http://localhost:8008'))
