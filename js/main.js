
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
var $serviceContainer =document.querySelector('.serviceResult')
var $userMileage = document.querySelector('.mi');
var $nextMileage=document.querySelector('.mis');
var $serviceList = document.querySelector('.servicePoint');
var $costBreak = document.querySelector('.costBreakDown');
var $userCarTitle=document.querySelector('#carTitle');
var $complaintPage = document.querySelector('.complaintResult');
var $complaintListing = document.querySelector('.complaintListing');
var $complaintNumber = document.querySelector('.comp');
var repairTotalHours=0;
var laborCost=0
var totalPartCost=0;
var nhtsaResponse=0;



function renderCostBreakElement(event){

  for(var i =0; i<event.serviceAppend.length;i++){
    repairTotalHours+=event.serviceAppend[i].repair.repair_hours;
    laborCost+=event.serviceAppend[i].repair.labor_cost;
    totalPartCost+=event.serviceAppend[i].repair.part_cost;
  }
  var $costBreakStructure = document.createElement('li');
  var $estLaborCost=document.createElement('li');
  var $estPartCost=document.createElement('li');
  var $estTotalCost =document.createElement('li')
  var $estTotalCostNum =(Math.round(laborCost+totalPartCost))

  $costBreakStructure.innerHTML = 'Estimated Total Repair Hours Needed: ' + '<span class="mis">' + repairTotalHours.toFixed(2) + ' Hrs.' +'<span>';
  $estLaborCost.innerHTML ='Estimated Total Labor Cost: ' + '<span class="mis">' + '$' + (Math.round(laborCost)).toFixed(2) + ' USD.' + '<span>';
  $estPartCost.innerHTML='Estimated Total Part Cost: ' + '<span class="mis">' + '$' + (Math.round(totalPartCost)).toFixed(2) + ' USD.' + '<span>';
  $estTotalCost.innerHTML = "Estimated Total cost of Labor + Parts: " + '<span class="mis">' + '$' + $estTotalCostNum.toFixed(2)+ ' USD.' + '<span>';

  $costBreak.appendChild($costBreakStructure)
  $costBreak.appendChild($estLaborCost);
  $costBreak.appendChild($estPartCost);
  $costBreak.appendChild($estTotalCost);
}

function renderComplaintLogs(info,event,criteria){

  var $link =document.createElement('li');
  var $complaintPara =document.createElement('p');
  var $complaintParaTwo =document.createElement('p');
  var $wrapper =document.createElement('div');

  $complaintNumber.textContent =event.Count;
  $complaintPara.innerHTML="<span class='complained'>" + "Component: " + "<span>" + criteria.Component;
  $complaintParaTwo.innerHTML="<span class='complained'>" + "Complaint: " + "<span>" + criteria.Summary;
  $complaintParaTwo.setAttribute('class','border')

  $wrapper.appendChild($complaintPara);
  $wrapper.appendChild($complaintParaTwo);
  $link.appendChild($wrapper);
  $complaintListing.appendChild($link);

  return $complaintListing;
}


function renderServiceElement(info, event) {
  var $createList = document.createElement('li');

  $userCarTitle.textContent=info.year + ' ' + info.model + ' ' + info.make;
  $userMileage.textContent=info.mileage;
  $nextMileage.textContent=info.serviceAppend[0].due_mileage;
  $createList.textContent=event.desc;
  $serviceList.appendChild($createList);


  return $serviceContainer
}

function homeIconRender(){
  var $mainDiv =document.createElement('div');
  var $firstDiv =document.createElement('div');
  var $homeImage =document.createElement('img')
  var $homeParagraph =document.createElement('p');
  var $secondDiv=document.createElement('div');
  var $serviceImage =document.createElement('img')
  var $serviceParagraph =document.createElement('p');
  var $thirdDiv =document.createElement('div');
  var $complaintImage =document.createElement('img');
  var $complaintPara= document.createElement('p');
  var $fourthDiv=document.createElement('div');
  var $dataImage =document.createElement('img');
  var $dataPara=document.createElement('p');


  $mainDiv.setAttribute('class','row-navi')
  $firstDiv.setAttribute('class', 'column-quarter');
  $firstDiv.setAttribute('data-view', 'intro');
  $homeImage.setAttribute('class', 'home-icon');
  $homeImage.setAttribute('data-view','intro');
  $homeImage.setAttribute('src','images/160-1605130_android-navigation-bar-icons-png-navigation-bar-home.png')
  $homeImage.setAttribute('alt','home-icon');
  $homeParagraph.setAttribute('data-view','intro');
  $homeParagraph.textContent="HOME";
  $secondDiv.setAttribute('class', 'column-quarter');
  $serviceImage.setAttribute('class', 'home-icon');
  $serviceImage.setAttribute('src','images/images.png');
  $serviceImage.setAttribute('alt', 'service-icon');
  $serviceParagraph.setAttribute('data-view', 'serviceList');
  $serviceParagraph.textContent="SERVICE";
  $thirdDiv.setAttribute('class','column-quarter');
  $complaintImage.setAttribute('class','home-icon');
  $complaintImage.setAttribute('src', 'images/128606486-vector-hazard-warning-symbol-isolated-on-white-background-warning-icon-sign-of-problem-for-use-on-we.jpg')
  $complaintImage.setAttribute('alt', 'warning-icon')
  $complaintPara.textContent="COMPLAINTS"
  $fourthDiv.setAttribute('class','column-quarter');
  $dataImage.setAttribute('class','home-icon');
  $dataImage.setAttribute('src','images/data-log.png');
  $dataImage.setAttribute('alt', 'warning-icon');
  $dataPara.textContent="DATA LOG";


  $serviceContainer.appendChild($mainDiv);
  $mainDiv.appendChild($firstDiv);
  $firstDiv.appendChild($homeImage);
  $firstDiv.appendChild($homeParagraph);
  $mainDiv.appendChild($secondDiv);
  $secondDiv.appendChild($serviceImage);
  $secondDiv.appendChild($serviceParagraph)
  $mainDiv.appendChild($thirdDiv);
  $thirdDiv.appendChild($complaintImage);
  $thirdDiv.appendChild($complaintPara);
  $mainDiv.appendChild($fourthDiv);
  $fourthDiv.appendChild($dataImage);
  $fourthDiv.appendChild($dataPara);


  return $mainDiv
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
    if(xhrs.status===200){
      console.log(xhrs.status)
      nhtsaResponse=xhrs.status;
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

    if (xhr.status === 200){
      getDataObject(carInfo);
      for (var i = 0; i < carInfo.serviceAppend.length; i++) {
        renderServiceElement(carInfo, carInfo.serviceAppend[i]);
      }
      for (var i = 0; i < carInfo.complaints[0].Results.length; i++) {
        renderComplaintLogs(carInfo.complaints[0].Results[i],carInfo.complaints[0], carInfo.complaints[0].Results[i])
      }
      renderCostBreakElement(carInfo);
      $serviceContainer.appendChild(homeIconRender());
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

document.addEventListener('click', function(e){
  if (e.target.getAttribute('data-view') ==='searchCar'){
    swapView('searchCar');
  }
})


function getDataObject(event){
  carInfo.serviceAppend = [];
  for (var i=0; i<event.service[0].data.length;i++){
    if (event.service[0].data[i].due_mileage >= carInfo.mileage){
        carInfo.serviceAppend.push(event.service[0].data[i]);
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
  recall(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value);
  serviceInterval(parsedYear, $carSearch.elements.make.value, $carSearch.elements.model.value, parsedMileage);
  $carSearch.reset();


})
