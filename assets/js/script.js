var weatherUrl = 'https://api.openweathermap.org';
var weatherKey = 'e58ac91e0a6a8f397405a4f6e3d97d37';

function fetchCoords(){
    var apiUrl = `${weatherUrl}/geo/1.0/direct?q=houston&limit=5&appid=${weatherKey}`;
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


fetchCoords();