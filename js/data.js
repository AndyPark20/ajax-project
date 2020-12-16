/* exported data */
var carInfo ={
  year:0,
  make:'',
  model:'',
  mileage:0,
  complaints:[],
  service:[]
};

var getParsed=localStorage.getItem('autoDetail')
if (getParsed !==null){
  carInfo=JSON.parse(getParsed);
}

window.addEventListener('beforeunload', function(){
  var stringed= JSON.stringify(carInfo);
  localStorage.setItem('autoDetail', stringed);
})
