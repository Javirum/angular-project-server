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
      console.log(response)
      data.sections.push({
        title: `Search results for "${searchTerm}"`,
        listings: results,
      })
        .catch(err => {
        })
    });



  // document.getElementById("eventButton").onclick = function () {
  //   getEventInfo();
  // }

});
module.exports = router;
