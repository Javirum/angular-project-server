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
    baseURL: 'https://www.eventbriteapi.com/v3/events/search/?token=46GO25BBBR7OOMYSTXOK&q=searchTerm'
  })

  eventApi.get(searchTerm)
    .then(response => {
      res.status(200).json(response.data.events)
    })
    .catch(next)
});
module.exports = router;
