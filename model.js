const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    email: String,
    savedDecks: Array,
    favoriteCards: Array,
    createdOn: String,
    role: String,
});


const UserData = mongoose.model('users', cardSchema);

module.exports = UserData;
