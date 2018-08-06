const express = require('express');
const router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {

  const flyFrom = req.query.flyFrom;
  const searchTerm = req.query.to;
  const dF = req.query.startdate.split('-')
  const dateFrom = [dF[2], dF[1], dF[0]].join('/')
  const dT = req.query.enddate.split('-');
  const dateTo = [dT[2], dT[1], dT[0]].join('/')
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

  const flightsPromise = flightApi.get(`flights?flyFrom=${flyFrom}&to=${searchTerm}&dateFrom=${dateFrom}&dateTo=${dateTo}`)

  Promise.all([eventsPromise, flightsPromise])
    .then((values) => {
      console.log(values);
      const vals = [values[0].data, values[1].data]
      res.status(200).json(vals)
    })
    .catch(next);
});
module.exports = router;
