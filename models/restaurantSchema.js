const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  image: String,
  category: String,
  rating: Number,
  location: String,
  google_map: String,
  phone: String,
  description: String
})

module.exports = mongoose.model('restaurantSchema', restaurantSchema)