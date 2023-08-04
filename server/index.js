import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import handlerFunctions from './controller.js'


// App instance
const app = express()


app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret:'ssshhhhh', saveUninitialized: false, resave:false}))

const {getAllUsers, getOneUser, getUserItems, getAllItems, searchItem, addItem} = handlerFunctions
// ENDPOINTS

app.get('/users', getAllUsers)
app.get(`/users/:username`, getOneUser)
app.get('/items', getAllItems)
app.get(`/item/:userId`, getUserItems)
app.get('/search/:name', searchItem)
app.post('/item', addItem)



ViteExpress.listen(app, 4567, () => console.log('Server listening on http://localhost:4567'))