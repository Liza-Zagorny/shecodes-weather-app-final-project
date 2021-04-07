//Basic search engine with API-call: after entering city name and submitting (pressing enter after writing city name) 
//".current-weather-row" data will display relevant info in metric unit only.

let now = new Date();

function dayOrNight (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours >=18 || hours<5) {
    // 18:00 is a condition because it looks like "sunset" data is not working at the resplonse (displays the next day and not sunset time)
    return(`night`) 
  }

   else {
    return(`day`)
  }
}

function formatDate (timestamp) {
  let date = new Date(timestamp);
  let days = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

//This formating is to display names of days from  response.data.daily.dt for the forecast section 
function formatDay (timestamp) {
 let date = new Date(timestamp * 1000);
 let day = date.getDay();
 let days = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"];
 return days[day];

}

  function getForecast(coordinates) {
    let apiKey = "ef675c90f7a08fdac95db8723fa07244";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast)
  }

   function showTemp(response) {
    let displayedCity = document.querySelector("#current-city");
    let displayedIcon = document.querySelector("#icon")
    let displayedTemp = document.querySelector("#temp-value");
    let dispayedDateAndTime = document.querySelector("#current-time");
    let dispayedDescription = document.querySelector("#weather-main");
    let dispayedHumidity = document.querySelector("#main-humidity");
    let dispayedWindSpeed = document.querySelector("#wind-speed");

    celsiusTemp = response.data.main.temp
    
    let outputCityName = response.data.name;
    let outputCountry = response.data.sys.country
    let outputTemp = Math.round(celsiusTemp);
    let outputDescription = (response.data.weather[0].main);
    let outputHumidity = response.data.main.humidity;
    let outputWindSpeed = Math.round(response.data.wind.speed);
    let timeZoneTime = formatDate ((response.data.dt+(now.getTimezoneOffset()*60)+response.data.timezone)* 1000)
    let dayOrNightAtTimezone =dayOrNight((response.data.dt+(now.getTimezoneOffset()*60)+response.data.timezone)* 1000)

    let mainCard = document.querySelector("#main-card")
    
    if (outputTemp >= 20 ) { mainCard.classList.add(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
       mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`); }
    if (outputTemp >= 10  && outputTemp < 20) {mainCard.classList.add(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`);}
    if (outputTemp >= -5  && outputTemp < 10) {mainCard.classList.add(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`);}
    if (outputTemp < -5) { mainCard.classList.add(`${dayOrNightAtTimezone}-freezing`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);}

        let currentLocationDescription = document.querySelector("#current-location-description")
       currentLocationDescription.classList.add(`${dayOrNightAtTimezone}-description`)
    

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    displayedIcon.setAttribute ("alt", outputDescription)
    displayedTemp.innerHTML = outputTemp;
    dispayedDateAndTime.innerHTML = timeZoneTime;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;

    getForecast(response.data.coord)
  }

  function search (cityInput) {
  let apiKey = "ef675c90f7a08fdac95db8723fa07244";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp).catch(
    function (error) {
      alert('Please enter a valid city name')
      return Promise.reject(error)
    })

  }

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput)
}

let selectForm = document.querySelector("#search-form");
selectForm.addEventListener("submit", handleSubmit);

//Adjusting search engine: submitting with "#search-button"

let selectSearchButton = document.querySelector("#search-button")
selectSearchButton.addEventListener("click", handleSubmit)

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
    let displayedIcon = document.querySelector("#icon")
    let displayedTemp = document.querySelector("#temp-value");
    let dispayedDateAndTime = document.querySelector("#current-time");
    let dispayedDescription = document.querySelector("#weather-main");
    let dispayedHumidity = document.querySelector("#main-humidity");
    let dispayedWindSpeed = document.querySelector("#wind-speed");

    celsiusTemp = response.data.main.temp
    
    let outputCityName = response.data.name;
    let outputCountry = response.data.sys.country
    let outputTemp = Math.round(celsiusTemp);
    let outputDescription = (response.data.weather[0].main);
    let outputHumidity = response.data.main.humidity;
    let outputWindSpeed = Math.round(response.data.wind.speed);
     let timeZoneTime = formatDate ((response.data.dt+(now.getTimezoneOffset()*60)+response.data.timezone)* 1000)
    let dayOrNightAtTimezone =dayOrNight((response.data.dt+(now.getTimezoneOffset()*60)+response.data.timezone)* 1000)

    let mainCard = document.querySelector("#main-card")
    if (outputTemp >= 20 ) { mainCard.classList.add(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`); }
    if (outputTemp >= 10  && outputTemp < 20) {mainCard.classList.add(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`);}
    if (outputTemp >= -5  && outputTemp < 10) {mainCard.classList.add(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-freezing`);}
    if (outputTemp < -5) { mainCard.classList.add(`${dayOrNightAtTimezone}-freezing`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-warm`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-cold`);
        mainCard.classList.remove(`${dayOrNightAtTimezone}-hot`);};

        let currentLocationDescription = document.querySelector("#current-location-description")
       currentLocationDescription.classList.add(`${dayOrNightAtTimezone}-description`)

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    displayedIcon.setAttribute ("alt", outputDescription)
    displayedTemp.innerHTML = outputTemp;
    dispayedDateAndTime.innerHTML = timeZoneTime;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;

    getForecast(response.data.coord)
  }
  axios.get(apiUrl).then(showGeolocationTemp).catch(
    function (error) {
      alert("Sorry, can't get weather for your location")
      return Promise.reject(error)
    });

    
}
let selectLocationButton = document.querySelector("#current-location")
selectLocationButton.addEventListener ("click",GetLocation);


//Units conversion
function turnFarenheit(event) {
  event.preventDefault()
  selectCelsiusLink.classList.remove("active");
  selectFarenheitLink.classList.add("active");
  let selectTemp = document.querySelector("#temp-value");
  let farenheitTemp = Math.round((celsiusTemp*9)/5+32);
  selectTemp.innerHTML = farenheitTemp
}

function turnCelsius (event) {
  event.preventDefault()
  selectCelsiusLink.classList.add("active");
  selectFarenheitLink.classList.remove("active");
  let selectTemp = document.querySelector("#temp-value");
  selectTemp.innerHTML = Math.round(celsiusTemp) 
}



let celsiusTemp = null 

let selectFarenheitLink = document.querySelector("#farenheit-link");
//selectFarenheitLink.addEventListener("click",turnFarenheit);

let selectCelsiusLink = document.querySelector("#celsius-link");
//selectCelsiusLink.addEventListener("click", turnCelsius);

//Searching for default city weather at page load
search("New York")

 
//Forecast tamplate appearing from JS

function displayForecast(response) {

  let forecastDailyData = response.data.daily
  let forecastCard = document.querySelector("#forecast-body")
  let forecastHTML = `<div class="row forecast-row">                      
  `;

  debugger
    forecastDailyData.forEach(function(forecastDay, index) {
  if (index < 5) {
     {forecastHTML = forecastHTML + `<div class="col-2 forecast-col">
                                <span id="forecast-day">${formatDay(forecastDay.dt)}</span>
                                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="forecast-icon" width="70">
                                <span class="forecast-temp"><strong><span id="forecast-max-temp">${Math.round(forecastDay.temp.max)}</span>°</strong> | <span id="forecast-min-temp">${Math.round(forecastDay.temp.min)}</span>°</span>
                            </div>`}
  }}
 )
  
   
  forecastHTML = forecastHTML + `</div>`
  forecastCard.innerHTML = forecastHTML 
}



