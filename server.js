
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
const db =mongoose.connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(`Mongodb connected at ${db.host}:${db.port}`)
}).catch((err) => console.log(err))

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


