
//Express.js for server proxy
const express = require('express');
const fs= require('fs')
const app = express();
const cors = require('cors');
const jsonMiddleWare =express.json();
const fetch =require('node-fetch');
let data = require('./data.json');


app.use(jsonMiddleWare);
app.use(cors());

//NHTSA fetching api from server side
app.get("/nhtsa/:year/:make/:model",async (req,res,next)=>{
    const nhtsa = `https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/${req.params.year}/make/${req.params.make}/model/${req.params.model}?format=json`
    const fetch_response = await fetch(nhtsa);
    const json = await fetch_response.json();
    fs.writeFile('data.json',JSON.stringify(json,null,2),(err)=>{
      if(err){
        res.status(500).json('Error: something went wrong!');
      }
    })
  return(res.json(json));
})


// carMD fetching api from server side
app.get("/carMD/:year/:make/:model/:mileage", async (req,res,next)=>{
  console.log(req.params.year)
  console.log(req.params.mileage)

})

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
