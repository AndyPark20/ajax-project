
var $getStartedBtn = document.querySelector('.getStarted');
var $introPage =document.querySelector('.introduction');
var $vehicleFinder = document.querySelector('.find-vehicle');
var $carSearch = document.querySelector('#car-search-input');
var $serviceListPage =document.querySelector('.serviceResult');
var serviceSoon=[];
var mileage=[];

var $pageTitle = document.querySelector('#carTitle');
var $carMiles= document.querySelector('.mi');
var $serviceList = document.querySelector('.servicePoint')
var $servicemile =document.querySelector('.mis')



function recall(year, make, model) {
  var xhrs = new XMLHttpRequest();
  xhrs.open('GET', 'https://api.codetabs.com/v1/proxy?quest=https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/' + year + '/make/' + make + '/model/' + model + '?format=json')
  xhrs.responseType = 'json';
  xhrs.addEventListener('load', function () {
    if (carInfo.complaints.length === 1) {
      carInfo.complaints.shift();
      carInfo.complaints.push(xhrs.response);
    } else {
      carInfo.complaints.push(xhrs.response);
    }
  })
  xhrs.send();
}

function serviceInterval(year, make, model, mileage) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.carmd.com/v3.0/maint?year=' + year + '&make=' + make + '&model=' + model + '&mileage=' + mileage);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", "Basic NDU4MmQ1YTQtNzI5Mi00ZThjLWExZjQtYjU4MmNmNzc3YjFh");
  xhr.setRequestHeader("partner-token", "5228fbdcf1fa422392b0f7ff3226cfbb");
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (carInfo.service.length === 1) {
      carInfo.service.shift()
      carInfo.service.push(xhr.response);
    } else {
      carInfo.service.push(xhr.response);
    }
  })
  xhr.send();
}

function swapView(e) {
  if (e === 'searchCar') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.remove('hidden');
    $serviceListPage.classList.add('hidden');
    carInfo.dataView = 'searchCar';
  } else if (e ==='serviceList'){
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.remove('hidden');
    carInfo.dataView = 'serviceList';
  }else if( e==='intro'){
    $introPage.classList.remove('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
  }
}

function renderServiceElement(info,event){
  var $createList =document.createElement('li');
  $pageTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $carMiles.textContent = info.mileage;


    $createList.textContent =event.desc
    $servicemile.textContent=info.serviceAppend[0].due_mileage;
      $serviceList.appendChild($createList);

  return $serviceList
}


function getDataObject(event){
  carInfo.serviceAppend = [];
  for (var i=0; i<event.service[0].data.length;i++){
    if (event.service[0].data[i].due_mileage === carInfo.mileage || !((event.service[0].data[i].due_mileage) - 5000 >= carInfo.mileage) || ((event.service[0].data[i].due_mileage) - 5000 >= carInfo.mileage) ){
        serviceSoon.push(event.service[0].data[i]);
    }
  }
  for (var j=0; j<serviceSoon.length;j++){
    if (serviceSoon[j].due_mileage >= carInfo.mileage){
      carInfo.serviceAppend.push(serviceSoon[j])
    }
  }
  return carInfo;
}

$getStartedBtn.addEventListener('click', function(){
// if (carInfo.make ==='' && carInfo.year ===0 && carInfo.model===''){
    swapView('searchCar')
// }
})

$carSearch.addEventListener('submit',function(e){
  e.preventDefault();
  carInfo.year = $carSearch.elements.year.value;
  carInfo.make = $carSearch.elements.make.value;
  carInfo.model = $carSearch.elements.model.value;
  carInfo.mileage =$carSearch.elements.mileage.value;
  var parsedYear =parseInt($carSearch.elements.year.value);
  var parsedMileage = parseInt($carSearch.elements.mileage.value);
  // recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value);
  // serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage);
  getDataObject(carInfo);
  $carSearch.reset();
  for (var i = 0; i < carInfo.serviceAppend.length; i++) {
    renderServiceElement(carInfo,carInfo.serviceAppend[i]);
  }
  swapView('serviceList')

})
