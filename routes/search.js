const express = require('express');
const router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const url = `https://www.eventbriteapi.com/v3/events/search/?token=${process.env.EVENTS_KEY}&location.address=${req.query.eventsIn}`

  axios.get(url)
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch(next);
});

// /* GET users listing. */
// router.get('/', (req, res, next) => {

//   
//   const eventApi = axios.create({
//     baseURL: 'https://www.eventbriteapi.com/v3/events/search/?token=46GO25BBBR7OOMYSTXOK&q=searchTerm'
//   })

//   // const flightApi = axios.create({
//   //   baseURL: `https://api.skypicker.com`
//   // })

//   const eventsPromise = eventApi.get(searchTerm)


//   Promise.all([eventsPromise])
//     .then((values) => {
//       console.log(values);
//       const vals = [values[0].data, values[1].data]
//       res.status(200).json(vals)
//     })
//     .catch(next);
// });


module.exports = router;





