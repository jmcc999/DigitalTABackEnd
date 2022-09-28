
//external modules
const express = require('express')

const bcrypt = require('bcrypt')


//import cors
const cors = require('cors')

// setup SESSION_SECRET Here
const session = require('express-session')



//express instance 
const app = express()

//dotenv
require("dotenv").config()

//port
const PORT = process.env.PORT || 3000


//DB connection
require('./config/db.connection')


//Middleware
const whitelist = ['http://localhost:3000', `${process.env.FRONTEND_URL}`]
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

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
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

//routes to be moved  app.use('/', routes.)
app.get('/', (req, res) => {
    //change later
    res.send(`<h1>Stuff Goes Here</h1>`)
    console.log("working")
})



//listener

app.listen(PORT, () => {
    console.log('listening to ', PORT)
  })


