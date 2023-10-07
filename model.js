const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  frameType: String,
  desc: String,
  race: String,
  archetype: String,
  card_sets: Array,
  card_images: Array,
  card_prices: Array,
  userData: {
    userName: String,
    userDeck: Array,
    savedDecks: Array,
  },
});

const Card = mongoose.model('allcards', cardSchema);

module.exports = Card;
