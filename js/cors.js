
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


// app.get('/nhtsa',(req,res)=>{
//    res.status(201).json(data);
// })


// app.get("http://api.carmd.com/v3.0/maint?year=year&make=make&model=model", (req, res) => {
//   res.status(200).json('Working');
// })


app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
