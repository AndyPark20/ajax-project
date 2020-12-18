
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
var $eraseInput = document.querySelector('ol');
var $costDelete = document.querySelector('.costBreakDown');
var $homeButton = document.querySelector('.home-buttons');
var $title = document.querySelector('.header');
var $homePage = document.querySelector('.overView');
var $carStatusSymbol = document.querySelector('.homeTitleStatus')
var $statsTest = document.querySelector('.statusBar');
var $statsTire = document.querySelector('.statusBarTire');
var $carOverStats = document.querySelector('.sizing');
var $homePageService = document.querySelector('.homeServiceOverview')
var $intervalFront = document.querySelector('.frontPage');
var $dataLog = document.querySelector('.data-log');
var $dataLogSubmitBtn = document.querySelector('#data-log-submit');
var $dataRecordPage = document.querySelector('.entryInput');
var $tBody = document.querySelector('tbody');
var $oilStatusBar =document.querySelector('.statusBarOil');
var $tireRotation = document.querySelector('.statusBarTire');
var $pressureCheck = document.querySelector('.statusBarPressure');
var $oilRemaining = document.querySelector('.oilRemainder');
var $tireRotationRemaining = document.querySelector('.tireRemaining');
var $tirePressureCheck =document.querySelector('.pressure')
var nhtsaResponse = 0;


function renderCostBreakElement(event) {
  repairTotalHours = 0;
  laborCost = 0;
  totalPartCost = 0
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

function carStatusProgress(info) {
  var oilNum = 0;
  var pressure = 0
  var tire = 0
  var oilDate='';
  var pressureDate='';
  var tireDate='';

  for (var i = 0; i < info.userDataLog.log.length; i++) {
    if (parseInt(info.userDataLog.log[i].mileage) > oilNum && info.userDataLog.log[i].category === 'oil-service') {
      oilNum = parseInt(info.userDataLog.log[i].mileage);
    }
  }
  for (var j = 0; j < info.userDataLog.log.length; j++) {
    if (parseInt(info.userDataLog.log[j].mileage) > pressure && info.userDataLog.log[j].category === 'check-pressure') {
      pressure = parseInt(info.userDataLog.log[j].mileage);
    }

  }
  for (var z = 0; z < info.userDataLog.log.length; z++) {
    if (parseInt(info.userDataLog.log[z].mileage) > tire && info.userDataLog.log[z].category === 'tire-rotation') {
      tire = parseInt(info.userDataLog.log[z].mileage);
    }
  }
  for (h = 0; h < info.userDataLog.log.length; h++) {
    if (oilNum.toString() === info.userDataLog.log[h].mileage && info.userDataLog.log[h].category ==='oil-service') {
      oilDate+= info.userDataLog.log[h].date;
    }
  }
  for (k = 0; k < info.userDataLog.log.length; k++) {
    if (pressure.toString() === info.userDataLog.log[k].mileage && info.userDataLog.log[k].category === 'check-pressure') {
      pressureDate += info.userDataLog.log[k].date;
    }
  }
  for (p = 0; p < info.userDataLog.log.length; p++) {
    if (tire.toString() === info.userDataLog.log[p].mileage && info.userDataLog.log[p].category === 'tire-rotation') {
       tireDate+= info.userDataLog.log[p].date;
    }
  }
  console.log(oilDate);
  console.log(pressureDate);
  console.log(tireDate);

  var currentDate = new Date();
  var oilLatestDate = new Date(oilDate);
  var oilDaysRemain = currentDate - oilLatestDate;
  var oilDaysRemainResult =(60-(Math.floor(oilDaysRemain/(1000*60*60*24))));
  $oilRemaining.textContent=oilDaysRemainResult + ' Day(s) Remaining !'


  var pressureLatestDate = new Date(pressureDate);
  var pressureRemain = currentDate - pressureLatestDate;
  var pressureRemainResult = (60-(Math.floor(pressureRemain/(1000*60*60*24))));
  $tirePressureCheck.textContent = pressureRemainResult + ' Day(s) Remaining !'



  var tireLatestDate = new Date(tireDate);
  var tireRemain = currentDate - tireLatestDate;
  var tireRemainResult = (60-(Math.floor(tireRemain/(1000*60*60*24))))
  $tireRotationRemaining.textContent = tireRemainResult + ' Day(s) Remaining !';

  if (oilDaysRemainResult <= 15) {
    $oilStatusBar.style.background = 'red';
  } else if (oilDaysRemainResult > 15) {
    $oilStatusBar.style.background = 'green'
  }

  if (pressureRemainResult <= 15) {
    $pressureCheck.style.background = 'red';
  } else if (pressureRemainResult > 15) {
    $pressureCheck.style.background = 'green';
  }

  if (tireRemainResult <= 15) {
    $tireRotation.style.background = 'red';
  } else if (tireRemainResult > 15) {
    $tireRotation.style.background = 'green';
  }
  var $carStatus = document.createElement('h3');
  var $imageWarning = document.createElement('img');
  $carStatus.textContent = ' CAR STATUS:'
  $imageWarning.setAttribute('class', 'pictureCheck');
  $imageWarning.setAttribute('alt', 'symbol status')
  if (oilDaysRemainResult <= 15 || pressureRemainResult <= 15 || tireRemainResult <= 15) {
    $imageWarning.setAttribute('src', 'images/istockphoto-1047357876-170667a.jpg');
    $carOverStats.appendChild($carStatus);
    $carOverStats.appendChild($imageWarning)
  } else if (oilDaysRemainResult > 15 && pressureRemainResult > 15 && tireRemainResult > 15) {
    $imageWarning.setAttribute('src', 'images/better-check.jpg');
    $carOverStats.appendChild($carStatus);
    $carOverStats.appendChild($imageWarning)
  }
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

function renderHomePageService(info, event) {
  var $createList = document.createElement('li');
  $intervalFront.textContent = info.serviceAppend[0].due_mileage;
  $createList.textContent = event.desc;
  $homePageService.appendChild($createList);
  return $homePageService;
}

function renderTitleSearch() {
  $userCarTitle.innerHTML = '<span="bigTitle">' + ' FIND MY VEHICLE' + '<span>';
}

function renderCarStatus(info) {
  $carOverStats.textContent = '';
  $userCarTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $userMileage.textContent = info.mileage;

}

function renderTitleComplaint(info) {
  $userCarTitle.textContent = info.year + ' ' + info.make + ' ' + info.model;
  $userMileage.textContent = info.mileage;
}

function renderDataTable(info) {
  $tBody.textContent = ''
  for (var i = 0; i < info.log.length; i++) {
    $tableRow = document.createElement('tr')
    $tableDataDate = document.createElement('td');
    $tableDataMileage = document.createElement('td');
    $tableDataCat = document.createElement('td');
    $tableDataDesc = document.createElement('td');
    $tableDataDate.textContent = info.log[i].date;
    $tableDataMileage.textContent = info.log[i].mileage;
    $tableDataCat.textContent = info.log[i].category;
    $tableDataDesc.textContent = info.log[i].description;
    $tableRow.appendChild($tableDataDate);
    $tableRow.appendChild($tableDataMileage);
    $tableRow.appendChild($tableDataCat);
    $tableRow.appendChild($tableDataDesc);
    $tBody.appendChild($tableRow)
  }

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
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'searchCar';
  } else if (e === 'serviceList') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.remove('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'serviceList';
  } else if (e === 'intro') {
    $introPage.classList.remove('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'intro'
  } else if (e === 'complaintList') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.remove('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'complaintList'
  } else if (e === 'home') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.remove('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'home'
  } else if (e === 'dataView') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.remove('hidden');
    carInfo.dataView = 'dataView'
  } else if (e === 'data-log') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.remove('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'data-log'
  } else if (e === 'dataView') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.remove('hidden');
    carInfo.dataView = 'dataView';
  }
}

