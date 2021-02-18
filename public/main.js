
const $getStartedBtn = document.querySelector('.getStarted');
const $introPage = document.querySelector('.introduction');
const $vehicleFinder = document.querySelector('.find-vehicle');
const $carSearch = document.querySelector('#car-search-input');
const $serviceListPage = document.querySelector('.serviceResult');
const $serviceList = document.querySelector('.servicePoint');
const $userMileage = document.querySelector('.mi');
const $nextMileage = document.querySelector('.mis');
const $costBreak = document.querySelector('.costBreakDown');
const $userCarTitle = document.querySelector('#carTitle');
const $complaintPage = document.querySelector('.complaintResult');
const $complaintListing = document.querySelector('.complaintListing');
const $complaintNumber = document.querySelector('.comp');
const $eraseInput = document.querySelector('ol');
const $costDelete = document.querySelector('.costBreakDown');
const $homeButton = document.querySelector('.home-buttons');
const $title = document.querySelector('.header');
const $homePage = document.querySelector('.overView');
const $carOverStats = document.querySelector('.sizing');
const $homePageService = document.querySelector('.homeServiceOverview');
const $intervalFront = document.querySelector('.frontPage');
const $dataLog = document.querySelector('.data-log');
const $dataLogSubmitBtn = document.querySelector('#data-log-submit');
const $dataRecordPage = document.querySelector('.entryInput');
const $tBody = document.querySelector('tbody');
const $oilStatusBar = document.querySelector('.statusBarOil');
const $tireRotation = document.querySelector('.statusBarTire');
const $pressureCheck = document.querySelector('.statusBarPressure');
const $oilRemaining = document.querySelector('.oilRemainder');
const $tireRotationRemaining = document.querySelector('.tireRemaining');
const $tirePressureCheck = document.querySelector('.pressure');
const $userDataTable = document.querySelector('.dataTable');
const $modalContainer = document.querySelector('.modal-data-container');
const $modalText = document.querySelector('.modal');
const $modalBtn = document.querySelector('.buttons-modal');
const $deleteBtnModal = document.querySelector('.delete');
const $editBtnModal = document.querySelector('.edit');
const $okBtn = document.querySelector('.something-error');
const $noConnect = document.querySelector('.no-connection');
const $complaintModal = document.querySelector('.complaintModal');
const $complaintSuccess = document.querySelector('.complaintSucess');
const $loading = document.querySelector('.loadingLoad');
const $serviceSucess = document.querySelector('.serviceSuccess');
const $introModal = document.querySelector('.instruction-master');
const $homeBtnTop = document.querySelector('.home-buttons-top');
const $emptyModal = document.querySelector('.instruction-empty');
let index = null;

/** *information about the car */
const carInfo = {
  year: 0,
  make: '',
  model: '',
  mileage: 0,
  dataView: 'intro',
  complaints: [],
  service: [],
  serviceAppend: [],
  userDataLog: {
    log: []
  }
};

function renderCostBreakElement(event) {
  let repairTotalHours = 0;
  let laborCost = 0;
  let totalPartCost = 0;
  for (let i = 0; i < event.serviceAppend.length; i++) {
    repairTotalHours += event.serviceAppend[i].repair.repair_hours;
    laborCost += event.serviceAppend[i].repair.labor_cost;
    totalPartCost += event.serviceAppend[i].repair.part_cost;
  }
  const $costBreakStructure = document.createElement('li');
  const $estLaborCost = document.createElement('li');
  const $estPartCost = document.createElement('li');
  const $estTotalCost = document.createElement('li');
  const $estTotalCostNum = (Math.round(laborCost + totalPartCost));
  $costBreakStructure.innerHTML = 'Estimated Total Repair Hours Needed: ' + '<span class="mis">' + repairTotalHours.toFixed(2) + ' Hrs.' + '<span>';
  $estLaborCost.innerHTML = 'Estimated Total Labor Cost: ' + '<span class="mis">' + '$' + (Math.round(laborCost)).toFixed(2) + ' USD.' + '<span>';
  $estPartCost.innerHTML = 'Estimated Total Part Cost: ' + '<span class="mis">' + '$' + (Math.round(totalPartCost)).toFixed(2) + ' USD.' + '<span>';
  $estTotalCost.innerHTML = 'Estimated Total cost of Labor + Parts: ' + '<span class="mis">' + '$' + $estTotalCostNum.toFixed(2) + ' USD.' + '<span>';
  $costBreak.appendChild($costBreakStructure);
  $costBreak.appendChild($estLaborCost);
  $costBreak.appendChild($estPartCost);
  $costBreak.appendChild($estTotalCost);
}

