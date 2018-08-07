const express = require('express');
const router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {

  const flyFrom = user.location;
  const searchTerm = req.query.eventsIn;
  const dateFrom = ;
  const dateTo = ;

  const url = axios.create({
    baseURL: `https://api.skypicker.comflights?flyFrom=${flyFrom}&to=${searchTerm}&dateFrom=${dateFrom}&dateTo=${dateTo}`
  })

  axios.get(url)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch(next);
});

// const searchTerm = req.query.search;


// const flyFrom = req.query.flyFrom;
// const searchTerm = req.query.eventsIn;
// const dF = req.query.startdate.split('-')
// const dateFrom = [dF[2], dF[1], dF[0]].join('/')
// const dT = req.query.enddate.split('-');
// const dateTo = [dT[2], dT[1], dT[0]].join('/')

// const data = {
//   messages: req.flash('error'),
//   sections: []
// };

// flightApi.get(`locations?term=${searchTerm}`)
//   .then(response => {
//     console.log(response);
//     res.status(200).json(response)
//   })
//   .catch(next)
// });

module.exports = router;