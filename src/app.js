//Basic search engine with API-call: after entering city name and submitting (pressing enter after writing city name) 
//".current-weather-row" data will display relevant info in metric unit only.

let now = new Date();

function dayOrNight (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours >=18 || hours<5) {
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
    let outputDateAndTime = formatDate(response.data.dt * 1000)
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

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    displayedIcon.setAttribute ("alt", outputDescription)
    displayedTemp.innerHTML = outputTemp;
    dispayedDateAndTime.innerHTML = timeZoneTime;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;
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
    let outputDateAndTime = formatDate(response.data.dt * 1000)
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

    displayedCity.innerHTML = `${outputCityName}, ${outputCountry}`;
    displayedIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    displayedIcon.setAttribute ("alt", outputDescription)
    displayedTemp.innerHTML = outputTemp;
    dispayedDateAndTime.innerHTML = timeZoneTime;
    dispayedDescription.innerHTML = outputDescription;
    dispayedHumidity.innerHTML = outputHumidity;
    dispayedWindSpeed.innerHTML = outputWindSpeed;
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
selectFarenheitLink.addEventListener("click", turnFarenheit);

let selectCelsiusLink = document.querySelector("#celsius-link");
selectCelsiusLink.addEventListener("click", turnCelsius);

//Searching for default city weather at page load
search("New York")

 
//To do:
//1.Change forecast tamplate to appear from JS
//2. Add forecast API and implement it
//3. Adjust unit conversion for the forecast section
//4. Finish styling to look better

//Consider to fix: 
//🤔 Fix geolocation - not showing the correct location? 
//🤔 Change icons to custome to look nicer with gradient background.
