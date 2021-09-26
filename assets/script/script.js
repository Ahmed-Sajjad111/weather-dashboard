let cityName = "";
let apiKey = "71a63790d47217e8d8fa55c3ef88717e"

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
                    let lon = data.coord.lon
                    let lat = data.coord.lat
                    coordRequest(lon, lat)
                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        })
}

const coordRequest = function(lon, lat) {

}

$("#submit-search-btn").on("click", function() {
    cityName = $("#city-search").val().trim();
    cityRequest();
});

const displayCurrentWeather = function() {

}

const displayForecast = function() {

}