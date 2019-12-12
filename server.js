if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express")
const path = require("path")
const app = express()
const axios = require("axios")

app.get('/api/bars/search/:location/:term', (request, response) => {
  const { location, term } = request.params
  const locationSearch = location ? `&location=${location}` : '';
  const termSearch = term && term !== 'undefined' ? `&term=${term}` : ''
  axios.get(`https://api.yelp.com/v3/businesses/search?categories=bars${locationSearch}${termSearch}&limit=50`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  .then(yelpResponse => response.json(yelpResponse.data.businesses || []))
  .catch(err => response.send([]))
})

app.get(`/api/bars/:id`, async (request, response) => {
  const { id } = request.params
  let { data } = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })

  response.send(data);
})

app.get(`/api/bars/:id/reviews/`, async(request,response) => {
  const { id } = request.params
  let { data } = await axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  response.send(data)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  () => { console.log(`API listening on port ${PORT}...`) }
)
