const express = require('express');
const router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {

  const searchTerm = req.query.search;
  const data = {
    messages: req.flash('error'),
    sections: []
  };

  const eventApi = axios.create({
    baseURL: 'https://api.skypicker.com/flights&q=searchTerm'
  })

  eventApi.get(searchTerm)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(next)
});
module.exports = router;