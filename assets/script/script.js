let cityName = "";
let apiKey = "71a63790d47217e8d8fa55c3ef88717e"

//fetch request using city name
const cityRequest = function() {
    let cityApiUrl = 
                "https://api.openweathermap.org/data/2.5/weather?q="
                + cityName 
                + "&units=imperial&appid=" 
                + apiKey;
    fetch(cityApiUrl)
        .then(function(response) {
            console.log(response)
            //request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                    let lat = data.coord.lat
                    let lon = data.coord.lon
                    coordRequest(lat, lon)
                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        })
}

//fetch request using longitude and latitude to display current and forecast weather
const coordRequest = function(lat, lon) {
    let coordApiUrl =
                    "https://api.openweathermap.org/data/2.5/onecall?lat="
                    + lat
                    + "&lon="
                    + lon
                    + "&exclude=minutely,hourly,alerts"
                    + "&units=imperial"
                    + "&appid="
                    + apiKey;
    fetch(coordApiUrl)
        .then(function(response) {
            console.log(response)
            //request was successful
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                    displayCurrentWeather(data)
                    displayForecast(data)
                })
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        })
}

//onclick event for search button to gather value and pass into cityRequest()
$("#submit-search-btn").on("click", function() {
    cityName = $("#city-search").val().trim();
    cityRequest(cityName);
});

//render data to page for today's weather
const displayCurrentWeather = function(data) {
    $("#current-city-date").text(cityName);
    $("#current-temp").text("Temp: " + data.current.temp);
    $("#current-wind").text("Wind: " + data.current.wind_speed + " MPH");
    $("#current-humidity").text("Humidity: " + data.current.humidity + " %");
    $("#current-uv-index").html("UV Index: <span id ='uv-index-category'></span>");
    let uvi = data.current.uvi
    let uvSpan= $("#uv-index-category")
    uvSpan.text(uvi)
    if (uvi <= 2){
        uvSpan.addClass("uv-low")
    }
    console.log(data)
}

//redner data to page for next 5 day's weather
const displayForecast = function(data) {
    console.log(data)
}