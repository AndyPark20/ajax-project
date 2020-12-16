
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
  console.log('hello')

})
