
//Express.js for server proxy
const express = require('express');
const app = express();
const cors = require('cors');




app.use(cors());

app.get("https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/:modelyear/make/:make/model/:model?format=json",(req,res)=>{

    res.status(200).json('Working');
})


app.get("http://api.carmd.com/v3.0/maint?year=year&make=make&model=model", (req, res) => {
  res.status(200).json('Working');
})


app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
