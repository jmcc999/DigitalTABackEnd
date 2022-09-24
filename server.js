
//external modules
const express = require('express')


//express instance 
const app = express()

//dotenv
require("dotenv").config()

//port
const PORT = process.env.PORT || 3000


// setup SESSION_SECRET Here


//DB connection
const mongoose = require('mongoose')

//Middleware
// app.use(cors(corsOptions))
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
