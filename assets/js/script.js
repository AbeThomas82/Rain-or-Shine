var enterCity = document.querySelector('#enterCity');
var addCity = document.querySelector('#addCity');
var displayCity = document.querySelector('#displayCity');
var date = document.querySelector("#date");
var gist = document.querySelector('#gist');
var temperature = document.querySelector('#temperature');
var windspeed = document.querySelector('#windspeed');
var humidity = document.querySelector('#humidity');
var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function fahrenheit(val) {
    return (((val-273)*9/5) + 32).toFixed(2)
}

function nextDay(days) {
    for (days[i]=dayjs(); i<5; i++){
        return days
    }

}

function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    console.log(lat)
    console.log(lon)
        var name = data['name'];
        var date = data['date'];
        var nameGist = data['weather']['0']['description'];
        var temp = data['main']['temp'];
        var wind = data['wind']['speed'];
        var humid = data['humidity'];
        displayCity.innerHTML = `This is the weather of <span>${name}<span>`
        date.innerHTML = `For <span>${nextDay(date)}<span>`
        gist.innerHTML = `Conditions: <span>${nameGist}<span>`
        temperature.innerHTML = `Temperature of <span>${fahrenheit(temp)}<span>`
        windspeed.innerHTML = `Wind speeds are at <span>${wind}<span>`
        humidity.innerHTML = `Humidity is at <span>${humid}<span>`   

    function fetchCoords(){
        var apiUrl = [weatherUrl + "/data/2.5/weather?q="+ enterCity.value +"&limit=5&appid="+weatherKey];
    fetch(apiUrl)
        .then(function (res) {
            console.log(res)
        return res.json();
    })
    .then(function (data) {
  
        console.log(data.coord)
        let location = data.coord
        fetchWeather(location)
        // create a div container where we want to put the result into
        // then we can change the innerHTML or textContent of this new div container 
        // to be equal to the data we want from our list
        // then once we have done that we can append this new div container to one of our div
        // containers on our webpage where we want the weather to show up              
     })
        .catch(function (err) {
          console.error(err);
        });
    }
}

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function (event){
    event.preventDefault();
    fetchCoords();
    enterCity.value = '';
});