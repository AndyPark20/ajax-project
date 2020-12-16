
var $getStartedBtn = document.querySelector('.getStarted');
var $introPage =document.querySelector('.introduction');
var $vehicleFinder = document.querySelector('.find-vehicle');
var $carSearch = document.querySelector('#car-search-input');



$getStartedBtn.addEventListener('click', function(){
if (carInfo.make ==='' && carInfo.year ===0 && carInfo.model===''){
  $introPage.classList.add('hidden');
  $vehicleFinder.classList.remove('hidden');
}
})

$carSearch.addEventListener('submit',function(e){

  e.preventDefault();
  carInfo.year = $carSearch.elements.year.value;
  carInfo.make = $carSearch.elements.make.value;
  carInfo.model = $carSearch.elements.model.value;
  carInfo.mileage =$carSearch.elements.mileage.value;
  // function recall(year, make,model){

  // }
  $carSearch.reset();
})
