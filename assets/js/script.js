var enterCity = document.querySelector('#enterCity');
var addCity = document.querySelector('#addCity');
var displayCity = document.querySelector('#displayCity');
var date = document.querySelector("#date");
var gist = document.querySelector('#gist');
var temperature = document.querySelector('#temperature');
var windspeed = document.querySelector('#wind-speed');
var humidity = document.querySelector('#humidity');
var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function fetchCoords(){
    var apiUrl = [weatherUrl + "/geo/1.0/direct?q="+ enterCity.value +"&limit=5&appid="+weatherKey];
fetch(apiUrl)
    .then(function (res) {
        console.log(res)
      return res.json();
    })
    .then(function (data) {
  
        console.log(data)
      
    })
    .catch(function (err) {
      console.error(err);
    });
}

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function (event){
    event.preventDefault();
    fetchCoords();
    enterCity.value = '';
});