function carStatusProgress(info) {
  let oilNum = 0;
  let pressure = 0;
  let tire = 0;
  let oilDate = '';
  let pressureDate = '';
  let tireDate = '';

  for (let i = 0; i < info.userDataLog.log.length; i++) {
    if (parseInt(info.userDataLog.log[i].mileage) > oilNum && info.userDataLog.log[i].category === 'oil-service') {
      oilNum = parseInt(info.userDataLog.log[i].mileage);
    }
  }
  for (let j = 0; j < info.userDataLog.log.length; j++) {
    if (parseInt(info.userDataLog.log[j].mileage) > pressure && info.userDataLog.log[j].category === 'check-pressure') {
      pressure = parseInt(info.userDataLog.log[j].mileage);
    }

  }
  for (let z = 0; z < info.userDataLog.log.length; z++) {
    if (parseInt(info.userDataLog.log[z].mileage) > tire && info.userDataLog.log[z].category === 'tire-rotation') {
      tire = parseInt(info.userDataLog.log[z].mileage);
    }
  }
  for (let h = 0; h < info.userDataLog.log.length; h++) {
    if (oilNum.toString() === info.userDataLog.log[h].mileage && info.userDataLog.log[h].category === 'oil-service') {
      oilDate += info.userDataLog.log[h].date;
    }
  }
  for (let k = 0; k < info.userDataLog.log.length; k++) {
    if (pressure.toString() === info.userDataLog.log[k].mileage && info.userDataLog.log[k].category === 'check-pressure') {
      pressureDate += info.userDataLog.log[k].date;
    }
  }
  for (let p = 0; p < info.userDataLog.log.length; p++) {
    if (tire.toString() === info.userDataLog.log[p].mileage && info.userDataLog.log[p].category === 'tire-rotation') {
      tireDate += info.userDataLog.log[p].date;
    }
  }

  const currentDate = new Date();
  const oilLatestDate = new Date(oilDate);
  const oilDaysRemain = currentDate - oilLatestDate;
  const oilDaysRemainResult = (180 - (Math.floor(oilDaysRemain / (1000 * 60 * 60 * 24))));
  const oilTypeNumber = typeof oilDaysRemainResult;
  const oilRelative = (5000 - Math.abs((carInfo.mileage - oilNum)));

  const pressureLatestDate = new Date(pressureDate);
  const pressureRemain = currentDate - pressureLatestDate;
  const pressureRemainResult = (30 - (Math.floor(pressureRemain / (1000 * 60 * 60 * 24))));
  const pressureNumber = typeof pressureRemainResult;

  const tireLatestDate = new Date(tireDate);
  const tireRemain = currentDate - tireLatestDate;
  const tireRemainResult = (180 - (Math.floor(tireRemain / (1000 * 60 * 60 * 24))));
  const tireRelative = (5000 - Math.abs((carInfo.mileage) - tire));
  const tireNumber = typeof tireRemainResult;

  if (oilDaysRemainResult.toString() === 'NaN') {
    $oilRemaining.textContent = 'Please Log the most recent service history';
  } else if (oilTypeNumber.toString() === 'number') {
    $oilRemaining.textContent = `${oilDaysRemainResult} Day(s) ${oilRelative} mi remaining!`;
  }

  if (tireRemainResult.toString() === 'NaN') {
    $tireRotationRemaining.textContent = 'Please Log the most recent service history';
  } else if (tireNumber.toString() === 'number') {
    $tireRotationRemaining.textContent = `${tireRemainResult} Day(s) ${tireRelative} mi remaining!`;
  }

  if (pressureRemainResult.toString() === 'NaN') {
    $tirePressureCheck.textContent = 'Please Log the most recent service history';
  } else if (pressureNumber.toString() === 'number') {
    $tirePressureCheck.textContent = `${pressureRemainResult} Day(s) remaining!`;
  }

  if (oilDaysRemainResult <= 15 || oilRelative < 1000) {
    $oilStatusBar.style.background = 'red';
  } else if (oilDaysRemainResult > 15 && oilRelative >= 1000) {
    $oilStatusBar.style.background = 'green';
  }

  if (tireRemainResult <= 15 || tireRelative < 1000) {
    $tireRotation.style.background = 'red';
  } else if (tireRemainResult > 15 && tireRelative >= 1000) {
    $tireRotation.style.background = 'green';
  }

  if (pressureRemainResult <= 15 || pressureRemainResult.toString() === 'NaN') {
    $pressureCheck.style.background = 'red';
  } else if (pressureRemainResult > 15) {
    $pressureCheck.style.background = 'green';
  }

  const $carStatus = document.createElement('h3');
  const $imageWarning = document.createElement('img');
  $carStatus.textContent = ' CAR STATUS:';
  $imageWarning.setAttribute('class', 'pictureCheck');
  $imageWarning.setAttribute('alt', 'symbol status');
  if (oilDaysRemainResult <= 15 || pressureRemainResult <= 15 || tireRemainResult <= 15 || tireRelative < 1000 || oilRelative < 1000) {
    $imageWarning.setAttribute('src', 'images/istockphoto-1047357876-170667a.jpg');
    $carOverStats.appendChild($carStatus);
    $carOverStats.appendChild($imageWarning);
  } else if (oilDaysRemainResult > 15 && pressureRemainResult > 15 && tireRemainResult > 15 && tireRelative >= 1000 && oilRelative >= 1000) {
    $imageWarning.setAttribute('src', 'images/better-check.jpg');
    $carOverStats.appendChild($carStatus);
    $carOverStats.appendChild($imageWarning);
  }
}

