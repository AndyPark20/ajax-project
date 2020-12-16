
// var $getStartedBtn = document.querySelector('.getStarted');
// var $introPage =document.querySelector('.introduction');
// var $vehicleFinder = document.querySelector('.find-vehicle');
// var $carSearch = document.querySelector('#car-search-input');



// $getStartedBtn.addEventListener('click', function(){
// // if (carInfo.make ==='' && carInfo.year ===0 && carInfo.model===''){
//   $introPage.classList.add('hidden');
//   $vehicleFinder.classList.remove('hidden');
// // }
// })

// $carSearch.addEventListener('submit',function(e){

//   e.preventDefault();
//   carInfo.year = $carSearch.elements.year.value;
//   carInfo.make = $carSearch.elements.make.value;
//   carInfo.model = $carSearch.elements.model.value;
//   carInfo.mileage =$carSearch.elements.mileage.value;
//   var parsedYear =parseInt($carSearch.elements.year.value);
//   var parsedMileage = parseInt($carSearch.elements.mileage.value);
//   recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value)
//   serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage)
//   $carSearch.reset();
// })

// function recall(year, make, model) {
//   var xhrs = new XMLHttpRequest();
//   xhrs.open('GET', 'https://api.codetabs.com/v1/proxy?quest=https://webapi.nhtsa.gov/api/Complaints/vehicle/modelyear/' + year + '/make/' + make + '/model/' + model + '?format=json')
//   xhrs.responseType = 'json';
//   xhrs.addEventListener('load', function () {
//     console.log(xhrs.status);
//     console.log(xhrs.response);
//     if(carInfo.complaints.length===1){
//       carInfo.complaints.shift();
//       carInfo.complaints.push(xhrs.response);
//     }else{
//       carInfo.complaints.push(xhrs.response);
//     }
//   })
//   xhrs.send();
// }

// function serviceInterval(year, make, model, mileage){
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.carmd.com/v3.0/maint?year=' + year + '&make=' + make + '&model=' + model + '&mileage=' + mileage);
//   xhr.setRequestHeader("content-type", "application/json");
//   xhr.setRequestHeader("authorization", "Basic NDU4MmQ1YTQtNzI5Mi00ZThjLWExZjQtYjU4MmNmNzc3YjFh");
//   xhr.setRequestHeader("partner-token", "5228fbdcf1fa422392b0f7ff3226cfbb");
//   xhr.responseType='json';
//   xhr.addEventListener('load', function(){
//     if(carInfo.service.length===1){
//       carInfo.service.shift()
//       carInfo.service.push(xhr.response);
//     }else{
//       carInfo.service.push(xhr.response);
//     }
//   })
//   xhr.send();
// }
