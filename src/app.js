//Basic search engine with API-call: after entering city name and submitting (pressing enter after writing city name) 
//".current-weather-row" data will display relevant info in metric unit only.
function displayCityNameAndTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiKey = "ef675c90f7a08fdac95db8723fa07244";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
   function showTemp(response) {
    let displayedCity = document.querySelector("#current-city");
    let displayedTemp = document.querySelector("#temp-value");
    let dispayedDescription = document.querySelector("#weather-main");
    let dispayedHumidity = document.querySelector("#main-humidity");
    let dispayedWindSpeed = document.querySelector("#wind-speed");
    
    let outputCityName = response.data.name;
    let outputCountry = response.data.sys.country
    let outputTemp = Math.round(response.data.main.temp);
    let outputDescription = (response.data.weather[0].main);
    let outputHumidity = response.data.main.humidity;
    let outputWindSpeed = Math.round(response.data.wind.speed);

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedTemp.innerHTML = outputTemp;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;
  }
  axios.get(apiUrl).then(showTemp);
}
let selectForm = document.querySelector("#search-form");
selectForm.addEventListener("submit", displayCityNameAndTemp);

//Adjusting search engine: submitting with "#search-button"

let selectSearchButton = document.querySelector("#search-button")
selectSearchButton.addEventListener("click", displayCityNameAndTemp)

//Adding current-location button response and weather display. 

function GetLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ef675c90f7a08fdac95db8723fa07244";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  function showGeolocationTemp(response) {
    let displayedCity = document.querySelector("#current-city");
    let displayedTemp = document.querySelector("#temp-value");
    let dispayedDescription = document.querySelector("#weather-main");
    let dispayedHumidity = document.querySelector("#main-humidity");
    let dispayedWindSpeed = document.querySelector("#wind-speed");
    
    let outputCityName = response.data.name;
    let outputCountry = response.data.sys.country
    let outputTemp = Math.round(response.data.main.temp);
    let outputDescription = (response.data.weather[0].main);
    let outputHumidity = response.data.main.humidity;
    let outputWindSpeed = Math.round(response.data.wind.speed);

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedTemp.innerHTML = outputTemp;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;
  }
  axios.get(apiUrl).then(showGeolocationTemp);
}
let selectLocationButton = document.querySelector("#current-location")
selectLocationButton.addEventListener ("click",GetLocation);


//Feachers to add:  
//1.Alerts if cityInput value is empty or invalid (e.i. there is axios error)
//2. Find where is percipitation data in openWeatherAPI and add it to diaplay
//3. Change Current time dispayed by city requested.
//4. Icons
//5. Forecast
//6. Units conversion
//7. CSS conditional display (as temp and day-night function)
//8.Fix geolocation - not showing the correct location? 