const renderComplaintLogs = (info, event, criteria) => {
  const $link = document.createElement('li');
  const $complaintPara = document.createElement('p');
  const $complaintParaTwo = document.createElement('p');
  const $wrapper = document.createElement('div');
  $complaintNumber.textContent = event.Count;
  $complaintPara.innerHTML = `<span class='complained'> Component: <span> ${criteria.Component}`;
  $complaintParaTwo.innerHTML = ` <span class='complained'> Complaint: <span> ${criteria.Summary}`;
  $complaintParaTwo.setAttribute('class', 'border');
  $wrapper.appendChild($complaintPara);
  $wrapper.appendChild($complaintParaTwo);
  $link.appendChild($wrapper);
  $complaintListing.appendChild($link);
  return $complaintListing;
};

const renderHomePageService = (info, event) => {
  const $createList = document.createElement('li');
  if (carInfo.serviceAppend.length !== 0) {
    $intervalFront.textContent = info.serviceAppend[0].due_mileage;
    $createList.textContent = event.desc;
    $homePageService.appendChild($createList);
    return $homePageService;
  }
};

function renderTitleSearch() {
  $userCarTitle.innerHTML = '<span="bigTitle"> FIND MY VEHICLE <span>';
}

const renderCarStatus = info => {
  $carOverStats.textContent = '';
  $userCarTitle.textContent = `${info.year} ${info.make} ${info.model}`;
  $userMileage.textContent = info.mileage;
};

const renderTitleComplaint = info => {
  $userCarTitle.textContent = `${info.year} ${info.make} ${info.model}`;
  $userMileage.textContent = info.mileage;
};

