const restaurant = require('../restaurantSchema')
const restaurantList = require('./restaurants.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurant.create(restaurantList.results)
  console.log('done.')
})