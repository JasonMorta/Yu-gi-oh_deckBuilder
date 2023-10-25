const express = require('express')
const app = express()
const { getCurrentDate, log, formatBytes } = require('./utils/utils.js')// allows us to use getCurrentDate function
require('dotenv').config()// allows us to use .env file
const mongoose = require('mongoose');// database connection and models
const cors = require("cors"); // allows cross-site HTTP request
const bodyParser = require('body-parser');// allows JSON transfers between client and server.
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded. Extended means that the object can contain nested objects.
app.use(bodyParser.json())
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

// server port
const port = process.env.PORT || 8080

// import card model
const schemaModel = require('./model.js')
const cardsModel = require('./module-allCards.js')

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
    console.log('Connected to MongoDB 🎉✨');
});

// get specific collection
const getCollection = (collectionName) => {
    //MongoDB Node.js driver, bypassing the Mongoose schema. 

    const db = mongoose.connection.db;// gives us access to the database
    const collection = db.collection(collectionName);

    return collection;
}


/* ===========================API Routes-CRUD=============================== */
//! Get all cards
app.get('/all', async (req, res) => {
    log("Getting all cards...⏳")
    try {
        // const all = await cards.find({})

        const collection = getCollection('allcards');

        //get collection stats and extract size
        const stats = await collection.aggregate([{ $collStats: { storageStats: {} } }]).toArray();
        //const sizeInBytes = stats[0].storageStats.size;
        //const getSize = await formatBytes(sizeInBytes)


        const allUsers = await collection.find({}).limit(1).toArray();

        res.json([" ", allUsers])
        log("Get them ✔")
    } catch (error) {
        console.log(error)

    }
})

//! Search for cards by name and description
app.post('/search', async (req, res) => {
    log("Searching query cards...⏳")

    try {
        let { find } = req.body;
        find = mongoSanitize.sanitize(find);
        // Without this sanitization, malicious users could submit a query like this: { $gt: "" } and retrieve all documents in the collection.

        log("Searching for: " + find)
        console.log('find?.length > 1', find?.length > 1)
        //if query is empty, return dont return anything
        if (find?.length > 1) {
            // indexing is used to improve the performance of search queries
            // indexing allows the database to find the query faster 
            // by creating a reference to the query
            const query = {
                $or: [
                    { desc: { $regex: find, $options: 'i' } },
                    { name: { $regex: find, $options: 'i' } }
                ]
            };

            const results = await cardsModel.find(query).exec();
            //.exec() Executing the query and returning a promise with the results
            res.json([" ", results])
            log("Found ✔")
        } else {
            res.json(["Enter at least 2 letters ", []])
            log("Not Found ❌")

        }

    } catch (error) {
        log(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
})

//! Create a user
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

//! Get user data-document
app.post('/getUserData', async (req, res) => {
    log("Getting user data...⏳")
    try {
        const { id } = req.body
        const query = { _id: id };
        const userData = await schemaModel.findOne(query).exec();
        res.json([" ", userData])
        log("Got user data ✔")
    } catch (error) {
        console.log(error)

    }
})


//! Add card to user favorites array
app.put('/fav', async (req, res) => {
    const { id, card } = req.body
    console.log("Adding to favorites...⏳")
    try {
        const array = await schemaModel.findOneAndUpdate(
            { _id: id },
            { $push: { "favoriteCards": card } },
            { returnNewDocument: true }
        )
        console.log("✔️ added to fav")
        res.json([" ", array])
    } catch (error) {
        console.log(error)

    }
})

//! Remove card from user favorites array
app.put('/removeFav', async (req, res) => {
    const { id, card } = req.body
    console.log('id', id)
    console.log('card', card)

    console.log("Removing from favorites...⏳")
    // try {
    //     const array = await schemaModel.findOneAndUpdate(
    //         { _id: id },
    //         { $pull: { "favoriteCards": card } },
    //         { returnNewDocument: true }
    //     )
    //     console.log("✔️ removed from fav")
    //     res.json([" ", array])
    // } catch (error) {
    //     console.log(error)

    // }
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

