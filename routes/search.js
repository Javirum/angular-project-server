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

  const flightApi = axios.create({
    baseURL: `https://api.skypicker.com`
  })

  const eventsPromise = eventApi.get(searchTerm)

  const flightsPromise = flightApi.get(`locations?term=${searchTerm}`)

  Promise.all([eventsPromise, flightsPromise])
    .then((values) => {
      console.log(values);
      const vals = [values[0].data, values[1].data]
      res.status(200).json(vals)
    })
    .catch(next);
});
module.exports = router;
