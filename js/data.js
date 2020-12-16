/* exported data */
var carInfo ={
  year:0,
  make:'',
  model:'',
  mileage:0,
  test:[]
};

var getParsed=localStorage.getItem('audoDetail')
var objectResult =JSON.parse(getParsed);
if(getParsed !==null){
  carInfo=objectResult;
}

window.addEventListener('beforeunload', function(){
  var stringed= JSON.stringify(carInfo);
  localStorage.setItem('autoDetail', stringed);
})
