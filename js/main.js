var $getStartedBtn = document.querySelector('.getStarted');
var $introPage = document.querySelector('.introduction');
var $vehicleFinder = document.querySelector('.find-vehicle');
var $carSearch = document.querySelector('#car-search-input');
var $serviceListPage = document.querySelector('.serviceResult');
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
var $oilStatusBar = document.querySelector('.statusBarOil');
var $tireRotation = document.querySelector('.statusBarTire');
var $pressureCheck = document.querySelector('.statusBarPressure');
var $oilRemaining = document.querySelector('.oilRemainder');
var $tireRotationRemaining = document.querySelector('.tireRemaining');
var $tirePressureCheck = document.querySelector('.pressure');
var $userDataTable = document.querySelector('.dataTable');
var $modalContainer = document.querySelector('.modal-data-container');
var $modalText = document.querySelector('.modal');
var $modalBtn = document.querySelector('.buttons-modal');
var $deleteBtnModal = document.querySelector('.delete');
var $editBtnModal = document.querySelector('.edit');
var $okBtn = document.querySelector('.something-error');
var $complaintModal = document.querySelector('.complaintModal');
var $complaintSuccess = document.querySelector('.complaintSucess');
var $loading = document.querySelector('.loadingLoad');
var serviceSoon = [];
var mileage = [];
var index = null;


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
  var oilDate = '';
  var pressureDate = '';
  var tireDate = '';

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
    if (oilNum.toString() === info.userDataLog.log[h].mileage && info.userDataLog.log[h].category === 'oil-service') {
      oilDate += info.userDataLog.log[h].date;
    }
  }
  for (k = 0; k < info.userDataLog.log.length; k++) {
    if (pressure.toString() === info.userDataLog.log[k].mileage && info.userDataLog.log[k].category === 'check-pressure') {
      pressureDate += info.userDataLog.log[k].date;
    }
  }
  for (p = 0; p < info.userDataLog.log.length; p++) {
    if (tire.toString() === info.userDataLog.log[p].mileage && info.userDataLog.log[p].category === 'tire-rotation') {
      tireDate += info.userDataLog.log[p].date;
    }
  }


  var currentDate = new Date();
  var oilLatestDate = new Date(oilDate);
  var oilDaysRemain = currentDate - oilLatestDate;
  var oilDaysRemainResult = (180 - (Math.floor(oilDaysRemain / (1000 * 60 * 60 * 24))));
  var oilRelative = (5000 - Math.abs((carInfo.mileage - oilNum)));
  $oilRemaining.textContent = oilDaysRemainResult + ' Day(s)/ ' + oilRelative + ' mi' + ' remaining!'

  var pressureLatestDate = new Date(pressureDate);
  var pressureRemain = currentDate - pressureLatestDate;
  var pressureRemainResult = (30 - (Math.floor(pressureRemain / (1000 * 60 * 60 * 24))));
  $tirePressureCheck.textContent = pressureRemainResult + ' Day(s) remaining!'

  var tireLatestDate = new Date(tireDate);
  var tireRemain = currentDate - tireLatestDate;
  var tireRemainResult = (180 - (Math.floor(tireRemain / (1000 * 60 * 60 * 24))))
  var tireRelative = (5000 - Math.abs((carInfo.mileage) - tire));
  $tireRotationRemaining.textContent = tireRemainResult + ' Day(s)/ ' + tireRelative + ' mi' + ' remaining!';

  if (oilDaysRemainResult <= 15 || oilRelative < 1000) {
    $oilStatusBar.style.background = 'red';
  } else if (oilDaysRemainResult > 15 && oilRelative >= 1000) {
    $oilStatusBar.style.background = 'green'
  }

  if (tireRemainResult <= 15 || tireRelative < 1000) {
    $tireRotation.style.background = 'red';
  } else if (tireRemainResult > 15 && tireRelative >= 1000) {
    $tireRotation.style.background = 'green';
  }

  if (pressureRemainResult <= 15) {
    $pressureCheck.style.background = 'red';
  } else if (pressureRemainResult > 15) {
    $pressureCheck.style.background = 'green';
  }

  var $carStatus = document.createElement('h3');
  var $imageWarning = document.createElement('img');
  $carStatus.textContent = ' CAR STATUS:'
  $imageWarning.setAttribute('class', 'pictureCheck');
  $imageWarning.setAttribute('alt', 'symbol status')
  if (oilDaysRemainResult <= 15 || pressureRemainResult <= 15 || tireRemainResult <= 15 || tireRelative < 1000 || oilRelative < 1000) {
    $imageWarning.setAttribute('src', 'images/istockphoto-1047357876-170667a.jpg');
    $carOverStats.appendChild($carStatus);
    $carOverStats.appendChild($imageWarning)
  } else if (oilDaysRemainResult > 15 && pressureRemainResult > 15 && tireRemainResult > 15 && tireRelative >= 1000 && oilRelative >= 1000) {
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

function renderDataTable(info, indexing) {
  $tBody.textContent = ''
  if (typeof indexing === 'number') {
    var revised = info.log;
    revised.splice(indexing - 1, 1, info.log[info.log.length - 1]);
    revised.pop();
    index = null;
    for (var i = 0; i < revised.length; i++) {
      $tableRow = document.createElement('tr')
      $tableListNumber = document.createElement('td');
      $tableListNumber.setAttribute('data-view', i + 1);
      $tableDataDate = document.createElement('td');
      $tableDataDate.setAttribute('data-view', i + 1)
      $tableDataMileage = document.createElement('td');
      $tableDataMileage.setAttribute('data-view', i + 1);
      $tableDataCat = document.createElement('td');
      $tableDataCat.setAttribute('data-view', i + 1)
      $tableDataDesc = document.createElement('td');
      $tableDataDesc.setAttribute('data-view', i + 1)
      $tableDataDate.textContent = info.log[i].date;
      $tableDataMileage.textContent = info.log[i].mileage;
      $tableDataCat.textContent = info.log[i].category;
      $tableDataDesc.textContent = info.log[i].description;
      $tableListNumber.textContent = i + 1;
      $tableRow.appendChild($tableListNumber);
      $tableRow.appendChild($tableDataDate);
      $tableRow.appendChild($tableDataMileage);
      $tableRow.appendChild($tableDataCat);
      $tableRow.appendChild($tableDataDesc);
      $tBody.appendChild($tableRow)
    }
  } else if (indexing === null) {
    for (var i = 0; i < info.log.length; i++) {
      $tableRow = document.createElement('tr')
      $tableListNumber = document.createElement('td');
      $tableListNumber.setAttribute('data-view', i + 1);
      $tableDataDate = document.createElement('td');
      $tableDataDate.setAttribute('data-view', i + 1)
      $tableDataMileage = document.createElement('td');
      $tableDataMileage.setAttribute('data-view', i + 1);
      $tableDataCat = document.createElement('td');
      $tableDataCat.setAttribute('data-view', i + 1)
      $tableDataDesc = document.createElement('td');
      $tableDataDesc.setAttribute('data-view', i + 1)
      $tableDataDate.textContent = info.log[i].date;
      $tableDataMileage.textContent = info.log[i].mileage;
      $tableDataCat.textContent = info.log[i].category;
      $tableDataDesc.textContent = info.log[i].description;
      $tableListNumber.textContent = i + 1;
      $tableRow.appendChild($tableListNumber);
      $tableRow.appendChild($tableDataDate);
      $tableRow.appendChild($tableDataMileage);
      $tableRow.appendChild($tableDataCat);
      $tableRow.appendChild($tableDataDesc);
      $tBody.appendChild($tableRow)
    }
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
    if ((xhrs.status === 200 && carInfo.complaints[0] !== null) && (xhrs.status === 200 && carInfo.complaints[0].Message !=='No results found for this request')){
      $complaintSuccess.classList.remove('hidden');
    } else if (xhrs.status === 400 || (xhrs.status === 200 && carInfo.complaints[0]=== null) || xhrs.response === null || (xhrs.status === 200 && carInfo.complaints[0].Message === "No results found for this request")) {
      $complaintModal.classList.remove('hidden');
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
    recall(year, make, model);
    if (carInfo.service.length === 1) {
      carInfo.service.shift()
      carInfo.service.push(xhr.response);
    } else {
      carInfo.service.push(xhr.response);
    }
    if (xhr.status === 200 && carInfo.service[0].message.message !== "Data Invaild" && xhr.status !== 400 && carInfo.service[0].Message !== "The request is invalid.") {
      $loading.classList.add('hidden');
      getDataObject(carInfo);
      for (var i = 0; i < carInfo.serviceAppend.length; i++) {
        renderServiceElement(carInfo, carInfo.serviceAppend[i]);
      }
      renderCostBreakElement(carInfo);
      swapView('serviceList')
    } else if (xhr.status === 400 || carInfo.service[0].Message === "The request is invalid." || carInfo.service[0].message.message === "Data Invaild") {
      $loading.classList.add('hidden');
      $okBtn.classList.remove('hidden')
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
  var userDataView = e.target.getAttribute('data-view');
  var userTarget = e.target.className;
  if (userDataView === 'searchCar') {
    $carSearch.elements.year.value = carInfo.year;
    $carSearch.elements.make.value = carInfo.make;
    $carSearch.elements.model.value = carInfo.model;
    $carSearch.elements.mileage.value = parseInt(carInfo.mileage);
    swapView('searchCar');
  } else if (userDataView === 'serviceList') {
    if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.service[0].message.message !== 'Data Invaild') {
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
    } else if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.service[0].message.message === 'Data Invaild'){
      $carOverStats.textContent = '';
      $carSearch.elements.year.value = carInfo.year;
      $carSearch.elements.make.value = carInfo.make;
      $carSearch.elements.model.value = carInfo.model;
      $carSearch.elements.mileage.value =parseInt(carInfo.mileage);
      swapView('searchCar')
    }
  } else if (userDataView === 'complaintList') {
    if (carInfo.model === '' && carInfo.year === 0 && carInfo.make === '' && carInfo.complaints.length ===0){
      return;
    }else if (carInfo.complaints[0] ===null){
      return;
    }
    else if (carInfo.complaints[0].Message !== 'No results found for this request' && carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '') {
      $carOverStats.textContent = '';
      $complaintListing.textContent = ''
      for (var i = 0; i < carInfo.complaints[0].Results.length; i++) {
        renderComplaintLogs(carInfo.complaints[0].Results[i], carInfo.complaints[0], carInfo.complaints[0].Results[i])
      }
      renderTitleComplaint(carInfo)
      swapView('complaintList')
    } else if (carInfo.complaints === 'No results found for this request') {
      $complaintModal.classList.remove('hidden');
    } else if (carInfo.complaints[0].Message === "Complaints: An error occured while processing this request. Pls verify the HTTP request syntax.") {
      $okBtn.classList.remove('hidden')
    }
  } else if (userDataView === 'home') {
    if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.serviceAppend.length !==0) {
      $homePageService.textContent = '';
      renderCarStatus(carInfo);
      carStatusProgress(carInfo);
      $title.classList.remove('hidden')
      for (var i = 0; i < 5; i++) {
        renderHomePageService(carInfo, carInfo.serviceAppend[i]);
      }
      swapView('home');
    }
  } else if (userDataView === 'data-log') {
    if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '') {
      renderTitleComplaint(carInfo)
      swapView('data-log')
    }
  } else if (userDataView === 'dataView') {
    if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '') {
      $carOverStats.textContent = '';
      renderTitleComplaint(carInfo)
      renderDataTable(carInfo.userDataLog, index);
      swapView('dataView')
    }
  } else if (userTarget === 'modalBtn ok') {
    $complaintSuccess.classList.add('hidden');
  } else if (userTarget ==='modalBtn ok2'){
    $okBtn.classList.add('hidden');
  }else if (userTarget === 'modalBtn ok3'){
    $complaintModal.classList.add('hidden');
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
  if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.serviceAppend.length !== 0 && carInfo.mileage !== "") {
    $homePageService.textContent = '';
    renderCarStatus(carInfo);
    carStatusProgress(carInfo);
    $title.classList.remove('hidden')
    for (var i = 0; i < 5; i++) {
      renderHomePageService(carInfo, carInfo.serviceAppend[i]);
    }
    $homeButton.classList.remove('hidden');
    swapView('home');
  } else {
    $homeButton.classList.remove('hidden');
    $title.classList.remove('hidden')
    renderTitleSearch();
    swapView('searchCar')
  }

})

