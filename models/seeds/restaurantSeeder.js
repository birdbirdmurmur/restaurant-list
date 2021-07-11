const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const raw = require('../../restaurant.json')

const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('MongoDB connected.')
  seed.forEach((restaurant) => {
    restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Done.')
})