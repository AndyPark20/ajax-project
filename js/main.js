$introImage = document.querySelector('.carHealthLogo');

var intervalId =null;

function introAnimation(){

  $introImage.classList.add('seeOpacity')

}


intervalId=setTimeout(introAnimation, 1000)
