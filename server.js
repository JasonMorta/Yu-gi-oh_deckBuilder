const express = require('express')
const app = express()
const { getCurrentDate } = require('./utils/utils.js')// allows us to use getCurrentDate function
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
const schemaModel = require('./model.js')
const cards = require('./module-allCards.js')

//import test file
//const test = require('./filter.js')


/* ===========================DB Connection============================= */

//* Connect to DB
const mongoURI = 'mongodb+srv://mortadev:BiKGwA54APGFkccj@cluster01.j0haa.mongodb.net/yugioh'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


// Get the underlying MongoDB driver connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

/* ===========================API Routes=============================== */
//
app.get('/all', async (req, res) => {
    console.log("Getting all cards...⏳")
    try {
        const all = await cards.find({})
        console.log("Get them ✔")
        res.json([" ", all])
    } catch (error) {
        console.log(error)

    }
})

//create user
app.post('/createUser', async (req, res) => {
    try {

        const createUser = new schemaModel({
            name: req.body.name,
            email: "example@email.com",
            role: "user",
            createdOn: getCurrentDate()

        });

        // Using insertOne method
        const created = await createUser.save();

        res.json([" ", created])
    } catch (error) {
        console.log(error)

    }
})


//Add to favorites
app.put('/fav', async (req, res) => {
    const { id, cardId } = req.body
    console.log("Adding to favorites...⏳")
    try {
        const array = await schemaModel.findOneAndUpdate(
            { _id: id },
            { $push: { "favoriteCards": cardId } },
            { returnNewDocument: true }
        )
        console.log("✔️ added to fav")
        res.json([" ", array])
    } catch (error) {
        console.log(error)

    }
})


// //Update saved decks by deck-name
// app.get('/savedDecks', async (req, res) => {
//     try {
//         const query = { _id: req.body.id };

//         const added = await model.findOneAndUpdate(query, { $push: { todo: req.body.todo_item } }, { new: true })
//         res.send([" ", added])
//         console.log("to-do added")
//     } catch (error) {
//         console.log(error)

//     }
// })


// // save deck userData.userdeck
// app.post('/saveDeck', async (req, res) => {
//     console.log("Saving deck...⏳")
//     try {
//         const query = { _id: req.body.id };
//         const update = { $set: { userDeck: req.body.userDeck } };
//         const options = { upsert: true }; // if no deck exists, create one
//         const saved = await cards.findOneAndUpdate(query, update, options)
//         console.log("Saved deck😅")
//         res.send([" ", saved])
//     } catch (error) {
//         console.log(error)

//     }

// });



//$push adds to array
//$set replaces array
//$pull removes from array
//$addToSet adds to array if it doesn't exist
//$pop removes last element from array
//$pushAll adds multiple elements to array
//$pullAll removes multiple elements from array
//$pull removes all matching values from array




/* ===========================Port Listener============================= */
// por 8080
app.listen(port, () => console.log(`Listening on port port!`))

