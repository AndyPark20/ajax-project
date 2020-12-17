
var $getStartedBtn = document.querySelector('.getStarted');
var $introPage = document.querySelector('.introduction');
var $vehicleFinder = document.querySelector('.find-vehicle');
var $carSearch = document.querySelector('#car-search-input');
var $serviceListPage = document.querySelector('.serviceResult');
var serviceSoon = [];
var mileage = [];
var $pageTitle = document.querySelector('#carTitle');
var $carMiles = document.querySelector('.mi');
var $serviceList = document.querySelector('.servicePoint')
var $servicemile = document.querySelector('.mis')
var $serviceContainer = document.querySelector('.serviceResult')
var $userMileage = document.querySelector('.mi');
var $nextMileage = document.querySelector('.mis');
var $serviceList = document.querySelector('.servicePoint');
var $costBreak = document.querySelector('.costBreakDown');
var $userCarTitle = document.querySelector('#carTitle');
var $complaintPage = document.querySelector('.complaintResult');
var $complaintListing = document.querySelector('.complaintListing');
var $complaintNumber = document.querySelector('.comp');
var $nonIntroPage = document.querySelector('.find-vehicle')
var $eraseInput =document.querySelector('ol');
var $costDelete = document.querySelector('.costBreakDown');
var $homeButton =document.querySelector('.home-buttons');
var $title = document.querySelector('.header');
var $homePage = document.querySelector('.overView');
var $carStatusSymbol = document.querySelector('.homeTitleStatus')
var $statsTest = document.querySelector('.statusBar');
var $statsTire = document.querySelector('.statusBarTire');
var $carOverStats = document.querySelector('.sizing');
var $homePageService = document.querySelector('.homeServiceOverview')
var $intervalFront = document.querySelector('.frontPage');
var $dataLog = document.querySelector('.data-log');
var $dataLogSubmitBtn = document.querySelector('#data-log-submit')
var nhtsaResponse = 0;


function renderCostBreakElement(event) {

  repairTotalHours=0;
  laborCost=0;
  totalPartCost=0

  for (var i = 0; i < event.serviceAppend.length; i++) {
    repairTotalHours
    repairTotalHours += event.serviceAppend[i].repair.repair_hours;
    laborCost += event.serviceAppend[i].repair.labor_cost;
    totalPartCost += event.serviceAppend[i].repair.part_cost;
  }
  var $costBreakStructure = document.createElement('li');
  var $estLaborCost = document.createElement('li');
  var $estPartCost = document.createElement('li');
  var $estTotalCost = document.createElement('li')
  var $estTotalCostNum = (Math.round(laborCost + totalPartCost))


  $costBreakStructure.innerHTML = 'Estimated Total Repair Hours Needed: ' + '<span class="mis">' + repairTotalHours.toFixed(2) + ' Hrs.' + '<span>';
  $estLaborCost.innerHTML = 'Estimated Total Labor Cost: ' + '<span class="mis">' + '$' + (Math.round(laborCost)).toFixed(2) + ' USD.' + '<span>';
  $estPartCost.innerHTML = 'Estimated Total Part Cost: ' + '<span class="mis">' + '$' + (Math.round(totalPartCost)).toFixed(2) + ' USD.' + '<span>';
  $estTotalCost.innerHTML = "Estimated Total cost of Labor + Parts: " + '<span class="mis">' + '$' + $estTotalCostNum.toFixed(2) + ' USD.' + '<span>';

  $costBreak.appendChild($costBreakStructure)
  $costBreak.appendChild($estLaborCost);
  $costBreak.appendChild($estPartCost);
  $costBreak.appendChild($estTotalCost);
}

function renderComplaintLogs(info, event, criteria) {

  var $link = document.createElement('li');
  var $complaintPara = document.createElement('p');
  var $complaintParaTwo = document.createElement('p');
  var $wrapper = document.createElement('div');

  $complaintNumber.textContent = event.Count;
  $complaintPara.innerHTML = "<span class='complained'>" + "Component: " + "<span>" + criteria.Component;
  $complaintParaTwo.innerHTML = "<span class='complained'>" + "Complaint: " + "<span>" + criteria.Summary;
  $complaintParaTwo.setAttribute('class', 'border')

  $wrapper.appendChild($complaintPara);
  $wrapper.appendChild($complaintParaTwo);
  $link.appendChild($wrapper);
  $complaintListing.appendChild($link);

  return $complaintListing;
}

function renderHomePageService(info, event){
  var $createList = document.createElement('li');

  $intervalFront .textContent = info.serviceAppend[0].due_mileage;
  $createList.textContent = event.desc;
  $homePageService.appendChild($createList);

  return $homePageService;
}

function renderTitleSearch(){
  $userCarTitle.innerHTML ='<span="bigTitle">' + ' FIND MY VEHICLE' + '<span>';
}