const renderDataTable = (info, indexing) => {
  $tBody.textContent = '';
  if (typeof indexing === 'number') {
    const revised = info.log;
    revised.splice(indexing - 1, 1, info.log[info.log.length - 1]);
    revised.pop();
    index = null;
    for (let i = 0; i < revised.length; i++) {
      const $tableRow = document.createElement('tr');
      const $tableListNumber = document.createElement('td');
      $tableListNumber.setAttribute('data-view', i + 1);
      const $tableDataDate = document.createElement('td');
      $tableDataDate.setAttribute('data-view', i + 1);
      const $tableDataMileage = document.createElement('td');
      $tableDataMileage.setAttribute('data-view', i + 1);
      const $tableDataCat = document.createElement('td');
      $tableDataCat.setAttribute('data-view', i + 1);
      const $tableDataDesc = document.createElement('td');
      $tableDataDesc.setAttribute('data-view', i + 1);
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
      $tBody.appendChild($tableRow);
    }
  } else if (indexing === null) {
    for (let i = 0; i < info.log.length; i++) {
      const $tableRow = document.createElement('tr');
      const $tableListNumber = document.createElement('td');
      $tableListNumber.setAttribute('data-view', i + 1);
      const $tableDataDate = document.createElement('td');
      $tableDataDate.setAttribute('data-view', i + 1);
      const $tableDataMileage = document.createElement('td');
      $tableDataMileage.setAttribute('data-view', i + 1);
      const $tableDataCat = document.createElement('td');
      $tableDataCat.setAttribute('data-view', i + 1);
      const $tableDataDesc = document.createElement('td');
      $tableDataDesc.setAttribute('data-view', i + 1);
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
      $tBody.appendChild($tableRow);
    }
  }
};

const renderServiceElement = (info, event) => {
  const $createList = document.createElement('li');
  $userCarTitle.textContent = `${info.year} ${info.make} ${info.model}`;
  $userMileage.textContent = info.mileage;
  $nextMileage.textContent = info.serviceAppend[0].due_mileage;
  $createList.textContent = event.desc;
  $serviceList.appendChild($createList);
  return $serviceList;
};

