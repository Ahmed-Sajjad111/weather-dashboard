let cityName = "";
let apiKey = "71a63790d47217e8d8fa55c3ef88717e"
let currentDate = moment().format("MM/DD/YYYY");

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
    $("#current-city-date").html(cityName + " (" + currentDate + ")" + "<img id ='current-weather-icon'>");
    $("#current-weather-icon").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")
    $("#current-temp").text("Temp: " + data.current.temp + "\u00B0F");
    $("#current-wind").text("Wind: " + data.current.wind_speed + " MPH");
    $("#current-humidity").text("Humidity: " + data.current.humidity + " %");
    $("#current-uv-index").html("UV Index: <span id ='uv-index-category'></span>");
    let uvi = data.current.uvi
    let uvSpan= $("#uv-index-category")
    uvSpan.text(uvi)
    if (uvi < 3){
        uvSpan.addClass("uv-low")
    } else if (uvi >= 3 && uvi < 6) {
        uvSpan.addClass("uv-moderate")
    } else if (uvi >= 6 && uvi < 8) {
        uvSpan.addClass("uv-high")
    } else if (uvi >= 8 && uvi < 11) {
        uvSpan.addClass("uv-very-high")
    } else if (uvi >= 11) {
        uvSpan.addClass("uv-extreme")
    }
}

//render data to page for next 5 day's weather
const displayForecast = function(data) {
    for (let i = 0; i < 5; i++) {
        let incrementingDate = moment(currentDate, "MM/DD/YYYY").add(i+1, "days").format("MM/DD/YYYY")
        $("#day-" + (i+1) +"-date").text("(" + incrementingDate + ")")
        $("#day-" + (i+1) +"-weather-icon").attr("src","http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
        $("#day-" + (i+1) +"-weather-icon").attr("class","weather-icon")
        $("#day-" + (i+1) +"-temperature").text("Temp: " + data.daily[i].temp.day + "\u00B0F")
        $("#day-" + (i+1) +"-wind").text("Wind: " + data.daily[i].wind_speed + " MPH")
        $("#day-" + (i+1) +"-humidity").text("Humidity: " + data.daily[i].humidity + " %")
    }
    console.log(data)
}