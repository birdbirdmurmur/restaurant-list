const express = require('express')
const router = express.Router()
const restaurant = require('../../models/restaurantSchema')

const sortList = {
  "nameEnAsc": {
    "value": "nameEnAsc",
    "option": "A -> Z",
    mongoose: { name_en: 'asc' }
  },
  "nameEnDesc": {
    "value": "nameEnDesc",
    "option": "Z -> A",
    mongoose: { name_en: 'desc' }
  },
  "category": {
    "value": "category",
    "option": "類別",
    mongoose: { name_en: 'asc' }
  },
  "location": {
    "value": "location",
    "option": "地區",
    mongoose: { name_en: 'asc' }
  }
}

router.get('/', (req, res) => {
  restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, sortList }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = new RegExp(req.query.keyword.trim(), 'i')

  restaurant.find({ $or: [{ name: keyword }, { category: keyword }] })
    .lean()
    .sort(sortList[req.query.sortBy].mongoose)
    .then(function (restaurants) {
      if (restaurants.length > 0) {
        res.render('index', { restaurants, sortList, query: req.query })
      } else {
        res.render('index', { no_result: '<h3>搜尋沒有結果</h3>', query: req.query })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router