// calling to get data object from NHTSA by the server side
const recall = (year, make, model) => {
  $loading.classList.remove('hidden');
  fetch(`/nhtsa/${year}/${make}/${model}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (carInfo.complaints.length === 1) {
        carInfo.complaints.shift();
        carInfo.complaints.push(data);
      } else {
        carInfo.complaints.push(data);
      }
      if ((carInfo.complaints[0].Message === 'Results returned successfully')) {
        $complaintModal.classList.add('hidden');
        $complaintSuccess.classList.remove('hidden');
        $loading.classList.add('hidden');

      } else if (carInfo.complaints[0].Message === 'No results found for this request') {
        $complaintModal.classList.remove('hidden');
        $loading.classList.add('hidden');
      }
    })
    .catch(error => {
      $loading.classList.add('hidden');
      $noConnect.classList.remove('hidden');
      console.error(error);
    });
};

// calling to get carMD api data object retrieved by server side
const serviceInterval = (year, make, model, mileage) => {
  fetch(`/carMD/${year}/${make}/${model}/${mileage}`)

    .then(res => {
      return res.json();
    })
    .then(data => {
      if (carInfo.service.length === 1) {
        carInfo.service.shift();
        carInfo.service.push(data);
      } else {
        carInfo.service.push(data);
      }

      if (carInfo.service[0].data !== null) {
        $serviceSucess.classList.remove('hidden');
        $loading.classList.add('hidden');
      } else if (carInfo.service[0].data === null) {
        $okBtn.classList.remove('hidden');
        $loading.classList.add('hidden');
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const swapView = e => {
  if (e === 'searchCar') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.remove('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    $homeBtnTop.classList.add('hidden');
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
    $homeBtnTop.classList.add('hidden');
  } else if (e === 'intro') {
    $introPage.classList.remove('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'intro';
    $homeBtnTop.classList.add('hidden');
  } else if (e === 'complaintList') {
    $homeBtnTop.classList.remove('hidden');
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.remove('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'complaintList';
  } else if (e === 'home') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.remove('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'home';
    $homeBtnTop.classList.add('hidden');
  } else if (e === 'dataView') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.add('hidden');
    $dataRecordPage.classList.remove('hidden');
    carInfo.dataView = 'dataView';
    $homeBtnTop.classList.add('hidden');
    if (carInfo.userDataLog.log.length === 0) {
      $emptyModal.classList.remove('hidden');
    }
  } else if (e === 'data-log') {
    $introPage.classList.add('hidden');
    $vehicleFinder.classList.add('hidden');
    $serviceListPage.classList.add('hidden');
    $complaintPage.classList.add('hidden');
    $homePage.classList.add('hidden');
    $dataLog.classList.remove('hidden');
    $dataRecordPage.classList.add('hidden');
    carInfo.dataView = 'data-log';
    $homeBtnTop.classList.add('hidden');
  }
};

document.addEventListener('click', e => {
  const userDataView = e.target.getAttribute('data-view');
  const userTarget = e.target.className;
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

      for (let i = 0; i < carInfo.serviceAppend.length; i++) {
        renderServiceElement(carInfo, carInfo.serviceAppend[i]);
      }
      renderCostBreakElement(carInfo);
      swapView('serviceList');
    } else if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.service[0].message.message === 'Data Invaild') {
      $carOverStats.textContent = '';
      $carSearch.elements.year.value = carInfo.year;
      $carSearch.elements.make.value = carInfo.make;
      $carSearch.elements.model.value = carInfo.model;
      $carSearch.elements.mileage.value = parseInt(carInfo.mileage);
      swapView('searchCar');
    } else if (carInfo.model === '' && carInfo.year === 0 && carInfo.make === '') {
      renderTitleSearch();
      swapView('searchCar');
    }
  } else if (userDataView === 'complaintList') {
    if (carInfo.complaints[0].Message !== 'No results found for this request' && carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '') {
      $carOverStats.textContent = '';
      $complaintListing.textContent = '';
      for (let i = 0; i < carInfo.complaints[0].Results.length; i++) {
        renderComplaintLogs(carInfo.complaints[0].Results[i], carInfo.complaints[0], carInfo.complaints[0].Results[i]);
      }
      renderTitleComplaint(carInfo);
      swapView('complaintList');
    } else if (carInfo.complaints === 'No results found for this request') {
      $complaintModal.classList.remove('hidden');
    } else if (carInfo.complaints[0].Message === 'Complaints: An error occured while processing this request. Pls verify the HTTP request syntax.') {
      $okBtn.classList.remove('hidden');
    }
  } else if (userDataView === 'home') {
    $homePageService.textContent = '';
    renderCarStatus(carInfo);
    carStatusProgress(carInfo);
    $title.classList.remove('hidden');
    for (let i = 0; i < 5; i++) {
      renderHomePageService(carInfo, carInfo.serviceAppend[i]);
    }
    if (carInfo.userDataLog.log.length === 0) {
      $oilRemaining.textContent = 'Please Log the most recent service history';
      $tirePressureCheck.textContent = 'Please Log the most recent service history';
      $tireRotationRemaining.textContent = 'Please Log the most recent service history';
    }
    swapView('home');
  } else if (userDataView === 'data-log') {
    renderTitleComplaint(carInfo);
    swapView('data-log');

  } else if (userDataView === 'dataView') {
    $carOverStats.textContent = '';
    renderTitleComplaint(carInfo);
    renderDataTable(carInfo.userDataLog, index);
    swapView('dataView');

  } else if (userTarget === 'modalBtn ok') {
    $complaintSuccess.classList.add('hidden');
  } else if (userTarget === 'modalBtn ok2') {
    $okBtn.classList.add('hidden');
  } else if (userTarget === 'modalBtn ok3') {
    $complaintModal.classList.add('hidden');
  } else if (userTarget === 'modalBtn ok4') {
    $serviceSucess.classList.add('hidden');
  } else if (userTarget === 'modalBtn edit btn-instructions') {
    $introModal.classList.add('hidden');
  } else if (userTarget === 'modalBtn edit btn-instructions empty') {
    $emptyModal.classList.add('hidden');
  } else if (userTarget === 'modalBtn fail') {
    $noConnect.classList.add('hidden');
  }

});

const getDataObject = event => {
  carInfo.serviceAppend = [];
  for (let i = 0; i < event.service[0].data.length; i++) {
    if (event.service[0].data[i].due_mileage >= carInfo.mileage) {
      carInfo.serviceAppend.push(event.service[0].data[i]);
    }
  }
  return carInfo;
};

$getStartedBtn.addEventListener('click', () => {
  if (carInfo.model !== '' && carInfo.year !== 0 && carInfo.make !== '' && carInfo.serviceAppend.length !== 0 && carInfo.mileage !== '') {
    $homePageService.textContent = '';
    renderCarStatus(carInfo);
    carStatusProgress(carInfo);
    $title.classList.remove('hidden');
    for (let i = 0; i < 5; i++) {
      renderHomePageService(carInfo, carInfo.serviceAppend[i]);
    }
    if (carInfo.userDataLog.log.length === 0) {
      $oilRemaining.textContent = 'Please Log the most recent service history';
      $tirePressureCheck.textContent = 'Please Log the most recent service history';
      $tireRotationRemaining.textContent = 'Please Log the most recent service history';
    }
    $homeButton.classList.remove('hidden');
    swapView('home');
  } else {
    $homeButton.classList.remove('hidden');
    $title.classList.remove('hidden');
    renderTitleSearch();
    swapView('searchCar');
  }

});

$carSearch.addEventListener('submit', e => {
  $eraseInput.textContent = '';
  $costDelete.textContent = '';
  e.preventDefault();
  carInfo.year = $carSearch.elements.year.value;
  carInfo.make = $carSearch.elements.make.value;
  carInfo.model = $carSearch.elements.model.value;
  carInfo.mileage = $carSearch.elements.mileage.value;
  const parsedYear = parseInt($carSearch.elements.year.value);
  const parsedMileage = parseInt($carSearch.elements.mileage.value);
  recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value);
  serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage);
  $carSearch.reset();
});

$dataLogSubmitBtn.addEventListener('submit', e => {
  e.preventDefault();
  const desc = {
    date: $dataLogSubmitBtn.elements.date.value,
    mileage: $dataLogSubmitBtn.elements.mileage.value,
    category: $dataLogSubmitBtn.elements.category.value,
    description: $dataLogSubmitBtn.elements.comments.value
  };
  carInfo.userDataLog.log.push(desc);
  renderDataTable(carInfo.userDataLog, index);
  swapView('dataView');
  $dataLogSubmitBtn.reset();
});

$userDataTable.addEventListener('click', e => {
  const targetNumber = e.target.getAttribute('data-view');
  if (targetNumber && targetNumber !== null) {
    $deleteBtnModal.setAttribute('data-view', targetNumber);
    $editBtnModal.setAttribute('data-view', targetNumber);
    $modalContainer.classList.remove('hidden');
    $modalText.textContent = `What would you like to do for # ${targetNumber} ?`;
  }
});

$modalBtn.addEventListener('click', e => {

  if (e.target.className === 'modalBtn delete') {
    const indexes = parseInt($deleteBtnModal.getAttribute('data-view'));
    const deleteData = carInfo.userDataLog.log;
    deleteData.splice(indexes - 1, 1);
    $modalContainer.classList.add('hidden');
    renderDataTable(carInfo.userDataLog, null);
  } else if (e.target.className === 'modalBtn edit') {
    index = parseInt($deleteBtnModal.getAttribute('data-view'));
    $dataLogSubmitBtn.elements.date.value = carInfo.userDataLog.log[index - 1].date;
    $dataLogSubmitBtn.elements.mileage.value = carInfo.userDataLog.log[index - 1].mileage;
    $dataLogSubmitBtn.elements.category.value = carInfo.userDataLog.log[index - 1].category;
    $dataLogSubmitBtn.elements.comments.value = carInfo.userDataLog.log[index - 1].description;
    $modalContainer.classList.add('hidden');
    swapView('data-log');
  }

});
