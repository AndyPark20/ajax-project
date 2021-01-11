
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

app.post("/nhtsa", async (req,res,next)=>{
    const nhtsa = `https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/${req.body.year}/make/${req.body.make}/model/${req.body.model}?format=json`
    const fetch_response = await fetch(nhtsa);
    const json = await fetch_response.json();
    fs.writeFile('data.json',JSON.stringify(json,null,2),(err)=>{
      if(err){
        return(res.status(500).json('Error: something went wrong!'));
      }else{
        return(res.status(201).json(json));
      }
    })
})

app.get('/nhtsa',(req,res)=>{
   res.status(201).json(data);
})


// app.get("http://api.carmd.com/v3.0/maint?year=year&make=make&model=model", (req, res) => {
//   res.status(200).json('Working');
// })


app.listen(3000, () => {
  console.log('Listening on Port 3000')
})