function renderCarStatus(info) {

  $carOverStats.textContent = '';
  var $carStatusHeader =document.createElement('h3');
  var $imageStatus=document.createElement('img');

  $userCarTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $userMileage.textContent = info.mileage;

  $carStatusHeader.textContent='CAR STATUS';
  $imageStatus.setAttribute('src', 'images/better check.jpg');
  $imageStatus.setAttribute('class','pictureCheck')
  $imageStatus.setAttribute('alt','checkOk');
  $carOverStats .appendChild($imageStatus);
  $carOverStats.appendChild($carStatusHeader);

}

function renderTitleComplaint(info){
  $userCarTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $userMileage.textContent = info.mileage;
}

function renderServiceElement(info, event) {
  var $createList = document.createElement('li');

  $userCarTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $userMileage.textContent = info.mileage;
  $nextMileage.textContent = info.serviceAppend[0].due_mileage;
  $createList.textContent = event.desc;
  $serviceList.appendChild($createList);

  return $serviceList;
}

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
    if (xhrs.status === 200) {
      console.log(xhrs.status)
      nhtsaResponse = xhrs.status;
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

    if (xhr.status === 200) {
      getDataObject(carInfo);
      for (var i = 0; i < carInfo.serviceAppend.length; i++) {
        renderServiceElement(carInfo, carInfo.serviceAppend[i]);
      }
      for (var i = 0; i < carInfo.complaints[0].Results.length; i++) {
        renderComplaintLogs(carInfo.complaints[0].Results[i], carInfo.complaints[0], carInfo.complaints[0].Results[i])
      }
      renderCostBreakElement(carInfo);
      swapView('serviceList');
    }
  })
  xhr.send();
}

function swapView(e) {
  if (e === 'searchCar') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.remove('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'searchCar';
  } else if (e === 'serviceList') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.remove('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'serviceList';
  } else if (e === 'intro') {
    $introPage.classList.remove('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'intro'
  } else if (e === 'complaintList') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.remove('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'complaintList'
  } else if (e ==='home'){
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.remove('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'home'
  }else if(e==='dataView'){
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    carInfo.dataView = 'dataView'
  }else if (e==='data-log'){
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.remove('hidden');
    carInfo.dataView = 'data-log'
  }
}

document.addEventListener('click', function (e) {
  var userDataView = e.target.getAttribute('data-view')
  if (userDataView === 'searchCar') {
    swapView('searchCar');
  } else if (userDataView === 'serviceList') {
    $carOverStats.textContent = '';
    $eraseInput.textContent='';
    $costDelete.textContent='';
    getDataObject(carInfo);
    renderTitleSearch();
    for (var i = 0; i < carInfo.serviceAppend.length; i++) {
      renderServiceElement(carInfo, carInfo.serviceAppend[i]);
    }
    renderCostBreakElement(carInfo);
    swapView('serviceList')
  } else if (userDataView === 'complaintList') {
    $carOverStats.textContent = '';
    $complaintListing.textContent=''
    for (var i = 0; i < carInfo.complaints[0].Results.length; i++) {
      renderComplaintLogs(carInfo.complaints[0].Results[i], carInfo.complaints[0], carInfo.complaints[0].Results[i])
    }
    renderTitleComplaint(carInfo)
    swapView('complaintList')
  } else if (userDataView === 'home') {
    $title.classList.remove('hidden')
    renderCarStatus(carInfo);
    for (var i = 0; i < 5; i++) {
      renderHomePageService(carInfo, carInfo.serviceAppend[i]);
    }
    swapView('home');
  }
})

function getDataObject(event) {
  carInfo.serviceAppend = [];
  for (var i = 0; i < event.service[0].data.length; i++) {
    if (event.service[0].data[i].due_mileage >= carInfo.mileage) {
      carInfo.serviceAppend.push(event.service[0].data[i]);
    }
  }
  return carInfo;
}

$getStartedBtn.addEventListener('click', function () {

  $homeButton.classList.remove('hidden');
  $title.classList.remove('hidden')
  renderTitleSearch();
  swapView('searchCar')

})

$carSearch.addEventListener('submit', function (e) {
  e.preventDefault();
  carInfo.year = $carSearch.elements.year.value;
  carInfo.make = $carSearch.elements.make.value;
  carInfo.model = $carSearch.elements.model.value;
  carInfo.mileage = $carSearch.elements.mileage.value;
  var parsedYear = parseInt($carSearch.elements.year.value);
  var parsedMileage = parseInt($carSearch.elements.mileage.value);
  recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value);
  serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage);
  $carSearch.reset();
})

$dataLogSubmitBtn.addEventListener('submit', function(e){
  e.preventDefault();
  var desc = {
    date: $dataLogSubmitBtn.elements.date.value,
    mileage: $dataLogSubmitBtn.elements.mileage.value,
    category:$dataLogSubmitBtn.elements.category.value,
    description: $dataLogSubmitBtn.elements.comments.value
  }

  carInfo.userDataLog.log.push(desc);
  $dataLogSubmitBtn.reset();
})

// document.addEventListener('click', function(e){

//   if(e.target.className ='column-full statusBarTire'){
//     $statsTire.style.background ='black'
//   }


// })
