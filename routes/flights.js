const express = require('express');
const router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {

  // const searchTerm = req.query.search;
  const searchTerm = 'france';

  const data = {
    messages: req.flash('error'),
    sections: []
  };

  const flightApi = axios.create({
    baseURL: `https://api.skypicker.com`
  })

  flightApi.get(`locations?term=${searchTerm}`)
    .then(response => {
      console.log(response);
      res.status(200).json(response)
    })
    .catch(next)
});
module.exports = router;