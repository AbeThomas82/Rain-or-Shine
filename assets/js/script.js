var addCity = document.querySelector('#addCity');//Targeting id values
var displayCity = document.querySelector('#displayCity');
var dateEl = document.querySelector("#date");
var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fetchWeather(location) {
    console.log("fetch weather location input")//Fetching code suggested by tutor
    console.log(location)
    var { lat,lon } = location;
    console.log(lat)
    console.log(lon)

    var newUrl = weatherUrl + "/data/2.5/forecast?lat=" +location.lat+"&lon="+location.lon+"&appid="+weatherKey+"&units=imperial";
    
    fetch(newUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data){
            console.log (data.list[0], "data")
            for (i=0; i<40; i+=8) {
                console.log(data.list[i].dt_txt);//Loop to extract weather data
                var date = document.querySelector('date[i]');
                var gist = document.querySelector('gist[i]');
                var temp = document.querySelector('temperature[i]');
                var windspeed = document.querySelector('windspeed[i]');
                var humidity = document.querySelector('humidity[i]');
                console.log(data.list[i].weather)
                console.log(data.list[i].main.temp_max)
                console.log(data.list[i].main.temp_min)
                console.log(data.list[i].main.humidity)
                console.log(data.list[i].wind)


            }
        })
    
}

function formatToWeekDay(timestamp){
    var date = dayjs.unix(timestamp);
    const dayOfWeekString = date.format('dddd, MMMM D');
    return dayOfWeekString
}

function makeCurrentForecast(data){//Get current weather
    console.log("Making current forecast")
    var gist = document.querySelector('#gist');//Calling certain id values
    var temperature = document.querySelector('#temperature');
    var windspeed = document.querySelector('#windspeed');
    var humidity = document.querySelector('#humidity');
    console.log(humidity)
    var name = data.name;
    var date = formatToWeekDay(data.dt)
    var nameGist = data.weather[0].description;
    var temp = (data['main']['temp']).toFixed(0);
    var wind = data['wind']['speed'];
    var humid = data.main.humidity
    displayCity.innerHTML = `This is the weather of <span>${name}<span>.`
    dateEl.innerHTML = `For <span>${date}<span>`
    gist.innerHTML = `Conditions: <span>${nameGist}<span>.`
    temperature.innerHTML = `Temperature of <span>${temp}<span> degrees.`
    windspeed.innerHTML = `Wind speeds are at <span>${wind}<span> mph.`
    humidity.innerHTML = `Humidity is at <span>${humid}<span> percent.`
}

function fetchCoords(cityName) {//Get coordinates for the city
    var apiUrl = weatherUrl + "/data/2.5/weather?q=" + cityName + "&limit=1&appid=" + weatherKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            if(data && data.message === "city not found"){//Preventing bad input
                alert("Please enter a valid city")
                return
            }
            let location = data.coord
            fetchWeather(location)
            makeCurrentForecast(data)
        })
        .catch(function (err) {//Catch errors
            console.error(err);
        });
}


const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var enterCity = document.querySelector('#enterCity')
    var cityInput = enterCity.value.trim()
    if (cityInput.length < 2) {
        alert("please enter a valid city name")//Alert to try again
        return
    }
    fetchCoords(cityInput);//Coordinates grabbed
    enterCity.value = '';
});


//document.getElementById("current-forecast-container").innerHTML+= `<h2>This is text</h2><p class="outline">This is smaller text</p>`