
//dotenv
require('dotenv').config()

//external modules
const express = require('express')

//internal modules
const routes = require('./routes');

const bcrypt = require('bcrypt')

//import cors
const cors = require('cors')

// setup SESSION_SECRET Here
const session = require('express-session')

//express instance 
const app = express()

//port
const PORT = process.env.PORT || 3001

//DB connection
const MongoDBStore = require('connect-mongodb-session')(session)

require('./config/db.connection')

//Middleware
const whitelist = ['http://localhost:3001', `${process.env.FRONTEND_URL}`]
const corsOptions = {
	origin: (origin, callback) => {
		console.log(whitelist, "WHITELIST")
		console.log(origin, "ORIGIN")
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
//accept credentials
	credentials: true,
}

app.use(cors(corsOptions));

app.set('trust proxy', 1)

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoDBStore({
			uri: process.env.MONGODB_URI,
			collection: 'users'
		  }),
		  cookie: {
			sameSite: 'none',
			secure: true
		  }
	})
)

const isAuthenticated = (req, res, next) => {
	if (req.session.currentUser) {
		return next();
	} else {
		res.status(403).json({ msg: 'login required' })
	}
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes 
app.get('/', (req, res) => {
    //change later
    res.send('Calendar Goes Here')
console.log("working")
})

//user routes
// app.get('/signup', (req, res) => {
// 	res.send(`<h1>signup here</h1>`)
// })

// app.get('/login', (req, res) => {
// 	res.send(`<h1>login here</h1>`)
// })

// app.get('/logout', (req, res) => {
// 	res.send(`<h1>logout here</h1>`)
// })

// app.use('/activities', routes.activities)
app.use('/activities', isAuthenticated, routes.activities);
app.use('/users', routes.users);

//listener

app.listen(PORT, () => {
    console.log('listening to ', PORT)
  })