document.addEventListener('click', function (e) {
  var userDataView = e.target.getAttribute('data-view')
  if (userDataView === 'searchCar') {
    swapView('searchCar');
  } else if (userDataView === 'serviceList') {
    $carOverStats.textContent = '';
    $eraseInput.textContent = '';
    $costDelete.textContent = '';
    getDataObject(carInfo);
    renderTitleSearch();
    for (var i = 0; i < carInfo.serviceAppend.length; i++) {
      renderServiceElement(carInfo, carInfo.serviceAppend[i]);
    }
    renderCostBreakElement(carInfo);
    swapView('serviceList')
  } else if (userDataView === 'complaintList') {
    $carOverStats.textContent = '';
    $complaintListing.textContent = ''
    for (var i = 0; i < carInfo.complaints[0].Results.length; i++) {
      renderComplaintLogs(carInfo.complaints[0].Results[i], carInfo.complaints[0], carInfo.complaints[0].Results[i])
    }
    renderTitleComplaint(carInfo)
    swapView('complaintList')
  } else if (userDataView === 'home') {
    $homePageService.textContent = '';
    renderCarStatus(carInfo);
    carStatusProgress(carInfo);
    $title.classList.remove('hidden')
    for (var i = 0; i < 5; i++) {
      renderHomePageService(carInfo, carInfo.serviceAppend[i]);
    }
    swapView('home');
  } else if (userDataView === 'data-log') {
    renderTitleComplaint(carInfo)
    swapView('data-log')

  } else if (userDataView === 'dataView') {
    $carOverStats.textContent='';
    renderTitleComplaint(carInfo)
    renderDataTable(carInfo.userDataLog);

    swapView('dataView')
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

$dataLogSubmitBtn.addEventListener('submit', function (e) {
  e.preventDefault();
  var desc = {
    date: $dataLogSubmitBtn.elements.date.value,
    mileage: $dataLogSubmitBtn.elements.mileage.value,
    category: $dataLogSubmitBtn.elements.category.value,
    description: $dataLogSubmitBtn.elements.comments.value
  };

  carInfo.userDataLog.log.push(desc);
  swapView('dataView')
  $dataLogSubmitBtn.reset();
})
