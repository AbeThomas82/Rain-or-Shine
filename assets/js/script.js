var addCity = document.querySelector('#addCity');//Targeting id values
var displayCity = document.querySelector('#displayCity');
var dateEl = document.querySelector("#date");
var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



function fetchIcon(data){
    var iconUrl = "http://openweathermap.org/img/w/" + data + ".png"
    fetch(iconUrl)
        .then(function (res) {
            return res.json();
        })
}


function fetchWeather(location) {
    console.log("fetch weather location input")//Fetching code suggested by tutor
    console.log(location)
    var { lat,lon } = location;
    console.log(lat)
    console.log(lon)

    var newUrl = weatherUrl + "/data/2.5/forecast?lat=" +location.lat+"&lon="+location.lon+"&appid="+weatherKey+"&units=imperial";
    const futureDateHTML = document.getElementsByClassName('futureDate')
    const futureIconHTML = document.getElementsByClassName('futureIcon')
    const futureGistHTML = document.getElementsByClassName('futureGist')
    const futureHighHTML = document.getElementsByClassName('futureHigh')
    const futureLowHTML = document.getElementsByClassName('futureLow')
    const futureWindHTML = document.getElementsByClassName('futureWind')
    const futureThickHTML = document.getElementsByClassName('futureThick')

    
    fetch(newUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data){
            console.log (data.list[0], "data")
            for (i=0; i<5; i++) {
                const selected = [
                    data.list[0],
                    data.list[8],
                    data.list[16],
                    data.list[24],
                    data.list[32],
                ];
                console.log(selected[i].dt_txt);//Loop to extract weather data
                var date = formatToWeekDay(selected[i].clouds.dt);
                var icon = fetchIcon(selected[i].weather[0].icon);
                var gist = selected[i].weather[0].description;
                var tempHigh = selected[i].main.temp_max;
                var tempLow = selected[i].main.temp_min;
                var humidity = selected[i].main.humidity;
                var windspeed = selected[i].wind.speed;
                console.log(formatToWeekDay(selected[i].dt))
                console.log(selected[i].weather[0].description)
                console.log(selected[i].main.temp_max)
                console.log(selected[i].main.temp_min)
                console.log(selected[i].main.humidity)
                console.log(selected[i].wind.speed)
                futureDateHTML[i].textContent = `${formatToWeekDay(selected[i].dt)}`
                futureIconHTML[i].textContent = `${fetchIcon(selected[i].weather[0].icon)}`
                futureGistHTML[i].textContent = `Conditions: ${selected[i].weather[0].description}`
                futureHighHTML[i].textContent = `High: ${selected[i].main.temp_max}`
                futureLowHTML[i].textContent = `Low: ${selected[i].main.temp_min}`
                futureWindHTML[i].textContent = `Winds: ${selected[i].wind.speed} mph`
                futureThickHTML[i].textContent = `Humidity: ${selected[i].main.humidity}%`
              
                

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
    var icon = document.querySelector('#icon');
    var temperature = document.querySelector('#temperature');
    var windspeed = document.querySelector('#windspeed');
    var humidity = document.querySelector('#humidity');
    console.log(humidity)
    var name = data.name;
    var date = formatToWeekDay(data.dt)
    var nameIcon = fetchIcon(data.weather[0].icon)
    var nameGist = data.weather[0].description;
    var temp = (data['main']['temp']).toFixed(0);
    var wind = data['wind']['speed'];
    var humid = data.main.humidity
    displayCity.innerHTML = `This is the weather of <span>${name}<span>.`
    dateEl.innerHTML = `For <span>${date}<span>`
    icon.innerHTML = `${nameIcon}`
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
