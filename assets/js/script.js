var addCity = document.querySelector('#addCity');
var displayCity = document.querySelector('#displayCity');
var dateEl = document.querySelector("#date");
var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function nextDay(days) {
    for (days[i] = dayjs(); i < 5; i++) {
        return days
    }
}


function fetchWeather(location) {
    console.log("fetch weather location input")
    console.log(location)
    var { lat,lon } = location;
    console.log(lat)
    console.log(lon)
    var newURL = weatherUrl + "/data/2.5/forecast?lat=" +location.lat+"&lon="+location.lon+"&appid="+weatherKey;
    fetch(newURL)
        .then(function (res) {
            return res.json();
        })
        //.then(function (data){
        //    console.log (data.list[0].dt_txt, "data.list[0]")
        //    for (i=1; i<data.list.dt_txt.length; i+8) {
        //        console.log(data.list.dt_txt[i])
        //    }

        //})
    
}

function formatToWeekDay(timestamp){
    var date = dayjs.unix(timestamp);
    const dayOfWeekString = date.format('dddd, MMMM d');
    return dayOfWeekString
}

function makeCurrentForecast(data){
    console.log("Making current forecast")
    var gist = document.querySelector('#gist');
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
    temperature.innerHTML = `Temperature of  <span>${temp}<span> degrees.`
    windspeed.innerHTML = `Wind speeds are at <span>${wind}<span> m/h.`
    humidity.innerHTML = `Humidity is at <span>${humid}<span> percent.`
}

function fetchCoords(cityName) {
    var apiUrl = weatherUrl + "/data/2.5/weather?q=" + cityName + "&limit=5&appid=" + weatherKey + "&units=imperial";
    fetch(apiUrl)
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            if(data && data.message === "city not found"){
                alert("Please enter a valid city")
                return
            }
            let location = data.coord
            fetchWeather(location)
            makeCurrentForecast(data)
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


const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var enterCity = document.querySelector('#enterCity')
    var cityInput = enterCity.value.trim()
    if (cityInput.length < 2) {
        alert("please enter a valid city name")
        return
    }
    fetchCoords(cityInput);
    enterCity.value = '';
});


//document.getElementById("current-forecast-container").innerHTML+= `<h2>This is text</h2><p class="outline">This is smaller text</p>`