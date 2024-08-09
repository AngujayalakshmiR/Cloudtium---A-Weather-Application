//variables API required data

const apiKey = "7bb8f2d8271bed05d1194c06958377cc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//document elements

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");

let cityName = document.querySelector(".city");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind");
let weatherConditionDisplay = document.querySelector(".weather-condition");

// async function

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If user insert an invalid city name display error message - Invalid city Name

    if (response.status === 404) {
        error.style.display = "block";
        cityName.style.display = "none";
    }

    //if the user insert a correct city name

    else {

        //Reset styles

        error.style.display = "none";
        cityName.style.display = "block";

        // colect data from the JSON

        let data = await response.json();
        let weatherConditionData = data.weather[0].main;

        cityName.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp) + 1+"°C";
        humidity.innerText = data.main.humidity + "%";
        windSpeed.innerText = Math.round(data.wind.speed) + " km/h";
        weatherConditionDisplay.innerText = `${weatherConditionData}`;

        // update weather icon

        switch (weatherConditionData) {
            case 'Clouds':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/clouds.png";
                break;
            case 'Tornado':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/Tornado.png";
                break;
            case 'Rain':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/drizzle.png";
                break;
            case 'Clear':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/clear.png";
                break;
            case 'Thunderstorm':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/thunderstorm.png";
                break;
            case 'Snow':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/snow.png";
                break;
            case 'Mist':
            case 'Fog':
            case 'Smoke':
            case 'haze':
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/mist.png";
                break;
            default:
                weatherIcon.src = "https://raw.githubusercontent.com/CarolCosta9/img/main/weather%20card%20img/other.png";
        }
    }
}

//Btn event

searchBtn.addEventListener("click", () => {

    // if the input is empty disable animation

    if (!searchBox.value) {
        searchBtn.classList.remove("animation");
    }
    // update the info

    else {
        checkWeather(searchBox.value);
  searchBtn.classList.add("animation");
    }

    // reset the input

    searchBox.value = "";
})

//keyboard event listener - press Enter

searchBox.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
        searchBtn.click();
    }
});

//default value

checkWeather("Cairo");
