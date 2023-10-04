const express = require('express')
const app = express()
require('dotenv').config()// allows us to use .env file
const mongoose = require('mongoose');// database connection and models
const cors = require("cors"); // allows cross-site HTTP request
const bodyParser = require('body-parser');// allows JSON transfers between client and server.
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded. Extended means that the object can contain nested objects.
app.use(bodyParser.json())
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

// server port
const port = process.env.PORT || 8080

// import card model
const cards = require('./model.js')

//import test file
//const test = require('./filter.js')


/* ===========================DB Connection============================= */

//* Connect to DB
const URL = 'mongodb+srv://mortadev:BiKGwA54APGFkccj@cluster01.j0haa.mongodb.net/yugioh'
const dbConnection = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
dbConnection.then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error while connecting to MongoDB', err)
    mongoose.disconnect()
})

/* ===========================API Routes=============================== */
//
app.get('/all', async (req, res) => {
    console.log('"/" triggered')
    try {
        const all = await cards.find({}) 
        res.json(all)
    } catch (error) {
        console.log(error)
        
    }
})



/* ===========================Port Listener============================= */
app.listen(port, () => console.log(`Listening on port port!`))