$carSearch.addEventListener('submit', function (e) {
  $eraseInput.textContent = '';
  $costDelete.textContent = '';
  e.preventDefault();
  carInfo.year = $carSearch.elements.year.value;
  carInfo.make = $carSearch.elements.make.value;
  carInfo.model = $carSearch.elements.model.value;
  carInfo.mileage = $carSearch.elements.mileage.value;
  var parsedYear = parseInt($carSearch.elements.year.value);
  var parsedMileage = parseInt($carSearch.elements.mileage.value);
  recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value);
  serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage);
  $loading.classList.remove('hidden');
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
  renderDataTable(carInfo.userDataLog, index)
  swapView('dataView')
  $dataLogSubmitBtn.reset();
})

$userDataTable.addEventListener('click', function (e) {
  var targetNumber = e.target.getAttribute('data-view');
  if (targetNumber === targetNumber && targetNumber !== null) {
    $deleteBtnModal.setAttribute('data-view', targetNumber)
    $editBtnModal.setAttribute('data-view', targetNumber)
    $modalContainer.classList.remove('hidden');
    $modalText.textContent = "What would you like to do for #" + targetNumber + '?'
  }
})

$modalBtn.addEventListener('click', function (e) {

  if (e.target.className === 'modalBtn delete') {
    var indexes = parseInt($deleteBtnModal.getAttribute('data-view'));
    var deleteData = carInfo.userDataLog.log;
    deleteData.splice(indexes - 1, 1);
    $modalContainer.classList.add('hidden');
    renderDataTable(carInfo.userDataLog, null);
  } else if (e.target.className === "modalBtn edit") {
    index = parseInt($deleteBtnModal.getAttribute('data-view'))
    $dataLogSubmitBtn.elements.date.value = carInfo.userDataLog.log[index - 1].date;
    $dataLogSubmitBtn.elements.mileage.value = carInfo.userDataLog.log[index - 1].mileage;
    $dataLogSubmitBtn.elements.category.value = carInfo.userDataLog.log[index - 1].category;
    $dataLogSubmitBtn.elements.comments.value = carInfo.userDataLog.log[index - 1].description;
    $modalContainer.classList.add('hidden');
    swapView('data-log');

  }

})
