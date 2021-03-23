
// Express.js for server proxy
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const jsonMiddleWare = express.json();
const fetch = require('node-fetch');
const port = 3000;

app.use(cors());
app.use(jsonMiddleWare);
app.use('/', express.static('public'));

// NHTSA fetching api from server side
app.get('/nhtsa/:year/:make/:model', async (req, res, next) => {
  const nhtsa = `https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/${req.params.year}/make/${req.params.make}/model/${req.params.model}?format=json`;
  const fetch_response = await fetch(nhtsa);
  const json = await fetch_response.json();
  fs.writeFile('data.json', JSON.stringify(json, null, 2), err => {
    if (err) {
      res.status(500).json('Error: something went wrong!');
    }
  });
  return (res.status(200).json(json));
});

// carMD fetching api from server side
app.get('/carMD/:year/:make/:model/:mileage', async (req, res, next) => {
  const carMD = `http://api.carmd.com/v3.0/maint?year=${req.params.year}&make=${req.params.make}&model=${req.params.model}&mileage=${req.params.mileage}`;
  const fetch_response = await fetch(carMD, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: 'Basic NDU4MmQ1YTQtNzI5Mi00ZThjLWExZjQtYjU4MmNmNzc3YjFh',
      'partner-token': '5228fbdcf1fa422392b0f7ff3226cfbb'
    }
  });
  const json = await fetch_response.json();
  fs.writeFile('carMD.json', JSON.stringify(json, null, 2), err => {
    if (err) {
      res.status(500).json('Error:something went wrong!');
    } else {
      return (res.status(200).json(json));
    }
  });
});

// listening on port 3000
app.listen(process.env.PORT || port, () => console.log(`Example app listening at http:localhost:${port}`));
